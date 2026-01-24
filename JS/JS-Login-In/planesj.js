document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');
    const botonesElegir = document.querySelectorAll('.btn-elegir');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    const searchInput = document.getElementById('busqueda-curso');

    // Función para toggle del menú de navegación
    menuToggle.addEventListener('click', function () {
        navegacionPrincipal.classList.toggle('active');
    });

    // Función para toggle del menú de perfil
    profileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menuDesplegable.classList.toggle('active');
    });

    // Cerrar el menú de perfil al hacer clic fuera de él
    document.addEventListener('click', function (e) {
        if (!menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
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

    // Función para actualizar el nombre de usuario
    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
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

    updateUserName();
    loadAvatarFromStorage();

    // Función para cargar avatar desde localStorage
    function loadAvatarFromStorage() {
        const savedAvatar = localStorage.getItem('userAvatar');
        const userName = localStorage.getItem('userName') || 'Usuario';
        const inicial = userName.charAt(0).toUpperCase();

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
    }

    // Funcionalidad del carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    function agregarAlCarrito(plan, precio) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const planExistente = carrito.find(item => item.nombre === plan);

        if (!planExistente) {
            carrito.push({ id: Date.now().toString(), nombre: plan, precio: precio });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarContadorCarrito();
            alert(`Has agregado el plan ${plan} al carrito por S/${precio}.`);
        } else {
            alert(`El plan ${plan} ya está en tu carrito.`);
        }
    }

    carritoToggle.addEventListener('click', function () {
        window.location.href = 'carrito.html';
    });

    // Agregar planes al carrito
    botonesElegir.forEach(boton => {
        boton.addEventListener('click', function () {
            const plan = this.closest('.plan');
            const nombrePlan = plan.dataset.plan;
            const precioPlan = parseFloat(plan.dataset.precio);
            agregarAlCarrito(nombrePlan, precioPlan);
        });
    });

    // Inicializar el contador del carrito
    actualizarContadorCarrito();

    // Funcionalidad de búsqueda
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    window.location.href = `busqueda.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }

    // Botones de planes
    const btnBasico = document.getElementById('btn-elegir-basico');
    const btnAvanzado4 = document.getElementById('btn-elegir-avanzado4');
    const btnAvanzadoDuo = document.getElementById('btn-avanzado-duo');

    if (btnBasico) {
        btnBasico.addEventListener('click', function () {
            window.location.href = 'plan1.html';
        });
    }

    if (btnAvanzado4) {
        btnAvanzado4.addEventListener('click', function () {
            window.location.href = 'Plan2.html';
        });
    }

    if (btnAvanzadoDuo) {
        btnAvanzadoDuo.addEventListener('click', function () {
            window.location.href = 'Plan3.html';
        });
    }
});
