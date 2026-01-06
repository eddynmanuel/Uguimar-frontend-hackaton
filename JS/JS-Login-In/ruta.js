document.addEventListener('DOMContentLoaded', function() {
    // Get school ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const escuelaId = urlParams.get('escuela_id');

    // Get DOM elements
    const rutaTitulo = document.getElementById('ruta-titulo');
    const rutaDescripcion = document.getElementById('ruta-descripcion');
    const rutasContainer = document.querySelector('.rutas-container');
    const volverEscuela = document.getElementById('volver-escuela');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const profileDropdown = document.getElementById('profile-dropdown');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');
    const searchForm = document.getElementById('search-form');
    const inputBusqueda = document.getElementById('busqueda-curso');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    
    // Cart functionality
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    carritoToggle.addEventListener('click', () => {
        window.location.href = 'carrito.html';
    });

    // Search functionality
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = inputBusqueda.value.trim();
        if (searchTerm) {
            window.location.href = `busqueda.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });

    // Menu toggle functionality
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Profile dropdown functionality
    profileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!profileDropdown.contains(e.target) && e.target !== profileToggle) {
            profileDropdown.classList.remove('active');
        }
    });

    // Close navigation on mobile when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!mainNav.contains(e.target) && e.target !== menuToggle) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName) {
            userNameElement.textContent = userName;
        }
    }

    function cerrarSesion() {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userLastName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        window.location.href = '/Principal';
    }

    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cerrarSesion();
        });
    }

    updateUserName();
  
    function cargarRutasEscuela() {
        if (!escuelaId) {
            mostrarError('Escuela no encontrada', 'No se pudo encontrar la escuela especificada.');
            return;
        }

        // Primero obtenemos los datos de la escuela
        fetch(`/api/escuelas/${escuelaId}`)
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar la escuela');
                return response.json();
            })
            .then(escuela => {
                rutaTitulo.textContent = `Rutas de ${escuela.nombre}`;
                rutaDescripcion.textContent = escuela.descripcion || 'Explora las rutas disponibles en esta escuela.';
                document.title = `UGuimar - Rutas de ${escuela.nombre}`;

                // Luego obtenemos las rutas de la escuela
                return fetch(`/api/rutas?escuela_id=${escuelaId}`);
            })
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar las rutas');
                return response.json();
            })
            .then(rutas => {
                rutasContainer.innerHTML = '';
                if (rutas.length === 0) {
                    rutasContainer.innerHTML = '<p class="no-rutas">No hay rutas disponibles para esta escuela.</p>';
                    return;
                }

                rutas.forEach(ruta => {
                    const rutaElement = document.createElement('div');
                    rutaElement.className = 'ruta-card';
                    rutaElement.innerHTML = `
                        <h2>${ruta.nombre}</h2>
                        <p>${ruta.descripcion}</p>
                        <button class="btn-ver-ruta" data-ruta-id="${ruta.id}">Ver Ruta</button>
                    `;
                    rutasContainer.appendChild(rutaElement);
                });

                rutasContainer.addEventListener('click', function(e) {
                    if (e.target.classList.contains('btn-ver-ruta')) {
                        const rutaId = e.target.getAttribute('data-ruta-id');
                        viewRuta(rutaId);
                    }
                });
            })
            .catch(error => {
                console.error('Error:', error);
                mostrarError(
                    'Error al cargar la información',
                    'Ocurrió un error al cargar los datos. Por favor, intenta de nuevo más tarde.'
                );
            });
    }

    function mostrarError(titulo, mensaje) {
        rutaTitulo.textContent = titulo;
        rutaDescripcion.textContent = mensaje;
        rutasContainer.innerHTML = '';
    }

    // Añadir esta función fuera del DOMContentLoaded event listener
    function viewRuta(rutaId) {
        window.location.href = `cursos.html?ruta_id=${rutaId}`;
    }

    // Inicializar la página
    if (escuelaId) {
        cargarRutasEscuela();
        actualizarContadorCarrito();
    } else {
        mostrarError('Escuela no encontrada', 'No se pudo encontrar la escuela especificada.');
    }

    // Configurar el enlace "Volver a la Escuela"
    if (volverEscuela) {
        volverEscuela.href = `inicioj.html`;
    }
});

