document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const inputBusqueda = document.getElementById('busqueda-curso');
    const contadorCarrito = document.getElementById('contador-carrito');
    const carritoToggle = document.getElementById('carrito-toggle');
    const searchForm = document.getElementById('search-form');
    const listaEscuelas = document.getElementById('lista-escuelas');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    // Datos simulados de escuelas
    const ESCUELAS = [
        { id: 1, nombre: 'Desarrollo Web', descripcion: 'Aprende a crear sitios web profesionales', icono: 'fa-code' },
        { id: 2, nombre: 'Data Science', descripcion: 'Análisis de datos y visualización', icono: 'fa-chart-bar' },
        { id: 3, nombre: 'Inteligencia Artificial', descripcion: 'Machine Learning y Deep Learning', icono: 'fa-robot' },
        { id: 4, nombre: 'Ciberseguridad', descripcion: 'Protege sistemas y redes', icono: 'fa-shield-alt' },
        { id: 5, nombre: 'Marketing Digital', descripcion: 'Estrategias de marketing online', icono: 'fa-bullhorn' },
        { id: 6, nombre: 'Diseño UX/UI', descripcion: 'Crea interfaces intuitivas y atractivas', icono: 'fa-palette' },
        { id: 7, nombre: 'Desarrollo Móvil', descripcion: 'Apps para iOS y Android', icono: 'fa-mobile-alt' },
        { id: 8, nombre: 'Cloud Computing', descripcion: 'AWS, Azure y Google Cloud', icono: 'fa-cloud' },
        { id: 9, nombre: 'Blockchain', descripcion: 'Tecnología descentralizada y Web3', icono: 'fa-link' },
        { id: 10, nombre: 'DevOps', descripcion: 'Automatización y despliegue continuo', icono: 'fa-cogs' }
    ];

    // Datos simulados de cursos destacados
    const CURSOS_DESTACADOS = [
        { id: 1, nombre: 'JavaScript Moderno', instructor: 'Juan Pérez', videoUrl: 'https://youtube.com/watch?v=W6NZfCO5SIk' },
        { id: 2, nombre: 'Python para Principiantes', instructor: 'María García', videoUrl: 'https://youtube.com/watch?v=_uQrJ0TkZlc' },
        { id: 3, nombre: 'React.js Avanzado', instructor: 'Carlos López', videoUrl: 'https://youtube.com/watch?v=SqcY0GlETPk' },
        { id: 4, nombre: 'Bases de Datos SQL', instructor: 'Ana Martínez', videoUrl: 'https://youtube.com/watch?v=HXV3zeQKqGY' },
        { id: 5, nombre: 'Vue.js desde Cero', instructor: 'Roberto Díaz', videoUrl: 'https://youtube.com/watch?v=FXpIoQ_rT_c' },
        { id: 6, nombre: 'TypeScript Profesional', instructor: 'Elena Ruiz', videoUrl: 'https://youtube.com/watch?v=BwuLxPH8IDs' },
        { id: 7, nombre: 'Angular Completo', instructor: 'Fernando Torres', videoUrl: 'https://youtube.com/watch?v=3qBXWUpoPHo' },
        { id: 8, nombre: 'Docker y Kubernetes', instructor: 'Patricia Gómez', videoUrl: 'https://youtube.com/watch?v=fqMOX6JJhGo' }
    ];

    // Datos simulados de cursos recomendados
    const CURSOS_RECOMENDADOS = [
        { id: 9, nombre: 'Node.js y Express', instructor: 'Pedro Ruiz', videoUrl: 'https://youtube.com/watch?v=Oe421EPjeBE' },
        { id: 10, nombre: 'Machine Learning Básico', instructor: 'Laura Sánchez', videoUrl: 'https://youtube.com/watch?v=ukzFI9rgwfU' },
        { id: 11, nombre: 'CSS Avanzado', instructor: 'Miguel Torres', videoUrl: 'https://youtube.com/watch?v=1Rs2ND1ryYc' },
        { id: 12, nombre: 'Git y GitHub', instructor: 'Sofía Vargas', videoUrl: 'https://youtube.com/watch?v=RGOj5yH7evk' },
        { id: 13, nombre: 'AWS Cloud Practitioner', instructor: 'Daniel Herrera', videoUrl: 'https://youtube.com/watch?v=SOTamWNgDKc' },
        { id: 14, nombre: 'Figma para Diseñadores', instructor: 'Camila Ortiz', videoUrl: 'https://youtube.com/watch?v=FTFaQWZBqQ8' },
        { id: 15, nombre: 'Flutter y Dart', instructor: 'Andrés Castro', videoUrl: 'https://youtube.com/watch?v=VPvVD8t02U8' },
        { id: 16, nombre: 'Ethical Hacking', instructor: 'Valeria Mendez', videoUrl: 'https://youtube.com/watch?v=3Kq1MIfTWCE' }
    ];

    // Function to generate thumbnail URL from video URL
    function generateThumbnailUrl(videoUrl) {
        if (!videoUrl) return 'https://via.placeholder.com/300x200?text=No+Video';

        try {
            if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                let videoId;
                if (videoUrl.includes('youtube.com/watch?v=')) {
                    videoId = videoUrl.split('watch?v=')[1].split('&')[0];
                } else if (videoUrl.includes('youtu.be/')) {
                    videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
                } else {
                    return 'https://via.placeholder.com/300x200?text=Invalid+YouTube+URL';
                }
                return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            } else if (videoUrl.includes('vimeo.com')) {
                return 'https://via.placeholder.com/300x200?text=Vimeo+Thumbnail';
            } else {
                return 'https://via.placeholder.com/300x200?text=Video+Thumbnail';
            }
        } catch (error) {
            console.error('Error generating thumbnail URL:', error);
            return 'https://via.placeholder.com/300x200?text=Error+Loading+Thumbnail';
        }
    }

    // Function to create course element
    function createCourseElement(curso) {
        const cursoElement = document.createElement('div');
        cursoElement.className = 'curso';
        cursoElement.innerHTML = `
            <img src="${generateThumbnailUrl(curso.videoUrl)}" alt="${curso.nombre}">
            <h3>${curso.nombre}</h3>
            <p>${curso.instructor}</p>
            <div class="calificacion">
                <i class="fas fa-star"></i>
                <span>4.5</span>
            </div>
        `;
        cursoElement.addEventListener('click', () => {
            window.location.href = `contenido.html?videoUrl=${encodeURIComponent(curso.videoUrl)}`;
        });
        return cursoElement;
    }

    // Function to render schools with simulated data
    function renderEscuelas() {
        const listaEscuelas = document.getElementById('lista-escuelas');
        listaEscuelas.innerHTML = '';
        ESCUELAS.forEach(escuela => {
            const escuelaElement = document.createElement('div');
            escuelaElement.className = 'escuela';
            escuelaElement.innerHTML = `
                <i class="fas ${escuela.icono} escuela-icono"></i>
                <h3>${escuela.nombre}</h3>
                <p>${escuela.descripcion}</p>
            `;
            escuelaElement.addEventListener('click', () => {
                window.location.href = `ruta.html?escuela_id=${escuela.id}`;
            });
            listaEscuelas.appendChild(escuelaElement);
        });

        // Agregar tarjeta "Ver más" al final
        const verMasElement = document.createElement('div');
        verMasElement.className = 'escuela-ver-mas';
        verMasElement.innerHTML = `
            <i class="fas fa-arrow-right"></i>
            <span>Ver todas</span>
        `;
        verMasElement.addEventListener('click', () => {
            window.location.href = 'escuela.html';
        });
        listaEscuelas.appendChild(verMasElement);
    }

    // Funcionalidad de flechas del carrusel de escuelas
    function setupCarruselEscuelas() {
        const listaEscuelas = document.getElementById('lista-escuelas');
        const flechaIzq = document.getElementById('flecha-escuelas-izq');
        const flechaDer = document.getElementById('flecha-escuelas-der');
        const scrollAmount = 250;

        // Función para actualizar visibilidad de flechas
        function actualizarFlechas() {
            const scrollLeft = listaEscuelas.scrollLeft;
            const scrollWidth = listaEscuelas.scrollWidth;
            const clientWidth = listaEscuelas.clientWidth;
            const maxScroll = scrollWidth - clientWidth;

            // Ocultar flecha izquierda si está al inicio
            if (scrollLeft <= 10) {
                flechaIzq.style.opacity = '0';
                flechaIzq.style.pointerEvents = 'none';
            } else {
                flechaIzq.style.opacity = '1';
                flechaIzq.style.pointerEvents = 'auto';
            }

            // Ocultar flecha derecha si está al final
            if (scrollLeft >= maxScroll - 10) {
                flechaDer.style.opacity = '0';
                flechaDer.style.pointerEvents = 'none';
            } else {
                flechaDer.style.opacity = '1';
                flechaDer.style.pointerEvents = 'auto';
            }
        }

        if (flechaIzq) {
            flechaIzq.addEventListener('click', () => {
                listaEscuelas.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }

        if (flechaDer) {
            flechaDer.addEventListener('click', () => {
                listaEscuelas.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }

        // Escuchar evento de scroll para actualizar flechas
        listaEscuelas.addEventListener('scroll', actualizarFlechas);

        // Inicializar estado de flechas
        actualizarFlechas();
    }

    // Function to update the user name
    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
    }

    // Function to update the profile avatar with user's initial
    function updateProfileAvatar() {
        const avatarElement = document.getElementById('profile-toggle');
        const userName = localStorage.getItem('userName');
        if (userName && avatarElement && avatarElement.classList.contains('avatar-inicial')) {
            avatarElement.textContent = userName.charAt(0).toUpperCase();
        }
    }

    // Function to render featured courses
    function renderCursos() {
        const listaCursos = document.getElementById('lista-cursos');
        listaCursos.innerHTML = '';
        CURSOS_DESTACADOS.forEach(curso => {
            listaCursos.appendChild(createCourseElement(curso));
        });
    }

    // Function to render recommended courses
    function renderCursosRecomendados() {
        const listaCursosRecomendados = document.getElementById('lista-cursos-recomendados');
        listaCursosRecomendados.innerHTML = '';
        CURSOS_RECOMENDADOS.forEach(curso => {
            listaCursosRecomendados.appendChild(createCourseElement(curso));
        });
    }

    // Funcionalidad de flechas del carrusel de cursos destacados
    function setupCarruselCursos() {
        const listaCursos = document.getElementById('lista-cursos');
        const flechaIzq = document.getElementById('flecha-cursos-izq');
        const flechaDer = document.getElementById('flecha-cursos-der');
        const scrollAmount = 270;

        function actualizarFlechas() {
            const scrollLeft = listaCursos.scrollLeft;
            const scrollWidth = listaCursos.scrollWidth;
            const clientWidth = listaCursos.clientWidth;
            const maxScroll = scrollWidth - clientWidth;

            if (scrollLeft <= 10) {
                flechaIzq.style.opacity = '0';
                flechaIzq.style.pointerEvents = 'none';
            } else {
                flechaIzq.style.opacity = '1';
                flechaIzq.style.pointerEvents = 'auto';
            }

            if (scrollLeft >= maxScroll - 10) {
                flechaDer.style.opacity = '0';
                flechaDer.style.pointerEvents = 'none';
            } else {
                flechaDer.style.opacity = '1';
                flechaDer.style.pointerEvents = 'auto';
            }
        }

        if (flechaIzq) {
            flechaIzq.addEventListener('click', () => {
                listaCursos.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }

        if (flechaDer) {
            flechaDer.addEventListener('click', () => {
                listaCursos.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }

        listaCursos.addEventListener('scroll', actualizarFlechas);
        actualizarFlechas();
    }

    // Funcionalidad de flechas del carrusel de cursos recomendados
    function setupCarruselRecomendados() {
        const listaRecomendados = document.getElementById('lista-cursos-recomendados');
        const flechaIzq = document.getElementById('flecha-recomendados-izq');
        const flechaDer = document.getElementById('flecha-recomendados-der');
        const scrollAmount = 270;

        function actualizarFlechas() {
            const scrollLeft = listaRecomendados.scrollLeft;
            const scrollWidth = listaRecomendados.scrollWidth;
            const clientWidth = listaRecomendados.clientWidth;
            const maxScroll = scrollWidth - clientWidth;

            if (scrollLeft <= 10) {
                flechaIzq.style.opacity = '0';
                flechaIzq.style.pointerEvents = 'none';
            } else {
                flechaIzq.style.opacity = '1';
                flechaIzq.style.pointerEvents = 'auto';
            }

            if (scrollLeft >= maxScroll - 10) {
                flechaDer.style.opacity = '0';
                flechaDer.style.pointerEvents = 'none';
            } else {
                flechaDer.style.opacity = '1';
                flechaDer.style.pointerEvents = 'auto';
            }
        }

        if (flechaIzq) {
            flechaIzq.addEventListener('click', () => {
                listaRecomendados.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }

        if (flechaDer) {
            flechaDer.addEventListener('click', () => {
                listaRecomendados.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }

        listaRecomendados.addEventListener('scroll', actualizarFlechas);
        actualizarFlechas();
    }

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
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const searchTerm = inputBusqueda.value.trim();
            if (searchTerm) {
                window.location.href = `busqueda.html?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }

    // Function to add to cart
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

                e.target.textContent = 'Agregado al carrito';
                setTimeout(() => {
                    e.target.textContent = 'Agregar al carrito';
                }, 2000);
            }
        }
    }

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

    // Add click event to "Add to cart" buttons
    document.addEventListener('click', agregarAlCarrito);

    // Initialize
    actualizarContadorCarrito();
    updateUserName();
    updateProfileAvatar();

    // Redirect to the cart page when clicking on the cart icon
    carritoToggle.addEventListener('click', function () {
        window.location.href = 'planesj.html';
    });

    // Load all data with simulated data
    renderEscuelas();
    setupCarruselEscuelas();
    renderCursos();
    setupCarruselCursos();
    renderCursosRecomendados();
    setupCarruselRecomendados();
});
