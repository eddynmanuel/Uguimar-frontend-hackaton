// Cursos.js - Funcionalidad para la página de cursos

document.addEventListener('DOMContentLoaded', function () {
    // Agregar funcionalidad de clic a todas las tarjetas de cursos
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        card.style.cursor = 'pointer';

        card.addEventListener('click', function () {
            // Mostrar mensaje de que debe iniciar sesión
            alert('Debe iniciar sesión para continuar');
            // Redirigir al formulario de login
            window.location.href = 'login.html';
        });
    });
});
