document.addEventListener("DOMContentLoaded", () => {
  // ==================== ELEMENTOS DEL DOM ====================
  const navButtons = document.querySelectorAll(".sidebar-nav-btn");
  const sections = document.querySelectorAll(".perfil-seccion");
  const profileForm = document.getElementById('profile-form');
  const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
  const profileToggle = document.getElementById("profile-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");
  const carritoToggle = document.getElementById("carrito-toggle");
  const perfilAvatarInicial = document.getElementById("perfil-avatar-inicial");
  const perfilAvatarImg = document.getElementById("perfil-avatar-img");
  const btnCambiarFoto = document.getElementById("btn-cambiar-foto");
  const inputFotoPerfil = document.getElementById("input-foto-perfil");
  const perfilNombreSidebar = document.getElementById("perfil-nombre-sidebar");
  const formCambiarPassword = document.getElementById("form-cambiar-password");
  const passwordInputs = document.querySelectorAll(".btn-ver-password");
  const modalExito = document.getElementById("modal-exito");

  // ==================== DATOS SIMULADOS ====================
  const datosPerfil = {
    estadisticas: {
      cursos: 12,
      horas: 156,
      certificados: 5,
      racha: 28
    }
  };

  // ==================== NAVEGACIÓN DE SECCIONES ====================
  const changeSection = (sectionId) => {
    sections.forEach((section) => {
      section.classList.toggle("active", section.id === sectionId);
    });

    // Animar la sección activa
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
      activeSection.style.animation = 'none';
      activeSection.offsetHeight; // Trigger reflow
      activeSection.style.animation = 'fadeIn 0.3s ease';
    }
  };

  navButtons.forEach((button) => {
    const sectionId = button.getAttribute("data-section");
    if (sectionId === "cerrar-sesion") {
      button.addEventListener("click", () => {
        cerrarSesion();
      });
    } else {
      button.addEventListener("click", () => {
        navButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        changeSection(sectionId);
      });
    }
  });

  // ==================== CERRAR SESIÓN ====================
  function cerrarSesion() {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userLastName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userProfile');
      window.location.href = '../Principal/Principal.html';
    }
  }

  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener('click', function (e) {
      e.preventDefault();
      cerrarSesion();
    });
  }

  // ==================== CAMBIAR FOTO DE PERFIL ====================
  if (btnCambiarFoto && inputFotoPerfil) {
    btnCambiarFoto.addEventListener('click', () => {
      inputFotoPerfil.click();
    });

    inputFotoPerfil.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target.result;

          // Guardar imagen en localStorage
          localStorage.setItem('userAvatar', imageData);

          // Actualizar avatar en sidebar
          updateAvatarDisplay();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ==================== ACTUALIZAR AVATAR (IMAGEN O INICIAL) ====================
  function updateAvatarDisplay() {
    const savedAvatar = localStorage.getItem('userAvatar');
    const userName = localStorage.getItem('userName') || 'Usuario';
    const inicial = userName.charAt(0).toUpperCase();

    // Actualizar avatar del header (imagen o inicial)
    const avatarImgHeader = document.getElementById('avatar-img-header');
    const avatarInicialHeader = document.getElementById('avatar-inicial-header');

    if (savedAvatar && avatarImgHeader && avatarInicialHeader) {
      avatarImgHeader.src = savedAvatar;
      avatarImgHeader.style.display = 'block';
      avatarInicialHeader.style.display = 'none';
    } else if (avatarInicialHeader) {
      if (avatarImgHeader) avatarImgHeader.style.display = 'none';
      avatarInicialHeader.style.display = 'flex';
      avatarInicialHeader.textContent = inicial;
    }

    // Compatibilidad con estructura antigua (solo inicial en profile-toggle)
    if (profileToggle && profileToggle.classList.contains('avatar-inicial')) {
      profileToggle.textContent = inicial;
    }

    // Actualizar avatar del sidebar (puede ser imagen o inicial)
    if (savedAvatar && perfilAvatarImg && perfilAvatarInicial) {
      // Mostrar imagen
      perfilAvatarImg.src = savedAvatar;
      perfilAvatarImg.style.display = 'block';
      perfilAvatarInicial.style.display = 'none';
    } else if (perfilAvatarInicial) {
      // Mostrar inicial
      if (perfilAvatarImg) {
        perfilAvatarImg.style.display = 'none';
      }
      perfilAvatarInicial.style.display = 'flex';
      perfilAvatarInicial.textContent = inicial;
    }
  }

  // Función legacy para compatibilidad
  function updateAvatarInicial() {
    updateAvatarDisplay();
  }

  // ==================== ACTUALIZAR NOMBRE DE USUARIO ====================
  function updateUserName() {
    const userNameElementNav = document.getElementById('userName');
    const userName = localStorage.getItem('userName') || 'Usuario';
    const userLastName = localStorage.getItem('userLastName') || '';

    if (userNameElementNav) {
      userNameElementNav.textContent = userName;
    }

    if (perfilNombreSidebar) {
      perfilNombreSidebar.textContent = `${userName} ${userLastName}`.trim() || 'Usuario';
    }

    // Actualizar inicial del avatar
    updateAvatarInicial();
  }

  // ==================== CARGAR PERFIL ====================
  const loadUserProfile = () => {
    const userName = localStorage.getItem('userName') || '';
    const userLastName = localStorage.getItem('userLastName') || '';
    const userEmail = localStorage.getItem('userEmail') || '';
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

    const profileData = {
      nombre: userName,
      apellido: userLastName,
      email: userEmail,
      telefono: savedProfile.telefono || '',
      fecha_nacimiento: savedProfile.fecha_nacimiento || '',
      genero: savedProfile.genero || '',
      pais: savedProfile.pais || '',
      ciudad: savedProfile.ciudad || '',
      direccion: savedProfile.direccion || '',
      ocupacion: savedProfile.ocupacion || '',
      empresa: savedProfile.empresa || '',
      biografia: savedProfile.biografia || '',
      linkedin: savedProfile.linkedin || '',
      github: savedProfile.github || '',
      portfolio: savedProfile.portfolio || '',
      twitter: savedProfile.twitter || '',
      ...savedProfile
    };

    populateProfileForm(profileData);
    updateUserName();
    updateStatistics();
  };

  const populateProfileForm = (data) => {
    for (const [key, value] of Object.entries(data)) {
      const input = document.getElementById(key);
      if (input) {
        input.value = value;
      }
    }
  };

  // ==================== ACTUALIZAR ESTADÍSTICAS ====================
  function updateStatistics() {
    const savedStats = JSON.parse(localStorage.getItem('userStats')) || datosPerfil.estadisticas;

    const statCursos = document.getElementById('stat-cursos');
    const statHoras = document.getElementById('stat-horas');
    const statCertificados = document.getElementById('stat-certificados');
    const statRacha = document.getElementById('stat-racha');

    if (statCursos) animateNumber(statCursos, savedStats.cursos);
    if (statHoras) animateNumber(statHoras, savedStats.horas);
    if (statCertificados) animateNumber(statCertificados, savedStats.certificados);
    if (statRacha) animateNumber(statRacha, savedStats.racha);
  }

  function animateNumber(element, target) {
    let current = 0;
    const increment = target / 20;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.round(current);
    }, 50);
  }

  // ==================== GUARDAR PERFIL ====================
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(profileForm);
      const data = Object.fromEntries(formData);

      // Guardar en localStorage
      localStorage.setItem('userProfile', JSON.stringify(data));
      localStorage.setItem('userName', data.nombre);
      localStorage.setItem('userLastName', data.apellido);
      localStorage.setItem('userEmail', data.email);

      // Guardar teléfono por separado para fácil acceso
      if (data.telefono) {
        localStorage.setItem('userPhone', data.telefono);
      }

      // Actualizar todos los elementos de la UI
      updateAllUIElements();

      // Mostrar modal de éxito
      showSuccessModal();
    });
  }

  // ==================== ACTUALIZAR TODOS LOS ELEMENTOS UI ====================
  function updateAllUIElements() {
    const userName = localStorage.getItem('userName') || 'Usuario';
    const userLastName = localStorage.getItem('userLastName') || '';
    const userEmail = localStorage.getItem('userEmail') || '';
    const inicial = userName.charAt(0).toUpperCase();

    // 1. Actualizar nombre en el dropdown del header
    const userNameHeader = document.getElementById('userName');
    if (userNameHeader) {
      userNameHeader.textContent = userName;
    }

    // 2. Actualizar nombre completo en el sidebar
    if (perfilNombreSidebar) {
      perfilNombreSidebar.textContent = `${userName} ${userLastName}`.trim() || 'Usuario';
    }

    // 3. Actualizar avatar del header (imagen o inicial) - se hace en updateAvatarDisplay()
    // No asignar textContent directamente al profileToggle ya que ahora es un container

    // 4. Actualizar avatar del sidebar (imagen o inicial)
    updateAvatarDisplay();

    console.log('UI actualizado: ', { userName, userLastName, userEmail });
  }

  // ==================== CAMBIAR CONTRASEÑA ====================
  if (formCambiarPassword) {
    formCambiarPassword.addEventListener('submit', (e) => {
      e.preventDefault();

      const passwordActual = document.getElementById('password_actual').value;
      const passwordNueva = document.getElementById('password_nueva').value;
      const passwordConfirmar = document.getElementById('password_confirmar').value;

      if (!passwordActual || !passwordNueva || !passwordConfirmar) {
        alert('Por favor, completa todos los campos');
        return;
      }

      if (passwordNueva !== passwordConfirmar) {
        alert('Las contraseñas nuevas no coinciden');
        return;
      }

      if (passwordNueva.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
      }

      // Simular cambio de contraseña
      showSuccessModal();
      formCambiarPassword.reset();
    });
  }

  // ==================== MOSTRAR/OCULTAR CONTRASEÑA ====================
  passwordInputs.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      const icon = btn.querySelector('i');

      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });

  // ==================== FORTALEZA DE CONTRASEÑA ====================
  const passwordNuevaInput = document.getElementById('password_nueva');
  const strengthBar = document.querySelector('.strength-bar');
  const strengthText = document.querySelector('.strength-text');

  if (passwordNuevaInput && strengthBar && strengthText) {
    passwordNuevaInput.addEventListener('input', (e) => {
      const password = e.target.value;
      const strength = calculatePasswordStrength(password);

      strengthBar.style.width = strength.percentage + '%';
      strengthBar.style.background = strength.color;
      strengthText.textContent = 'Fortaleza: ' + strength.text;
      strengthText.style.color = strength.color;
    });
  }

  function calculatePasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^a-zA-Z0-9]/.test(password)) score += 15;

    let text, color;
    if (score < 30) {
      text = 'Débil';
      color = '#e74c3c';
    } else if (score < 60) {
      text = 'Regular';
      color = '#f59e0b';
    } else if (score < 80) {
      text = 'Buena';
      color = '#10b981';
    } else {
      text = 'Excelente';
      color = '#059669';
    }

    return { percentage: score, text, color };
  }

  // ==================== MODAL DE ÉXITO ====================
  function showSuccessModal() {
    if (modalExito) {
      modalExito.classList.add('active');
    }
  }

  window.cerrarModal = function () {
    if (modalExito) {
      modalExito.classList.remove('active');
    }
  };

  // Cerrar modal al hacer clic fuera
  if (modalExito) {
    modalExito.addEventListener('click', (e) => {
      if (e.target === modalExito) {
        cerrarModal();
      }
    });
  }

  // ==================== MENÚ DESPLEGABLE DEL HEADER ====================
  if (profileToggle && profileDropdown) {
    profileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle("active");
    });

    document.addEventListener("click", () => {
      profileDropdown.classList.remove("active");
    });

    profileDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // ==================== CARRITO ====================
  if (carritoToggle) {
    carritoToggle.addEventListener("click", () => {
      window.location.href = "carrito.html";
    });
  }

  // Actualizar contador del carrito
  function updateCartCounter() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('contador-carrito');
    if (contador) {
      contador.textContent = carrito.length;
    }
  }

  // ==================== PREFERENCIAS ====================
  // Selector de tema
  const temaInputs = document.querySelectorAll('input[name="tema"]');
  temaInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const tema = e.target.value;
      localStorage.setItem('tema', tema);
      console.log('Tema seleccionado:', tema);
    });
  });

  // Cargar tema guardado
  const temaGuardado = localStorage.getItem('tema');
  if (temaGuardado) {
    const temaInput = document.querySelector(`input[name="tema"][value="${temaGuardado}"]`);
    if (temaInput) {
      temaInput.checked = true;
    }
  }

  // ==================== INTERESES ====================
  const interesChips = document.querySelectorAll('.interes-chip');
  interesChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
      const checkbox = chip.querySelector('input');
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
      }

      // Guardar intereses
      const selectedInterests = [];
      document.querySelectorAll('.interes-chip.selected').forEach(selected => {
        selectedInterests.push(selected.textContent.trim());
      });
      localStorage.setItem('userInterests', JSON.stringify(selectedInterests));
    });
  });

  // ==================== TOGGLE SWITCHES ====================
  const toggleSwitches = document.querySelectorAll('.toggle-switch input');
  toggleSwitches.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const settingName = e.target.id || e.target.name;
      const settings = JSON.parse(localStorage.getItem('userSettings')) || {};
      settings[settingName] = e.target.checked;
      localStorage.setItem('userSettings', JSON.stringify(settings));
    });
  });

  // Cargar configuraciones guardadas
  const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};
  Object.keys(savedSettings).forEach(key => {
    const toggle = document.getElementById(key);
    if (toggle) {
      toggle.checked = savedSettings[key];
    }
  });

  // ==================== CERTIFICADOS ====================
  const btnsVerCertificado = document.querySelectorAll('.btn-ver-certificado');
  const btnsDescargarCertificado = document.querySelectorAll('.btn-descargar-certificado');

  btnsVerCertificado.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Abriendo certificado en vista previa...');
    });
  });

  btnsDescargarCertificado.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Descargando certificado...');
    });
  });

  // ==================== BOTONES DE SESIONES ====================
  const btnsCerrarSesionDispositivo = document.querySelectorAll('.btn-cerrar-sesion-dispositivo');
  const btnCerrarTodas = document.querySelector('.btn-cerrar-todas');

  btnsCerrarSesionDispositivo.forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('¿Cerrar sesión en este dispositivo?')) {
        btn.closest('.sesion-item').remove();
        alert('Sesión cerrada exitosamente');
      }
    });
  });

  if (btnCerrarTodas) {
    btnCerrarTodas.addEventListener('click', () => {
      if (confirm('¿Cerrar sesión en todos los demás dispositivos?')) {
        const sesiones = document.querySelectorAll('.sesion-item:not(.actual)');
        sesiones.forEach(sesion => sesion.remove());
        alert('Todas las sesiones han sido cerradas');
      }
    });
  }

  // ==================== MÉTODO DE PAGO ====================
  const btnAgregarMetodo = document.querySelector('.btn-agregar-metodo');
  if (btnAgregarMetodo) {
    btnAgregarMetodo.addEventListener('click', () => {
      alert('Funcionalidad para agregar método de pago');
    });
  }

  // ==================== UPGRADE PLAN ====================
  const btnUpgrade = document.querySelector('.btn-upgrade');
  if (btnUpgrade) {
    btnUpgrade.addEventListener('click', () => {
      window.location.href = 'carrito.html';
    });
  }

  // ==================== BOTÓN CANCELAR ====================
  const btnCancelar = document.getElementById('btn-cancelar');
  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      if (confirm('¿Descartar los cambios realizados?')) {
        loadUserProfile();
      }
    });
  }

  // ==================== MENÚ MÓVIL ====================
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // ==================== INICIALIZACIÓN ====================
  // Verificar si hay un hash en la URL para ir a una sección específica
  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Buscar el botón del sidebar que corresponde a esta sección
      const targetButton = document.querySelector(`.sidebar-nav-btn[data-section="${hash}"]`);
      if (targetButton) {
        navButtons.forEach((btn) => btn.classList.remove("active"));
        targetButton.classList.add("active");
        changeSection(hash);
        return true;
      }
    }
    return false;
  }

  // Si no hay hash o el hash no es válido, mostrar la primera sección
  if (!handleUrlHash()) {
    const firstButton = navButtons[0];
    if (firstButton) {
      const firstSectionId = firstButton.getAttribute("data-section");
      changeSection(firstSectionId);
      firstButton.classList.add("active");
    }
  }

  // Escuchar cambios en el hash (por si el usuario navega con botones del navegador)
  window.addEventListener('hashchange', handleUrlHash);

  // Cargar datos iniciales
  loadUserProfile();
  updateCartCounter();
  updateAvatarDisplay();
  updateAllUIElements();

  // ==================== BADGES INTERACTIVOS ====================
  const badgeCards = document.querySelectorAll('.badge-card.obtenido');
  badgeCards.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'translateY(-4px) scale(1.02)';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'translateY(0) scale(1)';
    });
  });

  console.log('Página de perfil cargada correctamente');
});
