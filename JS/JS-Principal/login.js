const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// Registro de usuario (simulado con localStorage)
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    // Validación básica del lado del cliente
    if (!userData.nombre || !userData.apellido || !userData.fecha_nacimiento ||
        !userData.telefono || !userData.correo || !userData.contrasena) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
    }

    // Simular registro guardando en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si el correo ya existe
    if (usuarios.find(u => u.correo === userData.correo)) {
        mostrarError('Este correo electrónico ya está registrado');
        return;
    }

    // Generar un ID único
    userData.id = Date.now().toString();
    userData.rol = 'estudiante';

    usuarios.push(userData);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Registro exitoso');
    e.target.reset();
    container.classList.remove("sign-up-mode");
});

// Inicio de sesión (simulado con localStorage)
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const loginData = {
        email: document.getElementById('login-email').value,
        contrasena: document.getElementById('login-password').value
    };

    // Buscar usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u =>
        u.correo === loginData.email && u.contrasena === loginData.contrasena
    );

    if (usuario) {
        // Guardar información del usuario en localStorage
        localStorage.setItem('userId', usuario.id);
        localStorage.setItem('userName', usuario.nombre);
        localStorage.setItem('userLastName', usuario.apellido);
        localStorage.setItem('userEmail', usuario.correo);
        localStorage.setItem('userRole', usuario.rol);

        alert(`Bienvenido, ${usuario.nombre} ${usuario.apellido}!`);
        window.location.href = '../Login-In/inicioj.html';
    } else {
        mostrarError('Credenciales inválidas. Por favor, verifique su email y contraseña.');
    }
});

function mostrarError(mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = mensaje;

    const form = document.querySelector('.sign-in-form');
    form.insertBefore(errorDiv, form.firstChild);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}
