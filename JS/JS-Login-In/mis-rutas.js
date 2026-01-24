document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const rutasContainer = document.getElementById('rutas-container');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const vistaRutas = document.getElementById('vista-rutas');
    const vistaDetalleRuta = document.getElementById('vista-detalle-ruta');
    const btnVolver = document.getElementById('btn-volver');

    // Datos de rutas
    const RUTAS = [
        {
            id: 1,
            nombre: "Desarrollo Web Full Stack",
            escuela: "Desarrollo Web",
            imagen: "https://img.youtube.com/vi/W6NZfCO5SIk/hqdefault.jpg",
            progreso: 65,
            cursos: 8,
            cursosCompletados: 5,
            duracion: "40 horas",
            estado: "en-progreso",
            modulos: [
                { id: 1, nombre: "HTML5 Fundamentos", descripcion: "Aprende la estructura básica de las páginas web", duracion: "4h", clases: 12, estado: "completado" },
                { id: 2, nombre: "CSS3 y Diseño Responsive", descripcion: "Estilos modernos y diseño adaptable", duracion: "6h", clases: 15, estado: "completado" },
                { id: 3, nombre: "JavaScript Esencial", descripcion: "Programación del lado del cliente", duracion: "8h", clases: 20, estado: "completado" },
                { id: 4, nombre: "React.js Básico", descripcion: "Componentes y estado en React", duracion: "6h", clases: 14, estado: "completado" },
                { id: 5, nombre: "React.js Avanzado", descripcion: "Hooks, Context y Redux", duracion: "5h", clases: 12, estado: "completado" },
                { id: 6, nombre: "Node.js y Express", descripcion: "Backend con JavaScript", duracion: "6h", clases: 16, estado: "en-progreso" },
                { id: 7, nombre: "MongoDB y Mongoose", descripcion: "Base de datos NoSQL", duracion: "4h", clases: 10, estado: "bloqueado" },
                { id: 8, nombre: "Proyecto Final Full Stack", descripcion: "Aplicación completa MERN", duracion: "8h", clases: 8, estado: "bloqueado" }
            ]
        },
        {
            id: 2,
            nombre: "Ciencia de Datos con Python",
            escuela: "Data Science",
            imagen: "https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg",
            progreso: 35,
            cursos: 6,
            cursosCompletados: 2,
            duracion: "35 horas",
            estado: "en-progreso",
            modulos: [
                { id: 1, nombre: "Python para Data Science", descripcion: "Fundamentos de Python para análisis", duracion: "6h", clases: 15, estado: "completado" },
                { id: 2, nombre: "NumPy y Pandas", descripcion: "Manipulación de datos", duracion: "5h", clases: 12, estado: "completado" },
                { id: 3, nombre: "Visualización con Matplotlib", descripcion: "Gráficos y visualizaciones", duracion: "4h", clases: 10, estado: "en-progreso" },
                { id: 4, nombre: "Estadística para Data Science", descripcion: "Conceptos estadísticos esenciales", duracion: "6h", clases: 14, estado: "bloqueado" },
                { id: 5, nombre: "Machine Learning Básico", descripcion: "Algoritmos de ML con Scikit-learn", duracion: "8h", clases: 18, estado: "bloqueado" },
                { id: 6, nombre: "Proyecto de Análisis de Datos", descripcion: "Proyecto práctico completo", duracion: "6h", clases: 8, estado: "bloqueado" }
            ]
        },
        {
            id: 3,
            nombre: "Inteligencia Artificial y ML",
            escuela: "Inteligencia Artificial",
            imagen: "https://img.youtube.com/vi/ukzFI9rgwfU/hqdefault.jpg",
            progreso: 20,
            cursos: 7,
            cursosCompletados: 1,
            duracion: "50 horas",
            estado: "en-progreso",
            modulos: [
                { id: 1, nombre: "Introducción a la IA", descripcion: "Conceptos fundamentales de IA", duracion: "4h", clases: 10, estado: "completado" },
                { id: 2, nombre: "Machine Learning Supervisado", descripcion: "Regresión y clasificación", duracion: "8h", clases: 16, estado: "en-progreso" },
                { id: 3, nombre: "Machine Learning No Supervisado", descripcion: "Clustering y reducción dimensional", duracion: "6h", clases: 12, estado: "bloqueado" },
                { id: 4, nombre: "Redes Neuronales", descripcion: "Deep Learning con TensorFlow", duracion: "10h", clases: 20, estado: "bloqueado" },
                { id: 5, nombre: "Procesamiento de Lenguaje Natural", descripcion: "NLP y análisis de texto", duracion: "8h", clases: 14, estado: "bloqueado" },
                { id: 6, nombre: "Computer Vision", descripcion: "Visión por computadora con CNN", duracion: "8h", clases: 16, estado: "bloqueado" },
                { id: 7, nombre: "Proyecto de IA", descripcion: "Implementación de modelo de IA", duracion: "6h", clases: 6, estado: "bloqueado" }
            ]
        },
        {
            id: 4,
            nombre: "Ciberseguridad Profesional",
            escuela: "Ciberseguridad",
            imagen: "https://img.youtube.com/vi/3Kq1MIfTWCE/hqdefault.jpg",
            progreso: 50,
            cursos: 5,
            cursosCompletados: 2,
            duracion: "30 horas",
            estado: "en-progreso",
            modulos: [
                { id: 1, nombre: "Fundamentos de Seguridad", descripcion: "Conceptos básicos de seguridad informática", duracion: "5h", clases: 12, estado: "completado" },
                { id: 2, nombre: "Redes y Protocolos", descripcion: "Seguridad en redes", duracion: "6h", clases: 14, estado: "completado" },
                { id: 3, nombre: "Ethical Hacking", descripcion: "Técnicas de pentesting", duracion: "8h", clases: 18, estado: "en-progreso" },
                { id: 4, nombre: "Criptografía", descripcion: "Algoritmos y protocolos criptográficos", duracion: "5h", clases: 10, estado: "bloqueado" },
                { id: 5, nombre: "Seguridad en Aplicaciones Web", descripcion: "OWASP y vulnerabilidades web", duracion: "6h", clases: 14, estado: "bloqueado" }
            ]
        },
        {
            id: 5,
            nombre: "Diseño UX/UI Profesional",
            escuela: "Diseño",
            imagen: "https://img.youtube.com/vi/FTFaQWZBqQ8/hqdefault.jpg",
            progreso: 80,
            cursos: 5,
            cursosCompletados: 4,
            duracion: "25 horas",
            estado: "en-progreso",
            modulos: [
                { id: 1, nombre: "Principios de UX", descripcion: "User Experience fundamentals", duracion: "4h", clases: 10, estado: "completado" },
                { id: 2, nombre: "Investigación de Usuario", descripcion: "User research y personas", duracion: "5h", clases: 12, estado: "completado" },
                { id: 3, nombre: "Diseño de Interfaces", descripcion: "UI Design con Figma", duracion: "6h", clases: 15, estado: "completado" },
                { id: 4, nombre: "Prototipado Interactivo", descripcion: "Prototipos navegables", duracion: "5h", clases: 10, estado: "completado" },
                { id: 5, nombre: "Design System", descripcion: "Sistemas de diseño escalables", duracion: "5h", clases: 12, estado: "en-progreso" }
            ]
        },
        {
            id: 6,
            nombre: "DevOps y Cloud Computing",
            escuela: "Cloud & DevOps",
            imagen: "https://img.youtube.com/vi/fqMOX6JJhGo/hqdefault.jpg",
            progreso: 10,
            cursos: 6,
            cursosCompletados: 0,
            duracion: "40 horas",
            estado: "nueva",
            modulos: [
                { id: 1, nombre: "Introducción a DevOps", descripcion: "Cultura y prácticas DevOps", duracion: "4h", clases: 10, estado: "en-progreso" },
                { id: 2, nombre: "Docker y Contenedores", descripcion: "Containerización de aplicaciones", duracion: "6h", clases: 14, estado: "bloqueado" },
                { id: 3, nombre: "Kubernetes", descripcion: "Orquestación de contenedores", duracion: "8h", clases: 16, estado: "bloqueado" },
                { id: 4, nombre: "AWS Fundamentals", descripcion: "Servicios de Amazon Web Services", duracion: "8h", clases: 18, estado: "bloqueado" },
                { id: 5, nombre: "CI/CD Pipelines", descripcion: "Integración y despliegue continuo", duracion: "6h", clases: 12, estado: "bloqueado" },
                { id: 6, nombre: "Monitoreo y Observabilidad", descripcion: "Prometheus, Grafana y logging", duracion: "6h", clases: 12, estado: "bloqueado" }
            ]
        },
        {
            id: 7,
            nombre: "Desarrollo Móvil con Flutter",
            escuela: "Desarrollo Móvil",
            imagen: "https://img.youtube.com/vi/VPvVD8t02U8/hqdefault.jpg",
            progreso: 45,
            cursos: 5,
            cursosCompletados: 2,
            duracion: "30 horas",
            estado: "en-progreso",
            modulos: [
                { id: 1, nombre: "Dart Fundamentals", descripcion: "Lenguaje de programación Dart", duracion: "5h", clases: 12, estado: "completado" },
                { id: 2, nombre: "Flutter Básico", descripcion: "Widgets y layouts", duracion: "6h", clases: 15, estado: "completado" },
                { id: 3, nombre: "Estado y Navegación", descripcion: "State management y routing", duracion: "6h", clases: 14, estado: "en-progreso" },
                { id: 4, nombre: "APIs y Persistencia", descripcion: "Consumo de APIs y almacenamiento", duracion: "6h", clases: 12, estado: "bloqueado" },
                { id: 5, nombre: "Publicación de Apps", descripcion: "Deploy en App Store y Play Store", duracion: "4h", clases: 8, estado: "bloqueado" }
            ]
        },
        {
            id: 8,
            nombre: "Marketing Digital Completo",
            escuela: "Marketing",
            imagen: "https://img.youtube.com/vi/SOTamWNgDKc/hqdefault.jpg",
            progreso: 100,
            cursos: 4,
            cursosCompletados: 4,
            duracion: "20 horas",
            estado: "completada",
            modulos: [
                { id: 1, nombre: "Fundamentos de Marketing Digital", descripcion: "Conceptos y estrategias básicas", duracion: "4h", clases: 10, estado: "completado" },
                { id: 2, nombre: "SEO y SEM", descripcion: "Posicionamiento en buscadores", duracion: "5h", clases: 12, estado: "completado" },
                { id: 3, nombre: "Social Media Marketing", descripcion: "Estrategias en redes sociales", duracion: "5h", clases: 12, estado: "completado" },
                { id: 4, nombre: "Email Marketing y Analytics", descripcion: "Campañas de email y métricas", duracion: "6h", clases: 14, estado: "completado" }
            ]
        }
    ];

    let rutaActual = null;

    // Toggle menú navegación
    menuToggle.addEventListener('click', () => navegacionPrincipal.classList.toggle('active'));

    // Toggle menú perfil
    profileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuDesplegable.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
    });

    // Cargar rutas
    function cargarRutas() {
        rutasContainer.innerHTML = '';

        RUTAS.forEach(ruta => {
            const rutaElement = document.createElement('div');
            rutaElement.className = 'ruta-card';
            rutaElement.dataset.rutaId = ruta.id;

            const progresoClass = ruta.progreso < 30 ? 'bajo' : ruta.progreso < 70 ? 'medio' : 'alto';

            rutaElement.innerHTML = `
                <div class="ruta-card-header">
                    <img src="${ruta.imagen}" alt="${ruta.nombre}">
                    <span class="ruta-card-badge"><i class="fas fa-layer-group"></i> ${ruta.cursos} Cursos</span>
                </div>
                <div class="ruta-card-body">
                    <h3>${ruta.nombre}</h3>
                    <p class="ruta-card-escuela"><i class="fas fa-school"></i> ${ruta.escuela}</p>
                    <div class="ruta-card-stats">
                        <span class="ruta-stat"><i class="fas fa-clock"></i> ${ruta.duracion}</span>
                        <span class="ruta-stat"><i class="fas fa-check-circle"></i> ${ruta.cursosCompletados}/${ruta.cursos}</span>
                    </div>
                    <div class="ruta-card-progreso">
                        <div class="progreso-info">
                            <span class="progreso-label">Progreso</span>
                            <span class="progreso-porcentaje">${ruta.progreso}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress ${progresoClass}" style="width: ${ruta.progreso}%;"></div>
                        </div>
                    </div>
                </div>
                <div class="ruta-card-footer">
                    <span class="ruta-estado ${ruta.estado}">${obtenerTextoEstado(ruta.estado)}</span>
                    <button class="btn-ver-ruta" data-ruta-id="${ruta.id}">
                        <i class="fas fa-eye"></i> Ver Ruta
                    </button>
                </div>
            `;

            rutasContainer.appendChild(rutaElement);
        });

        // Agregar eventos a botones
        document.querySelectorAll('.btn-ver-ruta').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const rutaId = parseInt(btn.dataset.rutaId);
                mostrarDetalleRuta(rutaId);
            });
        });

        // Click en toda la tarjeta
        document.querySelectorAll('.ruta-card').forEach(card => {
            card.addEventListener('click', () => {
                const rutaId = parseInt(card.dataset.rutaId);
                mostrarDetalleRuta(rutaId);
            });
        });
    }

    function obtenerTextoEstado(estado) {
        switch (estado) {
            case 'en-progreso': return 'En Progreso';
            case 'completada': return 'Completada';
            case 'nueva': return 'Nueva';
            default: return estado;
        }
    }

    // Mostrar detalle de ruta
    function mostrarDetalleRuta(rutaId) {
        rutaActual = RUTAS.find(r => r.id === rutaId);
        if (!rutaActual) return;

        vistaRutas.classList.add('oculto');
        vistaDetalleRuta.classList.remove('oculto');

        const headerContainer = document.getElementById('ruta-detalle-header');
        const contenidoContainer = document.getElementById('ruta-detalle-contenido');

        const completados = rutaActual.modulos.filter(m => m.estado === 'completado').length;
        const totalClases = rutaActual.modulos.reduce((sum, m) => sum + m.clases, 0);

        headerContainer.innerHTML = `
            <div class="ruta-detalle-titulo">
                <div class="ruta-detalle-icono">
                    <img src="${rutaActual.imagen}" alt="${rutaActual.nombre}">
                </div>
                <div class="ruta-detalle-info">
                    <h1>${rutaActual.nombre}</h1>
                    <p class="escuela"><i class="fas fa-school"></i> ${rutaActual.escuela}</p>
                </div>
            </div>
            <div class="ruta-detalle-stats">
                <div class="ruta-detalle-stat">
                    <i class="fas fa-book"></i>
                    <span class="valor">${rutaActual.modulos.length}</span>
                    <span class="label">Módulos</span>
                </div>
                <div class="ruta-detalle-stat">
                    <i class="fas fa-play-circle"></i>
                    <span class="valor">${totalClases}</span>
                    <span class="label">Clases</span>
                </div>
                <div class="ruta-detalle-stat">
                    <i class="fas fa-clock"></i>
                    <span class="valor">${rutaActual.duracion}</span>
                    <span class="label">Duración</span>
                </div>
                <div class="ruta-detalle-stat">
                    <i class="fas fa-trophy"></i>
                    <span class="valor">${rutaActual.progreso}%</span>
                    <span class="label">Completado</span>
                </div>
            </div>
        `;

        contenidoContainer.innerHTML = `
            <h2><i class="fas fa-list-ol"></i> Contenido de la Ruta</h2>
            <div class="modulos-lista">
                ${rutaActual.modulos.map((modulo, index) => `
                    <div class="modulo-card ${modulo.estado}" data-modulo-id="${modulo.id}">
                        <div class="modulo-numero">${index + 1}</div>
                        <div class="modulo-info">
                            <h4>${modulo.nombre}</h4>
                            <p>${modulo.descripcion}</p>
                            <div class="modulo-meta">
                                <span><i class="fas fa-clock"></i> ${modulo.duracion}</span>
                                <span><i class="fas fa-play-circle"></i> ${modulo.clases} clases</span>
                            </div>
                        </div>
                        <div class="modulo-estado">
                            ${obtenerIconoEstado(modulo.estado)}
                        </div>
                        ${obtenerBotonModulo(modulo)}
                    </div>
                `).join('')}
            </div>
        `;

        // Agregar eventos a módulos
        document.querySelectorAll('.btn-iniciar-modulo:not(.completado)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const moduloId = parseInt(btn.dataset.moduloId);
                iniciarModulo(moduloId);
            });
        });

        window.scrollTo(0, 0);
    }

    function obtenerIconoEstado(estado) {
        switch (estado) {
            case 'completado':
                return '<i class="fas fa-check-circle completado"></i><span>Completado</span>';
            case 'en-progreso':
                return '<i class="fas fa-spinner en-progreso"></i><span>En Progreso</span>';
            case 'bloqueado':
                return '<i class="fas fa-lock bloqueado"></i><span>Bloqueado</span>';
            default:
                return '';
        }
    }

    function obtenerBotonModulo(modulo) {
        if (modulo.estado === 'completado') {
            return `<button class="btn-iniciar-modulo completado" disabled><i class="fas fa-check"></i> Completado</button>`;
        } else if (modulo.estado === 'en-progreso') {
            return `<button class="btn-iniciar-modulo" data-modulo-id="${modulo.id}"><i class="fas fa-play"></i> Continuar</button>`;
        } else if (modulo.estado === 'bloqueado') {
            return `<button class="btn-iniciar-modulo" disabled style="background: var(--gray-400); cursor: not-allowed;"><i class="fas fa-lock"></i> Bloqueado</button>`;
        }
        return '';
    }

    function iniciarModulo(moduloId) {
        if (!rutaActual) return;

        const modulo = rutaActual.modulos.find(m => m.id === moduloId);
        if (!modulo || modulo.estado === 'bloqueado') return;

        // Redirigir al contenido del módulo
        const params = new URLSearchParams({
            modulo_id: moduloId,
            ruta_id: rutaActual.id,
            cursoNombre: modulo.nombre,
            instructor: rutaActual.escuela
        });

        window.location.href = `contenido.html?${params.toString()}`;
    }

    // Volver a vista de rutas
    btnVolver.addEventListener('click', () => {
        vistaDetalleRuta.classList.add('oculto');
        vistaRutas.classList.remove('oculto');
        rutaActual = null;
    });

    // Usuario
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

        if (savedAvatar && avatarImgHeader && avatarInicialHeader) {
            avatarImgHeader.src = savedAvatar;
            avatarImgHeader.style.display = 'block';
            avatarInicialHeader.style.display = 'none';
        } else if (avatarInicialHeader) {
            if (avatarImgHeader) avatarImgHeader.style.display = 'none';
            avatarInicialHeader.style.display = 'flex';
            avatarInicialHeader.textContent = inicial;
        }

        const profileToggle = document.getElementById('profile-toggle');
        if (profileToggle && profileToggle.classList.contains('avatar-inicial')) {
            profileToggle.textContent = inicial;
        }
    }

    // Carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    carritoToggle.addEventListener('click', () => {
        window.location.href = 'carrito.html';
    });

    // Cerrar sesión
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userLastName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userRole');
            window.location.href = '../Principal/Principal.html';
        });
    }

    // Inicialización
    cargarRutas();
    updateUserName();
    loadAvatarFromStorage();
    actualizarContadorCarrito();
});