// Datos simulados de cursos por ruta
const CURSOS_POR_RUTA = {
    // Desarrollo Web
    1: { id: 1, nombre: 'Frontend Developer', descripcion: 'Domina HTML, CSS, JavaScript y React para crear interfaces modernas y responsivas.' },
    2: { id: 2, nombre: 'Backend Developer', descripcion: 'Node.js, Express, APIs RESTful y bases de datos SQL y NoSQL.' },
    3: { id: 3, nombre: 'Full Stack Developer', descripcion: 'Desarrollo completo de aplicaciones web de principio a fin.' },
    4: { id: 4, nombre: 'React Specialist', descripcion: 'Especialización en React, Redux y ecosistema moderno de JavaScript.' },
    5: { id: 5, nombre: 'Vue.js Developer', descripcion: 'Domina Vue.js, Vuex y Nuxt.js para crear aplicaciones modernas.' },
    6: { id: 6, nombre: 'Angular Expert', descripcion: 'Angular, TypeScript y aplicaciones empresariales de alta escala.' },
    // Data Science
    7: { id: 7, nombre: 'Fundamentos de Data Science', descripcion: 'Python, estadística y visualización de datos con Pandas y NumPy.' },
    8: { id: 8, nombre: 'Machine Learning', descripcion: 'Algoritmos de aprendizaje automático y predicción con scikit-learn.' },
    9: { id: 9, nombre: 'Análisis de Datos con Python', descripcion: 'Pandas, NumPy y análisis exploratorio de datos.' },
    10: { id: 10, nombre: 'Visualización de Datos', descripcion: 'Matplotlib, Seaborn, Plotly y dashboards interactivos.' },
    11: { id: 11, nombre: 'Big Data Engineer', descripcion: 'Spark, Hadoop y procesamiento masivo de datos.' },
    // Inteligencia Artificial
    12: { id: 12, nombre: 'Deep Learning', descripcion: 'Redes neuronales con TensorFlow y PyTorch.' },
    13: { id: 13, nombre: 'NLP Specialist', descripcion: 'Procesamiento de lenguaje natural y transformers.' },
    14: { id: 14, nombre: 'Computer Vision', descripcion: 'Visión por computadora y reconocimiento de imágenes.' },
    15: { id: 15, nombre: 'MLOps Engineer', descripcion: 'Despliegue y gestión de modelos en producción.' },
    16: { id: 16, nombre: 'AI for Business', descripcion: 'Aplicaciones prácticas de IA en negocios.' },
    // Ciberseguridad
    17: { id: 17, nombre: 'Seguridad Ofensiva', descripcion: 'Pentesting, hacking ético y explotación de vulnerabilidades.' },
    18: { id: 18, nombre: 'Seguridad Defensiva', descripcion: 'Análisis de vulnerabilidades y respuesta a incidentes.' },
    19: { id: 19, nombre: 'Análisis de Malware', descripcion: 'Ingeniería inversa y análisis de amenazas.' },
    20: { id: 20, nombre: 'Seguridad en la Nube', descripcion: 'AWS, Azure y GCP security best practices.' },
    21: { id: 21, nombre: 'OSINT Specialist', descripcion: 'Inteligencia de fuentes abiertas y reconocimiento.' },
    // Marketing Digital
    22: { id: 22, nombre: 'SEO y SEM', descripcion: 'Posicionamiento en buscadores y publicidad digital.' },
    23: { id: 23, nombre: 'Social Media Marketing', descripcion: 'Gestión de redes sociales y estrategia de contenido.' },
    24: { id: 24, nombre: 'Content Marketing', descripcion: 'Creación de contenido y copywriting persuasivo.' },
    25: { id: 25, nombre: 'Email Marketing', descripcion: 'Automatización y campañas de email efectivas.' },
    26: { id: 26, nombre: 'Growth Hacking', descripcion: 'Estrategias de crecimiento rápido para startups.' },
    27: { id: 27, nombre: 'Analytics y Métricas', descripcion: 'Google Analytics y análisis de datos de marketing.' }
};

// Datos simulados de módulos por curso (10+ módulos cada uno)
const MODULOS_POR_CURSO = {
    1: [
        { id: 1, nombre: 'Introducción a HTML', progreso: 100 },
        { id: 2, nombre: 'Estructura de documentos HTML', progreso: 100 },
        { id: 3, nombre: 'CSS Básico y Selectores', progreso: 85 },
        { id: 4, nombre: 'CSS Avanzado y Flexbox', progreso: 70 },
        { id: 5, nombre: 'CSS Grid y Responsive Design', progreso: 55 },
        { id: 6, nombre: 'JavaScript: Variables y Tipos', progreso: 40 },
        { id: 7, nombre: 'JavaScript: Funciones y Scope', progreso: 25 },
        { id: 8, nombre: 'JavaScript: DOM y Eventos', progreso: 10 },
        { id: 9, nombre: 'JavaScript: Async y Promises', progreso: 0 },
        { id: 10, nombre: 'Proyecto Final Frontend', progreso: 0 }
    ],
    2: [
        { id: 11, nombre: 'Introducción a Node.js', progreso: 100 },
        { id: 12, nombre: 'NPM y Gestión de Paquetes', progreso: 100 },
        { id: 13, nombre: 'Express Framework Básico', progreso: 80 },
        { id: 14, nombre: 'Rutas y Middlewares', progreso: 65 },
        { id: 15, nombre: 'APIs RESTful', progreso: 50 },
        { id: 16, nombre: 'Bases de Datos SQL', progreso: 35 },
        { id: 17, nombre: 'MongoDB y NoSQL', progreso: 20 },
        { id: 18, nombre: 'Autenticación y JWT', progreso: 5 },
        { id: 19, nombre: 'Testing con Jest', progreso: 0 },
        { id: 20, nombre: 'Proyecto Final Backend', progreso: 0 }
    ],
    3: [
        { id: 21, nombre: 'Arquitectura Full Stack', progreso: 100 },
        { id: 22, nombre: 'Configuración del Entorno', progreso: 90 },
        { id: 23, nombre: 'Frontend con React', progreso: 75 },
        { id: 24, nombre: 'Backend con Express', progreso: 60 },
        { id: 25, nombre: 'Integración Frontend-Backend', progreso: 45 },
        { id: 26, nombre: 'Base de Datos y Modelos', progreso: 30 },
        { id: 27, nombre: 'Autenticación Completa', progreso: 15 },
        { id: 28, nombre: 'Despliegue en la Nube', progreso: 0 },
        { id: 29, nombre: 'CI/CD y DevOps', progreso: 0 },
        { id: 30, nombre: 'Proyecto Full Stack Final', progreso: 0 }
    ]
};

// Módulos por defecto (16 módulos)
const DEFAULT_MODULOS = [
    { id: 1, nombre: 'Módulo 1: Introducción y Bienvenida', progreso: 100 },
    { id: 2, nombre: 'Módulo 2: Fundamentos Básicos', progreso: 100 },
    { id: 3, nombre: 'Módulo 3: Conceptos Esenciales', progreso: 85 },
    { id: 4, nombre: 'Módulo 4: Herramientas del Entorno', progreso: 70 },
    { id: 5, nombre: 'Módulo 5: Primeros Pasos Prácticos', progreso: 60 },
    { id: 6, nombre: 'Módulo 6: Estructuras de Datos', progreso: 45 },
    { id: 7, nombre: 'Módulo 7: Funciones y Métodos', progreso: 30 },
    { id: 8, nombre: 'Módulo 8: Programación Orientada a Objetos', progreso: 20 },
    { id: 9, nombre: 'Módulo 9: Patrones de Diseño', progreso: 10 },
    { id: 10, nombre: 'Módulo 10: Manejo de Errores', progreso: 0 },
    { id: 11, nombre: 'Módulo 11: Testing y Debugging', progreso: 0 },
    { id: 12, nombre: 'Módulo 12: Optimización de Rendimiento', progreso: 0 },
    { id: 13, nombre: 'Módulo 13: Seguridad Básica', progreso: 0 },
    { id: 14, nombre: 'Módulo 14: Proyecto Práctico I', progreso: 0 },
    { id: 15, nombre: 'Módulo 15: Proyecto Práctico II', progreso: 0 },
    { id: 16, nombre: 'Módulo 16: Certificación Final', progreso: 0 }
];

// Mapeo de IDs de ruta a escuelas con sus iconos
function getEscuelaByRutaId(rutaId) {
    const id = parseInt(rutaId);
    if (id >= 1 && id <= 6) return { nombre: 'Escuela de Desarrollo Web', id: 'desarrollo', icono: 'fa-code' };
    if (id >= 7 && id <= 11) return { nombre: 'Escuela de Data Science', id: 'data-science', icono: 'fa-chart-bar' };
    if (id >= 12 && id <= 16) return { nombre: 'Escuela de Inteligencia Artificial', id: 'ia', icono: 'fa-robot' };
    if (id >= 17 && id <= 21) return { nombre: 'Escuela de Ciberseguridad', id: 'ciberseguridad', icono: 'fa-shield-alt' };
    if (id >= 22 && id <= 27) return { nombre: 'Escuela de Marketing Digital', id: 'marketing', icono: 'fa-bullhorn' };
    return { nombre: 'Escuela', id: 'unknown', icono: 'fa-book' };
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const rutaId = urlParams.get('ruta_id');

    // Inicializar header
    initHeader();

    if (rutaId) {
        // Obtener info de la escuela
        const escuela = getEscuelaByRutaId(rutaId);

        // Actualizar nombre e icono de la escuela en el header
        const nombreEscuelaElement = document.getElementById('nombre-escuela');
        if (nombreEscuelaElement) {
            const link = nombreEscuelaElement.querySelector('a');
            if (link) {
                link.innerHTML = `<i class="fas ${escuela.icono}"></i> ${escuela.nombre}`;
                link.href = `ruta.html?escuela=${escuela.id}`;
            }
        }

        // Actualizar icono del curso
        const iconoCurso = document.getElementById('icono-curso');
        if (iconoCurso) {
            iconoCurso.className = `fas ${escuela.icono} course-icon`;
        }

        cargarCurso(rutaId);
    } else {
        console.error('No se proporcionó un ID de ruta válido');
        mostrarError('No se proporcionó un ID de ruta válido');
    }
});

function initHeader() {
    const profileToggle = document.getElementById('profile-toggle');
    const profileDropdown = document.getElementById('profile-dropdown');
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    // Toggle menú perfil
    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            profileDropdown.classList.remove('active');
        });
    }

    // Toggle menú móvil
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Carrito
    if (carritoToggle) {
        carritoToggle.addEventListener('click', () => {
            window.location.href = 'carrito.html';
        });
    }

    // Actualizar contador carrito
    if (contadorCarrito) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

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

    // Cargar nombre de usuario y avatar
    updateUserName();
    loadAvatarFromStorage();
}

function updateUserName() {
    const userNameElement = document.getElementById('userName');
    const userName = localStorage.getItem('userName');
    if (userName && userNameElement) {
        userNameElement.textContent = userName;
    }
}

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

function cargarCurso(rutaId) {
    // Usar datos simulados
    const curso = CURSOS_POR_RUTA[rutaId];

    if (!curso) {
        mostrarError('Curso no encontrado');
        return;
    }

    actualizarInformacionCurso(curso);
    cargarModulos(curso.id);
}

function actualizarInformacionCurso(curso) {
    // Actualizar nombre del curso
    const nombreCurso = document.getElementById('nombre-curso');
    const description = document.querySelector('.description');
    const title = document.querySelector('title');

    if (nombreCurso) {
        nombreCurso.textContent = curso.nombre;
    }
    if (description) description.textContent = curso.descripcion;
    if (title) title.textContent = `UGuimar - ${curso.nombre}`;
}

function cargarModulos(cursoId) {
    // Usar datos simulados
    const modulos = MODULOS_POR_CURSO[cursoId] || DEFAULT_MODULOS;

    const modulesList = document.getElementById('modules-list');
    if (!modulesList) return;

    modulesList.innerHTML = '';
    modulos.forEach(modulo => {
        const moduloElement = document.createElement('li');
        moduloElement.className = 'module';
        moduloElement.innerHTML = `
            <div class="module-header">
                <h3 class="module-title">${modulo.nombre}</h3>
                <progress class="module-progress" value="${modulo.progreso}" max="100"></progress>
                <button class="start-button2" onclick="verModulo(${modulo.id})">Ver Módulo</button>
            </div>
        `;
        modulesList.appendChild(moduloElement);
    });
}

function verModulo(moduloId) {
    window.location.href = `contenido.html?modulo_id=${moduloId}`;
}

function mostrarError(mensaje) {
    console.error(mensaje);
    const h1 = document.querySelector('h1');
    if (h1) h1.textContent = mensaje;
}
