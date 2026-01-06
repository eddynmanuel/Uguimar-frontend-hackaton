document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');
    const botonesElegir = document.querySelectorAll('.btn-elegir');
    
    const searchForm = document.querySelector('form.barra-busqueda');
    const searchInput = document.getElementById('busqueda-curso');

    console.log('Search form:', searchForm); // Debugging line

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

    // Ajustar la visualización del menú al cambiar el tamaño de la ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navegacionPrincipal.classList.remove('active');
        }
    });

    // Funcionalidad del carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    function agregarAlCarrito(plan, precio) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const planExistente = carrito.find(item => item.nombre === plan);
        
        if (!planExistente) {
            carrito.push({ id: Date.now().toString(), nombre: plan, precio: precio });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarContadorCarrito();
            alert(`Has agregado el plan ${plan} al carrito por S/${precio}.`);
        } else {
            alert(`El plan ${plan} ya está en tu carrito.`);
        }
    }

    carritoToggle.addEventListener('click', function() {
        window.location.href = 'carrito.html';
    });

    // Agregar planes al carrito
    botonesElegir.forEach(boton => {
        boton.addEventListener('click', function() {
            const plan = this.closest('.plan');
            const nombrePlan = plan.dataset.plan;
            const precioPlan = parseFloat(plan.dataset.precio);
            agregarAlCarrito(nombrePlan, precioPlan);
        });
    });

    // Inicializar el contador del carrito
    actualizarContadorCarrito();

 

    // Funcionalidad de búsqueda
    if (searchInput) { searchInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') 
        { e.preventDefault(); const searchTerm = this.value.trim();
             if (searchTerm)  { window.location.href = `busqueda.html?q=${encodeURIComponent(searchTerm)}`; } } }); } 
            
    else { console.error('No se encontró la entrada de búsqueda'); }


    
        document.getElementById('btn-elegir-basico').addEventListener('click', function() {
            window.location.href = '../../HTML/Login-In/plan1.html';
        });
    
        document.getElementById('btn-elegir-avanzado4').addEventListener('click', function() {
            window.location.href = '../../HTML/Login-In/Plan2.html';
        });

            document.getElementById('btn-avanzado-duo').addEventListener('click', function() {
                window.location.href = '../../HTML/Login-In/Plan3.html';
            });

        
});
