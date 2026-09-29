/* TheNobles.gift&surprise_hub storefront
   Add or edit products in PRODUCTS. Set `price` (number, GH₵) on an item to show it. */
const WHATSAPP = '233551586167';
const PHONE = '0551586167';
const EMAIL = 'yussifrashida918@gmail.com';

const CATEGORIES = [
  { id: 'balloons',     name: 'Balloon Hampers', img: 'p23', blurb: 'Named balloon hampers with treats, cakes and bouquets.' },
  { id: 'boxes',        name: 'Gift Boxes',      img: 'p02', blurb: 'Ready to gift boxes for him and for her.' },
  { id: 'bouquets',     name: 'Bouquets',        img: 'p16', blurb: 'Rose bouquets for birthdays, graduations and love.' },
  { id: 'baby',         name: 'Baby Gifts',      img: 'p12', blurb: 'Baskets and bouquets for new parents.' },
  { id: 'personalised', name: 'Personalised',    img: 'p09', blurb: 'Engraved and printed gifts with their name or photo.' },
  { id: 'footwear',     name: 'Footwear',        img: 'p29', blurb: 'Sandals and slides, boxed and ready to gift.' },
];

const P = (img, cat, name, desc, price = null) => ({ id: img, img, cat, name, desc, price });
const PRODUCTS = [
  P('p16','bouquets','Signature Red Rose Bouquet','A full bouquet of red roses with baby’s breath in soft pink wrapping.'),
  P('p03','bouquets','Graduation Rose Bouquet','Red roses with a pearl finished year, a grad cap and a scroll for the graduate.'),
  P('p23','balloons','Big Birthday Balloon Hamper','A named balloon on a box filled with snacks and treats. Add a cake if you like.'),
  P('p27','balloons','Birthday Balloon, Bouquet and Cake','A named balloon hamper, a fresh bouquet and a decorated cake in one set.'),
  P('p10','balloons','Balloon, Bouquet and Cake Set','A balloon hamper with chocolates, a rose bouquet and a cream cake.'),
  P('p22','balloons','Anniversary Balloon and Bag Set','An anniversary balloon hamper with a handbag, a bottle and a bouquet.'),
  P('p14','balloons','Thank You Wifey Set','A pink balloon hamper with chocolates, a rose cake and a bouquet.'),
  P('p26','balloons','Teddy, Balloon and Cake Surprise','A giant teddy bear, a named balloon hamper and a birthday cake.'),
  P('p20','balloons','Pink Birthday Balloon Hamper','A pink balloon hamper with drinks, snacks and a ribbon tied box.'),
  P('p00','balloons','Anniversary and Birthday Duo','Two named balloon hampers with sweets for a couple or a shared celebration.'),
  P('p07','balloons','Princess Balloon Hamper','A pink balloon hamper with a plush toy and her name on the box.'),
  P('p04','balloons','Balloon, Roses and Gold Cake','A named balloon with a red rose bouquet and a gold frosted cake.'),
  P('p02','boxes','Him Signature Box','A striped polo, belt, wallet and socks in a branded gift box.'),
  P('p05','boxes','Gentleman Polo and Wallet Box','A polo shirt, leather wallet, belt and accessories on red shred.'),
  P('p17','boxes','Executive Watch and Polo Box','Two polos, watches, a belt and a birthday card in one box.'),
  P('p18','boxes','Sneakers and Snacks Box','White sneakers, a polo, snacks and roses with a handwritten note.'),
  P('p01','boxes','Birthday Mom Luxe Box','A handbag, sandals, a cake topper and a Happy Birthday Mom card.'),
  P('p08','boxes','Her Birthday Luxe Set','A handbag, sandals, a watch set, a bottle and a birthday card.'),
  P('p06','boxes','Handbag and Bouquet Surprise','A handbag, a keepsake and a wrapped bouquet.'),
  P('p19','boxes','Fuel Voucher Gift Box','Fuel vouchers tied with satin bows in a hard gift box.'),
  P('p12','baby','Baby Bouquet in Blue','A bouquet of baby wear with booties, a cap and a bib in soft blue tulle.'),
  P('p13','baby','Diaper Rose Bouquet','Diaper roses arranged as a bouquet with a name ribbon.'),
  P('p21','baby','Baby Care Basket','A wicker basket of baby wash, wipes and clothing essentials.'),
  P('p25','baby','Baby Boy Welcome Basket','An It’s a Boy basket with feeding and care essentials.'),
  P('p09','personalised','Personalised Bottle and Wallet Set','An engraved flask, an engraved wallet and a pendant necklace with their name.'),
  P('p28','personalised','Bottle, Watch and Perfume Set','A named bottle, a watch, an engraved wallet and perfume in a black gift box.'),
  P('p11','personalised','Custom Photo Phone Cases','Your photo printed on a durable case. Send the picture and the phone model.'),
  P('p24','personalised','Statement Bracelets','Stainless steel and gold tone bracelets for him.'),
  P('p15','footwear','Cork Sandals Collection','Cork sole sandals in olive, sand, camo, navy and brown.'),
  P('p29','footwear','Premium Slides Collection','Leather slides in black, tan, grey and green, boxed and ready to gift.'),
];
const FEATURED = ['p16', 'p23', 'p02', 'p03', 'p12', 'p09', 'p27', 'p05'];

const PAGES = [
  ['home', 'index.html', 'Home'],
  ['shop', 'shop.html', 'Shop'],
  ['categories', 'categories.html', 'Categories'],
  ['how', 'how-it-works.html', 'How it works'],
  ['contact', 'contact.html', 'Contact'],
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => 'GH₵ ' + Number(n).toLocaleString('en-GH');
const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || '';
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const page = document.body.dataset.page;

/* ---------- shared layout ---------- */
const ICON = {
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.1a1 1 0 0 0 1-.8L20.5 8H6"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 11 12 4l8 7v9H4z"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="1"/><path d="M3 12h18M12 8v12M12 8c-2-4-6-3-5 0M12 8c2-4 6-3 5 0"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.5L3 21z"/><path d="M9 8.5c0 3.5 2.5 6 6 6l1-1.5-2-1-1 .8c-1-.4-1.8-1.2-2.2-2.2l.8-1-1-2z"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
};

const header = `
<header class="top" id="top">
  <a class="brand" href="index.html" aria-label="TheNobles home">
    <img src="img/logo.jpg" alt="TheNobles logo" class="logo">
    <span><small class="greet" id="greet"></small><b>TheNobles</b><small class="sub">gift &amp; surprise hub</small></span>
  </a>
  <nav class="links" aria-label="Main">
    ${PAGES.map(([id, href, label]) => `<a href="${href}"${id === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
  </nav>
  <div class="actions">
    <a class="icon-btn wa-top" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICON.wa}</a>
    <button class="icon-btn" id="openCart" aria-label="Open cart">${ICON.cart}<i class="badge" id="cartCount" hidden>0</i></button>
  </div>
</header>`;

const footer = `
<footer>
  <div class="foot wrap">
    <div class="foot-brand">
      <img src="img/logo.jpg" alt="" class="logo">
      <div><b>TheNobles.gift&amp;surprise_hub</b><p>Gifts and surprises made by hand in Accra.</p></div>
    </div>
    <nav aria-label="Footer">${PAGES.map(([, href, label]) => `<a href="${href}">${label}</a>`).join('')}</nav>
    <div class="foot-contact">
      <a href="tel:+233${PHONE.slice(1)}">${PHONE}</a>
      <a href="mailto:${EMAIL}">${EMAIL}</a>
      <span>NIMA &amp; UPSA, Accra</span>
    </div>
  </div>
  <p class="copy">© <span id="yr"></span> TheNobles.gift&amp;surprise_hub · Owner: Rashida Yussif</p>
</footer>`;

const dock = `
<nav class="dock" aria-label="Quick navigation">
  <a href="index.html" aria-label="Home"${page === 'home' ? ' aria-current="page"' : ''}>${ICON.home}</a>
  <a href="shop.html" aria-label="Shop"${page === 'shop' ? ' aria-current="page"' : ''}>${ICON.gift}</a>
  <a href="categories.html" aria-label="Categories"${page === 'categories' ? ' aria-current="page"' : ''}>${ICON.grid}</a>
  <button id="dockCart" aria-label="Cart">${ICON.cart}<i class="badge" id="dockCount" hidden>0</i></button>
  <a href="contact.html" aria-label="Contact"${page === 'contact' ? ' aria-current="page"' : ''}>${ICON.user}</a>
</nav>`;

const overlays = `
<div class="overlay" id="modalWrap" hidden>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle">
    <button class="x" data-close aria-label="Close">×</button>
    <img id="mImg" alt="">
    <div class="m-body">
      <span class="tag" id="mCat"></span>
      <h3 id="mTitle"></h3>
      <p id="mDesc"></p>
      <label class="field">Name or message on the gift <small>(optional)</small>
        <input id="mNote" maxlength="60" placeholder="e.g. Happy Birthday Ama">
      </label>
      <div class="qty-row">
        <div class="qty"><button id="mMinus" aria-label="Less">−</button><span id="mQty">1</span><button id="mPlus" aria-label="More">+</button></div>
        <button class="btn primary grow" id="mAdd">Add to cart</button>
      </div>
      <p class="fine">Rashida confirms the final price on WhatsApp.</p>
    </div>
  </div>
</div>
<div class="overlay" id="cartWrap" hidden>
  <aside class="drawer" role="dialog" aria-modal="true" aria-label="Cart and checkout">
    <header><button class="back" data-close aria-label="Close">‹</button><h3 id="drawerTitle">Your order</h3><span></span></header>
    <div class="d-body">
      <div id="cartItems"></div>
      <a class="add-more" href="shop.html">Add more items</a>
      <form id="checkout" novalidate>
        <h4>Delivery details</h4>
        <label class="field">Your name<input name="name" required autocomplete="name" placeholder="Full name"></label>
        <label class="field">Phone or WhatsApp<input name="phone" required inputmode="tel" autocomplete="tel" placeholder="05X XXX XXXX"></label>
        <div class="two">
          <label class="field">Date<input type="date" name="date"></label>
          <label class="field">Time<input type="time" name="time"></label>
        </div>
        <div class="seg" role="radiogroup" aria-label="Pickup or delivery">
          <label><input type="radio" name="mode" value="Pickup (NIMA / UPSA)" checked><span>Pickup</span></label>
          <label><input type="radio" name="mode" value="Delivery"><span>Delivery</span></label>
        </div>
        <label class="field" id="addrRow" hidden>Delivery address or landmark<input name="address" placeholder="Area, landmark, house number"></label>
        <div class="gift-row">
          <div><b>Send as a gift</b><small>Add a card message</small></div>
          <label class="switch"><input type="checkbox" id="giftToggle"><i></i></label>
        </div>
        <div id="giftBox" hidden>
          <label class="field">Recipient name<input name="rname" placeholder="Who is it for?"></label>
          <label class="field">Card message<textarea name="msg" rows="2" placeholder="Your message"></textarea></label>
        </div>
        <label class="field">Extra notes<textarea name="notes" rows="2" placeholder="Colours, budget, allergies"></textarea></label>
        <p class="err" id="err" role="alert" hidden></p>
        <button class="btn primary wide" type="submit">Send order on WhatsApp</button>
        <p class="fine">No payment is taken on this site. Rashida confirms the price and payment with you on WhatsApp.</p>
      </form>
    </div>
  </aside>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;

document.body.insertAdjacentHTML('afterbegin', header);
document.body.insertAdjacentHTML('beforeend', footer + dock + overlays);

/* ---------- state ---------- */
let state = { cat: 'all', q: '' };
let cart = [];
try { cart = JSON.parse(localStorage.getItem('nobles-cart') || '[]').filter(l => PRODUCTS.some(p => p.id === l.id)); } catch (e) {}
const save = () => { try { localStorage.setItem('nobles-cart', JSON.stringify(cart)); } catch (e) {} };

/* ---------- product cards ---------- */
const card = p => `
  <article class="p" data-id="${p.id}" tabindex="0" role="button" aria-label="${esc(p.name)}">
    <img src="img/${p.img}.jpg" alt="${esc(p.name)}" loading="lazy">
    <span class="tag">${catName(p.cat)}</span>
    <div class="p-info"><h3>${esc(p.name)}</h3><span>${p.price ? money(p.price) : 'Price on request'}</span></div>
    <button class="add" data-quick="${p.id}" aria-label="Add ${esc(p.name)} to cart">+</button>
  </article>`;

/* home: categories row + featured */
const catsEl = $('#cats');
if (catsEl) catsEl.innerHTML = CATEGORIES.map(c =>
  `<a class="cat" href="shop.html?cat=${c.id}"><img src="img/${c.img}.jpg" alt="" loading="lazy"><span>${c.name}</span></a>`).join('');
const featEl = $('#featured');
if (featEl) featEl.innerHTML = FEATURED.map(id => card(PRODUCTS.find(p => p.id === id))).join('');

/* categories page */
const catPage = $('#catPage');
if (catPage) catPage.innerHTML = CATEGORIES.map(c => {
  const n = PRODUCTS.filter(p => p.cat === c.id).length;
  return `<a class="cat-card" href="shop.html?cat=${c.id}">
    <img src="img/${c.img}.jpg" alt="" loading="lazy">
    <div><h3>${c.name}</h3><p>${c.blurb}</p><span>${n} items</span></div>
  </a>`;
}).join('');

/* shop page */
const gridEl = $('#grid');
if (gridEl) {
  const params = new URLSearchParams(location.search);
  if (CATEGORIES.some(c => c.id === params.get('cat'))) state.cat = params.get('cat');
  state.q = params.get('q') || '';
  $('#q').value = state.q;
  $('#chips').innerHTML = [{ id: 'all', name: 'All' }, ...CATEGORIES].map(c =>
    `<button class="chip" role="tab" data-chip="${c.id}" aria-selected="${c.id === state.cat}">${c.name}</button>`).join('');
  const renderGrid = () => {
    const q = state.q.trim().toLowerCase();
    const list = PRODUCTS.filter(p =>
      (state.cat === 'all' || p.cat === state.cat) &&
      (!q || (p.name + ' ' + p.desc + ' ' + catName(p.cat)).toLowerCase().includes(q)));
    gridEl.innerHTML = list.map(card).join('');
    $('#empty').hidden = list.length > 0;
    $('#resultCount').textContent = `${list.length} item${list.length === 1 ? '' : 's'}`;
    $$('.chip').forEach(c => c.setAttribute('aria-selected', c.dataset.chip === state.cat));
    $('#shopTitle').textContent = state.cat === 'all' ? 'The collection' : catName(state.cat);
  };
  $('#q').addEventListener('input', e => { state.q = e.target.value; renderGrid(); });
  $('#chips').addEventListener('click', e => {
    const c = e.target.closest('[data-chip]'); if (!c) return;
    state.cat = c.dataset.chip; renderGrid();
    history.replaceState(null, '', state.cat === 'all' ? 'shop.html' : `shop.html?cat=${state.cat}`);
  });
  renderGrid();
}

/* home: mobile search + carousel */
const mSearch = $('#mSearch');
if (mSearch) {
  mSearch.addEventListener('submit', e => {
    e.preventDefault();
    const q = $('#mq').value.trim();
    location.href = 'shop.html' + (q ? '?q=' + encodeURIComponent(q) : '');
  });
  const slides = $('#mSlides');
  slides.addEventListener('scroll', () => {
    const i = Math.round(slides.scrollLeft / slides.clientWidth);
    $$('#mDots i').forEach((d, k) => d.classList.toggle('on', k === i));
  }, { passive: true });
}

/* ---------- product modal ---------- */
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

document.addEventListener('click', e => {
  const quick = e.target.closest('[data-quick]');
  if (quick) { e.stopPropagation(); addToCart(quick.dataset.quick, 1, ''); return; }
  const c = e.target.closest('.p');
  if (c) openModal(c.dataset.id);
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('p')) { e.preventDefault(); openModal(e.target.dataset.id); }
  if (e.key === 'Escape') closeAll();
});

/* ---------- overlays ---------- */
let lastFocus = null;
function show(sel) { lastFocus = document.activeElement; $(sel).hidden = false; document.body.style.overflow = 'hidden'; }
function closeAll() { $$('.overlay').forEach(o => o.hidden = true); document.body.style.overflow = ''; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
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
      <div class="info"><div><h5>${esc(p.name)}</h5><small>${l.note ? `“${esc(l.note)}”` : catName(p.cat)}</small></div>
      <div class="qty"><button data-dec="${i}" aria-label="Less">−</button><span>${l.qty}</span><button data-inc="${i}" aria-label="More">+</button></div></div>
      <button class="rm" data-rm="${i}" aria-label="Remove">×</button></div>`;
  }).join('') : '<p class="cart-empty">Your cart is empty.<br>Pick something from the shop.</p>';
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
$$('input[name=mode]').forEach(r => r.onchange = () => $('#addrRow').hidden = $('input[name=mode]:checked').value !== 'Delivery');
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
    return `${i + 1}. ${p.name} x${l.qty}${l.note ? ` (${l.note})` : ''}`;
  });
  const parts = [
    'Hello TheNobles, I would like to order:', '', ...lines, '',
    `Name: ${name}`, `Phone: ${phone}`,
    `${delivery ? 'Delivery to: ' + f.get('address').trim() : 'Pickup at NIMA / UPSA'}`,
  ];
  if (f.get('date')) parts.push(`Date: ${f.get('date')}${f.get('time') ? ' at ' + f.get('time') : ''}`);
  if ($('#giftToggle').checked) {
    if (f.get('rname')) parts.push(`Gift for: ${f.get('rname').trim()}`);
    if (f.get('msg')) parts.push(`Card message: ${f.get('msg').trim()}`);
  }
  if ((f.get('notes') || '').trim()) parts.push(`Notes: ${f.get('notes').trim()}`);
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(parts.join('\n'))}`, '_blank', 'noopener');
});

/* contact page form */
const cf = $('#contactForm');
if (cf) cf.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(cf);
  const msg = `Hello TheNobles, my name is ${(f.get('name') || '').trim()}.\n${(f.get('message') || '').trim()}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

/* ---------- misc ---------- */
let tt; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 1600); }
(() => { const h = new Date().getHours(); $('#greet').textContent = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; })();
$('#yr').textContent = new Date().getFullYear();
renderCart();
