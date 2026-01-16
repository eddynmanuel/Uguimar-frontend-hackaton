// Datos simulados de escuelas
const ESCUELAS_DATA = [
    'Data Science',
    'Inteligencia Artificial',
    'Ciberseguridad',
    'Liderazgo y Gestión',
    'Inglés',
    'Desarrollo Web',
    'Marketing Digital',
    'Producto',
    'Creación de Contenido',
    'Finanzas',
    'Startups',
    'Diversidad e Inclusión'
];

// Datos simulados de cursos para búsqueda
const CURSOS_DATA = [
    { id: 1, nombre: 'Introducción a Python', videoUrl: 'https://youtube.com/watch?v=example1' },
    { id: 2, nombre: 'Machine Learning Básico', videoUrl: 'https://youtube.com/watch?v=example2' },
    { id: 3, nombre: 'HTML y CSS desde cero', videoUrl: 'https://youtube.com/watch?v=example3' },
    { id: 4, nombre: 'JavaScript Moderno', videoUrl: 'https://youtube.com/watch?v=example4' },
    { id: 5, nombre: 'React para principiantes', videoUrl: 'https://youtube.com/watch?v=example5' },
    { id: 6, nombre: 'Node.js y Express', videoUrl: 'https://youtube.com/watch?v=example6' },
    { id: 7, nombre: 'Bases de datos SQL', videoUrl: 'https://youtube.com/watch?v=example7' },
    { id: 8, nombre: 'Fundamentos de Ciberseguridad', videoUrl: 'https://youtube.com/watch?v=example8' }
];

const searchInput = document.getElementById('search-input');
const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'suggestions';
searchInput.parentNode.appendChild(suggestionsContainer);

// Función para buscar cursos en datos simulados
function searchCourses(query) {
    const queryLower = query.toLowerCase();
    return CURSOS_DATA.filter(curso =>
        curso.nombre.toLowerCase().includes(queryLower)
    ).map(curso => curso.nombre);
}

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length === 0) {
        suggestionsContainer.innerHTML = '';
        return;
    }

    // Usar datos simulados en lugar de fetch
    const suggestions = searchCourses(query);

    suggestionsContainer.innerHTML = '';
    suggestions.forEach((suggestion) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = suggestion;

        item.addEventListener('click', () => {
            searchInput.value = suggestion;
            suggestionsContainer.innerHTML = '';
        });

        suggestionsContainer.appendChild(item);
    });
});

// Cerrar las sugerencias al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.innerHTML = '';
    }
});

// Función para asignar íconos según el nombre de la escuela
function getIcon(nombreEscuela) {
    const iconMap = {
        data: 'fas fa-database',
        inteligencia: 'fas fa-brain',
        ciberseguridad: 'fas fa-shield-alt',
        liderazgo: 'fas fa-users',
        ingles: 'fas fa-globe-americas',
        desarrollo: 'fas fa-code',
        marketing: 'fas fa-bullhorn',
        producto: 'fas fa-box-open',
        contenido: 'fas fa-video',
        finanzas: 'fas fa-money-check-alt',
        startups: 'fas fa-rocket',
        diversidad: 'fas fa-users-cog',
        default: 'fas fa-university',
    };

    for (const key in iconMap) {
        if (nombreEscuela.toLowerCase().includes(key)) {
            return iconMap[key];
        }
    }
    return iconMap.default;
}

// Función para generar dinámicamente las escuelas con datos simulados
function renderEscuelas() {
    const courseGrid = document.querySelector('.course-grid');

    ESCUELAS_DATA.forEach(nombre => {
        const icon = getIcon(nombre);

        const card = document.createElement('div');
        card.classList.add('course-card');

        card.style.cursor = 'pointer';
        card.onclick = () => {
            window.location.href = `explorar.html?school=${encodeURIComponent(nombre)}`;
        };

        card.innerHTML = `
            <div class="course-content">
                <div class="course-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="course-text">
                    <h3>ESCUELA DE</h3>
                    <p>${nombre}</p>
                </div>
            </div>
        `;

        courseGrid.appendChild(card);
    });
}

// Ejecutar la función al cargar la página
renderEscuelas();

// Función para mostrar detalles del curso
function showCourseDetails(courseId) {
    console.log('Mostrar detalles del curso con ID:', courseId);
}
