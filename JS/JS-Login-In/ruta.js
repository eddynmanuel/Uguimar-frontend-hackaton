document.addEventListener('DOMContentLoaded', function () {
    // Get school ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const escuelaId = urlParams.get('escuela_id');

    // Datos simulados de escuelas
    const ESCUELAS = {
        1: { id: 1, nombre: 'Desarrollo Web', descripcion: 'Aprende a crear sitios web profesionales con las tecnologías más demandadas.' },
        2: { id: 2, nombre: 'Data Science', descripcion: 'Análisis de datos, visualización y machine learning.' },
        3: { id: 3, nombre: 'Inteligencia Artificial', descripcion: 'Deep Learning, NLP y redes neuronales.' },
        4: { id: 4, nombre: 'Ciberseguridad', descripcion: 'Protección de sistemas, redes y aplicaciones.' },
        5: { id: 5, nombre: 'Marketing Digital', descripcion: 'Estrategias de marketing online y growth hacking.' }
    };

    // Datos simulados de rutas por escuela
    const RUTAS = {
        1: [
            { id: 1, nombre: 'Frontend Developer', descripcion: 'Domina HTML, CSS, JavaScript y React' },
            { id: 2, nombre: 'Backend Developer', descripcion: 'Node.js, Express y bases de datos' },
            { id: 3, nombre: 'Full Stack Developer', descripcion: 'Desarrollo completo de aplicaciones web' }
        ],
        2: [
            { id: 4, nombre: 'Fundamentos de Data Science', descripcion: 'Python, estadística y visualización' },
            { id: 5, nombre: 'Machine Learning', descripcion: 'Algoritmos de aprendizaje automático' }
        ],
        3: [
            { id: 6, nombre: 'Deep Learning', descripcion: 'Redes neuronales con TensorFlow y PyTorch' },
            { id: 7, nombre: 'NLP', descripcion: 'Procesamiento de lenguaje natural' }
        ],
        4: [
            { id: 8, nombre: 'Seguridad Ofensiva', descripcion: 'Pentesting y hacking ético' },
            { id: 9, nombre: 'Seguridad Defensiva', descripcion: 'Análisis de vulnerabilidades y respuesta a incidentes' }
        ],
        5: [
            { id: 10, nombre: 'SEO y SEM', descripcion: 'Posicionamiento en buscadores' },
            { id: 11, nombre: 'Social Media Marketing', descripcion: 'Gestión de redes sociales' }
        ]
    };

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
    searchForm.addEventListener('submit', function (e) {
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
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
    }

    function cerrarSesion() {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userLastName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        window.location.href = '../Principal/Principal.html';
    }

    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', function (e) {
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

        // Obtener datos de la escuela desde datos simulados
        const escuela = ESCUELAS[escuelaId];

        if (!escuela) {
            mostrarError('Escuela no encontrada', 'No se pudo encontrar la escuela especificada.');
            return;
        }

        rutaTitulo.textContent = `Rutas de ${escuela.nombre}`;
        rutaDescripcion.textContent = escuela.descripcion;
        document.title = `UGuimar - Rutas de ${escuela.nombre}`;

        // Obtener rutas desde datos simulados
        const rutas = RUTAS[escuelaId] || [];

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

        rutasContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-ver-ruta')) {
                const rutaId = e.target.getAttribute('data-ruta-id');
                viewRuta(rutaId);
            }
        });
    }

    function mostrarError(titulo, mensaje) {
        rutaTitulo.textContent = titulo;
        rutaDescripcion.textContent = mensaje;
        rutasContainer.innerHTML = '';
    }

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
