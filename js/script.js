/**
 * Portfolio JavaScript - Muhammad Raynor Rifat
 * Native Vanilla JS (No Framework, Zero Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initProjectModal();
  initCertFilters();
  initCopyButtons();
  initPhotoLightbox();
});

/* ==========================================================================
   1. Navbar & Mobile Navigation
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgress = document.querySelector('.scroll-progress');

  // Handle scroll effects
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Header background change
    if (scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll progress bar
    const winHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / winHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    // Update active nav link on scroll
    updateActiveNav();
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  function openMobileMenu() {
    navMenu.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2. Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '50px 0px 0px 0px'
    });

    animatedElements.forEach(el => {
      // If already in viewport or above, immediately reveal
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight + 50) {
        el.classList.add('animated');
      } else {
        observer.observe(el);
      }
    });
  } else {
    animatedElements.forEach(el => el.classList.add('animated'));
  }
}

/* ==========================================================================
   3. Project Details Modal with Data & Image Gallery
   ========================================================================== */
const projectsData = {
  'portal-qcc': {
    title: 'Portal QCC - Web Monitoring & Assessment Karyawan',
    organization: 'PT. Toyota Motor Manufacturing Indonesia (Divisi PBOD)',
    category: 'Web Application & SQA Testing',
    images: [
      { src: 'foto proyek/portalqcc_dashboard.png', caption: 'Dashboard Utama Monitoring Progres QCC' },
      { src: 'foto proyek/portalqcc penilaian karyawan.png', caption: 'Scatter Plot Assessment Penilaian Rata-rata Tim' },
      { src: 'foto proyek/portalqcc data rapat.png', caption: 'Tabel Monitoring Progres & Kehadiran Rapat Berkala' }
    ],
    role: 'Full-stack Web Developer & SQA Intern',
    period: '2025',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'Postman API', 'XAMPP'],
    overview: 'Mengembangkan sistem website monitoring real-time untuk pemantauan kinerja dan evaluasi Quality Control Circle (QCC) di lingkungan Divisi PBOD PT. Toyota Motor Manufacturing Indonesia (TMMIN). Sistem ini menggantikan proses pencatatan manual guna meningkatkan efisiensi dan transparansi data penilaian grup secara terpusat.',
    keyFeatures: [
      'Dashboard analitik performa grup QCC dengan grafik progres bertahap (Step 01 hingga Step 08).',
      'Matriks Scatter Plot otomatis untuk evaluasi rata-rata penilaian karyawan (Sumbu X: Proses & Tim, Sumbu Y: Dampak & Manfaat).',
      'Modul monitoring jadwal rapat, pelaporan makalah, bendera evaluasi, dan rekap semester.',
      'Sistem manajemen user terstruktur dengan otentikasi peran (Admin/Evaluator/User).'
    ],
    sqaHighlights: [
      'Melakukan pengujian API menyeluruh menggunakan Postman untuk memvalidasi respons status code (200, 400, 500) dan struktur JSON.',
      'Merancang skenario pengujian fungsional (Functional Test Cases) pada kalkulasi skor rata-rata Scatter Plot untuk mencegah bias matematis.',
      'Melakukan regression testing setelah setiap pembaruan modul agar data rapat tersimpan tanpa anomali.',
      'Mendokumentasikan defect dan melakukan verifikasi penanganan bug bersama tim pengembang.'
    ]
  },
  'pengering-palet': {
    title: 'Mesin Pengering Palet Kayu Hybrid Berbasis IoT',
    organization: 'Tugas Akhir / Skripsi - S1 Teknologi Informasi',
    category: 'IoT & Web Monitoring',
    images: [
      { src: 'foto proyek/proyek pengering palet kayu.png', caption: 'Tampilan Web Dashboard Monitoring Sensor Realtime' },
      { src: 'foto proyek/alat proyek pengering palet kayu.jpeg', caption: 'Hardware Mesin Pengering Palet Kayu Hybrid & Panel Kontrol' }
    ],
    role: 'IoT System Engineer & Web Developer',
    period: '2025 - 2026',
    tech: ['ESP32', 'Sensor Suhu (DHT/Termokopel)', 'Sensor Kelembaban', 'Proximity & Infrared', 'PHP', 'MySQL', 'JavaScript'],
    overview: 'Perancangan dan implementasi sistem otomasi mesin pengering palet kayu hybrid terintegrasi Internet of Things (IoT). Sistem memantau kondisi suhu ruang pengering dan kelembaban kayu secara akurat melalui web dashboard interaktif untuk menjamin standar kualitas kayu ekspor.',
    keyFeatures: [
      'Pemantauan multi-sensor suhu (Temperature 1, 2, 3, dan SHT) serta kelembaban relatif (%RH) secara realtime.',
      'Indikator status mesin terintegrasi (Target Suhu 40.0°C, Deteksi ON/OFF Mesin, Deteksi Pintu Buka/Tutup).',
      'Log histori data pengeringan tersimpan otomatis ke database MySQL.',
      'Antarmuka web responsif dan ramah pengguna dengan pembaruan status periodik.'
    ],
    sqaHighlights: [
      'Pengujian fungsional modul akuisisi data sensor dari mikrokontroler ESP32 ke server web lokal.',
      'Verifikasi akurasi pembacaan data sensor terhadap alat ukur standar kalibrasi suhu fisik.',
      'Stress testing konektivitas sensor saat pengeringan berjalan selama siklus waktu panjang.',
      'Validasi logika penutupan pintu dan pemutusan heater saat ambang batas target suhu tercapai.'
    ]
  },
  'pengering-talas': {
    title: 'Mesin Pengering Daun Talas Beneng Berbasis IoT',
    organization: 'Penelitian Bersama Dosen - Universitas Darma Persada',
    category: 'Smart Agriculture & IoT Automation',
    images: [
      { src: 'foto proyek/proyek pengering daun talas beneng.png', caption: 'Dashboard Cerdas Solar Dome Monitoring Daun Talas' },
      { src: 'foto proyek/alat proyek pengering daun talas beneng.png', caption: 'Struktur Alat & Rumah Pengering Solar Dome' }
    ],
    role: 'IoT Developer & SQA Tester',
    period: '2024 - 2025',
    tech: ['ESP32', 'Sensor SHT31', 'Solar Dome Automation', 'Exhaust Fan Control', 'PHP', 'MySQL', 'JavaScript'],
    overview: 'Pengembangan sistem pemantauan cerdas pada kubah pengering (Solar Dome) untuk komoditas daun Talas Beneng. Mengoptimalkan pemanfaatan energi panas matahari alami dengan sirkulasi pembuangan uap air terkontrol berbasis kelembaban udara otomatis.',
    keyFeatures: [
      'Monitoring suhu pengering dan kelembaban udara menggunakan sensor SHT31 dengan presisi tinggi.',
      'Kontrol otomatis 4 unit kipas exhaust berdasarkan ambang batas target kelembaban (55% - 60%).',
      'Pusat notifikasi status mikrokontroler IoT dan kamera monitoring (Online/Offline indicator).',
      'Penyimpanan riwayat pengeringan guna analisis kecepatan evaporasi daun.'
    ],
    sqaHighlights: [
      'Pengujian fungsional logika otomasi relay kipas exhaust saat parameter kelembaban melebihi ambang batas.',
      'Mencatat dan mendokumentasikan bug sinkronisasi waktu antara mikrokontroler dengan server database.',
      'Pengujian ketahanan sinyal Wi-Fi ESP32 dalam kubah Solar Dome.',
      'Membandingkan hasil aktual kadar kelembaban daun pasca pengeringan dengan spesifikasi standar mutu daun.'
    ]
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const modalContainer = modalOverlay ? modalOverlay.querySelector('.modal-container') : null;
  const closeBtn = document.getElementById('modalCloseBtn');
  const detailButtons = document.querySelectorAll('[data-project-id]');

  if (!modalOverlay || !closeBtn) return;

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const project = projectsData[projectId];
      if (project) {
        populateProjectModal(project);
        openModal();
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function openModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function populateProjectModal(data) {
    const mainImg = document.getElementById('modalMainImage');
    const imgCaption = document.getElementById('modalImageCaption');
    const thumbsContainer = document.getElementById('modalThumbsContainer');
    const modalTitle = document.getElementById('modalTitle');
    const modalOrg = document.getElementById('modalOrg');
    const modalRole = document.getElementById('modalRole');
    const modalPeriod = document.getElementById('modalPeriod');
    const modalCategory = document.getElementById('modalCategory');
    const modalOverview = document.getElementById('modalOverview');
    const modalFeaturesList = document.getElementById('modalFeaturesList');
    const modalSqaList = document.getElementById('modalSqaList');
    const modalTechTags = document.getElementById('modalTechTags');

    // Title & Organization
    modalTitle.textContent = data.title;
    modalOrg.textContent = data.organization;
    modalRole.textContent = data.role;
    modalPeriod.textContent = data.period;
    modalCategory.textContent = data.category;
    modalOverview.textContent = data.overview;

    // Gallery Setup
    if (data.images && data.images.length > 0) {
      mainImg.src = data.images[0].src;
      mainImg.alt = data.images[0].caption;
      imgCaption.textContent = data.images[0].caption;

      thumbsContainer.innerHTML = '';
      data.images.forEach((img, idx) => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = `gallery-thumb-item ${idx === 0 ? 'active' : ''}`;
        thumbDiv.innerHTML = `<img src="${img.src}" alt="${img.caption}">`;
        thumbDiv.addEventListener('click', () => {
          mainImg.src = img.src;
          mainImg.alt = img.caption;
          imgCaption.textContent = img.caption;
          thumbsContainer.querySelectorAll('.gallery-thumb-item').forEach(t => t.classList.remove('active'));
          thumbDiv.classList.add('active');
        });
        thumbsContainer.appendChild(thumbDiv);
      });
    }

    // Key Features
    modalFeaturesList.innerHTML = '';
    data.keyFeatures.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      modalFeaturesList.appendChild(li);
    });

    // SQA Highlights
    modalSqaList.innerHTML = '';
    data.sqaHighlights.forEach(sqa => {
      const li = document.createElement('li');
      li.textContent = sqa;
      modalSqaList.appendChild(li);
    });

    // Tech Tags
    modalTechTags.innerHTML = '';
    data.tech.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = t;
      modalTechTags.appendChild(tag);
    });
  }
}

/* ==========================================================================
   4. Certificate Category Filtering
   ========================================================================== */
function initCertFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  if (!filterButtons.length || !certCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      certCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Quick Copy Buttons with Toast Notification
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy-target]');
  const toast = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-target');
      const label = btn.getAttribute('data-copy-label') || 'Teks';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`${label} berhasil disalin ke clipboard!`);
        }).catch(() => {
          fallbackCopyText(textToCopy, label);
        });
      } else {
        fallbackCopyText(textToCopy, label);
      }
    });
  });

  function fallbackCopyText(text, label) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(`${label} berhasil disalin!`);
    } catch (err) {
      showToast('Gagal menyalin teks');
    }
    document.body.removeChild(tempInput);
  }

  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* ==========================================================================
   6. Internship Photo Lightbox
   ========================================================================== */
function initPhotoLightbox() {
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const triggerPhotos = document.querySelectorAll('[data-lightbox-src]');

  if (!lightbox || !lightboxImg || !lightboxClose) return;

  triggerPhotos.forEach(photo => {
    photo.addEventListener('click', (e) => {
      e.preventDefault();
      const src = photo.getAttribute('data-lightbox-src');
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}
