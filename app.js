/* ============================================================
   DEECUTS – Fresh Chicken  |  app.js
   Firebase Realtime Database Integration (v8 compat CDN)
   ============================================================ */


/* ══════════════════════════════════════════════════════════
   § FIREBASE — Initialisation & Database Connection
   ══════════════════════════════════════════════════════════ */

/**
 * 🔧 SETUP STEPS (replace the placeholder values below):
 *
 *  1. Go to https://console.firebase.google.com
 *  2. Create a project → Add Web App → copy the firebaseConfig object
 *  3. In Firebase Console → Realtime Database → Create Database
 *  4. Rules tab → paste these rules for testing, then tighten for production:
 *
 *     {
  "rules": {
    "orders": {
      ".read": false,
      ".write": "auth != null",
      "$orderId": {
        ".validate": "newData.hasChildren(['customerName','customerPhone','customerAddress','cartItems','totalAmount'])"
      }
    }
  }
}
 */

const firebaseConfig = {
  apiKey: "AIzaSyCLooaJmCyTnVGXYmnPfong-rz_tZJZWu0",
  authDomain: "deecuts-chicken-10e75.firebaseapp.com",
  databaseURL: "https://deecuts-chicken-10e75-default-rtdb.firebaseio.com",
  projectId: "deecuts-chicken-10e75",
  storageBucket: "deecuts-chicken-10e75.firebasestorage.app",
  messagingSenderId: "829705752806",
  appId: "1:829705752806:web:8817ede4a9590e48de2b27",
  measurementId: "G-MPPE04B0ZT"
};
// Initialise Firebase app (guard against double-initialisation during hot reloads)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get a reference to the Realtime Database service
const db = firebase.database();


/* ══════════════════════════════════════════════════════════
   § PRODUCTS — Catalogue Data
   ══════════════════════════════════════════════════════════ */
const skinOption = [
 "With Skin",
 "Without Skin"
];

const products = [
  {
 id:1,
 name:"Chicken Curry Cut",
 cat:"Curry Cut",
 image:"image/new1.png",
skin:skinOption,

  weights:[
 {
  kg:"500 g",
  price:139,
  mrp:199
 },
 {
  kg:"1 kg",
  price:259,
  mrp:359
 },
 {
  kg:"2 kg",
  price:499,
  mrp:699
 }
],

sizes:[
 "Small",
 "Medium",
 "Large"
],

 desc:"Fresh and hygienically cut curry pieces. Perfect for daily cooking."
},
  
{ id:3,  name:"Chicken Boneless",    cat:"Boneless",  image:"image/new3.png", skin:skinOption, weights:[
 {
  kg:"500 g",
  price:169,
  mrp:269
 },
 {
  kg:"1 kg",
  price:289,
  mrp:389
 },
 {
  kg:"2 kg",
  price:569,
  mrp:669
 }
],

sizes:[
 "Small",
 "Medium",
 "Large"
],  desc:"Premium boneless chicken breast. Perfect for stir fry and biryani." },
 
{ id:4,  name:"Chicken Wings",       cat:"Wings",     image:"image/new4.png", skin:skinOption, weights:[
 {
  kg:"500 g",
  price:99,
  mrp:199
 },
 {
  kg:"1 kg",
  price:199,
  mrp:299
 },
 {
  kg:"2 kg",
  price:399,
  mrp:599
 }
],

sizes:[
 "Small",
 "Medium",
 "Large"
],  desc:"Crispy and flavourful wings. Perfect for frying and grilling." },
  
  { id:7,  name:"Chicken Thigh",       cat:"Boneless",  image:"image/new7.png", skin:skinOption, weights:[
{
  kg:"500 g",
  price:149,
  mrp:199
 },
 {
  kg:"1 kg",
  price:399,
  mrp:549
 },
 {
  kg:"2 kg",
  price:599,
  mrp:749
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
],  desc:"Tender boneless thighs. Ideal for burgers and curries." },
  
{ id:8,  name:"Whole Chicken",       cat:"Whole",    image:"image/new8.png", skin:skinOption, weights:[
{
  kg:"1 kg",
  price:229,
  mrp:359
 },
 {
  kg:"2 kg",
  price:459,
  mrp:359
 },
 {
  kg:"3 kg",
  price:459,
  mrp:599
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
] ,   desc:"Full farm-fresh whole chicken. Dressed and ready to cook." },
  
{ id:14,  name:"Chicken whole leg",   cat:"Leg Piece",  image:"image/new14.jpeg", weights:[
{
  kg:"500 g",
  price:139,
  mrp:199
 },
 {
  kg:"1 kg",
  price:279,
  mrp:399
 },
 {
  kg:"2 kg",
  price:599,
  mrp:699
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
],   desc:"Fresh and hygienically cut curry pieces. Perfect for daily cooking." },

 { id:2,  name:"Chicken Leg Piece",   cat:"Leg Piece", image:"image/new20.png",weights:[
 {
  kg:"500 g",
  price:249,
  mrp:299
 },
 {
  kg:"1 kg",
  price:498,
  mrp:599
 },
 {
  kg:"2 kg",
  price:996,
  mrp:1199
 }
],

sizes:[
 "Small",
 "Medium",
 "Large"
],   desc:"Juicy and tender chicken leg pieces. Great for grilling and curries." },

{ id:15,  name:"Chicken lolipop",   cat:"Leg Piece",  image:"image/new15.png", weights:[
{
  kg:"500 g",
  price:199,
  mrp:299
 },
 {
  kg:"1 kg",
  price:398,
  mrp:599
 },
 {
  kg:"2 kg",
  price:796,
  mrp:1199
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
],   desc:"Fresh and hygienically cut curry pieces. Perfect for daily cooking." },

{ id:13,  name:"Chicken Biriyani Cut",   cat:"Curry Cut",  image:"image/new13.jpeg", skin:skinOption, weights:[
{
  kg:"500 g",
  price:249,
  mrp:299
 },
 {
  kg:"1 kg",
  price:498,
  mrp:599
 },
 {
  kg:"2 kg",
  price:996,
  mrp:1199
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
],   desc:"Fresh and hygienically cut curry pieces. Perfect for daily cooking." },

  { id:12, name:"Chicken Drumstick",   cat:"Leg Piece",image:"image/new12.png", weights:[
{
  kg:"500 g",
  price:249,
  mrp:299
 },
 {
  kg:"1 kg",
  price:498,
  mrp:599
 },
 {
  kg:"2 kg",
  price:996,
  mrp:1199
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
],   desc:"Meaty drumsticks perfect for biryani and curries." },
  { id:10, name:"Chicken Heart",       cat:"Liver",     image:"image/new10.png", weights:[
{
  kg:"100 g",
  price:49,
  mrp:99
 },
 {
  kg:"500 g",
  price:99,
  mrp:199
 },
 {
  kg:"1 kg",
  price:199,
  mrp:299
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
],  desc:"Nutritious and fresh chicken heart. Rich in protein." },
  { id:11, name:"Chicken Feet",        cat:"Whole",     image:"image/new11.png", weights:[
{
  kg:"500 g",
  price:29,
  mrp:99
 },
 {
  kg:"1 kg",
  price:49,
  mrp:159
 },
 {
  kg:"2 kg",
  price:99,
  mrp:299
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
],  desc:"Fresh chicken feet for soups and stocks." },

  { id:5,  name:"Chicken Mince",       cat:"Boneless",  image:"image/new5.png", weights:[
{
  kg:"500 g",
  price:149,
  mrp:299
 },
 {
  kg:"1 kg",
  price:299,
  mrp:499
 },
 {
  kg:"2 kg",
  price:699,
  mrp:799
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
],  desc:"Freshly minced chicken. Great for kebabs and momos." },

{ id:9,  name:"Chicken Gizzard",     cat:"Liver",    image:"image/new9.png", weights:[
{
  kg:"500 g",
  price:99,
  mrp:199
 },
 {
  kg:"1 kg",
  price:198,
  mrp:399
 },
 {
  kg:"2 kg",
  price:396,
  mrp:599
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
],  desc:"Clean and fresh gizzards. Traditional favourite." },

{ id:6,  name:"Chicken Liver",       cat:"Liver",     image:"image/new6.png",  weights:[
{
  kg:"500 g",
  price:159,
  mrp:299
 },
 {
  kg:"1 kg",
  price:329,
  mrp:599
 },
 {
  kg:"2 kg",
  price:639,
  mrp:899
 }
], sizes:[
 "Small",
 "Medium",
 "Large"
],  desc:"Rich in iron and proteins. Perfectly cleaned and fresh." },
 
];

/* ══════════════════════════════════════════════════════════
   § STATE — Runtime Variables
   ══════════════════════════════════════════════════════════ */

let cart        = {};   // { productId: quantity }
let currentProd = null; // product object shown in detail page
let detQtyVal   = 1;    // quantity selected on detail page
let currentPage = "home";
let currentSort = "popular";
const productsPerPage = 10;
let selectedSlot = "10 AM - 12 PM"; // default delivery slot

let reviewProductId = null;
let reviewRating = 0;

let ratings = {
overall:0,
freshness:0,
packing:0
};

/* ══════════════════════════════════════════════════════════
   § NAVIGATION — Page Routing
   ══════════════════════════════════════════════════════════ */

/**
 * Switch between SPA pages.
 * @param {string} p - page id suffix (home | shop | cart | checkout | detail | account | success)
 */
function showPage(p) {

  // hide all pages
  document.querySelectorAll(".page")
  .forEach(el=>{
    el.classList.remove("active");
  });


  // show selected page
  const target = document.getElementById("page-" + p);


  if(target){

    target.classList.add("active");

  }


  currentPage = p;



  // desktop nav

  ["home","shop"].forEach(n=>{

    const el=document.getElementById("nl-"+n);

    if(el){
      el.classList.remove("active");
    }

  });


  const nav=document.getElementById("nl-"+p);

  if(nav){
    nav.classList.add("active");
  }



  // mobile nav

  ["home","shop","cart","acc"].forEach(n=>{

    const el=document.getElementById("mn-"+n);

    if(el){
      el.classList.remove("active");
    }

  });



  const mobileMap={
    home:"mn-home",
    shop:"mn-shop",
    cart:"mn-cart",
    account:"mn-acc"
  };


  if(mobileMap[p]){

    const m=document.getElementById(mobileMap[p]);

    if(m){
      m.classList.add("active");
    }

  }



  // render pages

  if(p==="home") renderFeatured();

if(p==="shop"){
  currentPage = 1;
  renderShop("All");
}

  if(p==="cart") renderCart();

  if(p==="checkout") renderCheckout();

  if(p==="account"){

setTimeout(()=>{

renderAccountOrders();

},100);

}



  window.scrollTo({
    top:0,
    behavior:"smooth"
  });

}


/* ══════════════════════════════════════════════════════════
   § FILTER DRAWER — Mobile Filter Panel
   ══════════════════════════════════════════════════════════ */

function toggleFilterDrawer() {
  const s = document.getElementById("shop-sidebar");
  if (s) s.classList.toggle("open");
}




/* ══════════════════════════════════════════════════════════
   § PRODUCTS — Rendering Helpers
   ══════════════════════════════════════════════════════════ */

/** Build a single product card HTML string */
function productCardHTML(p) {
  const imgSrc = p.image || "";
  const displayPrice = p.weights ? p.weights[0].price : p.price;
const displayMrp = p.weights ? p.weights[0].mrp : p.mrp;

const discount = Math.round(((displayMrp - displayPrice) / displayMrp) * 100);
  return `
    <div class="product-card" onclick="showDetail(${p.id})">
      <div class="product-img">
        ${imgSrc
          ? `<img src="${imgSrc}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ``}
        <div class="product-img-fallback" style="${imgSrc ? 'display:none' : 'display:flex'}">🍗</div>
        <div class="product-badge">FRESH</div>
        ${discount > 0 ? `<div class="product-discount-badge">-${discount}%</div>` : ""}
        <div class="product-img-overlay"></div>
      </div>
      <div class="product-body">
        <div class="product-cat-tag">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-weight">
${p.weights ? p.weights[0].kg : p.wt}
</div>
        <div class="product-price-row">
          <span class="product-price">₹${displayPrice}</span>
<span class="product-mrp">₹${displayMrp}</span>
        </div>
        <button class="add-to-cart-btn" onclick="event.stopPropagation();quickAdd(${p.id})">
          <span>Add to Cart</span>
          <span class="btn-icon">+</span>
        </button>
      </div>
    </div>`;
}

/* Home featured */
function renderFeatured(){

 const el=document.getElementById("featured-grid");

 if(el){
  el.innerHTML = products.slice(0,6)
  .map(productCardHTML)
  .join("");
 }

}



/* Shop pagination */
function renderShop(cat){

let fp = cat==="All"
? [...products]
: products.filter(p=>p.cat===cat);


// SORTING

if(currentSort==="low"){

 fp.sort((a,b)=>
 a.weights[0].price - b.weights[0].price
 );

}


if(currentSort==="high"){

 fp.sort((a,b)=>
 b.weights[0].price - a.weights[0].price
 );

}


if(currentSort==="new"){

 fp.sort((a,b)=>
 b.id - a.id
 );

}


 const grid=document.getElementById("shop-grid");
 const count=document.getElementById("showing-count");


 let totalPages=Math.ceil(fp.length/productsPerPage);


 let start=(currentPage-1)*productsPerPage;

 let end=start+productsPerPage;


 let showProducts=fp.slice(start,end);



 if(count){

 count.textContent =
 `Showing ${start+1}–${Math.min(end,fp.length)} of ${fp.length}`;

 }



 if(grid){

 grid.innerHTML =
 showProducts.map(productCardHTML).join("");

 }


 renderPagination(totalPages,cat);

}



/* Pagination buttons */
function renderPagination(totalPages,cat){

 const pagination=document.querySelector(".pagination");

 if(!pagination) return;


 let html="";


 for(let i=1;i<=totalPages;i++){

 html+=`

 <button class="pg-btn ${i===currentPage?'active':''}"

 onclick="changePage(${i},'${cat}')">

 ${i}

 </button>

 `;

 }



 if(currentPage < totalPages){

 html+=`

 <button class="pg-btn"

 onclick="changePage(${currentPage+1},'${cat}')">

 ›

 </button>

 `;

 }


 pagination.innerHTML=html;

}

function sortProducts(type){

 currentSort = type;

 currentPage = 1;

 renderShop("All");

}

/* Change page */
function changePage(page,cat){

 currentPage=page;

 renderShop(cat);


 window.scrollTo({
  top:0,
  behavior:"smooth"
 });

}



/* Filter */
function filterProducts(cat,el){

 currentPage=1;


 document.querySelectorAll(".filter-pill")
 .forEach(p=>p.classList.remove("active"));


 if(el) el.classList.add("active");


 renderShop(cat);


 if(window.innerWidth<=768){

 const sidebar=document.getElementById("shop-sidebar");

 if(sidebar) sidebar.classList.remove("open");

 }

}



/* Category click */
function goCat(cat){

 showPage("shop");


 setTimeout(()=>{


 filterProducts(cat,null);


 document.querySelectorAll(".filter-pill")
 .forEach(p=>{

 if(p.textContent.trim()===cat){

 p.classList.add("active");

 }

 });


 },50);

}

/* ══════════════════════════════════════════════════════════
   § PRODUCT DETAIL PAGE
   ══════════════════════════════════════════════════════════ */

/** Open the product detail page for a given product id */
function showDetail(id) {
  currentProd = products.find(p => p.id === id);
  if (!currentProd) return;

  detQtyVal = 1;
  document.getElementById("det-name").textContent   = currentProd.name;
 if(currentProd.weights){

  document.getElementById("det-price").textContent =
  "₹" + currentProd.weights[0].price;

  document.getElementById("det-mrp").textContent =
  "₹" + currentProd.weights[0].mrp;

  loadOptions(currentProd);

}else{

  document.getElementById("det-price").textContent =
  "₹" + currentProd.price;

  document.getElementById("det-mrp").textContent =
  "₹" + currentProd.mrp;

}
  document.getElementById("det-desc").textContent   = currentProd.desc;
  document.getElementById("det-main").innerHTML = `
  <img src="${currentProd.image || ''}"
    alt="${currentProd.name}"
    style="width:100%;height:100%;object-fit:cover;border-radius:24px;transition:transform .4s ease"
    onerror="this.style.display='none'"
    onmouseover="this.style.transform='scale(1.04)'"
    onmouseout="this.style.transform='scale(1)'"
  >
`;
  document.getElementById("det-qty").textContent    = 1;
  document.getElementById("det-crumb").innerHTML    = `Home · Shop · <span>${currentProd.name}</span>`;

  showPage("detail");
  setTimeout(()=>{
  loadReviewSummary(id);
},500);

}

/** Switch the main product image from thumbnail click */
function setImg(el, img) {

  document.querySelectorAll(".thumb").forEach(t=>{
    t.classList.remove("active");
  });

  el.classList.add("active");

  document.getElementById("det-main").innerHTML = `
    <img src="${img}"
    style="width:100%;height:100%;object-fit:cover;border-radius:24px">
  `;
}

/** Highlight the selected weight option */
function selWt(el) {
  document.querySelectorAll(".weight-opt").forEach(o => o.classList.remove("active"));
  el.classList.add("active");
}

/** Increment / decrement detail page quantity */
function detQty(d) {
  detQtyVal = Math.max(1, detQtyVal + d);
  document.getElementById("det-qty").textContent = detQtyVal;
}

/** Add the current detail-page product to the cart */
function addCurrent(){

 if(!currentProd) return;


if(!selectedWeight){

 selectedWeight = {
  kg: currentProd.weights[0].kg,
  price: currentProd.weights[0].price,
  mrp: currentProd.weights[0].mrp
 };

}

if(!selectedSize){
 selectedSize = currentProd.sizes[0];
}

cart[currentProd.id] = {

 product: currentProd,

 qty: detQtyVal,

 weight: selectedWeight,

size: selectedSize,
skin: selectedSkin

};


updateBadges();

toast(`${currentProd.name} added to cart 🎉`);

}

/** One-click add from product card */
function quickAdd(id) {

  const p = products.find(x => x.id === id);

  if(!p) return;


  if(!cart[id]){

    cart[id] = {
  product: p,
  qty: 1,
  weight: {
    kg: p.weights[0].kg,
    price: p.weights[0].price,
    mrp: p.weights[0].mrp
  },
  size: p.sizes[0],
  skin: p.skin ? p.skin[0] : ""
};

  }else{

    cart[id].qty++;

  }


  updateBadges();

  toast(`${p.name} added! 🛒`);

}

let selectedWeight = null;
let selectedSize = null;
let selectedSkin = null;

function loadOptions(product){

selectedWeight = {
 kg: product.weights[0].kg,
 price: product.weights[0].price,
 mrp: product.weights[0].mrp
};

selectedSize = product.sizes[0];
selectedSkin = product.skin ? product.skin[0] : "";

let w=document.getElementById("weight-box");

w.innerHTML="";


product.weights.forEach((x,i)=>{


w.innerHTML += `

<div class="weight-opt ${i==0?'active':''}"

onclick="selectWeight(${x.price},${x.mrp},'${x.kg}',this)">

${x.kg}

</div>

`;

});

let skin=document.getElementById("skin-box");

if(skin){

skin.innerHTML="";


if(product.skin){

product.skin.forEach((x,i)=>{


skin.innerHTML += `

<div class="weight-opt ${i==0?'active':''}"

onclick="selectSkin('${x}',this)">

${x}

</div>

`;

});


}


}


let s=document.getElementById("size-box");

s.innerHTML="";


product.sizes.forEach((x,i)=>{


s.innerHTML += `

<div class="weight-opt"

onclick="selectSize('${x}',this)">

${x}

</div>

`;

});


}

function selectSkin(type,el){

selectedSkin = type;


document.querySelectorAll("#skin-box .weight-opt")
.forEach(x=>x.classList.remove("active"));


el.classList.add("active");

}

function selectWeight(price,mrp,kg,el){

selectedWeight={
 kg:kg,
 price:price,
 mrp:mrp
};


document.querySelectorAll("#weight-box .weight-opt")
.forEach(x=>x.classList.remove("active"));


el.classList.add("active");


document.getElementById("det-price").innerHTML="₹"+price;

document.getElementById("det-mrp").innerHTML="₹"+mrp;

}

function selectSize(size,el){

selectedSize=size;


document.querySelectorAll("#size-box .weight-opt")
.forEach(x=>x.classList.remove("active"));


el.classList.add("active");

}


/* ══════════════════════════════════════════════════════════
   § CART BADGE — Keep header counts updated
   ══════════════════════════════════════════════════════════ */

function updateBadges() {
  const total = Object.values(cart)
    .reduce((a, b) => a + (b.qty || 0), 0);

  const badge = document.getElementById("cart-badge");
  const mobBadge = document.getElementById("mob-cart-badge");

  if (badge) badge.textContent = total;
  if (mobBadge) mobBadge.textContent = total;

  // also sync localStorage cart (IMPORTANT)
  localStorage.setItem("cart", JSON.stringify(cart));
}


/* ══════════════════════════════════════════════════════════
   § CART PAGE — Render Full Cart
   ══════════════════════════════════════════════════════════ */

function renderCart() {
  const keys = Object.keys(cart);
  const el   = document.getElementById("cart-content");
  if (!el) return;

  // Empty state
  if (!keys.length) {
    el.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <div class="empty-title">Cart is Empty</div>
        <div class="empty-sub">Add some fresh chicken to get started!</div>
        <button class="btn btn-primary" 
onclick="showPage('shop')">Shop Now →</button>
        
      </div>`;
    return;
  }

  // Build rows & calculate totals
  let subtotal = 0;
  const rows = keys.map(id => {
    const p    = products.find(x => x.id == id);
    const line = cart[id].weight.price * cart[id].qty;
    subtotal  += line;
    return `
      <div class="cart-row">
        <div class="cart-product">
          <div class="cart-prod-img">
            ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px" onerror="this.style.display='none'">` : `<span style="font-size:22px">🍗</span>`}
          </div>
          <div>
            <div class="cart-prod-name">${p.name}</div>
            <div class="cart-prod-wt">
${cart[id].weight?.kg || p.weights?.[0]?.kg || ""}
</div>
          </div>
        </div>
        <div class="cart-price-col">
₹${cart[id].weight.price}
</div>
        <div class="cart-qty">
          <button class="cqb" onclick="chgCart(${id},-1)">−</button>
          <span class="cqv">${cart[id].qty}</span>
          <button class="cqb" onclick="chgCart(${id},1)">+</button>
        </div>
        <div class="cart-line-total">₹${line}</div>
        <button class="cart-del" onclick="delCart(${id})">✕</button>
      </div>`;
  }).join("");

  const delivery = subtotal >= 399 ? 0 : 49; // free delivery above ₹499
  const gst      = Math.round(subtotal * 0.05);
  const total    = subtotal + delivery + gst;

  el.innerHTML = `
    <div class="cart-layout">
      <div>
        <div class="cart-table">
          <div class="cart-table-head">
            <span>Product</span><span>Price</span><span>Qty</span><span>Total</span><span></span>
          </div>
          ${rows}
        </div>
        <div class="coupon-row">

<input 
id="coupon-input"
class="coupon-input"
placeholder="Have a coupon? Apply Here"
value="${localStorage.getItem('couponMessage') || ''}"
>

<button 
class="btn btn-primary" 
style="padding:10px 18px;font-size:13px"
onclick="applyCoupon()">

Apply

</button>

</div>
        
      </div>
      <div class="order-summary">
        <div class="summary-title">Order Summary</div>
        <div class="summary-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
        <div class="summary-row">
          <span>Delivery Charge</span>
          <span>${delivery === 0 ? '<span style="color:var(--green)">FREE</span>' : '₹' + delivery}</span>
        </div>
        <div class="summary-row"><span>GST (5%)</span><span>₹${gst}</span></div>
        <div class="summary-row total"><span>Total</span><span>₹${total}</span></div>
        ${subtotal < 399 ? `<div style="font-size:11px;color:var(--green);text-align:center;margin-bottom:8px">Add ₹${399 - subtotal} more for FREE delivery!</div>` : ""}
        <div class="secure-badge">🔒 Your details are safe with us.</div>
        <button class="checkout-full-btn" onclick="showPage('checkout')">Proceed to Checkout →</button>
      </div>
    </div>`;
}

function saveCoupon(value){

  localStorage.setItem(
    "couponMessage",
    value
  );

  console.log("Coupon Saved:", value);

}

function applyCoupon(){

  const coupon =
  document.getElementById("coupon-input").value.trim();


  if(!coupon){

    alert("Enter coupon message");

    return;

  }


  localStorage.setItem(
    "couponMessage",
    coupon
  );


  console.log(
    "Coupon Applied:",
    coupon
  );


  toast("Coupon saved ✅");

}

window.applyCoupon = applyCoupon;

/** Change cart item quantity (handles zero → remove) */
function chgCart(id, d) {
  cart[id].qty += d;

if(cart[id].qty <= 0){
 delete cart[id];
}
  if (!cart[id]) delete cart[id];
  updateBadges();
  renderCart();
}

/** Remove an item completely from cart */
function delCart(id) {
  delete cart[id];
  updateBadges();
  renderCart();
}



/* ══════════════════════════════════════════════════════════
   § CHECKOUT PAGE — Render Order Summary
   ══════════════════════════════════════════════════════════ */

function renderCheckout() {
  const keys = Object.keys(cart).filter(k => cart[k].qty > 0);
  let subtotal = 0;

  const itemsHTML = keys.map(id => {
    const p = products.find(x => x.id == id);
    subtotal += cart[id].weight.price * cart[id].qty;
    return `
      <div class="order-item-row">
        <div class="order-item-img">
          ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px" onerror="this.style.display='none'">` : `<span style="font-size:18px">🍗</span>`}
        </div>
        <div style="flex:1">
          <div class="order-item-name">${p.name}</div>
          <div class="order-item-wt">
${cart[id].weight.kg} | ${cart[id].size} × ${cart[id].qty}
</div>
        </div>
       <div class="order-item-price">
₹${cart[id].weight.price * cart[id].qty}
</div>
      </div>`;
  }).join("");

  const delivery = subtotal >= 399 ? 0 : 49;
  const gst      = Math.round(subtotal * 0.05);
  const total    = subtotal + delivery + gst;

  const coItems  = document.getElementById("co-items");
  const coTotals = document.getElementById("co-totals");

  if (coItems)  coItems.innerHTML  = itemsHTML;
  if (coTotals) coTotals.innerHTML = `
    <div class="summary-row" style="margin-top:12px"><span>Subtotal</span><span>₹${subtotal}</span></div>
    <div class="summary-row"><span>Delivery</span><span>${delivery === 0 ? '<span style="color:var(--green)">FREE</span>' : '₹' + delivery}</span></div>
    <div class="summary-row"><span>GST (5%)</span><span>₹${gst}</span></div>
    <div class="summary-row total"><span>Total</span><span>₹${total}</span></div>`;
}

/** Highlight the selected delivery slot */
function selectSlot(el, slot) {
  document.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("selected"));
  el.classList.add("selected");
  selectedSlot = slot;
}

/** Highlight the selected payment method */
function selPay(el) {
  document.querySelectorAll(".pay-opt").forEach(o => o.classList.remove("sel"));
  el.classList.add("sel");
}


/* ══════════════════════════════════════════════════════════
   § FIREBASE — Place Order & Save to Realtime Database
   ══════════════════════════════════════════════════════════ */

/**
 * Validates the checkout form, builds the order object,
 * and writes it to Firebase under /orders/{pushId}.
 *
 * Called by the "Place Order" button in the checkout page.
 */
async function placeOrder() {
  // ── 1. Read form fields ──
  const nameEl  = document.getElementById("c-name");
  const phoneEl = document.getElementById("c-phone");
  const addrEl  = document.getElementById("c-addr");
  const cityEl  = document.getElementById("c-city");
  const pinEl   = document.getElementById("c-pin");

  const customerName    = nameEl  ? nameEl.value.trim()  : "";
  const customerPhone   = phoneEl ? phoneEl.value.trim() : "";
  const customerAddress = addrEl  ? addrEl.value.trim()  : "";
  const customerCity    = cityEl  ? cityEl.value.trim()  : "";
  const customerPin     = pinEl   ? pinEl.value.trim()   : "";

  // ── 2. Validate required fields ──
  if (!customerName) {
    alert("⚠️ Please enter your full name.");
    if (nameEl) nameEl.focus();
    return;
  }
  if (!customerPhone || customerPhone.length < 10) {
    alert("⚠️ Please enter a valid 10-digit phone number.");
    if (phoneEl) phoneEl.focus();
    return;
  }
  if (!customerAddress) {
    alert("⚠️ Please enter your delivery address.");
    if (addrEl) addrEl.focus();
    return;
  }

  // ── 3. Check cart is not empty ──
  const cartKeys = Object.keys(cart).filter(k => cart[k].qty > 0);
  if (!cartKeys.length) {
    alert("⚠️ Your cart is empty. Please add items before placing an order.");
    showPage("shop");
    return;
  }

  // ── 4. Build cart items array & calculate totals ──
  let subtotal    = 0;
  let totalItems  = 0;
  const cartItems = cartKeys.map(id => {
    const p     = products.find(x => x.id == id);
    const qty = cart[id].qty;

const price = cart[id].weight 
? cart[id].weight.price 
: p.price;

const line = price * qty;
    subtotal   += line;
    totalItems += qty;
    return {
      productId:   p.id,
      productName: p.name,
      category:    p.cat,
      weight: cart[id].weight.kg,
      skin: cart[id].skin || "",
      size: cart[id].size,
      unitPrice: price,
      quantity:    qty,
      lineTotal:   line
    };
  });

  const delivery    = subtotal >= 399 ? 0 : 49;
  const gst         = Math.round(subtotal * 0.05);
  const totalAmount = subtotal + delivery + gst;

  // ── 5. Get selected payment method label ──
  const paySelected = document.querySelector(".pay-opt.sel .pay-opt-name");
  const paymentMethod = paySelected ? paySelected.textContent : "Cash on Delivery";

  // ── 6. Build the order object ──
  const orderData = {
    // Customer details
    customerName,
    customerPhone,
    customerAddress,
    customerCity:    customerCity  || "Coimbatore",
    customerPin:     customerPin   || "",

    // Order details
    cartItems,
    totalItems,
    subtotal,
    deliveryCharge:  delivery,
    gstAmount:       gst,
    totalAmount,

    // Delivery & payment
    deliverySlot:    selectedSlot  || "10 AM - 12 PM",
    paymentMethod,
    orderStatus:     "Pending",

    // Metadata
    createdAt:       new Date().toISOString(),
    timestamp: firebase.database.ServerValue.TIMESTAMP,

couponMessage: localStorage.getItem("couponMessage") || ""

    //coubon data

  };

  // ── 7. Disable button & show loading state ──
  const placeBtn = document.querySelector(".place-order-btn");
  const originalText = placeBtn ? placeBtn.textContent : "";
  if (placeBtn) {
    placeBtn.disabled     = true;
    placeBtn.textContent  = "Placing Order…";
    placeBtn.style.opacity = "0.7";
  }

  // ── 8. Push order to Firebase Realtime Database ──
  try {
    // db.ref("orders") points to the "orders" node
    // .push() auto-generates a unique key (like -NxAbCdEf12345)
    // .set(orderData) writes the data to that key
   let orderId = "";

// --------------------
// 1. Save to Firebase
// --------------------
try {
  const newOrderRef = db.ref("orders").push();
  await newOrderRef.set(orderData);

  orderId = newOrderRef.key;

  console.log("✅ Firebase Saved:", orderId);
} catch (err) {
  console.error("❌ Firebase Error:", err);
}

// --------------------
// 2. Save to MongoDB
// --------------------
try {
  const mongoRes = await fetch("https://devora-backend-3hz9.onrender.com/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  });

  if (!mongoRes.ok) {
    throw new Error("MongoDB Save Failed");
  }

  const mongoData = await mongoRes.json();

  console.log("✅ MongoDB Saved:", mongoData);

  // Firebase save MongoDB ID use 
  if (!orderId) {
    orderId = mongoData._id;
  }

} catch (err) {
  console.error("❌ MongoDB Error:", err);
}
const whatsappNumber = "916380141360";

let whatsappMsg = `🐔 DEECUTS NEW ORDER

Order ID: ${orderId}

Customer: ${customerName}
Phone: ${customerPhone}

Address:
${customerAddress}

Items:
${cartItems.map(i => 
`${i.productName} - ${i.weight} - ${i.skin || ""} x ${i.quantity}`
).join("\n")}

Total Amount: ₹${totalAmount}

Payment: ${paymentMethod}

Delivery Slot: ${selectedSlot}

Thank you ❤️`;


// SAVE ORDER HISTORY

let oldOrders = JSON.parse(
  localStorage.getItem("myOrders")
) || [];


orderData.id = orderId;


oldOrders.unshift(orderData);


localStorage.setItem(
  "myOrders",
  JSON.stringify(oldOrders)
);


console.log("ORDER HISTORY SAVED");


// CLEAR CART AFTER SAVING

cart = {};

updateBadges();


// success flag

localStorage.setItem(
 "orderSuccess",
 "true"
);



// CLEAR CART

cart = {};

updateBadges();



// OPEN WHATSAPP

const whatsappURL =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;


showPage("success");

setTimeout(() => {
  window.location.href = whatsappURL;
}, 1500);

console.log("✅ Order Completed:", orderId);

// SAVE ORDER HISTORY FOR MY ORDERS

    // ── 9. Success — clear cart & redirect ──
    cart = {};
    updateBadges();
    toast(`Order placed successfully! 🎉 ID: ${orderId.slice(-6).toUpperCase()}`);

    // Short delay so the toast is visible before the page transitions
    // setTimeout(() => showPage("success"), 800);

  } catch (error) {
    // ── 10. Error handling ──
    console.error("❌ Firebase order error:", error);

    let message = "Something went wrong. Please try again.";

    if (error.code === "PERMISSION_DENIED") {
      message = "Order failed: Permission denied.\n\nPlease check your Firebase Realtime Database rules.";
    } else if (error.code === "NETWORK_REQUEST_FAILED") {
      message = "Order failed: No internet connection.\n\nPlease check your network and try again.";
    } else if (error.message) {
      message = "Order failed: " + error.message;
    }

    alert("⚠️ " + message);

    // Restore button
    if (placeBtn) {
      placeBtn.disabled      = false;
      placeBtn.textContent   = originalText;
      placeBtn.style.opacity = "1";
    }
  }
}

function showFieldError(input, message) {
  let error = input.parentElement.querySelector(".error-msg");

  if (!error) {
    error = document.createElement("div");
    error.className = "error-msg";
    error.style.color = "red";
    error.style.fontSize = "12px";
    error.style.marginTop = "4px";
    input.parentElement.appendChild(error);
  }

  error.textContent = message;
  input.style.border = "1px solid red";
}

function clearFieldError(input) {
  const error = input.parentElement.querySelector(".error-msg");
  if (error) error.remove();
  input.style.border = "";
}

/* ══════════════════════════════════════════════════════════
   § ACCOUNT PAGE — Sample Order History
   ══════════════════════════════════════════════════════════ */
function renderAccountOrders(){

const el = document.getElementById("account-orders");

if(!el) return;


const orders =
JSON.parse(localStorage.getItem("myOrders")) || [];


if(!orders.length){

el.innerHTML = `
<div class="no-orders">
No orders found
</div>
`;

return;

}


el.innerHTML = orders.map(order=>{


return `

<div class="order-card">


<div class="order-header">


<div>

<h3>
#${order.id ? order.id.slice(-6).toUpperCase() : "ORDER"}
</h3>


<p>
📅 ${new Date(order.createdAt).toLocaleDateString()}
</p>


</div>


<div class="order-total">

₹${order.totalAmount}

</div>


</div>

<div class="order-products">

${order.cartItems.map(item=>`

<div class="order-product">

🍗 ${item.productName}

<span>
× ${item.quantity}
</span>

</div>


`).join("")}


</div>




<button 
class="rate-btn"

onclick="openReview('${order.cartItems[0].productId}')">

⭐ Rate Product

</button>



</div>


`;


}).join("");

}


/* ══════════════════════════════════════════════════════════
   § UI HELPERS — Toast Notification
   ══════════════════════════════════════════════════════════ */

/**
 * Show a short-lived toast message at the bottom of the screen.
 * @param {string} msg - message text
 * @param {number} duration - ms to display (default 2500)
 */


function toast(msg, duration = 2500) {
  const t = document.getElementById("toast-msg");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), duration);
}

function openReview(id){

reviewProductId = id;


let p = products.find(x=>x.id==id);


if(p){

document.getElementById("review-img").src = p.image;

document.getElementById("review-product-name").innerHTML = p.name;

}


document.getElementById("review-modal").style.display="flex";


}




function closeReview(){

document.getElementById("review-modal").style.display="none";

}




function setRating(value){

ratings.overall = value;


const stars = document.querySelectorAll("#overall-stars span");


stars.forEach((star,index)=>{

if(index < value){

star.classList.add("active");

}else{

star.classList.remove("active");

}

});


console.log("Overall Rating:", ratings.overall);

}


async function submitReview(){


let text =
document.getElementById("review-text").value;



if(ratings.overall===0){

alert("Please select star rating ⭐");
return;

}


try{


await db.ref(
"reviews/"+reviewProductId
).push({

overall:ratings.overall,

freshness:ratings.freshness,

packing:ratings.packing,

review:text,

createdAt:new Date().toISOString()

});



toast("Review submitted successfully ❤️");


document.getElementById("review-text").value="";


closeReview();



}catch(err){

console.log(err);

alert("Review save failed");

}


}


async function loadReviewSummary(productId){

  const container = document.getElementById("review-summary-box");
  if(!container) return;

  container.innerHTML = "Loading AI summary...";

  try{

    const snap = await db.ref("reviews/" + productId).once("value");
    const data = snap.val();

    if(!data){

container.innerHTML = `
<div class="ai-summary-card">

<h3>🤖 AI Review Summary</h3>

<p>No reviews yet ⭐</p>

</div>
`;

return;

}

    const reviews = Object.values(data);

    let total = reviews.length;
    document.getElementById("det-reviews").innerHTML =
total+" Reviews";

    let avgOverall = 0;
    let freshness = 0;
    let packing = 0;

    reviews.forEach(r=>{
      avgOverall += r.overall || 0;
      freshness += r.freshness || 0;
      packing += r.packing || 0;
    });

    avgOverall = (avgOverall / total).toFixed(1);
    freshness = (freshness / total).toFixed(1);
    packing = (packing / total).toFixed(1);

    container.innerHTML = `
      <div class="ai-summary-card">

        <h3>🤖 AI Review Summary</h3>

        <div class="ai-row">⭐ Overall: ${avgOverall}/5</div>
        <div class="ai-row">🥩 Freshness: ${freshness}/5</div>
        <div class="ai-row">📦 Packing: ${packing}/5</div>

        <p style="margin-top:10px;font-size:13px;color:#666">
          Based on ${total} customer reviews
        </p>

      </div>
    `;

  }catch(err){
    console.log(err);
    container.innerHTML = "Failed to load summary";
  }
}

/* ══════════════════════════════════════════════════════════
   § WINDOW EXPORTS — Make functions accessible from HTML onclick=""
   (Required because this file may be treated as a module
    by some bundlers / dev tools)
   ══════════════════════════════════════════════════════════ */

window.showPage           = showPage;
window.toggleFilterDrawer = toggleFilterDrawer;
window.filterProducts     = filterProducts;
window.goCat              = goCat;
window.showDetail         = showDetail;
window.setImg             = setImg;
window.selWt              = selWt;
window.detQty             = detQty;
window.addCurrent         = addCurrent;
window.quickAdd           = quickAdd;
window.chgCart            = chgCart;
window.delCart            = delCart;
window.selectSlot         = selectSlot;
window.selPay             = selPay;
window.placeOrder         = placeOrder;
window.toast              = toast;
window.quickAdd = quickAdd;
window.sortProducts = sortProducts;
window.loadOptions = loadOptions;
window.selectWeight = selectWeight;
window.selectSize = selectSize;
window.selectSkin = selectSkin;
window.openReview = openReview;
window.closeReview = closeReview;
window.setRating = setRating;
window.submitReview = submitReview;
/* ══════════════════════════════════════════════════════════
   § INIT — Boot the App
   ══════════════════════════════════════════════════════════ */

// Render the home page featured products on first load
renderFeatured();


