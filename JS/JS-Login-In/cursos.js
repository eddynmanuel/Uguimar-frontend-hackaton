// Datos simulados de cursos por ruta
const CURSOS_POR_RUTA = {
    1: { id: 1, nombre: 'Desarrollo Frontend', descripcion: 'Aprende HTML, CSS, JavaScript y React para crear interfaces de usuario modernas.' },
    2: { id: 2, nombre: 'Desarrollo Backend', descripcion: 'Node.js, Express, bases de datos SQL y NoSQL.' },
    3: { id: 3, nombre: 'Full Stack Development', descripcion: 'Desarrollo completo de aplicaciones web.' },
    4: { id: 4, nombre: 'Fundamentos de Data Science', descripcion: 'Python, estadística y visualización de datos.' },
    5: { id: 5, nombre: 'Machine Learning', descripcion: 'Algoritmos de aprendizaje automático con Python.' },
    6: { id: 6, nombre: 'Deep Learning', descripcion: 'Redes neuronales con TensorFlow y PyTorch.' },
    7: { id: 7, nombre: 'NLP', descripcion: 'Procesamiento de lenguaje natural.' },
    8: { id: 8, nombre: 'Seguridad Ofensiva', descripcion: 'Pentesting y hacking ético.' },
    9: { id: 9, nombre: 'Seguridad Defensiva', descripcion: 'Análisis de vulnerabilidades.' },
    10: { id: 10, nombre: 'SEO y SEM', descripcion: 'Posicionamiento en buscadores.' },
    11: { id: 11, nombre: 'Social Media Marketing', descripcion: 'Gestión de redes sociales.' }
};

// Datos simulados de módulos por curso
const MODULOS_POR_CURSO = {
    1: [
        { id: 1, nombre: 'Introducción a HTML', progreso: 100 },
        { id: 2, nombre: 'CSS Básico', progreso: 80 },
        { id: 3, nombre: 'CSS Avanzado', progreso: 50 },
        { id: 4, nombre: 'JavaScript Básico', progreso: 30 },
        { id: 5, nombre: 'JavaScript Avanzado', progreso: 0 }
    ],
    2: [
        { id: 6, nombre: 'Introducción a Node.js', progreso: 100 },
        { id: 7, nombre: 'Express Framework', progreso: 60 },
        { id: 8, nombre: 'Bases de Datos SQL', progreso: 40 },
        { id: 9, nombre: 'MongoDB', progreso: 0 }
    ],
    3: [
        { id: 10, nombre: 'Proyecto Full Stack', progreso: 20 }
    ]
};

// Módulos por defecto
const DEFAULT_MODULOS = [
    { id: 100, nombre: 'Módulo 1: Introducción', progreso: 0 },
    { id: 101, nombre: 'Módulo 2: Conceptos Básicos', progreso: 0 },
    { id: 102, nombre: 'Módulo 3: Práctica', progreso: 0 }
];

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const rutaId = urlParams.get('ruta_id');

    if (rutaId) {
        cargarCurso(rutaId);
    } else {
        console.error('No se proporcionó un ID de ruta válido');
        mostrarError('No se proporcionó un ID de ruta válido');
    }
});

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
    const h1 = document.querySelector('h1');
    const description = document.querySelector('.description');

    if (h1) h1.textContent = curso.nombre;
    if (description) description.textContent = curso.descripcion;
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
    window.location.href = `cursoContenido.html?modulo_id=${moduloId}`;
}

function mostrarError(mensaje) {
    console.error(mensaje);
    const h1 = document.querySelector('h1');
    if (h1) h1.textContent = mensaje;
}
