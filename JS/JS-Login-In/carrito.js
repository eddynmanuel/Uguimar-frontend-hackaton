document.addEventListener('DOMContentLoaded', function() {
    const carritoItems = document.getElementById('carrito-items');
    const totalCompra = document.getElementById('total-compra');
    const pagoForm = document.getElementById('pago-form');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    // Cargar carrito desde localStorage
    // Add this at the end of the DOMContentLoaded event listener


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

function updateUserName() {
    const userNameElement = document.getElementById('userName');
    const userName = localStorage.getItem('userName');
    if (userName) {
        userNameElement.textContent = userName;
    }
  }
  
  // Call the function to update the user name
  updateUserName();
  
    function cargarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoItems.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p>${item.nombre} - S/ ${item.precio.toFixed(2)}</p>
                <button class="btn-eliminar" data-id="${item.id}">Eliminar</button>
            `;
            carritoItems.appendChild(itemElement);
            total += item.precio;
        });

        totalCompra.textContent = total.toFixed(2);
    }

    // Eliminar item del carrito
    carritoItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-eliminar')) {
            const id = e.target.dataset.id;
            eliminarDelCarrito(id);
        }
    });

    function eliminarDelCarrito(id) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
    }

    // Procesar pago
    pagoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pago procesado con éxito. Gracias por tu compra!');
        localStorage.removeItem('carrito');
        cargarCarrito();
    });

    // Cargar carrito al iniciar
    cargarCarrito();
});
