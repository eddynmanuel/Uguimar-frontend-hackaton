// Función para verificar si el usuario está logueado
function verificarLogin() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Debe iniciar sesión para continuar');
        window.location.href = 'Principal.html';
        return false;
    }
    return true;
}

// Datos simulados de escuelas con sus rutas y cursos
const ESCUELAS_DETALLE = {
    'Data Science': {
        nombre: 'Escuela de Data Science',
        descripcion: 'Aprende a analizar y visualizar datos con las herramientas más demandadas del mercado.',
        icono: 'fas fa-database',
        rutas: {
            1: {
                nombre: 'Fundamentos de Data Science',
                descripcion: 'Domina los conceptos básicos del análisis de datos',
                cursos: [
                    { nombre: 'Introducción a Python para Data Science', descripcion: 'Aprende Python desde cero enfocado en análisis de datos' },
                    { nombre: 'Estadística Descriptiva', descripcion: 'Fundamentos estadísticos para el análisis de datos' },
                    { nombre: 'Visualización de Datos con Matplotlib', descripcion: 'Crea gráficos profesionales con Python' }
                ]
            },
            2: {
                nombre: 'Machine Learning',
                descripcion: 'Implementa modelos de aprendizaje automático',
                cursos: [
                    { nombre: 'Regresión Lineal y Logística', descripcion: 'Modelos de predicción básicos' },
                    { nombre: 'Árboles de Decisión', descripcion: 'Algoritmos de clasificación' }
                ]
            }
        }
    },
    'Inteligencia Artificial': {
        nombre: 'Escuela de Inteligencia Artificial',
        descripcion: 'Domina las técnicas más avanzadas de IA y Deep Learning.',
        icono: 'fas fa-brain',
        rutas: {
            1: {
                nombre: 'Deep Learning',
                descripcion: 'Redes neuronales y aprendizaje profundo',
                cursos: [
                    { nombre: 'Redes Neuronales con TensorFlow', descripcion: 'Construye redes neuronales desde cero' },
                    { nombre: 'Procesamiento de Lenguaje Natural', descripcion: 'NLP con Python' }
                ]
            }
        }
    },
    'Desarrollo Web': {
        nombre: 'Escuela de Desarrollo Web',
        descripcion: 'Conviértete en un desarrollador web completo con las tecnologías más demandadas.',
        icono: 'fas fa-code',
        rutas: {
            1: {
                nombre: 'Frontend',
                descripcion: 'Desarrollo de interfaces de usuario',
                cursos: [
                    { nombre: 'HTML y CSS desde cero', descripcion: 'Fundamentos del desarrollo web' },
                    { nombre: 'JavaScript Moderno', descripcion: 'ES6+ y programación asíncrona' },
                    { nombre: 'React.js', descripcion: 'Biblioteca para interfaces de usuario' }
                ]
            },
            2: {
                nombre: 'Backend',
                descripcion: 'Desarrollo del lado del servidor',
                cursos: [
                    { nombre: 'Node.js y Express', descripcion: 'Servidores con JavaScript' },
                    { nombre: 'Bases de datos SQL', descripcion: 'PostgreSQL y MySQL' }
                ]
            }
        }
    }
};

// Añadir escuelas por defecto para las que no tienen detalle
const defaultEscuela = {
    descripcion: 'Explora nuestros cursos y rutas de aprendizaje.',
    icono: 'fas fa-university',
    rutas: {
        1: {
            nombre: 'Ruta Principal',
            descripcion: 'Comienza tu aprendizaje aquí',
            cursos: [
                { nombre: 'Curso Introductorio', descripcion: 'Aprende los fundamentos' },
                { nombre: 'Curso Intermedio', descripcion: 'Profundiza tus conocimientos' }
            ]
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const schoolName = urlParams.get('school');
    const courseDetails = document.getElementById('course-details');

    if (!schoolName) {
        courseDetails.innerHTML = `
            <div class="error-message">
                <h2>Error: Escuela no especificada</h2>
                <p>Por favor selecciona una escuela válida desde la página principal.</p>
            </div>
        `;
        return;
    }

    // Buscar escuela en datos simulados
    let escuela = ESCUELAS_DETALLE[schoolName];

    if (!escuela) {
        // Usar datos por defecto si la escuela no está definida
        escuela = {
            nombre: `Escuela de ${schoolName}`,
            ...defaultEscuela
        };
    }

    // Generar el HTML para las rutas y sus cursos
    const rutasHTML = Object.values(escuela.rutas).map(ruta => {
        const cursosHTML = ruta.cursos.map(curso => `
            <div class="course-card">
                <h5>${curso.nombre}</h5>
                <p>${curso.descripcion}</p>
            </div>
        `).join('');

        return `
            <div class="route-card">
                <div class="route-info">
                    <h4>Ruta: ${ruta.nombre}</h4>
                    <p>${ruta.descripcion}</p>
                    <button class="btn-start" onclick="if(verificarLogin()) window.location.href='login.html'">INICIA AHORA</button>
                </div>
                <div class="courses-container">
                    ${cursosHTML}
                </div>
            </div>
        `;
    }).join('');

    // Actualizar el contenido de la página
    courseDetails.innerHTML = `
        <div class="school-header">
            <div class="school-icon">
                <i class="${escuela.icono}"></i>
            </div>
            <div class="school-info">
                <h2>${escuela.nombre}</h2>
                <p>${escuela.descripcion}</p>
                <button class="btn-start" onclick="if(verificarLogin()) window.location.href='login.html'">EMPIEZA YA</button>
            </div>
        </div>
        <div class="routes-section">
            <h3>Rutas y Cursos Relacionados</h3>
            ${rutasHTML}
        </div>
    `;
});
