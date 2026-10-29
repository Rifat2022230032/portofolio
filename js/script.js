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
  initLiveDemoModal();
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
    liveUrl: 'https://portalqcc.penyuunsada.my.id/',
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
      'Pengujian fungsional dan live deployment verification pada portal resmi: <a href="https://portalqcc.penyuunsada.my.id/" target="_blank" rel="noopener noreferrer">portalqcc.penyuunsada.my.id</a>.',
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
    liveUrl: 'https://penyuunsada.my.id/',
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
      'Pengujian fungsional modul telemetri dan live server dashboard pada tautan: <a href="https://penyuunsada.my.id/" target="_blank" rel="noopener noreferrer">penyuunsada.my.id</a>.',
      'Pengujian fungsional modul akuisisi data sensor dari mikrokontroler ESP32 ke server web lokal dan online.',
      'Verifikasi akurasi pembacaan data sensor terhadap alat ukur standar kalibrasi suhu fisik.',
      'Stress testing konektivitas sensor saat pengeringan berjalan selama siklus waktu panjang.',
      'Validasi logika penutupan pintu dan pemutusan heater saat ambang batas target suhu tercapai.'
    ]
  },
  'pengering-talas': {
    title: 'Sistem Monitoring Rumah Pengering Daun Talas Beneng Berbasis IoT',
    organization: 'Penelitian Bersama Dosen - Universitas Darma Persada',
    category: 'Smart Agriculture & IoT Automation',
    liveUrl: 'https://beneng.jeptira.id/',
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
      'Pengujian sistem pemantauan realtime dan validasi live deployment: <a href="https://beneng.jeptira.id/" target="_blank" rel="noopener noreferrer">beneng.jeptira.id</a>.',
      'Pengujian fungsional logika otomasi relay kipas exhaust saat parameter kelembaban melebihi ambang batas.',
      'Mencatat dan mendokumentasikan bug sinkronisasi waktu antara mikrokontroler dengan server database.',
      'Pengujian ketahanan sinyal Wi-Fi ESP32 dalam kubah Solar Dome.',
      'Membandingkan hasil aktual kadar kelembaban daun pasca pengeringan dengan spesifikasi standar mutu daun.'
    ]
  },
  'it-ticket': {
    title: 'IT Ticket System - Sistem Pengelolaan Tiket IT',
    organization: 'Proyek Independen / Freelance',
    category: 'Web Application & IT Helpdesk',
    liveUrl: 'https://it-ticket.penyuunsada.my.id/',
    images: [
      { src: 'foto proyek/proyek it ticket it hepldesk analytics.png', caption: 'Dashboard IT Helpdesk Analytics & Overview Tiket' },
      { src: 'foto proyek/proyek it ticket user management.png', caption: 'Halaman Tickets Management - Pengelolaan Daftar Tiket' },
      { src: 'foto proyek/proyek it ticket login.png', caption: 'Halaman Login & Registrasi IT Ticket System' }
    ],
    role: 'Full-stack Web Developer',
    period: '2026',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    overview: 'Aplikasi berbasis web untuk pencatatan dan pengelolaan tiket kendala IT guna mendukung dokumentasi serta pemantauan proses penanganan masalah. Sistem ini membantu memastikan informasi tiket tercatat secara terstruktur, mempermudah pelacakan status penanganan, dan mendukung keteraturan data permintaan layanan IT.',
    keyFeatures: [
      'Dashboard IT Helpdesk Analytics dengan ringkasan statistik tiket (Total Ticket, Open, In Progress, Closed).',
      'Pencatatan dan pengelolaan tiket kendala IT dengan informasi judul, departemen, prioritas, dan status penanganan.',
      'Fitur pencarian dan filter tiket berdasarkan status, prioritas, dan departemen untuk memudahkan pemantauan.',
      'Grafik Top 5 Department dan metrik Average Resolution Time untuk analisis performa penanganan.',
      'Manajemen pengguna (Users) dengan sistem autentikasi login dan registrasi.',
      'Halaman Requests untuk pengelolaan permintaan bantuan IT.'
    ],
    sqaHighlights: [
      'Pengujian fungsional dan validasi live deployment pada sistem: <a href="https://it-ticket.penyuunsada.my.id/" target="_blank" rel="noopener noreferrer">it-ticket.penyuunsada.my.id</a>.',
      'Pengujian alur pencatatan tiket dari pembuatan hingga perubahan status penanganan (Open → In Progress → Closed).',
      'Validasi fungsionalitas filter dan pencarian tiket berdasarkan status, prioritas, dan departemen.',
      'Pengujian sistem autentikasi login dan registrasi pengguna dengan validasi input.',
      'Verifikasi akurasi data statistik dashboard terhadap data tiket aktual di database.'
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

    // Live URL Setup
    const modalLiveUrlTop = document.getElementById('modalLiveUrlTop');
    const modalLiveUrlTopText = document.getElementById('modalLiveUrlTopText');
    const modalSidebarLiveBlock = document.getElementById('modalSidebarLiveBlock');
    const modalLiveDemoBtn = document.getElementById('modalLiveDemoBtn');

    if (data.liveUrl) {
      let hostDisplay = data.liveUrl;
      try {
        const parsed = new URL(data.liveUrl);
        hostDisplay = parsed.hostname;
      } catch (e) {}

      if (modalLiveUrlTop) {
        modalLiveUrlTop.href = data.liveUrl;
        modalLiveUrlTop.style.display = 'inline-flex';
        if (modalLiveUrlTopText) {
          modalLiveUrlTopText.textContent = hostDisplay;
        }
      }
      if (modalSidebarLiveBlock) {
        modalSidebarLiveBlock.style.display = 'flex';
      }
      if (modalLiveDemoBtn) {
        modalLiveDemoBtn.href = data.liveUrl;
        modalLiveDemoBtn.setAttribute('title', `Buka tautan sistem: ${hostDisplay}`);
      }
    } else {
      if (modalLiveUrlTop) modalLiveUrlTop.style.display = 'none';
      if (modalSidebarLiveBlock) modalSidebarLiveBlock.style.display = 'none';
    }

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
      li.innerHTML = sqa;
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


/* ==========================================================================
   7. Live Demo Choice & Auto-Login Modal (Portal QCC & IT Ticket System)
   ========================================================================== */
const demoProjectsConfig = {
  'portal-qcc': {
    title: 'Live Demo — Portal QCC',
    homeUrl: 'https://portalqcc.penyuunsada.my.id/',
    adminDesc: 'Masuk otomatis sebagai Admin PBOD ke Dashboard QCC untuk evaluasi tim & scatter plot.',
    userDesc: 'Masuk otomatis sebagai Tim QCC (Reweld Team) untuk melihat progres & penilaian grup.',
    loginAction: 'https://portalqcc.penyuunsada.my.id/Login.php',
    adminPayload: { username: 'admin', password: 'admin123' },
    userPayload: { username: 'Reweld Team', password: 'reweld123' },
    credentials: [
      { role: 'Admin QCC', user: 'admin', pass: 'admin123' },
      { role: 'User (Reweld)', user: 'Reweld Team', pass: 'reweld123' }
    ]
  },
  'it-ticket': {
    title: 'Live Demo — IT Ticket System',
    homeUrl: 'https://it-ticket.penyuunsada.my.id/',
    adminDesc: 'Masuk otomatis sebagai Admin IT Support ke Helpdesk Analytics & Manajemen Tiket.',
    userDesc: 'Masuk otomatis sebagai Karyawan (riri - Dept. HR) untuk simulasi pembuatan & pelacakan tiket.',
    loginAction: 'https://it-ticket.penyuunsada.my.id/demo-login.php',
    adminPayload: { role: 'admin' },
    userPayload: { role: 'user' },
    credentials: [
      { role: 'Admin IT', user: 'admin', pass: '123456' },
      { role: 'User (Staff)', user: 'riri', pass: '123456' }
    ]
  }
};

function initLiveDemoModal() {
  const modalOverlay = document.getElementById('liveDemoModal');
  const closeBtn = document.getElementById('liveDemoModalCloseBtn');
  const modalTitle = document.getElementById('liveDemoModalTitle');
  const demoAdminDesc = document.getElementById('demoAdminDesc');
  const demoUserDesc = document.getElementById('demoUserDesc');
  const demoCredsGrid = document.getElementById('demoCredsGrid');
  const btnHome = document.getElementById('demoBtnHome');
  const btnAdmin = document.getElementById('demoBtnAdmin');
  const btnUser = document.getElementById('demoBtnUser');
  const autoLoginForm = document.getElementById('autoLoginForm');

  if (!modalOverlay || !closeBtn || !btnHome || !btnAdmin || !btnUser) return;

  let currentProjectKey = null;

  // Open modal triggers from project cards
  document.querySelectorAll('.btn-open-demo').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-demo-project');
      openDemoModal(projectKey);
    });
  });

  // Enhance the live demo button in the project detail modal
  const modalLiveDemoBtn = document.getElementById('modalLiveDemoBtn');
  if (modalLiveDemoBtn) {
    modalLiveDemoBtn.addEventListener('click', (e) => {
      const modalTitleEl = document.getElementById('modalTitle');
      const text = (modalTitleEl?.textContent || '').toLowerCase();
      let matchedKey = null;
      if (text.includes('qcc')) matchedKey = 'portal-qcc';
      else if (text.includes('ticket')) matchedKey = 'it-ticket';

      if (matchedKey && demoProjectsConfig[matchedKey]) {
        e.preventDefault();
        openDemoModal(matchedKey);
      }
    });
  }

  function openDemoModal(projectKey) {
    const config = demoProjectsConfig[projectKey];
    if (!config) return;

    currentProjectKey = projectKey;
    modalTitle.textContent = config.title;
    if (demoAdminDesc) demoAdminDesc.textContent = config.adminDesc;
    if (demoUserDesc) demoUserDesc.textContent = config.userDesc;

    // Render transparent credential boxes with quick copy
    if (demoCredsGrid) {
      demoCredsGrid.innerHTML = '';
      config.credentials.forEach(cred => {
        const col = document.createElement('div');
        col.className = 'demo-cred-col';
        col.innerHTML = `
          <span class="demo-cred-role">${cred.role}</span>
          <div class="demo-cred-row">
            <span>User: <strong class="demo-cred-val">${cred.user}</strong></span>
            <button type="button" class="demo-cred-copy" data-copy-val="${cred.user}" title="Salin Username">Salin</button>
          </div>
          <div class="demo-cred-row">
            <span>Pass: <strong class="demo-cred-val">${cred.pass}</strong></span>
            <button type="button" class="demo-cred-copy" data-copy-val="${cred.pass}" title="Salin Password">Salin</button>
          </div>
        `;
        demoCredsGrid.appendChild(col);
      });

      // Attach copy listeners
      demoCredsGrid.querySelectorAll('.demo-cred-copy').forEach(copyBtn => {
        copyBtn.addEventListener('click', (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const val = copyBtn.getAttribute('data-copy-val');
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(val);
          }
          copyBtn.textContent = 'Tersalin!';
          setTimeout(() => { copyBtn.textContent = 'Salin'; }, 1800);
        });
      });
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDemoModal() {
    modalOverlay.classList.remove('active');
    const projModal = document.getElementById('projectModal');
    if (!projModal || !projModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }

  closeBtn.addEventListener('click', closeDemoModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeDemoModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeDemoModal();
    }
  });

  // Action 1: Halaman Utama
  btnHome.addEventListener('click', (e) => {
    e.preventDefault();
    if (!currentProjectKey) return;
    const config = demoProjectsConfig[currentProjectKey];
    if (config && config.homeUrl) {
      window.open(config.homeUrl, '_blank', 'noopener,noreferrer');
      closeDemoModal();
    }
  });

  // Action 2: Login sebagai Admin
  btnAdmin.addEventListener('click', (e) => {
    e.preventDefault();
    if (!currentProjectKey) return;
    const config = demoProjectsConfig[currentProjectKey];
    if (config) {
      performAutoLogin(config.loginAction, config.adminPayload);
      closeDemoModal();
    }
  });

  // Action 3: Login sebagai User
  btnUser.addEventListener('click', (e) => {
    e.preventDefault();
    if (!currentProjectKey) return;
    const config = demoProjectsConfig[currentProjectKey];
    if (config) {
      performAutoLogin(config.loginAction, config.userPayload);
      closeDemoModal();
    }
  });

  function performAutoLogin(actionUrl, payload) {
    if (!autoLoginForm) return;
    autoLoginForm.action = actionUrl;
    autoLoginForm.innerHTML = '';

    for (const [key, value] of Object.entries(payload)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      autoLoginForm.appendChild(input);
    }

    autoLoginForm.submit();
  }
}

