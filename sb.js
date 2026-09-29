/* Minimal Supabase client (REST, auth, storage). No dependencies. */
window.SB = (() => {
  const cfg = window.NOBLES_CONFIG || {};
  const KEY = 'nobles-admin-session';
  let session = null;
  try { session = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}

  const store = s => { session = s; try { s ? localStorage.setItem(KEY, JSON.stringify(s)) : localStorage.removeItem(KEY); } catch (e) {} };
  const headers = (extra = {}) => {
    const h = { apikey: cfg.key, ...extra };
    if (session && session.access_token) h.Authorization = 'Bearer ' + session.access_token;
    return h;
  };
  const fail = async res => {
    let m = res.statusText;
    try { const j = await res.json(); m = j.message || j.msg || j.error_description || j.error || m; } catch (e) {}
    const err = new Error(m); err.status = res.status; return err;
  };

  async function refresh() {
    if (!session || !session.refresh_token) return false;
    try {
      const res = await fetch(cfg.url + '/auth/v1/token?grant_type=refresh_token', {
        method: 'POST', headers: { apikey: cfg.key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: session.refresh_token }),
      });
      if (!res.ok) { store(null); return false; }
      store(pack(await res.json()));
      return true;
    } catch (e) { return false; }
  }
  const pack = j => ({ access_token: j.access_token, refresh_token: j.refresh_token, expires_at: Math.floor(Date.now() / 1000) + (j.expires_in || 3600), user: j.user });

  async function req(path, opts = {}, retry = true) {
    const { method = 'GET', body, extra = {}, raw = false } = opts;
    const h = headers(extra);
    if (body !== undefined && !raw) h['Content-Type'] = 'application/json';
    const res = await fetch(cfg.url + path, { method, headers: h, body: body === undefined ? undefined : raw ? body : JSON.stringify(body) });
    if (res.status === 401 && retry && session && await refresh()) return req(path, opts, false);
    if (!res.ok) throw await fail(res);
    if (res.status === 204) return null;
    const t = await res.text();
    return t ? JSON.parse(t) : null;
  }

  const api = {
    get session() { return session; },
    async signIn(email, password) {
      const res = await fetch(cfg.url + '/auth/v1/token?grant_type=password', {
        method: 'POST', headers: { apikey: cfg.key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw await fail(res);
      store(pack(await res.json()));
      return session;
    },
    async signOut() {
      try { if (session) await fetch(cfg.url + '/auth/v1/logout', { method: 'POST', headers: headers() }); } catch (e) {}
      store(null);
    },
    async restore() {
      if (!session) return null;
      if (session.expires_at - 60 < Date.now() / 1000 && !(await refresh())) return null;
      return session;
    },
    updatePassword: password => req('/auth/v1/user', { method: 'PUT', body: { password } }),
    select: (table, query = '') => req(`/rest/v1/${table}?${query}`),
    async count(table, query = '') {
      const res = await fetch(`${cfg.url}/rest/v1/${table}?select=id&${query}`, { headers: headers({ Prefer: 'count=exact', Range: '0-0' }) });
      if (!res.ok) throw await fail(res);
      const total = (res.headers.get('content-range') || '').split('/')[1];
      if (total && total !== '*') return Number(total);
      const all = await req(`/rest/v1/${table}?select=id&limit=1000&${query}`); // header not exposed: count the rows instead
      return all.length;
    },
    insert: (table, row) => req(`/rest/v1/${table}`, { method: 'POST', body: row, extra: { Prefer: 'return=representation' } }),
    update: (table, match, patch) => req(`/rest/v1/${table}?${match}`, { method: 'PATCH', body: patch, extra: { Prefer: 'return=representation' } }),
    remove: (table, match) => req(`/rest/v1/${table}?${match}`, { method: 'DELETE' }),
    rpc: (fn, args) => req(`/rest/v1/rpc/${fn}`, { method: 'POST', body: args }),
    async upload(bucket, path, blob) {
      await req(`/storage/v1/object/${bucket}/${path}`, { method: 'POST', body: blob, raw: true, extra: { 'Content-Type': blob.type || 'image/jpeg', 'x-upsert': 'true' } });
      return `${cfg.url}/storage/v1/object/public/${bucket}/${path}`;
    },
  };
  api.attach = impl => Object.defineProperties(api, Object.getOwnPropertyDescriptors(impl));
  return api;
})();
