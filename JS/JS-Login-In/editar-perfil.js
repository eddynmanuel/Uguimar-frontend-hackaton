document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('profile-edit-form');
    const passwordInput = document.getElementById('contrasena');
    const confirmPasswordInput = document.getElementById('confirmar-contrasena');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    // Cargar datos del usuario desde localStorage
    function loadUserData() {
        const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        const userData = {
            nombre: localStorage.getItem('userName') || savedProfile.nombre || 'Jose',
            apellido: localStorage.getItem('userLastName') || savedProfile.apellido || 'Orosco Gomez',
            telefono: savedProfile.telefono || '123456789',
            correo: localStorage.getItem('userEmail') || savedProfile.correo || 'jose@example.com',
            fechaNacimiento: savedProfile.fecha_nacimiento || '1990-01-01'
        };

        document.getElementById('nombre').value = userData.nombre;
        document.getElementById('apellido').value = userData.apellido;
        document.getElementById('telefono').value = userData.telefono;
        document.getElementById('correo').value = userData.correo;
        document.getElementById('fecha-nacimiento').value = userData.fechaNacimiento;
    }

    loadUserData();

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());

        // Guardar en localStorage
        localStorage.setItem('userProfile', JSON.stringify(userData));
        localStorage.setItem('userName', userData.nombre);
        localStorage.setItem('userLastName', userData.apellido);
        localStorage.setItem('userEmail', userData.correo);

        console.log('Datos del usuario actualizados:', userData);
        alert('Perfil actualizado con éxito');
    });

    // Validación de contraseña en tiempo real
    confirmPasswordInput.addEventListener('input', function () {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    });

    // Función para actualizar el nombre de usuario
    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
    }

    // Función para cerrar sesión
    function cerrarSesion() {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userLastName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        window.location.href = '../Principal/Principal.html';
    }

    // Agregar evento de clic al botón de cerrar sesión
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', function (e) {
            e.preventDefault();
            cerrarSesion();
        });
    }

    updateUserName();

    // Mantener la funcionalidad del menú y carrito
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const carritoToggle = document.getElementById('carrito-toggle');

    menuToggle.addEventListener('click', function () {
        navegacionPrincipal.classList.toggle('active');
    });

    profileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menuDesplegable.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
    });
});