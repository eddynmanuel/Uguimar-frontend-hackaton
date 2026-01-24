document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    const contadorCarrito = document.getElementById('contador-carrito');

    // Elementos del carrito
    const productosLista = document.getElementById('productos-lista');
    const productosCount = document.getElementById('productos-count');
    const carritoVacio = document.getElementById('carrito-vacio');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    const btnPagar = document.getElementById('btn-ir-pago');
    const lineaDescuento = document.getElementById('linea-descuento');
    const descuentoEl = document.getElementById('descuento');

    // Modal de pago
    const modalPago = document.getElementById('modal-pago');
    const cerrarModalPago = document.getElementById('cerrar-modal-pago');
    const formTarjeta = document.getElementById('form-tarjeta');
    const formYape = document.getElementById('form-yape');
    const formPaypal = document.getElementById('form-paypal');
    const metodosBtns = document.querySelectorAll('.metodo-btn');

    // Modal de éxito
    const modalExito = document.getElementById('modal-exito');
    const btnIrCursos = document.getElementById('btn-ir-cursos');

    // Cupón
    const inputCupon = document.getElementById('cupon');
    const btnAplicarCupon = document.getElementById('btn-aplicar-cupon');

    // Estado
    let descuentoAplicado = 0;
    const CUPONES_VALIDOS = {
        'DESCUENTO10': 0.10,
        'DESCUENTO20': 0.20,
        'UGUIMAR50': 0.50
    };

    // Toggle menú navegación
    if (menuToggle) {
        menuToggle.addEventListener('click', () => navegacionPrincipal.classList.toggle('active'));
    }

    // Toggle menú perfil
    if (profileToggle) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDesplegable.classList.toggle('active');
        });
    }

    document.addEventListener('click', (e) => {
        if (menuDesplegable && !menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
    });

    // Cargar y mostrar carrito
    function cargarCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Actualizar contador
        if (contadorCarrito) {
            contadorCarrito.textContent = carrito.length;
        }

        // Mostrar/ocultar mensaje de carrito vacío
        if (carrito.length === 0) {
            productosLista.innerHTML = '';
            carritoVacio.classList.remove('oculto');
            productosCount.textContent = '0 cursos';
            btnPagar.disabled = true;
            actualizarTotales(0);
            return;
        }

        carritoVacio.classList.add('oculto');
        productosCount.textContent = `${carrito.length} curso${carrito.length > 1 ? 's' : ''}`;
        btnPagar.disabled = false;

        // Renderizar productos
        productosLista.innerHTML = '';
        let subtotal = 0;

        carrito.forEach(item => {
            const productoEl = document.createElement('div');
            productoEl.className = 'producto-item';
            productoEl.innerHTML = `
                <div class="producto-imagen">
                    <img src="${obtenerThumbnail(item.id)}" alt="${item.nombre}">
                </div>
                <div class="producto-info">
                    <h3>${item.nombre}</h3>
                    <p><i class="fas fa-user"></i> Instructor certificado</p>
                </div>
                <div class="producto-precio">
                    <span class="precio-actual">S/. ${item.precio.toFixed(2)}</span>
                    <button class="btn-eliminar" data-id="${item.id}">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            productosLista.appendChild(productoEl);
            subtotal += item.precio;
        });

        actualizarTotales(subtotal);
    }

    // Obtener thumbnail del curso basado en ID
    function obtenerThumbnail(id) {
        const thumbnails = {
            '3': 'https://img.youtube.com/vi/SqcY0GlETPk/hqdefault.jpg',
            '5': 'https://img.youtube.com/vi/FXpIoQ_rT_c/hqdefault.jpg',
            '6': 'https://img.youtube.com/vi/BwuLxPH8IDs/hqdefault.jpg',
            '7': 'https://img.youtube.com/vi/3qBXWUpoPHo/hqdefault.jpg',
            '8': 'https://img.youtube.com/vi/fqMOX6JJhGo/hqdefault.jpg',
            '9': 'https://img.youtube.com/vi/Oe421EPjeBE/hqdefault.jpg',
            '10': 'https://img.youtube.com/vi/ukzFI9rgwfU/hqdefault.jpg',
            '13': 'https://img.youtube.com/vi/SOTamWNgDKc/hqdefault.jpg',
            '14': 'https://img.youtube.com/vi/FTFaQWZBqQ8/hqdefault.jpg',
            '15': 'https://img.youtube.com/vi/VPvVD8t02U8/hqdefault.jpg',
            '16': 'https://img.youtube.com/vi/3Kq1MIfTWCE/hqdefault.jpg'
        };
        return thumbnails[id] || 'https://via.placeholder.com/120x80?text=Curso';
    }

    // Actualizar totales
    function actualizarTotales(subtotal) {
        const descuento = subtotal * descuentoAplicado;
        const total = subtotal - descuento;

        subtotalEl.textContent = `S/. ${subtotal.toFixed(2)}`;
        totalEl.textContent = `S/. ${total.toFixed(2)}`;

        if (descuentoAplicado > 0) {
            lineaDescuento.classList.remove('oculto');
            descuentoEl.textContent = `-S/. ${descuento.toFixed(2)}`;
        } else {
            lineaDescuento.classList.add('oculto');
        }

        // Actualizar totales en modales
        document.getElementById('pago-total-monto').textContent = `S/. ${total.toFixed(2)}`;
        document.getElementById('pago-total-yape').textContent = `S/. ${total.toFixed(2)}`;
        document.getElementById('pago-total-paypal').textContent = `S/. ${total.toFixed(2)}`;
    }

    // Eliminar producto del carrito
    productosLista.addEventListener('click', function (e) {
        const btnEliminar = e.target.closest('.btn-eliminar');
        if (btnEliminar) {
            const id = btnEliminar.dataset.id;
            eliminarDelCarrito(id);
        }
    });

    function eliminarDelCarrito(id) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        cargarCarrito();
    }

    // Aplicar cupón
    if (btnAplicarCupon) {
        btnAplicarCupon.addEventListener('click', function () {
            const codigoCupon = inputCupon.value.trim().toUpperCase();

            if (CUPONES_VALIDOS[codigoCupon]) {
                descuentoAplicado = CUPONES_VALIDOS[codigoCupon];
                cargarCarrito();
                inputCupon.style.borderColor = 'var(--success-color)';
                btnAplicarCupon.textContent = '✓ Aplicado';
                btnAplicarCupon.style.background = 'var(--success-color)';
            } else {
                inputCupon.style.borderColor = 'var(--error-color)';
                alert('Cupón inválido');
            }
        });
    }

    // Abrir modal de pago
    if (btnPagar) {
        btnPagar.addEventListener('click', function () {
            modalPago.classList.remove('oculto');
        });
    }

    // Cerrar modal de pago
    if (cerrarModalPago) {
        cerrarModalPago.addEventListener('click', function () {
            modalPago.classList.add('oculto');
        });
    }

    // Cambiar método de pago
    metodosBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remover activo de todos
            metodosBtns.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');

            // Ocultar todos los formularios
            formTarjeta.classList.add('oculto');
            formYape.classList.add('oculto');
            formPaypal.classList.add('oculto');

            // Mostrar el seleccionado
            const metodo = this.dataset.metodo;
            if (metodo === 'tarjeta') {
                formTarjeta.classList.remove('oculto');
            } else if (metodo === 'yape') {
                formYape.classList.remove('oculto');
            } else if (metodo === 'paypal') {
                formPaypal.classList.remove('oculto');
            }
        });
    });

    // Procesar pago con tarjeta
    if (formTarjeta) {
        formTarjeta.addEventListener('submit', function (e) {
            e.preventDefault();
            procesarPago();
        });
    }

    // Procesar pago con Yape
    const btnConfirmarYape = document.getElementById('btn-confirmar-yape');
    if (btnConfirmarYape) {
        btnConfirmarYape.addEventListener('click', function () {
            procesarPago();
        });
    }

    // Procesar pago con PayPal
    const btnIrPaypal = document.getElementById('btn-ir-paypal');
    if (btnIrPaypal) {
        btnIrPaypal.addEventListener('click', function () {
            procesarPago();
        });
    }

    // Función para procesar pago
    function procesarPago() {
        // Simular procesamiento
        modalPago.classList.add('oculto');

        // Mostrar modal de éxito
        modalExito.classList.remove('oculto');

        // Limpiar carrito
        localStorage.removeItem('carrito');
        descuentoAplicado = 0;
    }

    // Ir a mis cursos después del pago
    if (btnIrCursos) {
        btnIrCursos.addEventListener('click', function () {
            window.location.href = 'mi-progreso.html';
        });
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function (e) {
        if (e.target === modalPago) {
            modalPago.classList.add('oculto');
        }
    });

    // Usuario
    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
    }

    function updateProfileAvatar() {
        const savedAvatar = localStorage.getItem('userAvatar');
        const userName = localStorage.getItem('userName') || 'Usuario';
        const inicial = userName.charAt(0).toUpperCase();

        const avatarImgHeader = document.getElementById('avatar-img-header');
        const avatarInicialHeader = document.getElementById('avatar-inicial-header');

        // Actualizar avatar
        if (savedAvatar && avatarImgHeader && avatarInicialHeader) {
            avatarImgHeader.src = savedAvatar;
            avatarImgHeader.style.display = 'block';
            avatarInicialHeader.style.display = 'none';
        } else if (avatarInicialHeader) {
            if (avatarImgHeader) avatarImgHeader.style.display = 'none';
            avatarInicialHeader.style.display = 'flex';
            avatarInicialHeader.textContent = inicial;
        }
    }

    // Cerrar sesión
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userLastName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userRole');
            localStorage.removeItem('carrito');
            window.location.href = '../Principal/Principal.html';
        });
    }

    // Inicialización
    updateUserName();
    updateProfileAvatar();
    cargarCarrito();
});
