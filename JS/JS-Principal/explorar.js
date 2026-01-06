document.addEventListener('DOMContentLoaded', async () => {
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

    try {
        const response = await fetch(`/api/escuela/${encodeURIComponent(schoolName)}`);
        const escuela = await response.json();
        
        // Add debug logging
        console.log('API Response:', escuela);

        if (!response.ok) {
            throw new Error(escuela.error || 'Error al cargar los detalles de la escuela');
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
                        <button class="btn-start" onclick="window.location.href='/Principal#planes'">INICIA AHORA</button>
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
                    <button class="btn-start" onclick="window.location.href='/Principal#planes'">EMPIEZA YA</button>
                </div>
            </div>
            <div class="routes-section">
                <h3>Rutas y Cursos Relacionados</h3>
                ${rutasHTML}
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        courseDetails.innerHTML = `
            <div class="error-message">
                <h2>Error al cargar los detalles</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
});

