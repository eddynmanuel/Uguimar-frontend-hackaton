const searchInput = document.getElementById('search-input');
const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'suggestions';
searchInput.parentNode.appendChild(suggestionsContainer);

searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (query.length === 0) {
        suggestionsContainer.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`/api/search-courses?q=${encodeURIComponent(query)}`);
        const suggestions = await response.json();

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
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
});

// Cerrar las sugerencias al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.innerHTML = '';
    }
});
// Función para obtener sugerencias de cursos desde el servidor
async function fetchCourseSuggestions(query) {
    try {
        // Realiza una solicitud a la API para obtener los cursos filtrados
        const response = await fetch(`http://localhost:3000/api/cursos?query=${query}`);
        const courses = await response.json();
        
        // Mostrar las sugerencias
        const suggestionsContainer = document.getElementById('suggestions');
        suggestionsContainer.innerHTML = ''; // Limpiar las sugerencias anteriores
        
        if (courses.length > 0) {
            courses.forEach(course => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = course.nombre;
                suggestionItem.onclick = function() {
                    // Cuando se hace clic en una sugerencia, llenar el input con el nombre del curso
                    document.getElementById('search-input').value = course.nombre;
                    suggestionsContainer.style.display = 'none'; // Ocultar sugerencias
                    // Llamar a la función para mostrar los detalles del curso si es necesario
                    showCourseDetails(course.id);
                };
                suggestionsContainer.appendChild(suggestionItem);
            });
            suggestionsContainer.style.display = 'block'; // Mostrar el contenedor de sugerencias
        } else {
            suggestionsContainer.style.display = 'none'; // No mostrar si no hay resultados
        }
    } catch (error) {
        console.error('Error al obtener sugerencias de cursos:', error);
    }
}

// Función para manejar la entrada del usuario en el campo de búsqueda
document.getElementById('search-input').addEventListener('input', function(event) {
    const query = event.target.value;
    if (query.length > 2) { // Solo hacer la búsqueda si el texto tiene más de 2 caracteres
        fetchCourseSuggestions(query);
    } else {
        document.getElementById('suggestions').style.display = 'none'; // Ocultar sugerencias si el campo está vacío
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
        default: 'fas fa-university', // Ícono predeterminado
    };

    for (const key in iconMap) {
        if (nombreEscuela.toLowerCase().includes(key)) {
            return iconMap[key];
        }
    }
    return iconMap.default; // Ícono predeterminado
}

// Función para generar dinámicamente las escuelas
async function fetchAndRenderEscuelas() {
    const courseGrid = document.querySelector('.course-grid');

    try {
        const response = await fetch('http://localhost:3000/api/escuelas');
        const escuelas = await response.json();

        escuelas.forEach(nombre => {
            const icon = getIcon(nombre);

            // Crear la estructura de la tarjeta
            const card = document.createElement('div');
            card.classList.add('course-card');
            
            // Hacer la tarjeta clickeable
            card.style.cursor = 'pointer';
            card.onclick = () => {
                // Navegar a la página explorar con el nombre de la escuela como parámetro
                window.location.href = `/HTML/Principal/explorar.html?school=${encodeURIComponent(nombre)}`;
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

            // Agregar la tarjeta al contenedor
            courseGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error al obtener las escuelas:', error);
    }
}

// Ejecutar la función al cargar la página
fetchAndRenderEscuelas();

// Función para mostrar detalles del curso (esto es solo un ejemplo, puedes adaptarlo)
function showCourseDetails(courseId) {
    console.log('Mostrar detalles del curso con ID:', courseId);
    // Aquí podrías redirigir a una página de detalles o mostrar los detalles del curso en un modal
}

