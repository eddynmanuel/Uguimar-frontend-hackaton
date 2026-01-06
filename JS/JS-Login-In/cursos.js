document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const rutaId = urlParams.get('ruta_id');

    if (rutaId) {
        cargarCurso(rutaId);
    } else {
        console.error('No se proporcionó un ID de ruta válido');
    }
});

function cargarCurso(rutaId) {
    fetch(`/api/cursos?ruta_id=${rutaId}`)
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar el curso');
            return response.json();
        })
        .then(curso => {
            actualizarInformacionCurso(curso);
            cargarModulos(curso.id);
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarError('Error al cargar la información del curso');
        });
}

function actualizarInformacionCurso(curso) {
    document.querySelector('h1').textContent = curso.nombre;
    document.querySelector('.description').textContent = curso.descripcion;
    // Actualiza otros elementos del curso según sea necesario
}

function cargarModulos(cursoId) {
    fetch(`/api/modulos?curso_id=${cursoId}`)
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar los módulos');
            return response.json();
        })
        .then(modulos => {
            const modulesList = document.getElementById('modules-list');
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
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarError('Error al cargar los módulos del curso');
        });
}

function verModulo(moduloId) {
    // Redirigir a la página de contenido del módulo
    window.location.href = `cursoContenido.html?modulo_id=${moduloId}`;
}

function mostrarError(mensaje) {
    // Implementa esta función para mostrar mensajes de error al usuario
    console.error(mensaje);
    // Por ejemplo, podrías mostrar un alert o actualizar un elemento en el DOM
}

