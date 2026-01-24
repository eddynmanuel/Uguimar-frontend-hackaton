document.addEventListener("DOMContentLoaded", () => {
    // ==================== ELEMENTOS DEL DOM ====================
    const profileToggle = document.getElementById("profile-toggle");
    const profileDropdown = document.getElementById("profile-dropdown");
    const carritoToggle = document.getElementById("carrito-toggle");
    const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");
    const btnCopiarCodigo = document.getElementById("btn-copiar-codigo");
    const btnWhatsapp = document.getElementById("btn-whatsapp");
    const btnEmail = document.getElementById("btn-email");
    const btnCopiarLink = document.getElementById("btn-copiar-link");
    const btnVerCursos = document.getElementById("btn-ver-cursos");
    const btnEstudiarHoy = document.getElementById("btn-estudiar-hoy");
    const btnCopiarMensaje = document.getElementById("btn-copiar-mensaje");
    const modalExito = document.getElementById("modal-exito");
    const modalCompartir = document.getElementById("modal-compartir");
    const faqItems = document.querySelectorAll(".faq-item");

    // ==================== DATOS DE USUARIO ====================
    const userName = localStorage.getItem('userName') || 'Usuario';
    const userId = localStorage.getItem('userId') || generateUserId();

    // Generar código de referido único
    function generateUserId() {
        const id = 'U' + Math.random().toString(36).substr(2, 6).toUpperCase();
        localStorage.setItem('userId', id);
        return id;
    }

    function generateReferralCode() {
        const savedCode = localStorage.getItem('referralCode');
        if (savedCode) return savedCode;

        const code = 'UGUIMAR-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        localStorage.setItem('referralCode', code);
        return code;
    }

    // ==================== INICIALIZACIÓN ====================
    function init() {
        // Actualizar nombre de usuario
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = userName;
        }

        // Actualizar avatar
        if (profileToggle) {
            profileToggle.textContent = userName.charAt(0).toUpperCase();
        }

        // Actualizar código de referido
        const codigoElement = document.getElementById('mi-codigo');
        const referralCode = generateReferralCode();
        if (codigoElement) {
            codigoElement.textContent = referralCode;
        }

        // Actualizar mensaje de compartir
        const mensajeTextarea = document.getElementById('mensaje-referido');
        if (mensajeTextarea) {
            mensajeTextarea.value = `¡Hola! 👋 Te invito a unirte a UGuimar, la mejor plataforma de aprendizaje. Usa mi código ${referralCode} y obtén 7 días gratis. Regístrate aquí: https://uguimar.com/registro?ref=${referralCode}`;
        }

        // Cargar progreso guardado
        loadProgress();

        // Actualizar contador del carrito
        updateCartCounter();
    }

    // ==================== CARGAR PROGRESO ====================
    function loadProgress() {
        const promoProgress = JSON.parse(localStorage.getItem('promoProgress')) || {
            referidos: 1,
            cursosCompletados: 2,
            diasRacha: 18
        };

        // Actualizar referidos
        const referidosCount = document.getElementById('referidos-count');
        const progresoReferidos = document.getElementById('progreso-referidos');
        if (referidosCount && progresoReferidos) {
            referidosCount.textContent = `${promoProgress.referidos}/3 amigos`;
            progresoReferidos.style.width = `${(promoProgress.referidos / 3) * 100}%`;
        }

        // Actualizar cursos
        const cursosCount = document.getElementById('cursos-count');
        if (cursosCount) {
            cursosCount.textContent = `${promoProgress.cursosCompletados}/5`;
        }

        // Actualizar racha
        const diasRacha = document.getElementById('dias-racha');
        if (diasRacha) {
            diasRacha.textContent = promoProgress.diasRacha;
        }
    }

    // ==================== MENÚ DESPLEGABLE ====================
    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("active");
        });

        document.addEventListener("click", () => {
            profileDropdown.classList.remove("active");
        });
    }

    // ==================== CARRITO ====================
    if (carritoToggle) {
        carritoToggle.addEventListener("click", () => {
            window.location.href = "carrito.html";
        });
    }

    function updateCartCounter() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const contador = document.getElementById('contador-carrito');
        if (contador) {
            contador.textContent = carrito.length;
        }
    }

    // ==================== CERRAR SESIÓN ====================
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
                localStorage.removeItem('userId');
                localStorage.removeItem('userName');
                localStorage.removeItem('userEmail');
                window.location.href = '../Principal/Principal.html';
            }
        });
    }

    // ==================== COPIAR CÓDIGO ====================
    if (btnCopiarCodigo) {
        btnCopiarCodigo.addEventListener('click', () => {
            const codigo = document.getElementById('mi-codigo').textContent;
            copyToClipboard(codigo);
            showModal('¡Código Copiado!', 'Tu código de referido ha sido copiado al portapapeles.');
        });
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Texto copiado:', text);
        }).catch(err => {
            console.error('Error al copiar:', err);
            // Fallback para navegadores antiguos
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });
    }

    // ==================== COMPARTIR ====================
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', () => {
            const referralCode = localStorage.getItem('referralCode');
            const mensaje = encodeURIComponent(`¡Hola! 👋 Te invito a unirte a UGuimar, la mejor plataforma de aprendizaje. Usa mi código ${referralCode} y obtén 7 días gratis. Regístrate aquí: https://uguimar.com/registro?ref=${referralCode}`);
            window.open(`https://wa.me/?text=${mensaje}`, '_blank');
        });
    }

    if (btnEmail) {
        btnEmail.addEventListener('click', () => {
            const referralCode = localStorage.getItem('referralCode');
            const asunto = encodeURIComponent('¡Te invito a aprender en UGuimar!');
            const cuerpo = encodeURIComponent(`¡Hola!\n\nTe invito a unirte a UGuimar, la mejor plataforma de aprendizaje.\n\nUsa mi código ${referralCode} y obtén 7 días gratis.\n\nRegístrate aquí: https://uguimar.com/registro?ref=${referralCode}\n\n¡Te espero!`);
            window.open(`mailto:?subject=${asunto}&body=${cuerpo}`, '_blank');
        });
    }

    if (btnCopiarLink) {
        btnCopiarLink.addEventListener('click', () => {
            const referralCode = localStorage.getItem('referralCode');
            const link = `https://uguimar.com/registro?ref=${referralCode}`;
            copyToClipboard(link);
            showModal('¡Link Copiado!', 'El link de invitación ha sido copiado al portapapeles.');
        });
    }

    if (btnCopiarMensaje) {
        btnCopiarMensaje.addEventListener('click', () => {
            const mensaje = document.getElementById('mensaje-referido').value;
            copyToClipboard(mensaje);
            showModal('¡Mensaje Copiado!', 'El mensaje de invitación ha sido copiado al portapapeles.');
            cerrarModalCompartir();
        });
    }

    // ==================== BOTONES DE ACCIÓN ====================
    if (btnVerCursos) {
        btnVerCursos.addEventListener('click', () => {
            window.location.href = 'inicioj.html';
        });
    }

    if (btnEstudiarHoy) {
        btnEstudiarHoy.addEventListener('click', () => {
            // Incrementar racha
            const promoProgress = JSON.parse(localStorage.getItem('promoProgress')) || {
                referidos: 1,
                cursosCompletados: 2,
                diasRacha: 18
            };

            promoProgress.diasRacha = Math.min(promoProgress.diasRacha + 1, 30);
            localStorage.setItem('promoProgress', JSON.stringify(promoProgress));

            // Verificar si completó el desafío
            if (promoProgress.diasRacha >= 30) {
                showModal('🎉 ¡Felicidades!', '¡Has completado el desafío de 30 días! Tu mes Premium gratis ha sido activado.');
            } else {
                showModal('🔥 ¡Bien hecho!', `¡Has mantenido tu racha! Llevas ${promoProgress.diasRacha} días consecutivos.`);
            }

            // Redirigir a cursos después de cerrar modal
            setTimeout(() => {
                window.location.href = 'inicioj.html';
            }, 2500);
        });
    }

    // ==================== FAQ ACCORDION ====================
    faqItems.forEach(item => {
        const pregunta = item.querySelector('.faq-pregunta');
        pregunta.addEventListener('click', () => {
            // Cerrar otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('abierto');
                }
            });
            // Toggle actual
            item.classList.toggle('abierto');
        });
    });

    // ==================== MODALES ====================
    function showModal(titulo, mensaje) {
        const modalTitulo = document.getElementById('modal-titulo');
        const modalMensaje = document.getElementById('modal-mensaje');

        if (modalTitulo) modalTitulo.textContent = titulo;
        if (modalMensaje) modalMensaje.textContent = mensaje;
        if (modalExito) modalExito.classList.add('active');
    }

    window.cerrarModal = function () {
        if (modalExito) modalExito.classList.remove('active');
    };

    window.cerrarModalCompartir = function () {
        if (modalCompartir) modalCompartir.classList.remove('active');
    };

    // Cerrar modal al hacer clic fuera
    [modalExito, modalCompartir].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    });

    // ==================== SIMULAR DATOS DINÁMICOS ====================
    function simulateData() {
        // Simular días restantes de promoción
        const diasRestantes = document.getElementById('dias-restantes');
        if (diasRestantes) {
            const fechaFin = new Date();
            fechaFin.setDate(fechaFin.getDate() + 15);
            const hoy = new Date();
            const diff = Math.ceil((fechaFin - hoy) / (1000 * 60 * 60 * 24));
            diasRestantes.textContent = diff;
        }

        // Simular usuarios participando
        const usuarios = document.getElementById('usuarios-participando');
        if (usuarios) {
            const base = 2847;
            const variacion = Math.floor(Math.random() * 50);
            usuarios.textContent = (base + variacion).toLocaleString();
        }
    }

    // ==================== MENÚ MÓVIL ====================
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // ==================== VERIFICAR PREMIO COMPLETADO ====================
    function checkRewards() {
        const promoProgress = JSON.parse(localStorage.getItem('promoProgress')) || {
            referidos: 1,
            cursosCompletados: 2,
            diasRacha: 18
        };

        let premioGanado = false;
        let tituloPremio = '';
        let mensajePremio = '';

        if (promoProgress.referidos >= 3 && !localStorage.getItem('premio_referidos')) {
            premioGanado = true;
            tituloPremio = '🎉 ¡Felicidades!';
            mensajePremio = '¡Has invitado a 3 amigos! Tu mes Premium gratis ha sido activado.';
            localStorage.setItem('premio_referidos', 'true');
        }

        if (promoProgress.cursosCompletados >= 5 && !localStorage.getItem('premio_cursos')) {
            premioGanado = true;
            tituloPremio = '🎉 ¡Increíble!';
            mensajePremio = '¡Has completado 5 cursos! Tu mes Premium gratis ha sido activado.';
            localStorage.setItem('premio_cursos', 'true');
        }

        if (promoProgress.diasRacha >= 30 && !localStorage.getItem('premio_racha')) {
            premioGanado = true;
            tituloPremio = '🔥 ¡Legendario!';
            mensajePremio = '¡30 días de racha! Tu mes Premium gratis ha sido activado.';
            localStorage.setItem('premio_racha', 'true');
        }

        if (premioGanado) {
            setTimeout(() => {
                showModal(tituloPremio, mensajePremio);
            }, 1000);
        }
    }

    // ==================== INICIAR ====================
    init();
    simulateData();
    checkRewards();

    console.log('Página de promoción cargada correctamente');
});
