-- TheNobles.gift&surprise_hub: storefront + admin backend

create extension if not exists pgcrypto with schema extensions;

-- ---------- tables ----------
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.categories (
  id text primary key,
  name text not null,
  blurb text not null default '',
  image text not null default '',
  price_list text,
  sort int not null default 0
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  category_id text references public.categories(id) on update cascade on delete set null,
  price numeric(10,2),
  image text not null default '',
  featured boolean not null default false,
  active boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index products_category_idx on public.products(category_id);

create sequence public.order_seq start 1001;

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique default ('TN-' || nextval('public.order_seq')),
  customer_name text not null,
  phone text not null,
  fulfilment text not null default 'Pickup',
  address text,
  event_date date,
  event_time text,
  is_gift boolean not null default false,
  recipient_name text,
  card_message text,
  notes text,
  items jsonb not null default '[]'::jsonb,
  total numeric(10,2),
  paid boolean not null default false,
  status text not null default 'new' check (status in ('new','confirmed','in_progress','ready','delivered','cancelled')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index orders_status_idx on public.orders(status, created_at desc);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  status text not null default 'pending' check (status in ('pending','approved','hidden')),
  created_at timestamptz not null default now()
);
create index reviews_status_idx on public.reviews(status, created_at desc);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- helpers ----------
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.admins where user_id = (select auth.uid())) $$;

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = ''
as $$ begin new.updated_at = now(); return new; end $$;

create trigger products_touch before update on public.products for each row execute function public.touch_updated_at();
create trigger orders_touch before update on public.orders for each row execute function public.touch_updated_at();

-- ---------- row level security ----------
alter table public.admins enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.reviews enable row level security;
alter table public.messages enable row level security;

create policy "admins read own row" on public.admins for select to authenticated using (user_id = (select auth.uid()));

create policy "public reads categories" on public.categories for select to anon, authenticated using (true);
create policy "admin manages categories" on public.categories for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public reads active products" on public.products for select to anon, authenticated using (active);
create policy "admin manages products" on public.products for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin manages orders" on public.orders for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "public reads approved reviews" on public.reviews for select to anon, authenticated using (status = 'approved');
create policy "admin manages reviews" on public.reviews for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "admin manages messages" on public.messages for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- public submit functions (validated, no direct table access) ----------
create or replace function public.submit_order(payload jsonb)
returns text language plpgsql security definer set search_path = ''
as $$
declare
  v_name text := left(btrim(coalesce(payload->>'name','')), 120);
  v_phone text := left(btrim(coalesce(payload->>'phone','')), 30);
  v_items jsonb := coalesce(payload->'items','[]'::jsonb);
  v_ref text;
begin
  if v_name = '' or v_phone = '' then raise exception 'name and phone are required'; end if;
  if jsonb_typeof(v_items) <> 'array' or jsonb_array_length(v_items) = 0 or jsonb_array_length(v_items) > 40 then
    raise exception 'invalid items';
  end if;
  insert into public.orders (customer_name, phone, fulfilment, address, event_date, event_time, is_gift, recipient_name, card_message, notes, items)
  values (
    v_name, v_phone,
    case when payload->>'fulfilment' = 'Delivery' then 'Delivery' else 'Pickup' end,
    left(nullif(btrim(payload->>'address'),''), 300),
    nullif(payload->>'event_date','')::date,
    left(nullif(payload->>'event_time',''), 20),
    coalesce((payload->>'is_gift')::boolean, false),
    left(nullif(btrim(payload->>'recipient_name'),''), 120),
    left(nullif(btrim(payload->>'card_message'),''), 500),
    left(nullif(btrim(payload->>'notes'),''), 1000),
    v_items
  ) returning ref into v_ref;
  return v_ref;
end $$;

create or replace function public.submit_review(p_name text, p_rating int, p_comment text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if btrim(coalesce(p_name,'')) = '' or btrim(coalesce(p_comment,'')) = '' then raise exception 'name and comment are required'; end if;
  if p_rating not between 1 and 5 then raise exception 'rating must be 1 to 5'; end if;
  insert into public.reviews (name, rating, comment) values (left(btrim(p_name),80), p_rating, left(btrim(p_comment),800));
end $$;

create or replace function public.submit_message(p_name text, p_phone text, p_message text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if btrim(coalesce(p_name,'')) = '' or btrim(coalesce(p_message,'')) = '' then raise exception 'name and message are required'; end if;
  insert into public.messages (name, phone, message) values (left(btrim(p_name),80), left(nullif(btrim(p_phone),''),30), left(btrim(p_message),1500));
end $$;

revoke all on function public.submit_order(jsonb) from public;
revoke all on function public.submit_review(text,int,text) from public;
revoke all on function public.submit_message(text,text,text) from public;
grant execute on function public.submit_order(jsonb) to anon, authenticated;
grant execute on function public.submit_review(text,int,text) to anon, authenticated;
grant execute on function public.submit_message(text,text,text) to anon, authenticated;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ---------- storage: product photos ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

create policy "admin uploads product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());
create policy "admin updates product images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.is_admin());
create policy "admin deletes product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());
