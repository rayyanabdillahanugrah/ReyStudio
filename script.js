const portfolioData = [
  {
    title: "Juara 3 MHQ SMP",
    img: "porto1.jpg",
    imgFallback: "porto1.jpg",
    desc: "Pada tanggal 23-24 Mei 2023, saya meraih juara ketiga dalam lomba Festival Metode Ummi Bekasi 2023 bidang Musabaqah Hifdzil Qur'an (MHQ) tingkat SMP yang diselenggarakan Ummi Bekasi."
  },
  {
    title: "15 Besar Lomba CCI",
    img: "porto2.jpg",
    imgFallback: "porto2.jpg",
    desc: "Pada tanggal 9 Maret 2023, saya bersama tim saya meraih posisi 15 besar dari 100+ sekolah dalam lomba AKSI 2023 bidang Cerdas Cermat Islam (CCI) yang diselenggarakan Dinas Pendidikan Kabupaten Bekasi."
  },
  {
    title: "Juara 2 MHQ SMP",
    img: "porto3-optimal.jpg",
    imgFallback: "porto3-optimal.jpg",
    desc: "Pada tanggal 30 September 2023, saya meraih juara kedua dalam Lomba PERISAI bidang Musabaqah Hifdzil Qur'an (MHQ) tingkat SMP yang diselenggarakan SMAN 2 Tambun Selatan."
  },
  {
    title: "Ketua OSIS",
    img: "porto4.jpg",
    imgFallback: "https://picsum.photos/seed/porto4/800/450",
    desc: "Saya terpilih sebagai Ketua OSIS di sekolah untuk periode 2023-2024. Saya memimpin berbagai kegiatan dan proker yang bermanfaat."
  },
  {
    title: "Juara 2 MHQ SMP",
    img: "porto5.jpg",
    imgFallback: "https://picsum.photos/seed/porto5/800/450",
    desc: "Pada tanggal 14 Desember 2024, saya meraih juara kedua di acara GEM FEST 2.0 Yaspia Al 'Imaroh kategori Musabaqah Hifdzil Qur'an (MHQ)."
  },
  {
    title: "Peserta FLS3NFG 2026",
    img: "porto6.jpg",
    imgFallback: "https://picsum.photos/seed/porto6/800/450",
    desc: "Saya mewakili sekolah dalam lomba FLS3N 2026 jenjang SMA dalam bidang fotografi yang diselenggarakan Pusat Prestasi Nasional (Puspresnas)."
  }
];

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 600);
});

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

const progressBar = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct  = (window.scrollY / docH) * 100;
  progressBar.style.width = pct + "%";
});

const scrollTopBtn = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

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

document.querySelectorAll(".mobile-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    const spans = burger.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity   = "";
    spans[2].style.transform = "";
  });
});

const revealEls = document.querySelectorAll(".reveal");
const observer  = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
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

const modal     = document.getElementById("modal");
const modalImg  = document.getElementById("modal-img");
const modalTit  = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

document.querySelectorAll(".portfolio-item").forEach(item => {
  item.addEventListener("click", () => {
    const idx  = parseInt(item.dataset.index, 10);
    const data = portfolioData[idx];
    if (!data) return;

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

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

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

document.querySelectorAll("audio").forEach(audio => {
  audio.addEventListener("play", () => {
    document.querySelectorAll("audio").forEach(other => {
      if (other !== audio) other.pause();
    });
  });
});

document.querySelectorAll(".song-cover-wrap").forEach(wrap => {
  const card  = wrap.closest(".song-card");
  const audio = card.querySelector("audio");
  const icon  = wrap.querySelector(".play-icon");

  if (!audio) return;

  wrap.addEventListener("click", () => {
    if (audio.paused) {
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

const dotsEl = document.querySelector(".dots");
if (dotsEl) {
  setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotsEl.textContent = ".".repeat(dotCount || 1);
  }, 400);
}

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
