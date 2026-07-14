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

    // ==============================
    // HAMBURGER MENU FUNCTIONALITY
    // ==============================
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerToggle && navLinks) {
        hamburgerToggle.addEventListener('click', () => {
            hamburgerToggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburgerToggle.contains(e.target) && !navLinks.contains(e.target)) {
                hamburgerToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
