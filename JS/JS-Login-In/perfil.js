document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section-profile");
  const logoutButton = document.querySelector('.nav-btn[data-section="cerrar-sesion"]');
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
        localStorage.clear();
        window.location.href = "../Principal/index.html"; // Redirige a la interfaz principal
      });
    } else {
      button.addEventListener("click", () => {
        // Cambiar el estado activo del botón
        navButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        // Cambiar la sección activa
        changeSection(sectionId);
      });
    }
  });



  // Función para cerrar sesión
  function cerrarSesion() {
      // Limpiar datos de sesión del localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('userLastName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');

      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = '/Principal';
  }

  // Agregar evento de clic al botón de cerrar sesión
  if (cerrarSesionBtn) {
      cerrarSesionBtn.addEventListener('click', function(e) {
          e.preventDefault();
          cerrarSesion();
      });
  }

  // Función para actualizar el nombre de usuario en el menú
  function updateUserName() {
      const userNameElement = document.getElementById('userName');
      const userName = localStorage.getItem('userName');
      if (userName && userNameElement) {
          userNameElement.textContent = userName;
      }
  }

  // Llamar a la función para actualizar el nombre de usuario
  updateUserName();


  // Mostrar la primera sección al cargar la página
  const firstButton = navButtons[0];
  if (firstButton) {
    const firstSectionId = firstButton.getAttribute("data-section");
    changeSection(firstSectionId);
    firstButton.classList.add("active");
  }

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/api/profile/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const profileData = await response.json();
      populateProfileForm(profileData);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  // Populate profile form with user data
  const populateProfileForm = (data) => {
    for (const [key, value] of Object.entries(data)) {
      const input = document.getElementById(key);
      if (input) {
        input.value = value;
      }
    }
    userNameElement.textContent = `${data.nombre} ${data.apellido}`;
  };

  // Handle profile form submission
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(profileForm);
    const userId = localStorage.getItem('userId');
    const data = Object.fromEntries(formData);

    // Solo incluye la contraseña si se proporciona una nueva
    if (!data.nueva_contrasena) {
      delete data.nueva_contrasena;
      delete data.confirmar_contrasena;
    } else if (data.nueva_contrasena !== data.confirmar_contrasena) {
      alert('Las contraseñas nuevas no coinciden');
      return;
    }

    try {
      const response = await fetch(`/api/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      alert('Perfil actualizado con éxito');
      fetchUserProfile(); // Refresh profile data
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Error al actualizar el perfil');
    }
  });

  // Initial profile data fetch
  fetchUserProfile();

  // Elementos del DOM para la funcionalidad del encabezado
  const profileToggle = document.getElementById("profile-toggle");
  const profileDropdown = document.getElementById("profile-dropdown");
  const carritoToggle = document.getElementById("carrito-toggle");

  // Mostrar/Ocultar menú desplegable de perfil
  profileToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que se cierre al hacer clic en el perfil
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



