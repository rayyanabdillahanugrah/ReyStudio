/* ============================================================
   PORTFOLIO — script.js
   Semua fitur interaktif
   ============================================================ */

// ── Data Modal ───────────────────────────────────────────────
const portfolioData = [
  {
    title: "Juara 1 Foto Terbaik",
    img: "images/porto1.jpg",
    imgFallback: "https://picsum.photos/seed/porto1/800/450",
    desc: "Meraih juara pertama dalam lomba fotografi tingkat nasional 2024 dengan kategori foto landscape. Karya ini diabadikan di pegunungan saat matahari terbenam dengan teknik long exposure."
  },
  {
    title: "Pameran Seni Regional",
    img: "images/porto2.jpg",
    imgFallback: "https://picsum.photos/seed/porto2/800/450",
    desc: "Berpartisipasi dalam pameran seni regional bersama 50+ seniman lokal. Karya-karya yang dipamerkan mendapat respons positif dari pengunjung dan para kurator seni."
  },
  {
    title: "Artikel Terpilih",
    img: "images/porto3.jpg",
    imgFallback: "https://picsum.photos/seed/porto3/800/450",
    desc: "Artikel tentang perjalanan kreatif dipilih sebagai artikel unggulan di majalah seni & budaya terkemuka. Tulisan ini telah dibaca oleh lebih dari 50.000 pembaca."
  },
  {
    title: "Lomba Desain Nasional",
    img: "images/porto4.jpg",
    imgFallback: "https://picsum.photos/seed/porto4/800/450",
    desc: "Memenangkan penghargaan honorable mention dalam lomba desain grafis nasional. Karya berupa identitas visual untuk brand lokal yang mengangkat budaya nusantara."
  },
  {
    title: "Workshop Fotografi",
    img: "images/porto5.jpg",
    imgFallback: "https://picsum.photos/seed/porto5/800/450",
    desc: "Menjadi pembicara dan fasilitator dalam workshop fotografi untuk pemula. Workshop dihadiri 80+ peserta dari berbagai kota dan berlangsung selama 2 hari penuh."
  },
  {
    title: "Sertifikasi Internasional",
    img: "images/porto6.jpg",
    imgFallback: "https://picsum.photos/seed/porto6/800/450",
    desc: "Berhasil mendapatkan sertifikasi internasional di bidang desain digital dari lembaga bergengsi. Proses sertifikasi melibatkan ujian teori dan praktik selama 3 bulan."
  }
];

// ── Loading Screen ────────────────────────────────────────────
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 600);
});

// ── Navbar Scroll ─────────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ── Scroll Progress ───────────────────────────────────────────
const progressBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct  = (window.scrollY / docH) * 100;
  progressBar.style.width = pct + "%";
});

// ── Scroll to Top ─────────────────────────────────────────────
const scrollTopBtn = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Mobile Burger ─────────────────────────────────────────────
const burger     = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");

burger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  const spans = burger.querySelectorAll("span");
  if (mobileMenu.classList.contains("open")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity   = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity   = "";
    spans[2].style.transform = "";
  }
});

// Close mobile menu on link click
document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    const spans = burger.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity   = "";
    spans[2].style.transform = "";
  });
});

// ── Intersection Observer (scroll reveal) ────────────────────
const revealEls = document.querySelectorAll(".reveal");
const observer  = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = Array.from(entry.target.parentElement.querySelectorAll(".reveal"));
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 80) + "ms";
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// ── Portfolio Modal ───────────────────────────────────────────
const modal     = document.getElementById("modal");
const modalImg  = document.getElementById("modal-img");
const modalTit  = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

document.querySelectorAll(".portfolio-item").forEach(item => {
  item.addEventListener("click", () => {
    const idx  = parseInt(item.dataset.index, 10);
    const data = portfolioData[idx];
    if (!data) return;

    // Set image with fallback
    modalImg.src = data.img;
    modalImg.onerror = function() { this.src = data.imgFallback; this.onerror = null; };
    modalTit.textContent  = data.title;
    modalDesc.textContent = data.desc;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// Close on Escape key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// ── Smooth Anchor Scroll ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ── Audio: pause others when one plays ───────────────────────
document.querySelectorAll("audio").forEach(audio => {
  audio.addEventListener("play", () => {
    document.querySelectorAll("audio").forEach(other => {
      if (other !== audio) other.pause();
    });
  });
});

// ── Micro-interaction: Song card play overlay as player toggle ─
document.querySelectorAll(".song-cover-wrap").forEach(wrap => {
  const card  = wrap.closest(".song-card");
  const audio = card.querySelector("audio");
  const icon  = wrap.querySelector(".play-icon");

  if (!audio) return;

  wrap.addEventListener("click", () => {
    if (audio.paused) {
      // pause all others first
      document.querySelectorAll("audio").forEach(a => { if (a !== audio) a.pause(); });
      audio.play();
      icon.textContent = "⏸";
    } else {
      audio.pause();
      icon.textContent = "▶";
    }
  });

  audio.addEventListener("ended", () => { icon.textContent = "▶"; });
  audio.addEventListener("pause", () => { icon.textContent = "▶"; });
  audio.addEventListener("play",  () => { icon.textContent = "⏸"; });
});

// ── Dots animation in loader ──────────────────────────────────
let dotCount = 0;
const dotsEl = document.querySelector(".dots");
if (dotsEl) {
  setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotsEl.textContent = ".".repeat(dotCount || 1);
  }, 400);
}

// ── Nav active link highlight on scroll ──────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNav() {
  let current = "";
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.style.color      = "";
    link.style.background = "";
    if (link.getAttribute("href") === "#" + current) {
      link.style.color      = "var(--text)";
      link.style.background = "var(--accent-soft)";
    }
  });
}
window.addEventListener("scroll", setActiveNav, { passive: true });

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const successMsg = document.getElementById("form-success");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        successMsg.classList.add("show");
        form.reset();

        setTimeout(() => {
          successMsg.classList.remove("show");
        }, 5000);

      } else {
        alert("Gagal mengirim. Coba lagi.");
      }

    } catch (error) {
      alert("Terjadi error. Cek koneksi.");
    }
  });
});