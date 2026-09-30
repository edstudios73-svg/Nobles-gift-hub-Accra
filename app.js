/* TheNobles.gift&surprise_hub storefront
   Add or edit products in PRODUCTS. Set `price` (number, GH₵) on an item to show it. */
const WHATSAPP = '233551586167';
const PHONE = '0551586167';
const EMAIL = 'yussifrashida918@gmail.com';

let CATEGORIES = [
  { id: 'bouquets',     name: 'Bouquets',        img: 'p16', list: 'roses',    blurb: 'Rose and mixed flower bouquets for every occasion.' },
  { id: 'money',        name: 'Money Bouquets',  img: 'm52', list: 'money',    blurb: 'Cash bouquets styled with flowers and ribbon.' },
  { id: 'balloons',     name: 'Balloon Hampers', img: 'p23', list: 'balloons', blurb: 'Named air balloon hampers with snacks, drinks or flowers.' },
  { id: 'teddy',        name: 'Teddy Bears',     img: 'm48', list: 'teddy',    blurb: 'Teddy bears from 60cm up to human size.' },
  { id: 'decor',        name: 'Room Decor',      img: 'm21', list: 'decor',    blurb: 'Balloon and petal room surprises, by appointment.' },
  { id: 'boxes',        name: 'Gift Boxes',      img: 'p02', blurb: 'Ready to gift boxes for him and for her.' },
  { id: 'personalised', name: 'Personalised',    img: 'p09', blurb: 'Engraved and printed gifts with a name or photo.' },
  { id: 'baby',         name: 'Baby Gifts',      img: 'p12', blurb: 'Baskets and bouquets for new parents.' },
  { id: 'footwear',     name: 'Footwear',        img: 'p29', blurb: 'Sandals and slides, boxed and ready to gift.' },
];

const P = (img, cat, name, desc, price = null) => ({ id: img, image: `img/${img}.jpg`, cat, name, desc, price });
let PRODUCTS = [
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
  P('m00','boxes','Green Polo and Watch Box','A textured green polo, a gold tone watch and a leather wallet in a gift box.'),
  P('m02','boxes','Gentleman Grooming Box','Socks, a tie set, a flask and a shoe care kit in one organised box.'),
  P('m03','personalised','Engraved Wallet, Flask and Watch Set','A monogrammed wallet, an engraved bamboo flask, a watch and a belt.'),
  P('m04','personalised','Named Bottle and Jewellery Set','A named bottle with a watch, bracelet and necklace in a purple gift box.'),
  P('m06','decor','Pink Balloon Room Surprise','Pink and red ceiling balloons with a Happy Birthday banner and a decorated bed.'),
  P('m07','footwear','Colourful Slides Collection','Leather slides in bold colours, boxed and ready to gift.'),
  P('m08','money','Money Bouquet, Cake and Teddy Set','A money bouquet with a birthday cake, a teddy and a rose bouquet.'),
  P('m09','bouquets','Cap and Flower Bouquets','Flower bouquets built around a cap, finished in blue, white or red roses.'),
  P('m11','personalised','Wallet, Shades and Named Bottle Box','A leather wallet, sunglasses and a named bottle on red shred.'),
  P('m12','teddy','Pink Teddy with Rose Bouquet','A large pink teddy bear with a big red and white rose bouquet.'),
  P('m13','boxes','Girlfriend’s Day Box','Slides, a handbag, perfume, wine and a card in one gift box.'),
  P('m14','boxes','Slides and Handbag Gift Box','Leather slides and a crossbody bag in a branded gift box.'),
  P('m15','bouquets','Named Rose Bouquets','Red rose bouquets with a name or message such as Wifey, Princess or My Queen.'),
  P('m16','teddy','Teddy and Balloon Hamper','A pink teddy bear with a named Girlfriend’s Day balloon hamper.'),
  P('m17','personalised','Polo and Named Bottle Box','A polo shirt, a named bottle and snacks in a gift box.'),
  P('m18','boxes','Cream Polo and Accessories Box','A cream polo, belt, watch case and wallet with a thank you card.'),
  P('m19','money','Money Bouquet and Slides Box','A money flower bouquet with slides, perfume and a message card.'),
  P('m20','balloons','Dad Birthday Balloon and Cake','A named balloon hamper with chocolates and a matching birthday cake.'),
  P('m21','decor','25th Birthday Red Room Setup','Red and pink balloons, heart foils, petals and a candle lit path.'),
  P('m22','decor','Love Room Surprise','Red and white ceiling balloons, a Love sign and rose petals.'),
  P('m23','personalised','Engraved Notebook and Pen Set','A notebook and pen set with a portrait and message engraved on it.'),
  P('m24','decor','Pink Ceiling Balloon Room','A pink balloon ceiling, a foil banner and a petal trimmed bed.'),
  P('m25','personalised','Engraved Wallet and Flask Box','A black wallet, flask and pen set with a name engraved on each.'),
  P('m26','personalised','Named Bottle, Perfume and Jewellery Box','A named bottle, perfume, necklace and bracelet in a pink gift box.'),
  P('m27','boxes','Jersey, Watch and Wine Box','A jersey, a watch, a named bottle and a bottle of wine.'),
  P('m28','decor','Black Balloon Birthday Room','Black balloons, a Happy Birthday banner and a rose bouquet on the bed.'),
  P('m29','boxes','Green Polo and Wallet Box','A striped polo, belt and wallet with a thank you card.'),
  P('m30','boxes','Black Polo, Watch and Belt Box','A black polo, watch, belt and leather organiser.'),
  P('m31','decor','Black and Silver Room Setup','Black balloons, a silver banner and an I Love You petal heart.'),
  P('m32','teddy','White Teddy with Initial Bouquet','A big white teddy with a red rose bouquet and a letter of your choice.'),
  P('m33','boxes','Executive Notebook, Watch and Flask Box','A notebook, pen, flask, watch and belt in a black gift box.'),
  P('m34','personalised','Hot Pink Named Bottle Set','A hot pink named bottle with a watch, bracelet and necklace.'),
  P('m35','balloons','Girlfriend’s Day Balloon and Teddy','A named balloon hamper with a teddy bear and a small rose bouquet.'),
  P('m36','boxes','Watch, Bottle and Perfume Box','Watches, a necklace, perfume and a printed bottle in one box.'),
  P('m37','bouquets','Mixed Flower Bouquet','A wrapped bouquet of roses, chrysanthemums and baby’s breath.'),
  P('m38','personalised','Engraved Bracelets','Engraved and steel bracelets for him and for her.'),
  P('m39','boxes','Handbag and Slides Gift Set','A handbag and leather slides in a boxed set.'),
  P('m40','personalised','Named Jewellery and Wallet Box','A watch, bracelet, necklace and named wallet in a pink box.'),
  P('m41','bouquets','Cap and Cars Bouquet','A cap and toy cars wrapped as a bouquet with roses.'),
  P('m42','decor','Silver Happy Birthday Room','Black and silver balloons, a foil banner and gift bags on the bed.'),
  P('m43','bouquets','Message Rose Bouquet','A large red rose bouquet with a message printed on the wrap.'),
  P('m44','decor','I’m Sorry Room Setup','Red and silver balloons, gift bags and petals for an apology surprise.'),
  P('m45','decor','Anniversary Petal Heart Room','A petal heart on the bed, foil hearts and a candle lit path.'),
  P('m47','bouquets','Birthday Cake and Flower Set','A red birthday cake with a wrapped flower bouquet and a gift.'),
  P('m48','teddy','Red Teddy with Rose Bouquet','A big red teddy holding a bouquet of red and pink roses.'),
  P('m49','balloons','Happy Birthday My Love Balloon','A pink named balloon on a hamper box with red roses.'),
  P('m52','money','Money and Rose Bouquet','Folded notes wrapped around fresh red roses in black paper.'),
  P('m54','balloons','Girlfriend’s Day Balloon Hamper','A white balloon hamper with snacks, a bouquet and a card.'),
  P('m55','decor','Hot Pink Birthday Room','Hot pink balloons, rose petals and a black Happy Birthday banner.'),
  P('m56','teddy','Teddy, Balloon and Money Set','A pink teddy, a birthday balloon hamper, a cake and a money bouquet.'),
  P('m58','boxes','Chocolate Strawberry Gift Box','A Happy Birthday box of chocolate covered strawberries with bows.'),
  P('m59','personalised','Photo Phone Case','A phone case printed with a photo and a name.'),
  P('m61','personalised','Named Bottle, Wallet and Watch Set','A named bottle, a portrait wallet, a watch set and a necklace.'),
  P('m62','personalised','Pink Named Bottle and Wallet Set','A pink named bottle, a wallet and a watch set with a necklace.'),
  P('m63','boxes','Bow Tied Chocolate Gift Box','Bow tied chocolates in a long purple gift box.'),
  P('m64','boxes','Brown Polo and Wallet Box','A patterned polo and a black wallet with a thank you card.'),
];
let FEATURED = ['p16', 'm52', 'p23', 'm48', 'm21', 'p02', 'p09', 'p12'];
CATEGORIES = CATEGORIES.map(c => ({ ...c, image: `img/${c.img}.jpg` }));

/* Live catalogue from Supabase (falls back to the list above if it is unreachable) */
const DEMO_ON = !(window.NOBLES_CONFIG && NOBLES_CONFIG.url) && localStorage.getItem('nobles-demo') === '1';
let HAS_BACKEND = !!(window.NOBLES_CONFIG && NOBLES_CONFIG.url);
const loadScript = src => new Promise(res => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = res; document.head.appendChild(s); });
async function loadRemote() {
  if (DEMO_ON) { await loadScript('demo.js'); if (window.NOBLES_DEMO) { SB.attach(window.NOBLES_DEMO); HAS_BACKEND = true; } }
  if (!HAS_BACKEND) return;
  try {
    const t = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 5000));
    const [cats, prods] = await Promise.race([
      Promise.all([SB.select('categories', 'select=*&order=sort.asc'), SB.select('products', 'select=*&active=eq.true&order=sort.asc,created_at.desc')]),
      t,
    ]);
    if (!cats.length || !prods.length) return;
    CATEGORIES = cats.map(c => ({ id: c.id, name: c.name, blurb: c.blurb, image: c.image, list: c.price_list }));
    PRODUCTS = prods.map(p => ({ id: p.slug, image: p.image, cat: p.category_id, name: p.name, desc: p.description, price: p.price ? Number(p.price) : null, featured: p.featured }));
    const f = PRODUCTS.filter(p => p.featured).map(p => p.id);
    FEATURED = (f.length ? f : PRODUCTS.map(p => p.id)).slice(0, 8);
  } catch (e) { /* keep static catalogue */ }
}

const PAGES = [
  ['home', 'index.html', 'Home'],
  ['shop', 'shop.html', 'Shop'],
  ['prices', 'prices.html', 'Prices'],
  ['categories', 'categories.html', 'Categories'],
  ['how', 'how-it-works.html', 'How it works'],
  ['contact', 'contact.html', 'Contact'],
  ['track', 'track.html', 'Track order'],
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
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.500" cy="8.500" r="1.200"/></svg>',
  track: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.600 7-11a7 7 0 1 0-14 0c0 5.400 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/></svg>',
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
    <a class="icon-btn trk" href="track.html" aria-label="Track your order" title="Track your order">${ICON.track}</a>
    <a class="icon-btn wa-top" href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICON.wa}</a>
    <button class="icon-btn" id="openCart" aria-label="Open cart">${ICON.cart}<i class="badge" id="cartCount" hidden>0</i></button>
  </div>
</header>`;

const SOCIALS = [
  ['Instagram', 'https://www.instagram.com/thenobles.gift_hub', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>'],
  ['TikTok', 'https://www.tiktok.com/@thenobles.gift.hub', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.5a3.5 3.5 0 1 1-3.500-3.500"/><path d="M14 4c.4 2.600 2.100 4.200 5 4.400"/></svg>'],
  ['Snapchat', 'https://snapchat.com/t/fTYPJ3nl', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M12 3.500c-3 0-4.500 2.200-4.500 4.700v1.800c-.6.100-1.300.3-1.900.500.500.900 1.100 1.100 1.700 1.300-.4 1.500-1.700 2.600-3.100 3 .8.700 1.900.9 2.900 1 .3.600.4 1.300 1.100 1.300.8 0 1.500-.5 2.800-.5s2 .5 2.800.5c.7 0 .8-.7 1.100-1.300 1-.1 2.100-.3 2.900-1-1.400-.4-2.700-1.500-3.100-3 .6-.2 1.200-.4 1.700-1.300-.6-.2-1.300-.4-1.900-.5V8.200c0-2.500-1.500-4.700-4.500-4.700z"/></svg>'],
];

const footer = `
<footer>
  <div class="socials" aria-label="Follow TheNobles">
    ${SOCIALS.map(([n, href, svg]) => `<a href="${href}" target="_blank" rel="noopener" aria-label="${n}" title="${n}">${svg}</a>`).join('')}
  </div>
  <p class="foot-info">NIMA &amp; UPSA, Accra · Delivery nationwide · <a href="tel:+233${PHONE.slice(1)}">${PHONE}</a> · <a href="mailto:${EMAIL}">${EMAIL}</a></p>
  <p class="foot-links"><a href="track.html">Track order</a><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms of Service</a></p>
  <p class="copy">© ${new Date().getFullYear()} TheNobles.gift&amp;surprise_hub. All rights reserved.</p>
  <p class="credit">Designed by <a href="https://baidenz-studioz-web.vercel.app/" target="_blank" rel="noopener">Baidenz Studioz</a></p>
</footer>`;

const dock = `
<nav class="dock" aria-label="Quick navigation">
  <a href="index.html" aria-label="Home"${page === 'home' ? ' aria-current="page"' : ''}>${ICON.home}</a>
  <a href="shop.html" aria-label="Shop"${page === 'shop' ? ' aria-current="page"' : ''}>${ICON.gift}</a>
  <a href="prices.html" aria-label="Price list"${page === 'prices' ? ' aria-current="page"' : ''}>${ICON.tag}</a>
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
      <p class="m-price" id="mPrice" hidden></p>
      <label class="field">Name or message on the gift <small>(optional)</small>
        <input id="mNote" maxlength="60" placeholder="e.g. Happy Birthday Ama">
      </label>
      <div class="qty-row">
        <div class="qty"><button id="mMinus" aria-label="Less">−</button><span id="mQty">1</span><button id="mPlus" aria-label="More">+</button></div>
        <button class="btn primary grow" id="mAdd">Add to cart</button>
      </div>
      <a class="pl" id="mList" href="prices.html" hidden>View the price list</a>
      <p class="fine">Rashida checks availability and confirms the final price. You can track your order after you place it.</p>
    </div>
  </div>
</div>
<div class="overlay" id="reviewWrap" hidden>
  <div class="modal review-modal" role="dialog" aria-modal="true" aria-labelledby="rTitle">
    <button class="x" data-close aria-label="Close">×</button>
    <form class="m-body" id="reviewForm">
      <h3 id="rTitle">Write a review</h3>
      <p>Tell us about your gift. Reviews appear on the site after Rashida approves them.</p>
      <label class="field">Your name<input name="name" required maxlength="80" placeholder="Your name"></label>
      <div class="field">Rating
        <div class="stars-in" role="radiogroup" aria-label="Rating">
          ${[5,4,3,2,1].map(n => `<input type="radio" name="rating" id="rt${n}" value="${n}"${n === 5 ? ' checked' : ''}><label for="rt${n}" title="${n} stars">★</label>`).join('')}
        </div>
      </div>
      <label class="field">Your review<textarea name="comment" rows="4" required maxlength="800" placeholder="What did you order and how was it?"></textarea></label>
      <p class="err" id="rErr" role="alert" hidden></p>
      <button class="btn primary" type="submit">Submit review</button>
    </form>
  </div>
</div>
<div class="overlay" id="doneWrap" hidden>
  <div class="modal done-modal" role="dialog" aria-modal="true" aria-labelledby="dTitle">
    <button class="x" data-close aria-label="Close">×</button>
    <div class="done-body">
      <div class="tick"><svg viewBox="0 0 52 52" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="26" cy="26" r="23" class="ring"/><path d="m15 27 8 8 15-17" class="check"/></svg></div>
      <h3 id="dTitle">Order received</h3>
      <p>Thank you<span id="doneName"></span>. Rashida will check availability and update you on the tracking page.</p>
      <div class="refchip">Order number <b id="doneRef"></b></div>
      <a class="btn primary wide" id="doneTrack" href="track.html">Track your order</a>
      <button class="btn ghost wide" data-close>Continue shopping</button>
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
        <button class="btn primary wide" type="submit">Place order</button>
        <p class="fine">No payment is taken on this site. Rashida checks availability and confirms the price. You can follow your order on the <a href="track.html" style="text-decoration:underline">Track your order</a> page.</p>
      </form>
    </div>
  </aside>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;

document.body.insertAdjacentHTML('afterbegin', header);
document.body.insertAdjacentHTML('beforeend', footer + dock + overlays);
if (DEMO_ON) {
  document.body.insertAdjacentHTML('afterbegin', '<div class="demobar"><span>Demo data is on in this browser</span><button id="demoOff">Turn off</button></div>');
  $('#demoOff').addEventListener('click', () => { localStorage.removeItem('nobles-demo'); location.reload(); });
}

(async () => {
await loadRemote();

/* ---------- state ---------- */
let state = { cat: 'all', q: '' };
let cart = [];
try { cart = JSON.parse(localStorage.getItem('nobles-cart') || '[]').filter(l => PRODUCTS.some(p => p.id === l.id)); } catch (e) {}
const save = () => { try { localStorage.setItem('nobles-cart', JSON.stringify(cart)); } catch (e) {} };

/* ---------- product cards ---------- */
const priceLabel = p => p.price ? money(p.price) : (CATEGORIES.find(c => c.id === p.cat) || {}).list ? 'See price list' : 'Price on request';
const card = p => `
  <article class="p" data-id="${p.id}" tabindex="0" role="button" aria-label="${esc(p.name)}">
    <img src="${p.image}" alt="${esc(p.name)}" loading="lazy">
    <span class="tag">${catName(p.cat)}</span>
    <div class="p-info"><h3>${esc(p.name)}</h3><span>${priceLabel(p)}</span></div>
    <button class="add" data-quick="${p.id}" aria-label="Add ${esc(p.name)} to cart">+</button>
  </article>`;

/* home: categories row + featured */
const catsEl = $('#cats');
if (catsEl) catsEl.innerHTML = CATEGORIES.map(c =>
  `<a class="cat" href="shop.html?cat=${c.id}"><img src="${c.image}" alt="" loading="lazy"><span>${c.name}</span></a>`).join('');
const featEl = $('#featured');
if (featEl) featEl.innerHTML = FEATURED.map(id => card(PRODUCTS.find(p => p.id === id))).join('');

/* categories page */
const catPage = $('#catPage');
if (catPage) catPage.innerHTML = CATEGORIES.map(c => {
  const n = PRODUCTS.filter(p => p.cat === c.id).length;
  return `<a class="cat-card" href="shop.html?cat=${c.id}">
    <img src="${c.image}" alt="" loading="lazy">
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
  $('#mImg').src = p.image; $('#mImg').alt = p.name;
  $('#mCat').textContent = catName(p.cat); $('#mTitle').textContent = p.name;
  $('#mDesc').textContent = p.desc; $('#mNote').value = ''; $('#mQty').textContent = 1;
  $('#mPrice').hidden = !p.price; $('#mPrice').textContent = p.price ? money(p.price) : '';
  const cat = CATEGORIES.find(c => c.id === p.cat);
  $('#mList').hidden = !(cat && cat.list); if (cat && cat.list) $('#mList').href = 'prices.html#' + cat.list;
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
    return `<div class="line"><img src="${p.image}" alt="">
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

const rememberOrder = (ref, phone) => {
  try {
    const list = JSON.parse(localStorage.getItem('nobles-orders') || '[]').filter(o => o.ref !== ref);
    list.unshift({ ref, phone }); localStorage.setItem('nobles-orders', JSON.stringify(list.slice(0, 10)));
  } catch (e) {}
};
function showDone(ref, name) {
  $('#doneRef').textContent = ref; $('#doneName').textContent = name ? ' ' + name.split(' ')[0] : '';
  $('#doneTrack').href = 'track.html?ref=' + encodeURIComponent(ref);
  show('#doneWrap');
}

$('#checkout').addEventListener('submit', async e => {
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

  const btn = e.submitter; if (btn) { btn.disabled = true; btn.textContent = 'Placing your order…'; }
  const gift = $('#giftToggle').checked;
  const items = cart.map(l => { const p = PRODUCTS.find(x => x.id === l.id); return { slug: p.id, name: p.name, qty: l.qty, note: l.note || '' }; });
  try {
    if (!HAS_BACKEND) throw new Error('offline');
    const ref = await SB.rpc('submit_order', { payload: {
      name, phone, fulfilment: delivery ? 'Delivery' : 'Pickup', address: (f.get('address') || '').trim(),
      event_date: f.get('date') || '', event_time: f.get('time') || '', is_gift: gift,
      recipient_name: gift ? (f.get('rname') || '').trim() : '', card_message: gift ? (f.get('msg') || '').trim() : '',
      notes: (f.get('notes') || '').trim(), items,
    } });
    if (!ref) throw new Error('no reference');
    rememberOrder(ref, phone);
    cart = []; save(); renderCart(); e.target.reset(); $('#giftBox').hidden = true; $('#addrRow').hidden = true;
    closeAll(); showDone(ref, name);
  } catch (x) {
    fail('We could not place your order just now. Please try again in a moment, or call 0551586167.');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Place order'; }
  }
});

/* contact page form */
const cf = $('#contactForm');
if (cf) cf.addEventListener('submit', async e => {
  e.preventDefault();
  const f = new FormData(cf), btn = e.submitter;
  const nm = (f.get('name') || '').trim(), ph = (f.get('phone') || '').trim(), msg = (f.get('message') || '').trim();
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  try {
    if (!HAS_BACKEND) throw new Error('offline');
    await SB.rpc('submit_message', { p_name: nm, p_phone: ph, p_message: msg });
    cf.reset(); toast('Message sent. We will get back to you soon.');
  } catch (x) { toast('Could not send. Please call 0551586167.'); }
  finally { if (btn) { btn.disabled = false; btn.textContent = 'Send message'; } }
});

/* ---------- reviews ---------- */
const stars = n => '★'.repeat(n) + '<i>' + '★'.repeat(5 - n) + '</i>';
const reviewList = $('#reviewList');
if (reviewList && HAS_BACKEND) {
  $('#reviews').hidden = false;
  (async () => {
    let rows = [];
    try { rows = await SB.select('reviews', 'select=name,rating,comment&status=eq.approved&order=created_at.desc&limit=6'); } catch (x) {}
    if (!rows.length) { $('#reviews').hidden = false; reviewList.innerHTML = '<p class="empty">No reviews yet. Be the first to share your experience.</p>'; return; }
    const avg = rows.reduce((s, r) => s + r.rating, 0) / rows.length;
    $('#reviewSummary').innerHTML = `<b>${avg.toFixed(1)}</b><span class="stars">${stars(Math.round(avg))}</span>`;
    reviewList.innerHTML = rows.map(r => `<article class="review"><span class="stars">${stars(r.rating)}</span><p>${esc(r.comment)}</p><b>${esc(r.name)}</b></article>`).join('');
  })();
}
document.addEventListener('click', e => { if (e.target.closest('[data-review]')) show('#reviewWrap'); });
$('#reviewForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = new FormData(e.target), err = $('#rErr');
  try {
    if (!HAS_BACKEND) throw new Error('offline');
    await SB.rpc('submit_review', { p_name: (f.get('name') || '').trim(), p_rating: Number(f.get('rating')), p_comment: (f.get('comment') || '').trim() });
    e.target.reset(); closeAll(); toast('Thank you. Your review is awaiting approval.');
  } catch (x) { err.textContent = 'Could not send your review. Please try again.'; err.hidden = false; }
});

/* ---------- track your order ---------- */
const trackForm = $('#trackForm');
if (trackForm) {
  const STEPS = [
    ['new', 'Order received', 'We have your order and are checking availability.'],
    ['confirmed', 'Confirmed', 'Your items are confirmed and your order is booked in.'],
    ['in_progress', 'Being prepared', 'Your gift is being put together by hand.'],
    ['ready', 'Ready', null],
    ['delivered', 'Delivered', 'Enjoy your gift. Thank you for choosing TheNobles.'],
  ];
  let current = null, timer = null;
  const saved = () => { try { return JSON.parse(localStorage.getItem('nobles-orders') || '[]'); } catch (e) { return []; } };
  const when = d => { const s = (Date.now() - new Date(d)) / 1000; return s < 60 ? 'just now' : s < 3600 ? Math.floor(s / 60) + ' min ago' : s < 86400 ? Math.floor(s / 3600) + ' h ago' : new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); };
  const renderSaved = () => {
    const list = saved(); const box = $('#trackSaved');
    box.hidden = !list.length;
    box.innerHTML = list.length ? '<p class="eyebrow">Your recent orders</p><div class="chips">' + list.map(o => `<button type="button" class="chip" data-tref="${esc(o.ref)}">${esc(o.ref)}</button>`).join('') + '</div>' : '';
  };
  function render(o) {
    const cancelled = o.status === 'cancelled', idx = STEPS.findIndex(s => s[0] === o.status);
    const readyText = o.fulfilment === 'Delivery' ? 'Your order is ready and on its way to you.' : 'Your order is ready for pickup at NIMA / UPSA.';
    const head = cancelled ? ['Order cancelled', 'This order was cancelled. Message us if you would like to place it again.'] : [STEPS[idx][1], STEPS[idx][0] === 'ready' ? readyText : STEPS[idx][2]];
    const availLabel = i => i.available === true ? '<span class="av y">Available</span>' : i.available === false ? '<span class="av n">Not available</span>' : o.status === 'new' ? '<span class="av c">Checking availability</span>' : '<span class="av y">Available</span>';
    $('#trackResult').hidden = false;
    $('#trackResult').innerHTML = `
      <div class="t-head ${cancelled ? 'bad' : ''}"><div><p class="eyebrow">Order ${esc(o.ref)}</p><h2>${esc(head[0])}</h2><p>${esc(head[1])}</p></div><span class="t-pulse"></span></div>
      ${cancelled ? '' : `<ol class="t-steps">${STEPS.map((s, n) => `<li class="${n < idx ? 'done' : n === idx ? 'cur' : ''}"><i></i><span>${s[1]}</span></li>`).join('')}</ol>`}
      <div class="t-card note"><p class="eyebrow">Message from Rashida</p><p>${o.customer_note ? esc(o.customer_note) : 'Rashida will post an update here soon.'}</p>${o.eta ? `<p class="eta">Expected: <b>${esc(o.eta)}</b></p>` : ''}</div>
      <div class="t-card"><p class="eyebrow">Your items</p><ul class="t-items">${(o.items || []).map(i => `<li><div><b>${esc(i.name)}</b>${i.note ? `<small>“${esc(i.note)}”</small>` : ''}<small>Quantity ${i.qty}</small></div>${availLabel(i)}</li>`).join('')}</ul></div>
      <div class="t-card two-col"><div><p class="eyebrow">${o.fulfilment === 'Delivery' ? 'Delivery' : 'Pickup'}</p><p>${o.fulfilment === 'Delivery' ? esc(o.address || '') : 'NIMA / UPSA, Accra'}</p>${o.event_date ? `<small>${new Date(o.event_date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}${o.event_time ? ' at ' + esc(o.event_time) : ''}</small>` : ''}</div>
        <div><p class="eyebrow">Payment</p><p>${o.total ? '<b>' + money(o.total) + '</b>' : 'To be confirmed'}</p><small>${o.paid ? 'Paid' : o.total ? 'Awaiting payment' : ''}</small></div></div>
      <p class="t-foot">Last updated ${when(o.updated_at)} · <button type="button" class="linkbtn" id="trackRefresh">Refresh</button></p>
      <a class="btn ghost wide" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hello TheNobles, a question about my order ' + o.ref)}" target="_blank" rel="noopener">Questions? Chat with us on WhatsApp</a>`;
    $('#trackResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  async function load(ref, phone, quiet) {
    const err = $('#trackErr'); err.hidden = true;
    const btn = $('#trackBtn'); if (!quiet) { btn.disabled = true; btn.textContent = 'Looking up…'; }
    try {
      if (!HAS_BACKEND) throw new Error('offline');
      const o = await SB.rpc('track_order', { p_ref: ref, p_phone: phone });
      if (!o) { if (!quiet) { err.textContent = 'We could not find that order. Check the order number and the phone number you used.'; err.hidden = false; $('#trackResult').hidden = true; } return; }
      current = { ref: o.ref, phone }; rememberOrder(o.ref, phone); renderSaved(); render(o);
      clearInterval(timer); timer = setInterval(() => load(current.ref, current.phone, true), 30000);
    } catch (x) { if (!quiet) { err.textContent = 'Something went wrong. Please try again.'; err.hidden = false; } }
    finally { btn.disabled = false; btn.textContent = 'Track order'; }
  }
  trackForm.addEventListener('submit', e => { e.preventDefault(); const f = new FormData(trackForm); load(String(f.get('ref')).trim(), String(f.get('phone')).trim()); });
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-tref]');
    if (c) { const o = saved().find(x => x.ref === c.dataset.tref); if (o) { trackForm.ref.value = o.ref; trackForm.phone.value = o.phone; load(o.ref, o.phone); } }
    if (e.target.closest('#trackRefresh') && current) load(current.ref, current.phone);
  });
  renderSaved();
  const qref = (new URLSearchParams(location.search).get('ref') || '').toUpperCase();
  if (qref) {
    trackForm.ref.value = qref;
    const o = saved().find(x => x.ref === qref);
    if (o) { trackForm.phone.value = o.phone; load(o.ref, o.phone); }
  } else if (saved()[0]) { trackForm.ref.value = saved()[0].ref; trackForm.phone.value = saved()[0].phone; }
}

/* ---------- misc ---------- */
let tt; function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 1600); }
(() => { const h = new Date().getHours(); $('#greet').textContent = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; })();
renderCart();
})();
