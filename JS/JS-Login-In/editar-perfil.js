document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profile-edit-form');
    const passwordInput = document.getElementById('contrasena');
    const confirmPasswordInput = document.getElementById('confirmar-contrasena');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    // Cargar datos del usuario (simulado)
    function loadUserData() {
        // Aquí normalmente harías una llamada a una API para obtener los datos del usuario
        const userData = {
            nombre: 'Jose',
            apellido: 'Orosco Gomez',
            telefono: '123456789',
            correo: 'jose@example.com',
            fechaNacimiento: '1990-01-01'
        };

        document.getElementById('nombre').value = userData.nombre;
        document.getElementById('apellido').value = userData.apellido;
        document.getElementById('telefono').value = userData.telefono;
        document.getElementById('correo').value = userData.correo;
        document.getElementById('fecha-nacimiento').value = userData.fechaNacimiento;
    }

    loadUserData();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Aquí normalmente enviarías los datos a una API
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        
        // Simulación de envío de datos
        console.log('Datos del usuario actualizados:', userData);
        alert('Perfil actualizado con éxito');
    });

    // Validación de contraseña en tiempo real
    confirmPasswordInput.addEventListener('input', function() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    });

    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName) {
            userNameElement.textContent = userName;
        }
    }

    // Función para cerrar sesión
    function cerrarSesion() {
        // Limpiar datos de sesión del localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userLastName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/Principal';
    }

    // Agregar evento de clic al botón de cerrar sesión
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cerrarSesion();
        });
    }

    // Función para actualizar el nombre de usuario en el menú
    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
    }

    // Llamar a la función para actualizar el nombre de usuario
    updateUserName();

    // Call the function to update the user name
    updateUserName();
  
    // Mantener la funcionalidad del menú y carrito del perfil original
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');

    menuToggle.addEventListener('click', function() {
        navegacionPrincipal.classList.toggle('active');
    });

    profileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        menuDesplegable.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
    });
});