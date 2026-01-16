document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section-profile");
  const profileForm = document.getElementById('profile-form');
  const userNameElement = document.getElementById('user-name');
  const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

  // Función para mostrar la sección correspondiente y ocultar las demás
  const changeSection = (sectionId) => {
    sections.forEach((section) => {
      section.classList.toggle("active", section.id === sectionId);
    });
  };

  // Agregar eventos a los botones de navegación
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

  // Función para cerrar sesión
  function cerrarSesion() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    window.location.href = '../Principal/Principal.html';
  }

  // Agregar evento de clic al botón de cerrar sesión
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener('click', function (e) {
      e.preventDefault();
      cerrarSesion();
    });
  }

  // Función para actualizar el nombre de usuario en el menú
  function updateUserName() {
    const userNameElementNav = document.getElementById('userName');
    const userName = localStorage.getItem('userName');
    if (userName && userNameElementNav) {
      userNameElementNav.textContent = userName;
    }
  }

  updateUserName();

  // Mostrar la primera sección al cargar la página
  const firstButton = navButtons[0];
  if (firstButton) {
    const firstSectionId = firstButton.getAttribute("data-section");
    changeSection(firstSectionId);
    firstButton.classList.add("active");
  }

  // Cargar datos del perfil desde localStorage (simulado)
  const loadUserProfile = () => {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userLastName = localStorage.getItem('userLastName');
    const userEmail = localStorage.getItem('userEmail');

    // Cargar datos adicionales guardados previamente
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

    const profileData = {
      nombre: userName || '',
      apellido: userLastName || '',
      correo: userEmail || '',
      telefono: savedProfile.telefono || '',
      fecha_nacimiento: savedProfile.fecha_nacimiento || '',
      genero: savedProfile.genero || '',
      pais: savedProfile.pais || '',
      ...savedProfile
    };

    populateProfileForm(profileData);
  };

  // Populate profile form with user data
  const populateProfileForm = (data) => {
    for (const [key, value] of Object.entries(data)) {
      const input = document.getElementById(key);
      if (input) {
        input.value = value;
      }
    }
    if (userNameElement && data.nombre && data.apellido) {
      userNameElement.textContent = `${data.nombre} ${data.apellido}`;
    }
  };

  // Handle profile form submission (save to localStorage)
  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(profileForm);
    const data = Object.fromEntries(formData);

    // Validate passwords if provided
    if (data.nueva_contrasena) {
      if (data.nueva_contrasena !== data.confirmar_contrasena) {
        alert('Las contraseñas nuevas no coinciden');
        return;
      }
    }
    delete data.nueva_contrasena;
    delete data.confirmar_contrasena;

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(data));
    localStorage.setItem('userName', data.nombre);
    localStorage.setItem('userLastName', data.apellido);
    localStorage.setItem('userEmail', data.correo);

    alert('Perfil actualizado con éxito');
    loadUserProfile();
    updateUserName();
  });

  // Initial profile data load
  loadUserProfile();

  // Elementos del DOM para la funcionalidad del encabezado
  const profileToggle = document.getElementById("profile-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");
  const carritoToggle = document.getElementById("carrito-toggle");

  // Mostrar/Ocultar menú desplegable de perfil
  profileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle("visible");
  });

  // Cerrar el menú desplegable si se hace clic fuera de él
  document.addEventListener("click", () => {
    profileDropdown.classList.remove("visible");
  });

  // Evitar que se cierre al hacer clic dentro del menú desplegable
  profileDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Redirigir al hacer clic en el carrito de compras
  carritoToggle.addEventListener("click", () => {
    window.location.href = "carrito.html";
  });
});
