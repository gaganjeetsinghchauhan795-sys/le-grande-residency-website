const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));


// Hero slider
const heroSlides = document.querySelectorAll('.hero-slide');
const heroCopyItems = document.querySelectorAll('.hero-copy-item');
const heroDots = document.querySelectorAll('.hero-dot');
const heroCurrent = document.getElementById('heroCurrent');
const heroPrev = document.querySelector('.hero-prev');
const heroNext = document.querySelector('.hero-next');
let heroIndex = 0;
let heroTimer;

function showHeroSlide(index){
  if(!heroSlides.length) return;
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide,i)=>slide.classList.toggle('active',i===heroIndex));
  heroCopyItems.forEach((item,i)=>item.classList.toggle('active',i===heroIndex));
  heroDots.forEach((dot,i)=>dot.classList.toggle('active',i===heroIndex));
  if(heroCurrent) heroCurrent.textContent = String(heroIndex+1).padStart(2,'0');
}

function nextHeroSlide(){ showHeroSlide(heroIndex + 1); }
function prevHeroSlide(){ showHeroSlide(heroIndex - 1); }
function resetHeroTimer(){
  clearInterval(heroTimer);
  heroTimer = setInterval(nextHeroSlide, 5500);
}

heroNext?.addEventListener('click',()=>{nextHeroSlide();resetHeroTimer();});
heroPrev?.addEventListener('click',()=>{prevHeroSlide();resetHeroTimer();});
heroDots.forEach((dot,i)=>dot.addEventListener('click',()=>{showHeroSlide(i);resetHeroTimer();}));
showHeroSlide(0);
resetHeroTimer();

// Homepage room-grid mini galleries: Executive, Deluxe and Luxury Suite
(function(){
  const sliders = document.querySelectorAll('.room-mini-slider');
  sliders.forEach(slider => {
    const slides = [...slider.querySelectorAll('.room-slide')];
    const dots = [...slider.querySelectorAll('.room-slide-dots button')];
    if (!slides.length) return;
    let current = 0;
    const show = (index) => {
      current = (index + slides.length) % slides.length;
      slides.forEach((img,i)=>img.classList.toggle('active', i===current));
      dots.forEach((dot,i)=>dot.classList.toggle('active', i===current));
    };
    dots.forEach((dot,i)=>dot.addEventListener('click', (e)=>{e.stopPropagation(); show(i);}));
    setInterval(()=>show(current+1), 4200);
  });
})();


/* Premium Visual Tour lightbox */
(function(){
  const cards = [...document.querySelectorAll('.visual-tour-card')];
  const lightbox = document.getElementById('visualTourLightbox');
  const image = document.getElementById('vtLightboxImage');
  const title = document.getElementById('vtLightboxTitle');
  const category = document.getElementById('vtLightboxCategory');
  const close = document.querySelector('.vt-lightbox-close');
  const prev = document.querySelector('.vt-lightbox-prev');
  const next = document.querySelector('.vt-lightbox-next');
  if(!cards.length || !lightbox) return;

  let current = 0;

  function show(index){
    current = (index + cards.length) % cards.length;
    const card = cards[current];
    image.src = card.dataset.image;
    image.alt = card.dataset.title || '';
    title.textContent = card.dataset.title || '';
    category.textContent = card.dataset.category || '';
  }

  function open(index){
    show(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.classList.add('vt-lightbox-open');
  }

  function hide(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.classList.remove('vt-lightbox-open');
  }

  cards.forEach((card,index)=>card.addEventListener('click',()=>open(index)));
  close?.addEventListener('click',hide);
  prev?.addEventListener('click',()=>show(current-1));
  next?.addEventListener('click',()=>show(current+1));

  lightbox.addEventListener('click',(e)=>{
    if(e.target === lightbox) hide();
  });

  document.addEventListener('keydown',(e)=>{
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') hide();
    if(e.key === 'ArrowLeft') show(current-1);
    if(e.key === 'ArrowRight') show(current+1);
  });
})();


/* Premium Meetings & Celebrations lightbox */
(function(){
  const cards = [...document.querySelectorAll('[data-banquet-image]')];
  const box = document.getElementById('banquetLightbox');
  const img = document.getElementById('banquetLbImage');
  const title = document.getElementById('banquetLbTitle');
  const close = document.querySelector('.banquet-lb-close');
  const prev = document.querySelector('.banquet-lb-prev');
  const next = document.querySelector('.banquet-lb-next');
  if(!cards.length || !box) return;

  let current = 0;

  function show(i){
    current = (i + cards.length) % cards.length;
    img.src = cards[current].dataset.banquetImage;
    img.alt = cards[current].dataset.banquetTitle || '';
    title.textContent = cards[current].dataset.banquetTitle || '';
  }
  function open(i){
    show(i);
    box.classList.add('open');
    box.setAttribute('aria-hidden','false');
    document.body.classList.add('banquet-lightbox-open');
  }
  function hide(){
    box.classList.remove('open');
    box.setAttribute('aria-hidden','true');
    document.body.classList.remove('banquet-lightbox-open');
  }

  cards.forEach((card,i)=>card.addEventListener('click',()=>open(i)));
  close?.addEventListener('click',hide);
  prev?.addEventListener('click',()=>show(current-1));
  next?.addEventListener('click',()=>show(current+1));
  box.addEventListener('click',e=>{ if(e.target===box) hide(); });
  document.addEventListener('keydown',e=>{
    if(!box.classList.contains('open')) return;
    if(e.key==='Escape') hide();
    if(e.key==='ArrowLeft') show(current-1);
    if(e.key==='ArrowRight') show(current+1);
  });
})();


// Highlight the navigation item for the page currently being viewed.
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".creative-nav .creative-nav-item").forEach(function (link) {
    link.classList.remove("active");
    const href = (link.getAttribute("href") || "").split("#")[0].split("?")[0].split("/").pop().toLowerCase();
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});
