document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');
    const searchInput = document.querySelector('.barra-busqueda input');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    // Función para toggle del menú de navegación
    menuToggle.addEventListener('click', function() {
        navegacionPrincipal.classList.toggle('active');
    });

    // Función para toggle del menú de perfil
    profileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        menuDesplegable.classList.toggle('active');
    });

    // Cerrar el menú de perfil al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
    });

    // Cerrar el menú de navegación en móviles al hacer clic en un enlace
    const navLinks = navegacionPrincipal.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navegacionPrincipal.classList.remove('active');
            }
        });
    });

    // Ajustar la visualización del menú al cambiar el tamaño de la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navegacionPrincipal.classList.remove('active');
        }
    });

    // Funcionalidad del carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    carritoToggle.addEventListener('click', function() {
        window.location.href = 'planesj.html';
    });
// Add this at the end of the DOMContentLoaded event listener
function updateUserName() {
    const userNameElement = document.getElementById('userName');
    const userName = localStorage.getItem('userName');
    if (userName) {
        userNameElement.textContent = userName;
    }
  }


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

  
    // Inicializar el contador del carrito
    actualizarContadorCarrito();

    // Funcionalidad específica para la página de progreso
    const btnsContinuar = document.querySelectorAll('.btn-continuar');

    btnsContinuar.forEach(btn => {
        btn.addEventListener('click', function() {
            const cursoNombre = this.closest('.curso').querySelector('h3').textContent;
            alert(`Continuando con el curso: ${cursoNombre}`);
        });
    });

    // Funcionalidad de búsqueda
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    window.location.href = `busqueda.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    } else {
        console.error('No se encontró la entrada de búsqueda');
    }
});