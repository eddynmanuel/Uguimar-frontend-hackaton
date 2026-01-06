document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const rutasContainer = document.querySelector('.rutas-container');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');
    const searchInput = document.getElementById('busqueda-curso');
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

    // Función para cargar las rutas (simulado)
    function cargarRutas() {
        const rutas = [
            { nombre: "Desarrollo Web Full Stack", escuela: "Desarrollo Web", progreso: 60 },
            { nombre: "Ciencia de Datos Avanzada", escuela: "Ciencia de Datos", progreso: 30 },
            { nombre: "Inteligencia Artificial y Machine Learning", escuela: "Inteligencia Artificial", progreso: 45 },
            { nombre: "Ciberseguridad Empresarial", escuela: "Ciberseguridad", progreso: 15 }
        ];

        rutasContainer.innerHTML = '';
        rutas.forEach((ruta, index) => {
            const rutaElement = document.createElement('div');
            rutaElement.className = 'ruta-card';
            rutaElement.innerHTML = `
                <h2>${ruta.nombre}</h2>
                <p>Escuela: ${ruta.escuela}</p>
                <div class="ruta-progress">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${ruta.progreso}%;"></div>
                    </div>
                    <p class="progress-text">${ruta.progreso}% completado</p>
                </div>
            `;
            rutasContainer.appendChild(rutaElement);
        });
    }

    // Cargar las rutas al iniciar la página
    cargarRutas();

    // Función para agregar al carrito
    function agregarAlCarrito(e) {
        if (e.target.classList.contains('btn-agregar-carrito')) {
            const curso = {
                id: e.target.dataset.id,
                nombre: e.target.dataset.nombre,
                precio: parseFloat(e.target.dataset.precio)
            };
            
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const cursoEnCarrito = carrito.find(item => item.id === curso.id);
            
            if (cursoEnCarrito) {
                alert('Este curso ya está en tu carrito');
            } else {
                carrito.push(curso);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarContadorCarrito();
                alert('Curso agregado al carrito');
            }
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


// Add this at the end of the DOMContentLoaded event listener
function updateUserName() {
    const userNameElement = document.getElementById('userName');
    const userName = localStorage.getItem('userName');
    if (userName) {
        userNameElement.textContent = userName;
    }
  }
  
  // Call the function to update the user name
  updateUserName();
  
    // Función para actualizar el contador del carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    // Agregar evento de clic a los botones de "Agregar al carrito"
    document.addEventListener('click', agregarAlCarrito);

    // Inicializar el contador del carrito
    actualizarContadorCarrito();

    // Redirigir a la página del carrito al hacer clic en el icono
    carritoToggle.addEventListener('click', function() {
        window.location.href = 'planesj.html';
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