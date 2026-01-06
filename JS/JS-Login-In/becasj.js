document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('busqueda-curso');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    // Función para toggle del menú de navegación
    menuToggle.addEventListener('click', function() {
        navegacionPrincipal.classList.toggle('active');
    });

    // Función para toggle del menú de perfil
    profileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        menuDesplegable.classList.toggle('active');
    });

    // Cerrar el menú de perfil al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
    });

    // Cerrar el menú de navegación en móviles al hacer clic en un enlace
    const navLinks = navegacionPrincipal.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navegacionPrincipal.classList.remove('active');
            }
        });
    });
// Add this at the end of the DOMContentLoaded event listener
function updateUserName() {
    const userNameElement = document.getElementById('userName');
    const userName = localStorage.getItem('userName');
    if (userName) {
        userNameElement.textContent = userName;
    }
  }
  
  // Call the function to update the user name
  updateUserName();
  
    // Ajustar la visualización del menú al cambiar el tamaño de la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navegacionPrincipal.classList.remove('active');
        }
    });

    // Manejo de subida de documentos para becas
    const formDocumentosBeca = document.getElementById('form-documentos-beca');
    if (formDocumentosBeca) {
        formDocumentosBeca.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const dni = document.getElementById('dni').files[0];
            const expediente = document.getElementById('expediente').files[0];
            const justificacionFinanciera = document.getElementById('justificacion-financiera').files[0];

            // Aquí iría la lógica para enviar los archivos al servidor
            // Por ahora, solo mostraremos un mensaje de éxito y los nombres de los archivos
            console.log('Archivos a subir:', {
                DNI: dni ? dni.name : 'No seleccionado',
                Expediente: expediente ? expediente.name : 'No seleccionado',
                'Justificación Financiera': justificacionFinanciera ? justificacionFinanciera.name : 'No seleccionado'
            });

            alert('Documentos subidos con éxito. Tu solicitud de beca está en proceso.');
            
            // Limpiar el formulario después de la subida
            this.reset();
        });
    }

    // Manejo de botones para iniciar cursos
    const btnsIniciarCurso = document.querySelectorAll('.btn-iniciar-curso');
    btnsIniciarCurso.forEach(btn => {
        btn.addEventListener('click', function() {
            const curseName = this.previousElementSibling.textContent;
            alert(`Iniciando el curso: ${curseName}`);
        });
    });

    // Manejo del botón para iniciar examen
    const btnIniciarExamen = document.querySelector('.btn-iniciar-examen');
    if (btnIniciarExamen) {
        btnIniciarExamen.addEventListener('click', function() {
            alert('Iniciando el examen de admisión. ¡Buena suerte!');
        });
    }

    // Función para buscar cursos y redirigir a la página de resultados
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            window.location.href = `busqueda.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });

    

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

    // Funcionalidad del carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    carritoToggle.addEventListener('click', function() {
        window.location.href = 'planesj.html';
    });

    // Inicializar el contador del carrito
    actualizarContadorCarrito();
});