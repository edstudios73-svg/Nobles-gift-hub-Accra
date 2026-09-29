/* TheNobles admin. Talks to Supabase through /sb.js. Every table is protected by row level security. */
(() => {
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = n => n === null || n === undefined || n === '' ? '' : 'GH₵ ' + Number(n).toLocaleString('en-GH', { maximumFractionDigits: 2 });
const SITE = location.origin;
const WHATSAPP_NUMBER = '233551586167';

const I = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 11 12 4l8 7v9H4z"/></svg>',
  orders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="1"/><path d="M3 12h18M12 8v12M12 8c-2-4-6-3-5 0M12 8c2-4 6-3 5 0"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 16.800 6.600 19.800l1.100-6.100L3.200 9.400l6.100-.8z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
  cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100"/></svg>',
  out: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4H5v16h4M16 8l4 4-4 4M20 12H9"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4 10 14M18 14v6H4V6h6"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.500-3.500"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.600-4.700A8.500 8.500 0 1 1 8 19.500L3 21z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
  cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.500"/></svg>',
};

const STATUS = {
  new: 'New', confirmed: 'Confirmed', in_progress: 'In progress', ready: 'Ready', delivered: 'Delivered', cancelled: 'Cancelled',
};
const NAV = [
  ['dashboard', 'Home', I.home],
  ['orders', 'Orders', I.orders],
  ['products', 'Products', I.box],
  ['reviews', 'Reviews', I.star],
  ['messages', 'Messages', I.mail],
  ['categories', 'Categories', I.grid],
  ['settings', 'Settings', I.cog],
];
const TAB_KEYS = ['dashboard', 'orders', 'products', 'reviews', 'more'];

/* ---------- helpers ---------- */
const stars = n => '★'.repeat(n) + '<i>' + '★'.repeat(5 - n) + '</i>';
const initials = n => (n || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const ago = d => {
  const s = (Date.now() - new Date(d)) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  if (s < 604800) return Math.floor(s / 86400) + 'd ago';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};
const fullDate = d => new Date(d).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
const waNumber = p => { let d = String(p || '').replace(/\D/g, ''); if (d.startsWith('0')) d = '233' + d.slice(1); return d; };
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'item';
const imgUrl = p => !p ? '' : /^(https?:)?\/\//.test(p) ? p : '/' + p.replace(/^\//, '');
const summary = items => (items || []).map(i => `${i.qty}× ${i.name}`).join(', ');

let toastT;
function toast(m, bad) { const t = $('#toast'); t.textContent = m; t.classList.toggle('bad', !!bad); t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2400); }

function sheet(title, body, footer = '') {
  closeSheet();
  const el = document.createElement('div');
  el.className = 'veil'; el.id = 'veil';
  el.innerHTML = `<div class="sheet" role="dialog" aria-modal="true"><div class="sheet-h"><h2>${title}</h2><button class="iconbtn" data-act="close" aria-label="Close">${I.x}</button></div><div class="sheet-b">${body}</div>${footer ? `<div class="sheet-f">${footer}</div>` : ''}</div>`;
  el.addEventListener('mousedown', e => { if (e.target === el) closeSheet(); });
  document.body.appendChild(el); document.body.style.overflow = 'hidden';
  return el;
}
function closeSheet() { const v = $('#veil'); if (v) v.remove(); document.body.style.overflow = ''; }
function confirmBox(title, text, okLabel = 'Delete') {
  return new Promise(res => {
    const el = sheet(title, `<p class="quote">${esc(text)}</p>`, `<button class="btn ghost grow" data-c="0">Cancel</button><button class="btn danger grow" data-c="1">${okLabel}</button>`);
    el.addEventListener('click', e => { const b = e.target.closest('[data-c]'); if (b) { closeSheet(); res(b.dataset.c === '1'); } });
    el.querySelector('[data-act=close]').addEventListener('click', () => res(false));
  });
}

async function run(btn, fn, okMsg) {
  const label = btn && btn.innerHTML;
  if (btn) { btn.disabled = true; btn.textContent = 'Saving…'; }
  try { const r = await fn(); if (okMsg) toast(okMsg); return r; }
  catch (e) { toast(e.message || 'Something went wrong', true); return null; }
  finally { if (btn) { btn.disabled = false; btn.innerHTML = label; } }
}

/* ---------- state ---------- */
const S = { user: null, badges: { orders: 0, reviews: 0, messages: 0 }, cats: [], filters: { orders: 'all', reviews: 'pending', ordersQ: '', productsQ: '', productsCat: '' } };
const app = $('#app');

/* ---------- boot + auth ---------- */
async function boot() {
  if (!window.NOBLES_CONFIG || !NOBLES_CONFIG.url) { app.innerHTML = loginHtml('The backend is not connected yet.'); return; }
  const sess = await SB.restore();
  if (sess && await verifyAdmin()) return startShell();
  app.innerHTML = loginHtml();
  bindLogin();
}
async function verifyAdmin() {
  try { const r = await SB.select('admins', 'select=user_id'); if (r.length) { S.user = SB.session.user; return true; } } catch (e) {}
  return false;
}
function loginHtml(msg = '') {
  return `<div class="login"><div class="login-card">
    <img class="logo" src="/img/logo.jpg" alt="TheNobles">
    <p class="eyebrow">Admin</p>
    <h1 class="gold">TheNobles</h1>
    <p>gift &amp; surprise hub, sign in to manage your shop.</p>
    <form id="loginForm" autocomplete="on">
      <label class="field">Email<input name="email" type="email" autocomplete="username" required placeholder="you@example.com"></label>
      <label class="field">Password<input name="password" type="password" autocomplete="current-password" required placeholder="Your password"></label>
      <p class="err" id="loginErr" ${msg ? '' : 'hidden'}>${esc(msg)}</p>
      <button class="btn gold wide" type="submit">Sign in</button>
    </form></div></div>`;
}
function bindLogin() {
  $('#loginForm').addEventListener('submit', async e => {
    e.preventDefault();
    const f = new FormData(e.target), err = $('#loginErr'), btn = e.submitter;
    err.hidden = true; btn.disabled = true; btn.textContent = 'Signing in…';
    try {
      await SB.signIn(String(f.get('email')).trim().toLowerCase(), f.get('password'));
      if (!(await verifyAdmin())) { await SB.signOut(); throw new Error('This account does not have admin access.'); }
      startShell();
    } catch (x) {
      err.textContent = /invalid/i.test(x.message) ? 'Wrong email or password.' : x.message; err.hidden = false;
      btn.disabled = false; btn.textContent = 'Sign in';
    }
  });
}
async function logout() { await SB.signOut(); S.user = null; app.innerHTML = loginHtml(); bindLogin(); }

/* ---------- shell + router ---------- */
function startShell() {
  const nav = NAV.map(([k, l, ic]) => `<a href="#/${k}" data-k="${k}">${ic}<span>${l}</span>${['orders', 'reviews', 'messages'].includes(k) ? `<i class="dotb" data-badge="${k}" hidden></i>` : ''}</a>`).join('');
  const tabs = TAB_KEYS.map(k => {
    const n = { dashboard: ['Home', I.home], orders: ['Orders', I.orders], products: ['Products', I.box], reviews: ['Reviews', I.star], more: ['More', I.more] }[k];
    const badge = ['orders', 'reviews'].includes(k) ? `<i class="dotb" data-badge="${k}" hidden></i>` : k === 'more' ? '<i class="dotb" data-badge="messages" hidden></i>' : '';
    return k === 'more' ? `<button data-act="more" data-k="more">${n[1]}<span>${n[0]}</span>${badge}</button>` : `<a href="#/${k}" data-k="${k}">${n[1]}<span>${n[0]}</span>${badge}</a>`;
  }).join('');
  app.innerHTML = `<div class="shell">
    <aside class="side"><div class="brand"><img src="/img/logo.jpg" alt=""><div><b>TheNobles</b><small>Admin</small></div></div>${nav}
      <span class="sp"></span><a href="${SITE}/" target="_blank" rel="noopener">${I.ext}<span>View website</span></a><button data-act="logout">${I.out}<span>Sign out</span></button></aside>
    <div>
      <header class="topbar"><img class="logo" src="/img/logo.jpg" alt=""><div class="ttl"><small>Admin</small><b id="ttl">Home</b></div>
        <a class="iconbtn" href="${SITE}/" target="_blank" rel="noopener" aria-label="View website">${I.ext}</a></header>
      <main class="main" id="view"></main>
    </div>
    <nav class="tabs" aria-label="Sections">${tabs}</nav></div>`;
  loadCats();
  refreshBadges();
  clearInterval(S.poll); S.poll = setInterval(refreshBadges, 60000);
  window.removeEventListener('hashchange', route); window.addEventListener('hashchange', route);
  if (!location.hash) location.hash = '#/dashboard'; else route();
}
async function loadCats() { try { S.cats = await SB.select('categories', 'select=*&order=sort.asc'); } catch (e) {} }
async function refreshBadges() {
  try {
    const [o, r, m] = await Promise.all([SB.count('orders', 'status=eq.new'), SB.count('reviews', 'status=eq.pending'), SB.count('messages', 'read=eq.false')]);
    S.badges = { orders: o, reviews: r, messages: m };
    $$('[data-badge]').forEach(b => { const n = S.badges[b.dataset.badge]; b.textContent = n > 99 ? '99+' : n; b.hidden = !n; });
    document.title = (o + r + m ? `(${o + r + m}) ` : '') + 'TheNobles Admin';
  } catch (e) {}
}
const VIEWS = {};
async function route() {
  const key = (location.hash.replace('#/', '') || 'dashboard').split('?')[0];
  const k = VIEWS[key] ? key : 'dashboard';
  const nav = NAV.find(n => n[0] === k);
  $('#ttl').textContent = nav ? nav[1] === 'Home' ? 'Home' : nav[1] : 'Home';
  $$('[data-k]').forEach(a => a.classList.toggle('on', a.dataset.k === k || (a.dataset.k === 'more' && ['messages', 'categories', 'settings'].includes(k))));
  window.scrollTo(0, 0);
  const v = $('#view');
  v.innerHTML = '<div class="sk"></div><div class="sk"></div><div class="sk"></div>';
  try { await VIEWS[k](v); } catch (e) {
    v.innerHTML = `<div class="empty"><b>Could not load</b>${esc(e.message)}<br><br><button class="btn ghost" data-act="reload">Try again</button></div>`;
  }
}

/* ---------- dashboard ---------- */
VIEWS.dashboard = async v => {
  const [orders, prodCount] = await Promise.all([
    SB.select('orders', 'select=id,ref,customer_name,status,total,paid,items,created_at&order=created_at.desc&limit=300'),
    SB.count('products', 'active=eq.true'),
  ]);
  await refreshBadges();
  const now = new Date(), day0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const week = orders.filter(o => new Date(o.created_at) >= new Date(day0 - 6 * 864e5));
  const pipeline = orders.filter(o => ['new', 'confirmed', 'in_progress', 'ready'].includes(o.status)).reduce((s, o) => s + Number(o.total || 0), 0);
  const revenue = orders.filter(o => o.status === 'delivered').reduce((s, o) => s + Number(o.total || 0), 0);
  const days = [...Array(7)].map((_, i) => { const d = new Date(day0 - (6 - i) * 864e5); return { d, n: orders.filter(o => new Date(o.created_at) >= d && new Date(o.created_at) < new Date(+d + 864e5)).length }; });
  const max = Math.max(1, ...days.map(x => x.n));
  const hr = now.getHours();
  const greet = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
  v.innerHTML = `
    <div class="page-h"><div><p class="eyebrow">${now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p><h1>${greet}, <span class="gold">Rashida</span></h1></div></div>
    ${localStorage.getItem('nobles-pw-changed') ? '' : `<div class="banner"><span>For your security, change your password.</span><button data-go="settings">Change now</button></div>`}
    <div class="kpis">
      <div class="kpi ${S.badges.orders ? 'hot' : ''}"><small>New orders</small><b>${S.badges.orders}</b><span>waiting for you</span></div>
      <div class="kpi"><small>Orders this week</small><b>${week.length}</b><span>last 7 days</span></div>
      <div class="kpi"><small>In progress value</small><b>${money(pipeline) || 'GH₵ 0'}</b><span>open orders</span></div>
      <div class="kpi"><small>Delivered revenue</small><b>${money(revenue) || 'GH₵ 0'}</b><span>all time</span></div>
    </div>
    <div class="kpis">
      <div class="kpi"><small>Live products</small><b>${prodCount}</b><span>on the website</span></div>
      <div class="kpi ${S.badges.reviews ? 'hot' : ''}"><small>Reviews to approve</small><b>${S.badges.reviews}</b><span>pending</span></div>
      <div class="kpi ${S.badges.messages ? 'hot' : ''}"><small>Unread messages</small><b>${S.badges.messages}</b><span>from the website</span></div>
      <div class="kpi"><small>All orders</small><b>${orders.length}</b><span>recorded</span></div>
    </div>
    <div class="grid2">
      <div class="card"><h3>Recent orders</h3><div class="list">${orders.slice(0, 5).map(orderRow).join('') || '<div class="empty"><b>No orders yet</b>Orders from the website will appear here.</div>'}</div>
        ${orders.length > 5 ? '<p style="margin-top:14px"><a class="btn ghost sm" href="#/orders">See all orders</a></p>' : ''}</div>
      <div style="display:grid;gap:16px;align-content:start">
        <div class="card"><h3>Orders, last 7 days</h3><div class="chart">${days.map(x => `<div><em>${x.n}</em><i class="${x.n ? '' : 'z'}" style="height:${Math.max(3, x.n / max * 78)}%"></i><span>${x.d.toLocaleDateString('en-GB', { weekday: 'short' })}</span></div>`).join('')}</div></div>
        <div class="card"><h3>Quick actions</h3><div class="row"><button class="btn gold sm" data-act="new-product">${I.plus} Add product</button><a class="btn ghost sm" href="#/reviews">Reviews</a><a class="btn ghost sm" href="#/messages">Messages</a></div></div>
      </div>
    </div>`;
};

function orderRow(o) {
  return `<button class="item" data-order="${o.id}"><span class="avatar">${esc(initials(o.customer_name))}</span>
    <span class="meta"><b>${esc(o.customer_name)}</b><small>${esc(o.ref)} · ${esc(summary(o.items) || 'No items')}</small></span>
    <span class="right"><span class="pill s-${o.status}">${STATUS[o.status]}</span><small>${o.total ? `<span class="amt">${money(o.total)}</span>` : ago(o.created_at)}</small></span></button>`;
}

/* ---------- orders ---------- */
let ORDERS = [];
VIEWS.orders = async v => {
  ORDERS = await SB.select('orders', 'select=*&order=created_at.desc&limit=500');
  await refreshBadges();
  drawOrders(v);
};
function drawOrders(v = $('#view')) {
  const f = S.filters, q = f.ordersQ.trim().toLowerCase();
  const count = s => s === 'all' ? ORDERS.length : ORDERS.filter(o => o.status === s).length;
  const list = ORDERS.filter(o => (f.orders === 'all' || o.status === f.orders) && (!q || `${o.ref} ${o.customer_name} ${o.phone} ${summary(o.items)}`.toLowerCase().includes(q)));
  v.innerHTML = `<div class="page-h"><div><h1>Orders</h1><p>${ORDERS.length} total</p></div></div>
    <div class="search">${I.search}<input id="oq" type="search" placeholder="Search name, phone or order number" value="${esc(f.ordersQ)}"></div>
    <div class="chips">${['all', ...Object.keys(STATUS)].map(s => `<button class="chip ${f.orders === s ? 'on' : ''}" data-ofilter="${s}">${s === 'all' ? 'All' : STATUS[s]}<b>${count(s)}</b></button>`).join('')}</div>
    <div class="list">${list.map(orderRow).join('') || '<div class="empty"><b>Nothing here</b>No orders match.</div>'}</div>`;
  const inp = $('#oq'); inp.addEventListener('input', e => { f.ordersQ = e.target.value; const pos = e.target.selectionStart; drawOrders(); const n = $('#oq'); n.focus(); n.setSelectionRange(pos, pos); });
}
function openOrder(id) {
  const o = ORDERS.find(x => x.id === id) || null;
  const load = o ? Promise.resolve(o) : SB.select('orders', `select=*&id=eq.${id}`).then(r => r[0]);
  load.then(o => {
    if (!o) return toast('Order not found', true);
    let status = o.status;
    const body = `
      <div class="row" style="align-items:center"><span class="pill s-${o.status}" id="oPill">${STATUS[o.status]}</span><small style="color:var(--mute)">${esc(o.ref)} · ${fullDate(o.created_at)}</small></div>
      <div class="card" style="padding:14px"><dl class="kv">
        <dt>Customer</dt><dd><b>${esc(o.customer_name)}</b></dd>
        <dt>Phone</dt><dd>${esc(o.phone)}</dd>
        <dt>Fulfilment</dt><dd>${esc(o.fulfilment)}${o.address ? ' · ' + esc(o.address) : ''}</dd>
        ${o.event_date ? `<dt>Needed on</dt><dd>${new Date(o.event_date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}${o.event_time ? ' at ' + esc(o.event_time) : ''}</dd>` : ''}
        ${o.is_gift ? `<dt>Gift for</dt><dd>${esc(o.recipient_name || 'Recipient')}</dd>` : ''}
        ${o.card_message ? `<dt>Card</dt><dd>${esc(o.card_message)}</dd>` : ''}
        ${o.notes ? `<dt>Notes</dt><dd>${esc(o.notes)}</dd>` : ''}
      </dl></div>
      <div><p class="eyebrow" style="margin-bottom:8px">Items</p><div class="lines">${(o.items || []).map(i => `<div class="ln"><span>${esc(i.name)}${i.note ? `<small>“${esc(i.note)}”</small>` : ''}</span><b>×${i.qty}</b></div>`).join('') || '<p class="quote">No items recorded.</p>'}</div></div>
      <div><p class="eyebrow" style="margin-bottom:8px">Status</p><div class="seg" id="oSeg">${Object.keys(STATUS).map(s => `<button type="button" data-s="${s}" class="${s === status ? 'on' : ''}">${STATUS[s]}</button>`).join('')}</div></div>
      <label class="field">Total (GH₵)<input id="oTotal" type="number" inputmode="decimal" min="0" step="0.01" value="${o.total ?? ''}" placeholder="Agreed price"></label>
      <div class="sw"><div>Paid<small>Mark when payment is received</small></div><label class="tg"><input type="checkbox" id="oPaid" ${o.paid ? 'checked' : ''}><i></i></label></div>
      <label class="field">Private notes<textarea id="oNotes" placeholder="Only you can see this">${esc(o.admin_notes || '')}</textarea></label>
      <div class="row"><a class="btn wa sm grow" target="_blank" rel="noopener" href="https://wa.me/${waNumber(o.phone)}?text=${encodeURIComponent(`Hello ${o.customer_name}, this is TheNobles about your order ${o.ref}.`)}">${I.wa} WhatsApp</a><a class="btn ghost sm grow" href="tel:${esc(o.phone)}">${I.phone} Call</a></div>`;
    const el = sheet(`Order ${esc(o.ref)}`, body, `<button class="btn danger" data-del>Delete</button><button class="btn gold grow" data-save>Save changes</button>`);
    el.querySelector('#oSeg').addEventListener('click', e => { const b = e.target.closest('[data-s]'); if (!b) return; status = b.dataset.s; $$('#oSeg button', el).forEach(x => x.classList.toggle('on', x === b)); });
    el.querySelector('[data-save]').addEventListener('click', ev => run(ev.currentTarget, async () => {
      const t = $('#oTotal', el).value;
      const [row] = await SB.update('orders', `id=eq.${o.id}`, { status, total: t === '' ? null : Number(t), paid: $('#oPaid', el).checked, admin_notes: $('#oNotes', el).value.trim() || null });
      Object.assign(ORDERS.find(x => x.id === o.id) || {}, row);
      closeSheet(); refreshBadges(); route();
    }, 'Order updated'));
    el.querySelector('[data-del]').addEventListener('click', async () => {
      if (!(await confirmBox('Delete order?', `Order ${o.ref} from ${o.customer_name} will be removed for good.`))) return;
      await run(null, async () => { await SB.remove('orders', `id=eq.${o.id}`); ORDERS = ORDERS.filter(x => x.id !== o.id); refreshBadges(); route(); }, 'Order deleted');
    });
  });
}

/* ---------- products ---------- */
let PRODUCTS = [];
VIEWS.products = async v => {
  [PRODUCTS] = await Promise.all([SB.select('products', 'select=*&order=sort.asc,created_at.desc'), loadCats()]);
  drawProducts(v);
};
function drawProducts(v = $('#view')) {
  const f = S.filters, q = f.productsQ.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (!f.productsCat || p.category_id === f.productsCat) && (!q || `${p.name} ${p.description}`.toLowerCase().includes(q)));
  const cn = id => (S.cats.find(c => c.id === id) || {}).name || 'Uncategorised';
  v.innerHTML = `<div class="page-h"><div><h1>Products</h1><p>${PRODUCTS.filter(p => p.active).length} live · ${PRODUCTS.length} total</p></div><button class="btn gold sm" data-act="new-product">${I.plus} Add</button></div>
    <div class="toolbar"><div class="search" style="margin:0">${I.search}<input id="pq" type="search" placeholder="Search products" value="${esc(f.productsQ)}"></div>
      <label class="field"><select id="pcat"><option value="">All categories</option>${S.cats.map(c => `<option value="${esc(c.id)}" ${f.productsCat === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label></div>
    <div class="pgrid" style="margin-top:12px">${list.map(p => `<button class="pc ${p.active ? '' : 'hid'}" data-product="${p.id}">
      <img src="${esc(imgUrl(p.image))}" alt="" loading="lazy">${p.active ? '' : '<span class="pill s-hidden off">Hidden</span>'}${p.featured ? `<span class="star">${I.star}</span>` : ''}
      <span class="pb"><b>${esc(p.name)}</b><small>${esc(cn(p.category_id))}</small><span class="pr" style="display:block">${p.price ? money(p.price) : '<span style="color:var(--dim);font-weight:600">No price</span>'}</span></span></button>`).join('') || '<div class="empty" style="grid-column:1/-1"><b>No products</b>Tap Add to create one.</div>'}</div>
    <button class="fab" data-act="new-product" aria-label="Add product">${I.plus} Add product</button>`;
  $('#pq').addEventListener('input', e => { f.productsQ = e.target.value; const pos = e.target.selectionStart; drawProducts(); const n = $('#pq'); n.focus(); n.setSelectionRange(pos, pos); });
  $('#pcat').addEventListener('change', e => { f.productsCat = e.target.value; drawProducts(); });
}
function resizeImage(file, max = 1200) {
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(b => { URL.revokeObjectURL(url); b ? res(b) : rej(new Error('Could not process image')); }, 'image/jpeg', 0.82);
    };
    img.onerror = () => rej(new Error('That file is not a valid image'));
    img.src = url;
  });
}
function openProduct(id) {
  const p = id ? PRODUCTS.find(x => x.id === id) : null;
  let newBlob = null;
  const body = `
    <div class="upload"><div id="prevBox">${p && p.image ? `<img id="prev" src="${esc(imgUrl(p.image))}" alt="">` : `<div class="ph">${I.cam}</div>`}</div>
      <div><label class="btn ghost sm" for="pfile">${I.cam} ${p ? 'Change photo' : 'Add photo'}</label><input id="pfile" type="file" accept="image/*"><p class="quote" style="margin:8px 0 0">JPG or PNG. It is resized automatically.</p></div></div>
    <label class="field">Name<input id="pName" required maxlength="120" value="${esc(p ? p.name : '')}" placeholder="e.g. Signature Red Rose Bouquet"></label>
    <div class="row"><label class="field grow">Category<select id="pCat">${S.cats.map(c => `<option value="${esc(c.id)}" ${p && p.category_id === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label>
      <label class="field grow">Price (GH₵)<input id="pPrice" type="number" inputmode="decimal" min="0" step="0.01" value="${p && p.price ? p.price : ''}" placeholder="Optional"></label></div>
    <label class="field">Description<textarea id="pDesc" maxlength="400" placeholder="What is included?">${esc(p ? p.description : '')}</textarea></label>
    <div class="sw"><div>Show on website<small>Turn off to hide it without deleting</small></div><label class="tg"><input type="checkbox" id="pActive" ${!p || p.active ? 'checked' : ''}><i></i></label></div>
    <div class="sw"><div>Featured<small>Appears in Popular right now on the home page</small></div><label class="tg"><input type="checkbox" id="pFeat" ${p && p.featured ? 'checked' : ''}><i></i></label></div>`;
  const el = sheet(p ? 'Edit product' : 'New product', body, `${p ? '<button class="btn danger" data-del>Delete</button>' : ''}<button class="btn gold grow" data-save>${p ? 'Save changes' : 'Add product'}</button>`);
  $('#pfile', el).addEventListener('change', async e => {
    const file = e.target.files[0]; if (!file) return;
    try { newBlob = await resizeImage(file); $('#prevBox', el).innerHTML = `<img id="prev" src="${URL.createObjectURL(newBlob)}" alt="">`; } catch (x) { toast(x.message, true); }
  });
  $('[data-save]', el).addEventListener('click', ev => run(ev.currentTarget, async () => {
    const name = $('#pName', el).value.trim();
    if (!name) throw new Error('Please enter a name');
    if (!p && !newBlob) throw new Error('Please add a photo');
    const slug = p ? p.slug : `${slugify(name)}-${Math.random().toString(36).slice(2, 6)}`;
    let image = p ? p.image : '';
    if (newBlob) image = await SB.upload('product-images', `${slug}-${Date.now()}.jpg`, newBlob);
    const price = $('#pPrice', el).value;
    const row = { name, description: $('#pDesc', el).value.trim(), category_id: $('#pCat', el).value || null, price: price === '' ? null : Number(price), image, active: $('#pActive', el).checked, featured: $('#pFeat', el).checked };
    if (p) await SB.update('products', `id=eq.${p.id}`, row);
    else await SB.insert('products', { ...row, slug, sort: Math.min(0, ...PRODUCTS.map(x => x.sort)) - 1 });
    closeSheet(); route();
  }, p ? 'Product saved' : 'Product added'));
  const del = $('[data-del]', el);
  if (del) del.addEventListener('click', async () => {
    if (!(await confirmBox('Delete product?', `${p.name} will be removed from the website.`))) return;
    await run(null, async () => { await SB.remove('products', `id=eq.${p.id}`); route(); }, 'Product deleted');
  });
}

/* ---------- reviews ---------- */
let REVIEWS = [];
VIEWS.reviews = async v => { REVIEWS = await SB.select('reviews', 'select=*&order=created_at.desc&limit=300'); await refreshBadges(); drawReviews(v); };
function drawReviews(v = $('#view')) {
  const f = S.filters, tabs = ['pending', 'approved', 'hidden'];
  const list = REVIEWS.filter(r => r.status === f.reviews);
  const avg = REVIEWS.filter(r => r.status === 'approved');
  v.innerHTML = `<div class="page-h"><div><h1>Reviews</h1><p>${avg.length ? `${(avg.reduce((s, r) => s + r.rating, 0) / avg.length).toFixed(1)} average from ${avg.length} approved` : 'Approve reviews to show them on the website'}</p></div><button class="btn gold sm" data-act="new-review">${I.plus} Add</button></div>
    <div class="chips">${tabs.map(t => `<button class="chip ${f.reviews === t ? 'on' : ''}" data-rfilter="${t}">${t[0].toUpperCase() + t.slice(1)}<b>${REVIEWS.filter(r => r.status === t).length}</b></button>`).join('')}</div>
    <div class="list">${list.map(r => `<div class="rv"><div class="rv-h"><div><b>${esc(r.name)}</b> <small style="color:var(--dim)">· ${ago(r.created_at)}</small></div><span class="stars">${stars(r.rating)}</span></div>
      <p class="quote">${esc(r.comment)}</p>
      <div class="row">${r.status !== 'approved' ? `<button class="btn gold sm" data-rv="approved" data-id="${r.id}">Approve</button>` : ''}${r.status !== 'hidden' ? `<button class="btn ghost sm" data-rv="hidden" data-id="${r.id}">Hide</button>` : ''}<button class="btn danger sm" data-rvdel="${r.id}">Delete</button></div></div>`).join('') || `<div class="empty"><b>Nothing ${f.reviews}</b>Customer reviews will show up here.</div>`}</div>`;
}
function openReview() {
  const el = sheet('Add a testimonial', `<label class="field">Customer name<input id="rName" maxlength="80"></label>
    <label class="field">Rating<select id="rRate">${[5, 4, 3, 2, 1].map(n => `<option value="${n}">${n} star${n > 1 ? 's' : ''}</option>`).join('')}</select></label>
    <label class="field">Review<textarea id="rText" maxlength="800"></textarea></label>`, '<button class="btn gold grow" data-save>Add and approve</button>');
  $('[data-save]', el).addEventListener('click', ev => run(ev.currentTarget, async () => {
    const name = $('#rName', el).value.trim(), comment = $('#rText', el).value.trim();
    if (!name || !comment) throw new Error('Name and review are required');
    await SB.insert('reviews', { name, comment, rating: Number($('#rRate', el).value), status: 'approved' });
    closeSheet(); route();
  }, 'Review added'));
}

/* ---------- messages ---------- */
let MESSAGES = [];
VIEWS.messages = async v => { MESSAGES = await SB.select('messages', 'select=*&order=created_at.desc&limit=200'); await refreshBadges(); drawMessages(v); };
function drawMessages(v = $('#view')) {
  v.innerHTML = `<div class="page-h"><div><h1>Messages</h1><p>${MESSAGES.filter(m => !m.read).length} unread</p></div></div>
    <div class="list">${MESSAGES.map(m => `<button class="item" data-msg="${m.id}">${m.read ? '' : '<span class="unread"></span>'}<span class="avatar">${esc(initials(m.name))}</span>
      <span class="meta"><b>${esc(m.name)}</b><small>${esc(m.message)}</small></span><span class="right"><small>${ago(m.created_at)}</small></span></button>`).join('') || '<div class="empty"><b>No messages</b>Messages sent from the Contact page appear here.</div>'}</div>`;
}
function openMessage(id) {
  const m = MESSAGES.find(x => x.id === id); if (!m) return;
  const el = sheet(esc(m.name), `<small style="color:var(--mute)">${fullDate(m.created_at)}${m.phone ? ' · ' + esc(m.phone) : ''}</small><p style="white-space:pre-wrap;overflow-wrap:anywhere">${esc(m.message)}</p>
    ${m.phone ? `<div class="row"><a class="btn wa sm grow" target="_blank" rel="noopener" href="https://wa.me/${waNumber(m.phone)}?text=${encodeURIComponent(`Hello ${m.name}, this is TheNobles replying to your message.`)}">${I.wa} Reply on WhatsApp</a><a class="btn ghost sm grow" href="tel:${esc(m.phone)}">${I.phone} Call</a></div>` : '<p class="quote">No phone number was left.</p>'}`,
    '<button class="btn danger" data-del>Delete</button><button class="btn ghost grow" data-act="close">Close</button>');
  if (!m.read) { m.read = true; SB.update('messages', `id=eq.${m.id}`, { read: true }).then(refreshBadges).catch(() => {}); drawMessages(); }
  $('[data-del]', el).addEventListener('click', async () => {
    if (!(await confirmBox('Delete message?', 'This cannot be undone.'))) return;
    await run(null, async () => { await SB.remove('messages', `id=eq.${m.id}`); route(); }, 'Message deleted');
  });
}

/* ---------- categories ---------- */
VIEWS.categories = async v => {
  const [cats, prods] = await Promise.all([SB.select('categories', 'select=*&order=sort.asc'), SB.select('products', 'select=category_id')]);
  S.cats = cats;
  v.innerHTML = `<div class="page-h"><div><h1>Categories</h1><p>Groups shown on the website</p></div><button class="btn gold sm" data-act="new-cat">${I.plus} Add</button></div>
    <div class="list">${cats.map(c => `<button class="item" data-cat="${esc(c.id)}"><img src="${esc(imgUrl(c.image))}" alt="" style="width:52px;height:52px;border-radius:14px;object-fit:cover;background:var(--s3)"><span class="meta"><b>${esc(c.name)}</b><small>${prods.filter(p => p.category_id === c.id).length} products · ${esc(c.blurb)}</small></span></button>`).join('')}</div>`;
};
function openCategory(id) {
  const c = id ? S.cats.find(x => x.id === id) : null;
  let blob = null;
  const el = sheet(c ? 'Edit category' : 'New category', `
    <div class="upload"><div id="prevBox">${c && c.image ? `<img src="${esc(imgUrl(c.image))}" alt="">` : `<div class="ph">${I.cam}</div>`}</div>
      <div><label class="btn ghost sm" for="cfile">${I.cam} Cover photo</label><input id="cfile" type="file" accept="image/*"></div></div>
    <label class="field">Name<input id="cName" maxlength="60" value="${esc(c ? c.name : '')}"></label>
    <label class="field">Short description<input id="cBlurb" maxlength="120" value="${esc(c ? c.blurb : '')}"></label>
    <label class="field">Order on website<input id="cSort" type="number" value="${c ? c.sort : S.cats.length}"></label>`,
    `${c ? '<button class="btn danger" data-del>Delete</button>' : ''}<button class="btn gold grow" data-save>Save</button>`);
  $('#cfile', el).addEventListener('change', async e => { const f = e.target.files[0]; if (!f) return; try { blob = await resizeImage(f, 800); $('#prevBox', el).innerHTML = `<img src="${URL.createObjectURL(blob)}" alt="">`; } catch (x) { toast(x.message, true); } });
  $('[data-save]', el).addEventListener('click', ev => run(ev.currentTarget, async () => {
    const name = $('#cName', el).value.trim(); if (!name) throw new Error('Please enter a name');
    let image = c ? c.image : '';
    const key = c ? c.id : slugify(name);
    if (blob) image = await SB.upload('product-images', `cat-${key}-${Date.now()}.jpg`, blob);
    const row = { name, blurb: $('#cBlurb', el).value.trim(), image, sort: Number($('#cSort', el).value) || 0 };
    if (c) await SB.update('categories', `id=eq.${encodeURIComponent(c.id)}`, row); else await SB.insert('categories', { id: key, ...row });
    closeSheet(); route();
  }, 'Category saved'));
  const del = $('[data-del]', el);
  if (del) del.addEventListener('click', async () => {
    if (!(await confirmBox('Delete category?', 'Products in it stay on the website but lose their category.'))) return;
    await run(null, async () => { await SB.remove('categories', `id=eq.${encodeURIComponent(c.id)}`); route(); }, 'Category deleted');
  });
}

/* ---------- settings ---------- */
VIEWS.settings = async v => {
  v.innerHTML = `<div class="page-h"><div><h1>Settings</h1><p>Your account and website</p></div></div>
    <div class="grid2"><div class="card"><h3>Account</h3><p class="quote">Signed in as <b style="color:var(--ink)">${esc(S.user && S.user.email)}</b></p>
      <form id="pwForm" style="display:grid;gap:12px" autocomplete="off">
        <label class="field">New password<input name="pw" type="password" minlength="8" autocomplete="new-password" required placeholder="At least 8 characters"></label>
        <label class="field">Confirm new password<input name="pw2" type="password" minlength="8" autocomplete="new-password" required></label>
        <p class="err" id="pwErr" hidden></p><button class="btn gold" type="submit">Change password</button></form></div>
      <div style="display:grid;gap:16px;align-content:start"><div class="card"><h3>Your website</h3><div class="row"><a class="btn ghost sm" href="${SITE}/" target="_blank" rel="noopener">${I.ext} Open website</a><a class="btn ghost sm" href="${SITE}/prices.html" target="_blank" rel="noopener">Price list</a></div>
        <p class="quote" style="margin-top:12px">Products, categories, reviews and orders here update the website straight away.</p></div>
        <div class="card"><h3>Session</h3><button class="btn danger" data-act="logout">${I.out} Sign out</button></div></div></div>`;
  $('#pwForm').addEventListener('submit', async e => {
    e.preventDefault(); const f = new FormData(e.target), err = $('#pwErr');
    if (f.get('pw') !== f.get('pw2')) { err.textContent = 'Passwords do not match.'; err.hidden = false; return; }
    err.hidden = true;
    const ok = await run(e.submitter, () => SB.updatePassword(f.get('pw')), 'Password changed');
    if (ok !== null) { localStorage.setItem('nobles-pw-changed', '1'); e.target.reset(); }
  });
};

/* ---------- global events ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  const g = (sel) => t.closest(sel);
  let x;
  if ((x = g('[data-order]'))) return openOrder(x.dataset.order);
  if ((x = g('[data-product]'))) return openProduct(x.dataset.product);
  if ((x = g('[data-msg]'))) return openMessage(x.dataset.msg);
  if ((x = g('[data-cat]'))) return openCategory(x.dataset.cat);
  if ((x = g('[data-ofilter]'))) { S.filters.orders = x.dataset.ofilter; return drawOrders(); }
  if ((x = g('[data-rfilter]'))) { S.filters.reviews = x.dataset.rfilter; return drawReviews(); }
  if ((x = g('[data-go]'))) { location.hash = '#/' + x.dataset.go; return; }
  if ((x = g('[data-rv]'))) return run(x, async () => { await SB.update('reviews', `id=eq.${x.dataset.id}`, { status: x.dataset.rv }); route(); }, x.dataset.rv === 'approved' ? 'Review approved' : 'Review hidden');
  if ((x = g('[data-rvdel]'))) return confirmBox('Delete review?', 'This cannot be undone.').then(ok => ok && run(null, async () => { await SB.remove('reviews', `id=eq.${x.dataset.rvdel}`); route(); }, 'Review deleted'));
  if ((x = g('[data-act]'))) {
    switch (x.dataset.act) {
      case 'close': return closeSheet();
      case 'logout': return logout();
      case 'reload': return route();
      case 'new-product': return openProduct(null);
      case 'new-review': return openReview();
      case 'new-cat': return openCategory(null);
      case 'more': return openMore();
    }
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });

function openMore() {
  const el = sheet('More', `<div class="more-grid">
    <a href="#/messages">${I.mail} Messages<i class="dotb" ${S.badges.messages ? '' : 'hidden'}>${S.badges.messages}</i></a>
    <a href="#/categories">${I.grid} Categories</a>
    <a href="#/settings">${I.cog} Settings</a>
    <a href="${SITE}/" target="_blank" rel="noopener">${I.ext} View website</a>
    <button data-act="logout">${I.out} Sign out</button></div>`);
  el.addEventListener('click', e => { if (e.target.closest('a[href^="#/"]')) closeSheet(); });
}

boot();
})();
