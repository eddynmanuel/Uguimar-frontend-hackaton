document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const searchForm = document.getElementById('search-form');
    const inputBusqueda = document.getElementById('busqueda-curso');
    const escuelaTitulo = document.getElementById('escuela-titulo');
    const escuelaDescripcion = document.getElementById('escuela-descripcion');
    const listaRutas = document.getElementById('lista-rutas');
    const contadorCarrito = document.getElementById('contador-carrito');
    const carritoToggle = document.getElementById('carrito-toggle');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    // Get the school ID from the URL (simulated)
    const escuelaId = '1';

    function cargarEscuelaYRutas() {
        // Datos simulados
        const escuela = {
            name: 'Escuela de Programación Easycode',
            description: 'Una escuela de programación de vanguardia que te prepara para la industria tecnológica.'
        };
        escuelaTitulo.textContent = escuela.name;
        escuelaDescripcion.textContent = escuela.description;
        document.title = `Easycode - ${escuela.name}`;

        // Rutas simuladas
        const rutas = [
            { id: 1, name: 'Ruta de Frontend', description: 'Aprende a construir interfaces web.' },
            { id: 2, name: 'Ruta de Backend', description: 'Desarrolla aplicaciones de servidor y bases de datos.' },
            { id: 3, name: 'Ruta Full Stack', description: 'Conviértete en un desarrollador completo.' }
        ];

        listaRutas.innerHTML = '';
        rutas.forEach(ruta => {
            const rutaElement = document.createElement('div');
            rutaElement.className = 'ruta';
            rutaElement.innerHTML = `
                <h3>${ruta.name}</h3>
                <p>${ruta.description}</p>
                <a href="cursos.html?id=${ruta.id}" class="btn-explorar">Ver Ruta</a>
            `;
            listaRutas.appendChild(rutaElement);
        });
    }

    if (escuelaId) {
        cargarEscuelaYRutas();
    } else {
        escuelaTitulo.textContent = 'Escuela no encontrada';
        listaRutas.innerHTML = '<p>No se pudo encontrar la escuela especificada.</p>';
    }

    // Función para actualizar el nombre de usuario
    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
    }

    updateUserName();

    // Function to toggle the navigation menu
    menuToggle.addEventListener('click', function () {
        navegacionPrincipal.classList.toggle('active');
    });

    // Function to toggle the profile menu
    profileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menuDesplegable.classList.toggle('active');
    });

    // Close the profile menu when clicking outside of it
    document.addEventListener('click', function (e) {
        if (!menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
    });

    // Function to search courses and redirect to the results page
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchTerm = inputBusqueda.value.trim();
        if (searchTerm) {
            window.location.href = `busqueda.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });

    // Function to update the cart counter
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

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

    // Initialize the cart counter
    actualizarContadorCarrito();

    // Redirect to the cart page when clicking on the cart icon
    carritoToggle.addEventListener('click', function () {
        window.location.href = 'carrito.html';
    });

    // Close the navigation menu on mobile when clicking a link
    const navLinks = navegacionPrincipal.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navegacionPrincipal.classList.remove('active');
            }
        });
    });

    // Adjust menu display on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navegacionPrincipal.classList.remove('active');
        }
    });
});