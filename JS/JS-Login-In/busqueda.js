document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('busqueda-curso');
    const totalResultados = document.getElementById('total-resultados');
    const listaEscuelas = document.getElementById('lista-escuelas');
    const listaCursos = document.getElementById('lista-cursos');
    const navItems = document.querySelectorAll('.navegacion-resultados li');
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.querySelector('.navegacion-principal');
    const perfilToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.querySelector('.menu-desplegable');
    const contadorCarrito = document.getElementById('contador-carrito');
    const carritoToggle = document.getElementById('carrito-toggle');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    // Obtener el término de búsqueda de la URL y colocarlo en el input
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q');
    if (searchTerm && searchInput) {
        searchInput.value = decodeURIComponent(searchTerm);
        realizarBusqueda(searchTerm);
    } else if (searchTerm) {
        realizarBusqueda(searchTerm);
    }

    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const newSearchTerm = searchInput.value.trim();
            if (newSearchTerm) {
                const newUrl = `${window.location.pathname}?q=${encodeURIComponent(newSearchTerm)}`;
                window.history.pushState({}, '', newUrl);
                realizarBusqueda(newSearchTerm);
            }
        });
    }

    function realizarBusqueda(term) {
        console.log('Realizando búsqueda para:', term);
        // Datos simulados de resultados
        mostrarResultados({
            total: 10,
            totales: {
                destacado: 2,
                escuelas: 3,
                cursos: 5,
                clases: 0,
                rutas: 0
            },
            escuelas: [
                { titulo: "Escuela de Programación", rutas: 5, descripcion: "Aprende a programar desde cero" },
                { titulo: "Escuela de Diseño", rutas: 3, descripcion: "Domina las herramientas de diseño" }
            ],
            cursos: [
                { id: "curso1", titulo: "Introducción a JavaScript", descripcion: "Aprende los fundamentos de JS", precio: 29.99 },
                { id: "curso2", titulo: "Diseño UX/UI", descripcion: "Crea interfaces intuitivas", precio: 39.99 }
            ]
        });
    }

    function mostrarResultados(datos) {
        totalResultados.textContent = `${datos.total || 0} Resultados encontrados`;
        actualizarTotalesNavegacion(datos.totales || {});
        mostrarEscuelas(datos.escuelas || []);
        mostrarCursos(datos.cursos || []);
    }

    function actualizarTotalesNavegacion(totales) {
        for (const [tipo, total] of Object.entries(totales)) {
            const span = document.getElementById(`total-${tipo}`);
            if (span) span.textContent = total.toLocaleString();
        }
    }

    function mostrarEscuelas(escuelas) {
        listaEscuelas.innerHTML = escuelas.map(escuela => `
            <div class="escuela">
                <h3>${escuela.titulo}</h3>
                <span class="rutas">${escuela.rutas} rutas</span>
                <p>${escuela.descripcion}</p>
                <button class="btn-seguir">Seguir</button>
            </div>
        `).join('');
    }

    function mostrarCursos(cursos) {
        listaCursos.innerHTML = cursos.map(curso => `
            <div class="curso">
                <div class="curso-imagen"></div>
                <div class="curso-contenido">
                    <h3>${curso.titulo}</h3>
                    <p>${curso.descripcion}</p>
                    <p>Precio: $${curso.precio.toFixed(2)}</p>
                    <button class="btn-agregar" data-id="${curso.id}" data-tipo="curso" data-precio="${curso.precio}" data-titulo="${curso.titulo}">Agregar al carrito</button>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.btn-agregar').forEach(button => {
            button.addEventListener('click', agregarAlCarrito);
        });
    }

    // Función para actualizar el nombre de usuario
    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
    }

    // Función para actualizar el avatar con la inicial del usuario
    function updateProfileAvatar() {
        const avatarElement = document.getElementById('profile-toggle');
        const userName = localStorage.getItem('userName');
        if (userName && avatarElement && avatarElement.classList.contains('avatar-inicial')) {
            avatarElement.textContent = userName.charAt(0).toUpperCase();
        }
    }

    updateUserName();
    updateProfileAvatar();

    // Funcionalidad para la navegación de resultados
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(i => i.classList.remove('activo'));
            this.classList.add('activo');
        });
    });

    // Funcionalidad para el menú móvil
    menuToggle.addEventListener('click', function () {
        navegacionPrincipal.classList.toggle('active');
    });

    // Funcionalidad para el menú desplegable del perfil
    perfilToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menuDesplegable.classList.toggle('active');
    });

    // Cerrar el menú desplegable al hacer clic fuera de él
    document.addEventListener('click', function (e) {
        if (!menuDesplegable.contains(e.target) && e.target !== perfilToggle) {
            menuDesplegable.classList.remove('active');
        }
    });

    function agregarAlCarrito(e) {
        const button = e.target;
        const id = button.getAttribute('data-id');
        const tipo = button.getAttribute('data-tipo');
        const precio = parseFloat(button.getAttribute('data-precio'));
        const titulo = button.getAttribute('data-titulo');

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const itemEnCarrito = carrito.find(item => item.id === id && item.tipo === tipo);

        if (itemEnCarrito) {
            itemEnCarrito.cantidad += 1;
        } else {
            carrito.push({ id, tipo, titulo, cantidad: 1, precio });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();

        button.textContent = 'Agregado al carrito';
        setTimeout(() => {
            button.textContent = 'Agregar al carrito';
        }, 2000);
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

    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((total, item) => total + (parseInt(item.cantidad) || 0), 0);
        contadorCarrito.textContent = totalItems.toString();
    }

    // Inicializar el contador del carrito
    actualizarContadorCarrito();

    // Redirigir a la página del carrito al hacer clic en el icono
    carritoToggle.addEventListener('click', function () {
        window.location.href = 'carrito.html';
    });

    // Cerrar el menú de navegación en móviles al hacer clic en un enlace
    const navLinks = navegacionPrincipal.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navegacionPrincipal.classList.remove('active');
            }
        });
    });

    // Ajustar la visualización del menú al cambiar el tamaño de la ventana
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navegacionPrincipal.classList.remove('active');
        }
    });
});