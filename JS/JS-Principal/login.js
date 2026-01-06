const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// Registro de usuario
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());

        // Validación básica del lado del cliente
        if (!userData.nombre || !userData.apellido || !userData.fecha_nacimiento || 
            !userData.telefono || !userData.correo || !userData.contrasena) {
            alert('Por favor, complete todos los campos obligatorios');
            return;
        }

        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso');
            // Limpiar el formulario
            e.target.reset();
            // Cambiar a la vista de inicio de sesión
            container.classList.remove("sign-up-mode");
        } else {
            mostrarError(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarError('Error al procesar la solicitud. Por favor, intente nuevamente.');
    }
});

// Inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const loginData = {
            email: document.getElementById('login-email').value,
            contrasena: document.getElementById('login-password').value
        };

        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        if (response.ok && data.success) {
            // Guardar información del usuario en localStorage
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userName', data.nombre);
            localStorage.setItem('userLastName', data.apellido);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userRole', data.rol);

            alert(`Bienvenido, ${data.nombre} ${data.apellido}!`);
            window.location.href = '/HTML/Login-In/inicioj.html';
        } else {
            if (response.status === 401) {
                mostrarError('Credenciales inválidas. Por favor, verifique su email y contraseña.');
            } else if (response.status === 403) {
                mostrarError('Acceso denegado. No tiene permisos de estudiante.');
            } else {
                mostrarError(data.error || 'Error al iniciar sesión');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarError('Error al procesar la solicitud. Por favor, intente nuevamente.');
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
