/* TheNobles.gift&surprise_hub storefront
   Edit PRODUCTS below to add/change items. Set `price` (number, GH₵) on any item to show it. */
const WHATSAPP = '233551586167';

const CATEGORIES = [
  { id: 'balloons',     name: 'Balloon Hampers', img: 'p23' },
  { id: 'boxes',        name: 'Gift Boxes',      img: 'p02' },
  { id: 'bouquets',     name: 'Bouquets',        img: 'p16' },
  { id: 'baby',         name: 'Baby Gifts',      img: 'p12' },
  { id: 'personalised', name: 'Personalised',    img: 'p09' },
  { id: 'footwear',     name: 'Footwear',        img: 'p29' },
];

const P = (img, cat, name, desc, price = null) => ({ id: img, img, cat, name, desc, price });
const PRODUCTS = [
  P('p16','bouquets','Signature Red Rose Bouquet','Full-bloom red roses with baby’s breath in blush wrapping. The classic “I love you”.'),
  P('p03','bouquets','2026 Graduation Rose Bouquet','Red roses with a pearl-set year, grad cap and scroll. Perfect for the graduate.'),
  P('p23','balloons','Big Birthday Balloon Hamper','Personalised balloon on a box filled with snacks and treats, with an optional cake.'),
  P('p27','balloons','Birthday Balloon, Bouquet & Cake','A complete surprise: named balloon hamper, fresh bouquet and a decorated cake.'),
  P('p10','balloons','Balloon, Bouquet & Cake Set','Balloon hamper with chocolates, a rose bouquet and a cream birthday cake.'),
  P('p22','balloons','Anniversary Balloon & Bag Set','Anniversary balloon hamper with a designer-style bag, bottle and bouquet.'),
  P('p14','balloons','Thank-You Wifey Set','Pink balloon hamper with chocolates, rose cake and bouquet to say thank you.'),
  P('p26','balloons','Teddy, Balloon & Cake Surprise','Giant teddy bear, personalised balloon hamper and a birthday cake.'),
  P('p20','balloons','Pink Birthday Balloon Hamper','Pink balloon hamper with drinks, snacks and a ribbon-tied box.'),
  P('p00','balloons','Anniversary & Birthday Duo','Two named balloon hampers with sweets, ready for a couple’s celebration.'),
  P('p07','balloons','Princess Balloon Hamper','Pink balloon hamper with a plush toy and her name on the box. Ideal for little girls.'),
  P('p04','balloons','Balloon, Roses & Gold Cake','Named balloon with a red rose bouquet and a gold-frosted cake.'),
  P('p02','boxes','Him Signature Box','Striped polo, belt, wallet and socks in a branded gift box.'),
  P('p05','boxes','Gentleman Polo & Wallet Box','Polo shirt, leather wallet, belt and accessories on red shred.'),
  P('p17','boxes','Executive Watch & Polo Box','Two polos, watches, a belt and a birthday card in one premium box.'),
  P('p18','boxes','Sneakers & Snacks Surprise Box','White sneakers, polo, snacks and roses with a handwritten-style note.'),
  P('p01','boxes','Birthday Mom Luxe Box','Handbag, sandals, cake topper and a “Happy Birthday Mom” card.'),
  P('p08','boxes','Her Birthday Luxe Set','Handbag, sandals, watch set, bottle and birthday card.'),
  P('p06','boxes','Handbag & Bouquet Surprise','Designer-style handbag, keepsake and a wrapped bouquet.'),
  P('p19','boxes','Fuel Voucher Gift Box','Fuel vouchers tied with satin bows in a hard gift box. Practical and thoughtful.'),
  P('p12','baby','Baby Bouquet (Blue)','Baby-wear bouquet with booties, cap and bib, wrapped in soft blue tulle.'),
  P('p13','baby','Diaper Rose Bouquet','Diaper roses in a bouquet with a personalised ribbon name.'),
  P('p21','baby','Baby Care Basket','Wicker basket with baby wash, wipes and clothing essentials.'),
  P('p25','baby','Baby Boy Welcome Basket','“It’s a Boy” basket with feeding and care essentials.'),
  P('p09','personalised','Personalised Bottle & Wallet Set','Engraved flask, engraved wallet and pendant necklace with their name.'),
  P('p28','personalised','Bottle, Watch & Perfume Set','Named bottle, watch, engraved wallet and perfume in a black gift box.'),
  P('p11','personalised','Custom Photo Phone Cases','Your photo printed on a durable phone case. Send the picture and phone model.'),
  P('p24','personalised','Statement Bracelets','Stainless steel and gold-tone bracelets for him.'),
  P('p15','footwear','Cork Sandals Collection','Comfortable cork-sole sandals in olive, sand, camo, navy and brown.'),
  P('p29','footwear','Premium Slides Collection','Leather slides in black, tan, grey and green, boxed and ready to gift.'),
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => 'GH₵ ' + Number(n).toLocaleString('en-GH');
const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || '';
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));

let state = { cat: 'all', q: '' };
let cart = [];
try { cart = JSON.parse(localStorage.getItem('nobles-cart') || '[]').filter(l => PRODUCTS.some(p => p.id === l.id)); } catch (e) {}
const save = () => { try { localStorage.setItem('nobles-cart', JSON.stringify(cart)); } catch (e) {} };

/* ---------- categories + chips ---------- */
$('#cats').innerHTML = CATEGORIES.map(c =>
  `<a class="cat" href="#shop" data-filter="${c.id}"><img src="img/${c.img}.jpg" alt="" loading="lazy"><span>${c.name}</span></a>`).join('');
$('#chips').innerHTML = [{ id: 'all', name: 'All' }, ...CATEGORIES].map(c =>
  `<button class="chip" role="tab" data-chip="${c.id}" aria-selected="${c.id === 'all'}">${c.name}</button>`).join('');

/* ---------- grid ---------- */
function renderGrid() {
  const q = state.q.trim().toLowerCase();
  const list = PRODUCTS.filter(p =>
    (state.cat === 'all' || p.cat === state.cat) &&
    (!q || (p.name + ' ' + p.desc + ' ' + catName(p.cat)).toLowerCase().includes(q)));
  $('#grid').innerHTML = list.map(p => `
    <article class="p" data-id="${p.id}" tabindex="0" role="button" aria-label="${esc(p.name)}">
      <img src="img/${p.img}.jpg" alt="${esc(p.name)}" loading="lazy">
      <span class="tag">${catName(p.cat)}</span>
      <div class="p-info"><h3>${esc(p.name)}</h3><span>${p.price ? money(p.price) : 'Price on request'}</span></div>
      <button class="add" data-quick="${p.id}" aria-label="Add ${esc(p.name)} to cart">+</button>
    </article>`).join('');
  $('#empty').hidden = list.length > 0;
  $('#resultCount').textContent = `${list.length} item${list.length === 1 ? '' : 's'}`;
  $$('.chip').forEach(c => c.setAttribute('aria-selected', c.dataset.chip === state.cat));
}
function setFilter(cat) { state.cat = cat; renderGrid(); }

$('#q').addEventListener('input', e => { state.q = e.target.value; renderGrid(); });
document.addEventListener('click', e => {
  const f = e.target.closest('[data-filter]');
  if (f) setFilter(f.dataset.filter);
  const chip = e.target.closest('[data-chip]');
  if (chip) setFilter(chip.dataset.chip);
  const quick = e.target.closest('[data-quick]');
  if (quick) { e.stopPropagation(); addToCart(quick.dataset.quick, 1, ''); return; }
  const card = e.target.closest('.p');
  if (card) openModal(card.dataset.id);
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('p')) { e.preventDefault(); openModal(e.target.dataset.id); }
  if (e.key === 'Escape') closeAll();
});

/* ---------- modal ---------- */
let current = null, mq = 1;
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id); if (!p) return;
  current = p; mq = 1;
  $('#mImg').src = `img/${p.img}.jpg`; $('#mImg').alt = p.name;
  $('#mCat').textContent = catName(p.cat); $('#mTitle').textContent = p.name;
  $('#mDesc').textContent = p.desc; $('#mNote').value = ''; $('#mQty').textContent = 1;
  show('#modalWrap');
}
$('#mPlus').onclick = () => { mq = Math.min(20, mq + 1); $('#mQty').textContent = mq; };
$('#mMinus').onclick = () => { mq = Math.max(1, mq - 1); $('#mQty').textContent = mq; };
$('#mAdd').onclick = () => { addToCart(current.id, mq, $('#mNote').value.trim()); closeAll(); };

/* ---------- overlays ---------- */
let lastFocus = null;
function show(sel) { lastFocus = document.activeElement; $(sel).hidden = false; document.body.style.overflow = 'hidden'; }
function closeAll() { $$('.overlay').forEach(o => o.hidden = true); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus?.(); }
$$('.overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o || e.target.closest('[data-close]')) closeAll(); }));

/* ---------- cart ---------- */
function addToCart(id, qty, note) {
  const line = cart.find(l => l.id === id && l.note === note);
  if (line) line.qty = Math.min(20, line.qty + qty); else cart.push({ id, qty, note });
  save(); renderCart(); toast('Added to cart');
}
function renderCart() {
  const n = cart.reduce((s, l) => s + l.qty, 0);
  ['#cartCount', '#dockCount'].forEach(s => { $(s).textContent = n; $(s).hidden = !n; });
  $('#drawerTitle').textContent = `Your order (${n})`;
  $('#cartItems').innerHTML = cart.length ? cart.map((l, i) => {
    const p = PRODUCTS.find(x => x.id === l.id);
    return `<div class="line"><img src="img/${p.img}.jpg" alt="">
      <div class="info"><div><h5>${esc(p.name)}</h5>${l.note ? `<small>“${esc(l.note)}”</small>` : `<small>${catName(p.cat)}</small>`}</div>
      <div class="qty"><button data-dec="${i}" aria-label="Less">−</button><span>${l.qty}</span><button data-inc="${i}" aria-label="More">+</button></div></div>
      <button class="rm" data-rm="${i}" aria-label="Remove">×</button></div>`;
  }).join('') : `<p class="cart-empty">Your cart is empty.<br>Pick something lovely from the collection.</p>`;
}
$('#cartItems').addEventListener('click', e => {
  const t = e.target;
  if (t.dataset.inc) cart[t.dataset.inc].qty = Math.min(20, cart[t.dataset.inc].qty + 1);
  else if (t.dataset.dec) { const l = cart[t.dataset.dec]; l.qty--; if (l.qty < 1) cart.splice(t.dataset.dec, 1); }
  else if (t.dataset.rm) cart.splice(t.dataset.rm, 1);
  else return;
  save(); renderCart();
});
['#openCart', '#dockCart'].forEach(s => $(s).addEventListener('click', () => { renderCart(); show('#cartWrap'); }));

/* ---------- checkout ---------- */
$('#giftToggle').onchange = e => $('#giftBox').hidden = !e.target.checked;
$$('input[name=mode]').forEach(r => r.onchange = () => $('#addrRow').hidden = $('input[name=mode]:checked').value === 'Pickup (NIMA / UPSA)');
$('input[name=date]').min = new Date().toISOString().slice(0, 10);

$('#checkout').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target), err = $('#err');
  const name = (f.get('name') || '').trim(), phone = (f.get('phone') || '').trim();
  const fail = m => { err.textContent = m; err.hidden = false; };
  if (!cart.length) return fail('Your cart is empty.');
  if (!name) return fail('Please enter your name.');
  if (!/^[+\d][\d\s-]{8,}$/.test(phone)) return fail('Please enter a valid phone number.');
  const delivery = f.get('mode') === 'Delivery';
  if (delivery && !(f.get('address') || '').trim()) return fail('Please add a delivery address.');
  err.hidden = true;

  const lines = cart.map((l, i) => {
    const p = PRODUCTS.find(x => x.id === l.id);
    return `${i + 1}. ${p.name} x${l.qty}${l.note ? ` — "${l.note}"` : ''}`;
  });
  const parts = [
    'Hello TheNobles.gift&surprise_hub! I would like to order:', '', ...lines, '',
    `Name: ${name}`, `Phone: ${phone}`,
    `Fulfilment: ${f.get('mode')}${delivery ? ' — ' + f.get('address').trim() : ''}`,
  ];
  if (f.get('date')) parts.push(`Date: ${f.get('date')}${f.get('time') ? ' at ' + f.get('time') : ''}`);
  if ($('#giftToggle').checked) {
    if (f.get('rname')) parts.push(`Gift for: ${f.get('rname').trim()}`);
    if (f.get('msg')) parts.push(`Card message: ${f.get('msg').trim()}`);
  }
  if ((f.get('notes') || '').trim()) parts.push(`Notes: ${f.get('notes').trim()}`);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(parts.join('\n'))}`, '_blank', 'noopener');
});

/* ---------- misc ---------- */
let tt; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 1600); }
/* mobile hero: greeting, search, carousel dots */
(() => { const h = new Date().getHours(); $('#greet').textContent = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; })();
$('#mSearch').addEventListener('submit', e => { e.preventDefault(); $('#shop').scrollIntoView(); });
$('#mq').addEventListener('input', e => { state.q = e.target.value; $('#q').value = e.target.value; renderGrid(); });
$('#q').addEventListener('input', e => { $('#mq').value = e.target.value; });
const slides = $('#mSlides');
slides.addEventListener('scroll', () => {
  const i = Math.round(slides.scrollLeft / slides.clientWidth);
  $$('#mDots i').forEach((d, k) => d.classList.toggle('on', k === i));
}, { passive: true });
$('#yr').textContent = new Date().getFullYear();
renderGrid(); renderCart();
