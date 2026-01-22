// Mobil menü
function toggleMenu(){
  const menu = document.getElementById("menu");
  if(!menu) return;
  menu.classList.toggle("open");
}

// Yıl
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();

  // Ana sayfadaki dinamik içerik (Haberler + Yazılar)
  const mountNews = document.getElementById("newsMount");
  const mountPosts = document.getElementById("postsMount");
  if(mountNews || mountPosts){
    fetch("/assets/data/content.json")
      .then(r => r.json())
      .then(data => {
        if(mountNews) renderNews(mountNews, data.news?.slice(0,3) || []);
        if(mountPosts) renderPosts(mountPosts, data.posts?.slice(0,4) || []);
      })
      .catch(()=>{ /* sessiz */ });
  }
});

function renderNews(el, items){
  el.innerHTML = items.map(n => `
    <a class="card" href="${n.url}" target="_blank" rel="noreferrer">
      <div class="meta">${escapeHtml(n.date)} • Haber</div>
      <h3>${escapeHtml(n.title)}</h3>
      <p>${escapeHtml(n.excerpt)}</p>
      <div class="tags"><span class="tag">Link</span></div>
    </a>
  `).join("");
}

function renderPosts(el, items){
  el.innerHTML = items.map(p => `
    <a class="card" href="${p.url}">
      <div class="meta">${escapeHtml(p.date)} • ${escapeHtml(p.category)}</div>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.excerpt)}</p>
      <div class="tags">
        <span class="tag">${escapeHtml(p.tag)}</span>
      </div>
    </a>
  `).join("");
}

function escapeHtml(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
// ---------- SLIDER (Hızlı bağlantılar) ----------

let currentSlide = 0;

function initSlider() {
  const slides = document.querySelector(".slides");
  const dots = document.querySelectorAll(".slider-dots .dot");

  if (!slides || dots.length === 0) return;

  const total = dots.length;

  function showSlide(index) {
    currentSlide = index;
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  }

  // Otomatik dönme
  setInterval(() => {
    currentSlide = (currentSlide + 1) % total;
    showSlide(currentSlide);
  }, 4000); // 4 saniyede bir

  // Noktalara tıklayınca manuel geçiş
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });
}

document.addEventListener("DOMContentLoaded", initSlider);

