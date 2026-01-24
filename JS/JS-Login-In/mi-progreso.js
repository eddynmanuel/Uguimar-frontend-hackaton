document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');
    const searchInput = document.querySelector('.barra-busqueda input');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

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

    // Funcionalidad del carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    carritoToggle.addEventListener('click', function () {
        window.location.href = 'carrito.html';
    });

    // Función para actualizar el nombre de usuario
    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
    }

    // Función para actualizar el avatar (imagen o inicial) desde localStorage
    function loadAvatarFromStorage() {
        const savedAvatar = localStorage.getItem('userAvatar');
        const userName = localStorage.getItem('userName') || 'Usuario';
        const inicial = userName.charAt(0).toUpperCase();

        const avatarImgHeader = document.getElementById('avatar-img-header');
        const avatarInicialHeader = document.getElementById('avatar-inicial-header');

        // Actualizar avatar
        if (savedAvatar && avatarImgHeader && avatarInicialHeader) {
            // Mostrar imagen
            avatarImgHeader.src = savedAvatar;
            avatarImgHeader.style.display = 'block';
            avatarInicialHeader.style.display = 'none';
        } else if (avatarInicialHeader) {
            // Mostrar inicial
            if (avatarImgHeader) {
                avatarImgHeader.style.display = 'none';
            }
            avatarInicialHeader.style.display = 'flex';
            avatarInicialHeader.textContent = inicial;
        }

        // Compatibilidad con estructura antigua
        const profileToggle = document.getElementById('profile-toggle');
        if (profileToggle && profileToggle.classList.contains('avatar-inicial')) {
            profileToggle.textContent = inicial;
        }
    }

    updateUserName();
    loadAvatarFromStorage();

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

    // Inicializar el contador del carrito
    actualizarContadorCarrito();

    // Datos de cursos en progreso para redirección
    const CURSOS_EN_PROGRESO = {
        1: { nombre: 'Introducción a Python', instructor: 'María García', videoUrl: 'https://youtube.com/watch?v=_uQrJ0TkZlc', valoracion: 4.8 },
        2: { nombre: 'JavaScript Avanzado', instructor: 'Juan Pérez', videoUrl: 'https://youtube.com/watch?v=W6NZfCO5SIk', valoracion: 4.7 },
        3: { nombre: 'React.js Completo', instructor: 'Carlos López', videoUrl: 'https://youtube.com/watch?v=SqcY0GlETPk', valoracion: 4.9 },
        4: { nombre: 'Bases de Datos SQL', instructor: 'Ana Martínez', videoUrl: 'https://youtube.com/watch?v=HXV3zeQKqGY', valoracion: 4.6 },
        5: { nombre: 'Node.js y Express', instructor: 'Pedro Ruiz', videoUrl: 'https://youtube.com/watch?v=Oe421EPjeBE', valoracion: 4.5 },
        6: { nombre: 'Git y GitHub', instructor: 'Sofía Vargas', videoUrl: 'https://youtube.com/watch?v=RGOj5yH7evk', valoracion: 4.8 },
        7: { nombre: 'CSS Avanzado y Animaciones', instructor: 'Miguel Torres', videoUrl: 'https://youtube.com/watch?v=1Rs2ND1ryYc', valoracion: 4.7 },
        8: { nombre: 'TypeScript Profesional', instructor: 'Elena Ruiz', videoUrl: 'https://youtube.com/watch?v=BwuLxPH8IDs', valoracion: 4.6 }
    };

    // Funcionalidad específica para la página de progreso
    const btnsContinuar = document.querySelectorAll('.btn-continuar');

    btnsContinuar.forEach(btn => {
        btn.addEventListener('click', function () {
            const cursoElement = this.closest('.curso');
            const cursoId = cursoElement.dataset.cursoId;

            if (cursoId && CURSOS_EN_PROGRESO[cursoId]) {
                const curso = CURSOS_EN_PROGRESO[cursoId];
                const params = new URLSearchParams({
                    videoUrl: curso.videoUrl,
                    cursoNombre: curso.nombre,
                    instructor: curso.instructor,
                    valoracion: curso.valoracion,
                    fromCurso: 'true'
                });
                window.location.href = `contenido.html?${params.toString()}`;
            } else {
                const cursoNombre = cursoElement.querySelector('h3').textContent;
                alert(`Continuando con el curso: ${cursoNombre}`);
            }
        });
    });

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
});