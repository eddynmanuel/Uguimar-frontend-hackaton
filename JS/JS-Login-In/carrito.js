document.addEventListener('DOMContentLoaded', function () {
    const carritoItems = document.getElementById('carrito-items');
    const totalCompra = document.getElementById('total-compra');
    const pagoForm = document.getElementById('pago-form');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

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

    // Función para actualizar el nombre de usuario
    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
    }

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
    carritoItems.addEventListener('click', function (e) {
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
    pagoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Pago procesado con éxito. Gracias por tu compra!');
        localStorage.removeItem('carrito');
        cargarCarrito();
    });

    // Cargar carrito al iniciar
    cargarCarrito();
});
