// Datos de las escuelas con IDs numéricos que coinciden con ruta.js
const ESCUELAS = [
    {
        id: 1,
        nombre: 'Escuela de Desarrollo Web',
        descripcion: 'Domina HTML, CSS, JavaScript y los frameworks más populares para crear aplicaciones web modernas.',
        icono: 'fa-code',
        rutas: 6,
        cursos: 45
    },
    {
        id: 2,
        nombre: 'Escuela de Data Science',
        descripcion: 'Aprende Python, estadística, machine learning y análisis de datos.',
        icono: 'fa-chart-bar',
        rutas: 5,
        cursos: 38
    },
    {
        id: 3,
        nombre: 'Escuela de Inteligencia Artificial',
        descripcion: 'Explora el mundo de la IA, deep learning y redes neuronales.',
        icono: 'fa-robot',
        rutas: 5,
        cursos: 32
    },
    {
        id: 4,
        nombre: 'Escuela de Ciberseguridad',
        descripcion: 'Protege sistemas y datos con técnicas de ethical hacking y seguridad.',
        icono: 'fa-shield-alt',
        rutas: 5,
        cursos: 28
    },
    {
        id: 5,
        nombre: 'Escuela de Marketing Digital',
        descripcion: 'Domina SEO, SEM, redes sociales y estrategias de crecimiento digital.',
        icono: 'fa-bullhorn',
        rutas: 6,
        cursos: 35
    },
    {
        id: 6,
        nombre: 'Escuela de Desarrollo Móvil',
        descripcion: 'Crea aplicaciones nativas e híbridas para iOS y Android.',
        icono: 'fa-mobile-alt',
        rutas: 4,
        cursos: 28
    },
    {
        id: 7,
        nombre: 'Escuela de Cloud Computing',
        descripcion: 'AWS, Azure, Google Cloud y arquitectura de servicios en la nube.',
        icono: 'fa-cloud',
        rutas: 5,
        cursos: 30
    },
    {
        id: 8,
        nombre: 'Escuela de DevOps',
        descripcion: 'CI/CD, Docker, Kubernetes y automatización de infraestructura.',
        icono: 'fa-cogs',
        rutas: 4,
        cursos: 25
    },
    {
        id: 9,
        nombre: 'Escuela de Diseño UX/UI',
        descripcion: 'Diseño de interfaces, experiencia de usuario y prototipado.',
        icono: 'fa-palette',
        rutas: 4,
        cursos: 22
    },
    {
        id: 10,
        nombre: 'Escuela de Blockchain',
        descripcion: 'Criptomonedas, smart contracts y desarrollo Web3.',
        icono: 'fa-link',
        rutas: 3,
        cursos: 18
    }
];

document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const contadorCarrito = document.getElementById('contador-carrito');
    const carritoToggle = document.getElementById('carrito-toggle');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const listaEscuelas = document.getElementById('lista-escuelas');

    // Cargar escuelas
    cargarEscuelas();

    // Actualizar nombre de usuario
    actualizarNombreUsuario();

    // Toggle menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navegacionPrincipal.classList.toggle('active');
        });
    }

    // Toggle menú perfil
    if (profileToggle) {
        profileToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            menuDesplegable.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function (e) {
        if (menuDesplegable && !menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
    });

    // Contador carrito
    actualizarContadorCarrito();

    // Click en carrito
    if (carritoToggle) {
        carritoToggle.addEventListener('click', function () {
            window.location.href = 'carrito.html';
        });
    }

    // Cerrar sesión
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', function (e) {
            e.preventDefault();
            cerrarSesion();
        });
    }

    // Funciones
    function cargarEscuelas() {
        if (!listaEscuelas) return;

        listaEscuelas.innerHTML = '';

        ESCUELAS.forEach(escuela => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-escuela';
            tarjeta.innerHTML = `
                <div class="icono-escuela">
                    <i class="fas ${escuela.icono}"></i>
                </div>
                <h3>${escuela.nombre}</h3>
                <p>${escuela.descripcion}</p>
                <div class="info-escuela">
                    <span><i class="fas fa-route"></i> ${escuela.rutas} Rutas</span>
                    <span><i class="fas fa-book"></i> ${escuela.cursos} Cursos</span>
                </div>
                <a href="ruta.html?escuela_id=${escuela.id}" class="btn-explorar-escuela">
                    Explorar Escuela
                </a>
            `;

            // Hacer la tarjeta clickeable
            tarjeta.addEventListener('click', function (e) {
                if (e.target.tagName !== 'A') {
                    window.location.href = `ruta.html?escuela_id=${escuela.id}`;
                }
            });

            listaEscuelas.appendChild(tarjeta);
        });
    }

    function actualizarNombreUsuario() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;

            // Actualizar avatar con inicial
            const avatarElement = document.getElementById('profile-toggle');
            if (avatarElement && avatarElement.classList.contains('avatar-inicial')) {
                avatarElement.textContent = userName.charAt(0).toUpperCase();
            }
        }
    }

    function actualizarContadorCarrito() {
        if (contadorCarrito) {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            contadorCarrito.textContent = carrito.length;
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

    // Cerrar navegación en móvil al hacer clic en link
    const navLinks = document.querySelectorAll('.navegacion-principal a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navegacionPrincipal.classList.remove('active');
            }
        });
    });

    // Ajustar menú en resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navegacionPrincipal.classList.remove('active');
        }
    });
});