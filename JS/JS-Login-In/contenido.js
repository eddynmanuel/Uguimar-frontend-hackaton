// Datos de módulos con recursos y transcripción
const MODULOS_DATA = {
    1: {
        nombre: 'Introducción a HTML',
        curso: 'Frontend Developer',
        video: 'https://www.youtube.com/embed/pQN-pnXPaVg',
        instructor: 'Ana García',
        recursos: [
            { nombre: 'Guía HTML Básico.pdf', url: 'https://www.ecci.edu.co/wp-content/uploads/2022/02/Fundamentos-de-Programacion-Web-version-1.0-EDITORIAL-ECCI.pdf' },
            { nombre: 'Ejercicios HTML.pdf', url: 'https://dialnet.unirioja.es/descarga/libro/933116.pdf' }
        ],
        transcripcion: 'Bienvenidos al curso de HTML. En esta clase aprenderemos los fundamentos de HTML, el lenguaje de marcado que estructura el contenido de las páginas web. HTML significa HyperText Markup Language y es la base de toda página web.'
    },
    2: {
        nombre: 'Estructura de documentos HTML',
        curso: 'Frontend Developer',
        video: 'https://www.youtube.com/embed/pQN-pnXPaVg',
        instructor: 'Ana García',
        recursos: [
            { nombre: 'Estructura HTML.pdf', url: 'https://rua.ua.es/dspace/bitstream/10045/25978/1/Desarrollo%20web.pdf' }
        ],
        transcripcion: 'En esta clase veremos cómo estructurar un documento HTML correctamente. Aprenderemos sobre las etiquetas DOCTYPE, html, head y body, y cómo organizar el contenido de manera semántica.'
    },
    3: {
        nombre: 'CSS Básico y Selectores',
        curso: 'Frontend Developer',
        video: 'https://www.youtube.com/embed/1PnVor36_40',
        instructor: 'Carlos López',
        recursos: [
            { nombre: 'Guía CSS.pdf', url: 'https://www.ecci.edu.co/wp-content/uploads/2022/02/Fundamentos-de-Programacion-Web-version-1.0-EDITORIAL-ECCI.pdf' },
            { nombre: 'Selectores CSS.pdf', url: 'https://dialnet.unirioja.es/descarga/libro/933116.pdf' }
        ],
        transcripcion: 'CSS o Cascading Style Sheets es el lenguaje que usamos para dar estilo a nuestras páginas web. En esta clase aprenderemos los selectores básicos: de elemento, de clase y de ID.'
    },
    4: {
        nombre: 'CSS Avanzado y Flexbox',
        curso: 'Frontend Developer',
        video: 'https://www.youtube.com/embed/1PnVor36_40',
        instructor: 'Carlos López',
        recursos: [
            { nombre: 'Flexbox Guide.pdf', url: 'https://rua.ua.es/dspace/bitstream/10045/25978/1/Desarrollo%20web.pdf' }
        ],
        transcripcion: 'Flexbox es un modelo de diseño CSS que nos permite crear layouts flexibles y responsivos de manera sencilla. Aprenderemos sobre contenedores flex, justify-content, align-items y más.'
    },
    5: {
        nombre: 'CSS Grid y Responsive Design',
        curso: 'Frontend Developer',
        video: 'https://www.youtube.com/embed/1PnVor36_40',
        instructor: 'Carlos López',
        recursos: [
            { nombre: 'CSS Grid.pdf', url: 'https://www.ecci.edu.co/wp-content/uploads/2022/02/Fundamentos-de-Programacion-Web-version-1.0-EDITORIAL-ECCI.pdf' }
        ],
        transcripcion: 'CSS Grid es un sistema de diseño bidimensional que nos permite crear layouts complejos. Combinado con media queries, podemos crear diseños completamente responsivos.'
    },
    6: {
        nombre: 'JavaScript: Variables y Tipos',
        curso: 'Frontend Developer',
        video: 'https://www.youtube.com/embed/RqQ1d1qEWlE',
        instructor: 'Juan Martínez',
        recursos: [
            { nombre: 'Intro JavaScript.pdf', url: 'https://dialnet.unirioja.es/descarga/libro/933116.pdf' }
        ],
        transcripcion: 'JavaScript es el lenguaje de programación de la web. En esta clase aprenderemos sobre variables, tipos de datos primitivos como strings, numbers, booleans, null y undefined.'
    },
    7: {
        nombre: 'JavaScript: Funciones y Scope',
        curso: 'Frontend Developer',
        video: 'https://www.youtube.com/embed/RqQ1d1qEWlE',
        instructor: 'Juan Martínez',
        recursos: [
            { nombre: 'Funciones JS.pdf', url: 'https://rua.ua.es/dspace/bitstream/10045/25978/1/Desarrollo%20web.pdf' }
        ],
        transcripcion: 'Las funciones son bloques de código reutilizables. Aprenderemos sobre declaración de funciones, arrow functions, parámetros, return y el concepto de scope.'
    },
    8: {
        nombre: 'JavaScript: DOM y Eventos',
        curso: 'Frontend Developer',
        video: 'https://www.youtube.com/embed/RqQ1d1qEWlE',
        instructor: 'Juan Martínez',
        recursos: [
            { nombre: 'DOM Manipulation.pdf', url: 'https://www.ecci.edu.co/wp-content/uploads/2022/02/Fundamentos-de-Programacion-Web-version-1.0-EDITORIAL-ECCI.pdf' }
        ],
        transcripcion: 'El DOM (Document Object Model) es la representación del HTML que JavaScript puede manipular. Aprenderemos a seleccionar elementos, modificarlos y manejar eventos del usuario.'
    },
    9: {
        nombre: 'JavaScript: Async y Promises',
        curso: 'Frontend Developer',
        video: 'https://www.youtube.com/embed/RqQ1d1qEWlE',
        instructor: 'Juan Martínez',
        recursos: [
            { nombre: 'Async JavaScript.pdf', url: 'https://dialnet.unirioja.es/descarga/libro/933116.pdf' }
        ],
        transcripcion: 'La programación asíncrona es fundamental en JavaScript. Aprenderemos sobre callbacks, promesas, async/await y cómo manejar operaciones que toman tiempo.'
    },
    10: {
        nombre: 'Proyecto Final Frontend',
        curso: 'Frontend Developer',
        video: 'https://www.youtube.com/embed/RqQ1d1qEWlE',
        instructor: 'Ana García',
        recursos: [
            { nombre: 'Requisitos Proyecto.pdf', url: 'https://rua.ua.es/dspace/bitstream/10045/25978/1/Desarrollo%20web.pdf' },
            { nombre: 'Guía de Entrega.pdf', url: 'https://www.ecci.edu.co/wp-content/uploads/2022/02/Fundamentos-de-Programacion-Web-version-1.0-EDITORIAL-ECCI.pdf' }
        ],
        transcripcion: 'En este proyecto final aplicarás todo lo aprendido. Crearás una aplicación web completa utilizando HTML, CSS y JavaScript con diseño responsivo.'
    },
    11: {
        nombre: 'Introducción a Node.js',
        curso: 'Backend Developer',
        video: 'https://www.youtube.com/embed/i3OdKwuBu9M',
        instructor: 'Pedro Ruiz',
        recursos: [
            { nombre: 'Intro Node.js.pdf', url: 'https://dialnet.unirioja.es/descarga/libro/933116.pdf' }
        ],
        transcripcion: 'Node.js es un entorno de ejecución de JavaScript en el servidor. En esta clase aprenderemos qué es Node.js, cómo instalarlo y ejecutar nuestros primeros scripts.'
    },
    12: {
        nombre: 'NPM y Gestión de Paquetes',
        curso: 'Backend Developer',
        video: 'https://www.youtube.com/embed/i3OdKwuBu9M',
        instructor: 'Pedro Ruiz',
        recursos: [
            { nombre: 'NPM Guide.pdf', url: 'https://rua.ua.es/dspace/bitstream/10045/25978/1/Desarrollo%20web.pdf' }
        ],
        transcripcion: 'NPM es el gestor de paquetes de Node.js. Aprenderemos a inicializar proyectos, instalar dependencias, y manejar el package.json.'
    },
    13: {
        nombre: 'Express Framework Básico',
        curso: 'Backend Developer',
        video: 'https://www.youtube.com/embed/i3OdKwuBu9M',
        instructor: 'Pedro Ruiz',
        recursos: [
            { nombre: 'Express Basics.pdf', url: 'https://www.ecci.edu.co/wp-content/uploads/2022/02/Fundamentos-de-Programacion-Web-version-1.0-EDITORIAL-ECCI.pdf' }
        ],
        transcripcion: 'Express es el framework más popular para crear servidores web con Node.js. Aprenderemos a crear un servidor básico, manejar rutas y enviar respuestas.'
    },
    14: {
        nombre: 'Rutas y Middlewares',
        curso: 'Backend Developer',
        video: 'https://www.youtube.com/embed/i3OdKwuBu9M',
        instructor: 'Pedro Ruiz',
        recursos: [
            { nombre: 'Middlewares Express.pdf', url: 'https://dialnet.unirioja.es/descarga/libro/933116.pdf' }
        ],
        transcripcion: 'Los middlewares son funciones que procesan las peticiones antes de llegar al manejador final. Aprenderemos a crear middlewares personalizados y usar los de terceros.'
    },
    15: {
        nombre: 'APIs RESTful',
        curso: 'Backend Developer',
        video: 'https://www.youtube.com/embed/i3OdKwuBu9M',
        instructor: 'Pedro Ruiz',
        recursos: [
            { nombre: 'REST API Design.pdf', url: 'https://rua.ua.es/dspace/bitstream/10045/25978/1/Desarrollo%20web.pdf' }
        ],
        transcripcion: 'REST es un estilo de arquitectura para diseñar APIs. Aprenderemos los principios REST, métodos HTTP, códigos de estado y cómo diseñar APIs escalables.'
    }
};

// Obtener el ID del módulo actual desde la URL
let currentModuloId = null;

// Función para cargar los datos del curso y módulo desde la URL
function loadCourseDataFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const moduloId = urlParams.get('modulo_id');
    const videoUrl = urlParams.get('videoUrl');
    const cursoNombre = urlParams.get('cursoNombre');
    const instructor = urlParams.get('instructor');
    const valoracion = urlParams.get('valoracion');
    const fromCurso = urlParams.get('fromCurso');

    currentModuloId = moduloId ? parseInt(moduloId) : null;

    const cursoTitulo = document.getElementById('curso-titulo');
    const moduloTitulo = document.getElementById('modulo-titulo');
    const instructorNombre = document.getElementById('instructor-nombre');
    const videoPlayer = document.querySelector('.video-container iframe');
    const videoNavigation = document.querySelector('.video-navigation');

    // Si viene de un módulo específico
    if (currentModuloId && MODULOS_DATA[currentModuloId]) {
        const modulo = MODULOS_DATA[currentModuloId];

        if (cursoTitulo) cursoTitulo.textContent = modulo.curso;
        if (moduloTitulo) moduloTitulo.textContent = modulo.nombre;
        if (instructorNombre) instructorNombre.textContent = modulo.instructor;
        if (videoPlayer) videoPlayer.src = modulo.video;

        // Cargar recursos
        cargarRecursos(modulo.recursos);

        // Cargar transcripción
        cargarTranscripcion(modulo.transcripcion);

        document.title = `UGuimar - ${modulo.nombre}`;

        // Actualizar estado de botones de navegación
        actualizarBotonesNavegacion();
    }
    // Si viene de cursos destacados o recomendados (fromCurso=true)
    else if (fromCurso === 'true' && videoUrl) {
        // Ocultar botones de navegación para cursos destacados/recomendados
        if (videoNavigation) {
            videoNavigation.style.display = 'none';
        }

        if (videoPlayer) {
            if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                let videoId = '';
                if (videoUrl.includes('youtube.com/watch?v=')) {
                    videoId = videoUrl.split('v=')[1].split('&')[0];
                } else if (videoUrl.includes('youtu.be/')) {
                    videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
                }
                videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
            } else {
                videoPlayer.src = videoUrl;
            }
        }

        // Mostrar nombre del curso
        if (cursoNombre && cursoTitulo) {
            cursoTitulo.textContent = decodeURIComponent(cursoNombre);
        } else if (cursoTitulo) {
            cursoTitulo.textContent = 'Curso';
        }

        // Mostrar nombre del instructor
        if (instructor && instructorNombre) {
            instructorNombre.textContent = decodeURIComponent(instructor);
        }

        // Mostrar valoración en el título del módulo
        if (valoracion && moduloTitulo) {
            moduloTitulo.innerHTML = `<span class="valoracion-curso"><i class="fas fa-star" style="color: #ffc107;"></i> ${valoracion}</span>`;
        }

        document.title = cursoNombre ? `UGuimar - ${decodeURIComponent(cursoNombre)}` : 'UGuimar - Curso';
    }
    // Si viene con un videoUrl sin fromCurso (compatibilidad hacia atrás)
    else if (videoUrl) {
        if (videoPlayer) {
            if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                let videoId = '';
                if (videoUrl.includes('youtube.com/watch?v=')) {
                    videoId = videoUrl.split('v=')[1].split('&')[0];
                } else if (videoUrl.includes('youtu.be/')) {
                    videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
                }
                videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
            } else {
                videoPlayer.src = videoUrl;
            }
        }

        if (cursoNombre && cursoTitulo) {
            cursoTitulo.textContent = decodeURIComponent(cursoNombre);
        } else if (cursoTitulo) {
            cursoTitulo.textContent = 'Curso';
        }
    }
    // Valores por defecto
    else {
        if (cursoTitulo) cursoTitulo.textContent = 'Bienvenido al Curso';
        if (moduloTitulo) moduloTitulo.textContent = 'Selecciona un módulo para comenzar';
    }
}

// Función para cargar recursos dinámicamente
function cargarRecursos(recursos) {
    const resourcesList = document.querySelector('.resource-list');
    if (!resourcesList) return;

    resourcesList.innerHTML = '';

    if (recursos && recursos.length > 0) {
        recursos.forEach(recurso => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${recurso.url}" target="_blank"><i class="fas fa-file-pdf"></i> ${recurso.nombre}</a>`;
            resourcesList.appendChild(li);
        });
    } else {
        resourcesList.innerHTML = '<li>No hay recursos disponibles para esta clase.</li>';
    }
}

// Función para cargar transcripción
function cargarTranscripcion(transcripcion) {
    const transcriptionDiv = document.getElementById('transcription');
    if (!transcriptionDiv) return;

    if (transcripcion) {
        transcriptionDiv.innerHTML = `<p>${transcripcion}</p>`;
    } else {
        transcriptionDiv.innerHTML = '<p>La transcripción de este video no está disponible en este momento.</p>';
    }
}

// Función para actualizar botones de navegación
function actualizarBotonesNavegacion() {
    const prevButton = document.querySelector('.previous-class');
    const nextButton = document.querySelector('.next-class');

    if (!currentModuloId) return;

    const moduloIds = Object.keys(MODULOS_DATA).map(Number).sort((a, b) => a - b);
    const currentIndex = moduloIds.indexOf(currentModuloId);

    // Actualizar botón anterior
    if (prevButton) {
        if (currentIndex <= 0) {
            prevButton.disabled = true;
            prevButton.style.opacity = '0.5';
            prevButton.style.cursor = 'not-allowed';
        } else {
            prevButton.disabled = false;
            prevButton.style.opacity = '1';
            prevButton.style.cursor = 'pointer';
        }
    }

    // Actualizar botón siguiente
    if (nextButton) {
        if (currentIndex >= moduloIds.length - 1) {
            nextButton.disabled = true;
            nextButton.style.opacity = '0.5';
            nextButton.style.cursor = 'not-allowed';
        } else {
            nextButton.disabled = false;
            nextButton.style.opacity = '1';
            nextButton.style.cursor = 'pointer';
        }
    }
}

// Función para ir al módulo anterior
function irModuloAnterior() {
    if (!currentModuloId) return;

    const moduloIds = Object.keys(MODULOS_DATA).map(Number).sort((a, b) => a - b);
    const currentIndex = moduloIds.indexOf(currentModuloId);

    if (currentIndex > 0) {
        const prevModuloId = moduloIds[currentIndex - 1];
        window.location.href = `contenido.html?modulo_id=${prevModuloId}`;
    }
}

// Función para ir al módulo siguiente
function irModuloSiguiente() {
    if (!currentModuloId) return;

    const moduloIds = Object.keys(MODULOS_DATA).map(Number).sort((a, b) => a - b);
    const currentIndex = moduloIds.indexOf(currentModuloId);

    if (currentIndex < moduloIds.length - 1) {
        const nextModuloId = moduloIds[currentIndex + 1];
        window.location.href = `contenido.html?modulo_id=${nextModuloId}`;
    }
}

// Función para manejar las pestañas
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remover clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Agregar clase active al botón y contenido seleccionado
            button.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Función para agregar reacciones a los comentarios
function addReaction(type, questionId) {
    const countElement = document.getElementById(`${type}-count-${questionId}`);
    if (countElement) {
        let count = parseInt(countElement.innerText);
        count++;
        countElement.innerText = count;
    }
}

// Función para enviar un comentario
function postComment() {
    const commentInput = document.getElementById("questionInput");
    const questionsContainer = document.getElementById("questionList");

    if (commentInput && questionsContainer) {
        const commentText = commentInput.value.trim();
        if (commentText === "") {
            alert("Por favor escribe un comentario.");
            return;
        }

        const commentId = Date.now();
        const newComment = document.createElement("div");
        newComment.classList.add("question");
        newComment.innerHTML = `
            <p><strong>Tú:</strong> ${commentText}</p>
            <div class="reaction-buttons">
                <button class="reaction-btn" onclick="addReaction('like', '${commentId}')">👍</button>
                <span class="reaction-count" id="like-count-${commentId}">0</span>
                <button class="reaction-btn" onclick="addReaction('love', '${commentId}')">❤️</button>
                <span class="reaction-count" id="love-count-${commentId}">0</span>
            </div>
        `;
        questionsContainer.appendChild(newComment);
        commentInput.value = "";
    }
}

// Función para actualizar el nombre de usuario
function updateUserName() {
    const userNameElement = document.getElementById('userName');
    const userName = localStorage.getItem('userName');
    if (userNameElement && userName) {
        userNameElement.textContent = userName;
    }
}

// Función para manejar el modal del examen
function initExamModal() {
    const examButton = document.getElementById('examButton');
    const examModal = document.getElementById('examModal');
    const startExamBtn = document.getElementById('startExam');
    const cancelExamBtn = document.getElementById('cancelExam');

    if (examButton) {
        examButton.addEventListener('click', () => {
            if (examModal) examModal.style.display = 'block';
        });
    }

    if (startExamBtn) {
        startExamBtn.addEventListener('click', () => {
            window.location.href = 'examen.html';
        });
    }

    if (cancelExamBtn) {
        cancelExamBtn.addEventListener('click', () => {
            if (examModal) examModal.style.display = 'none';
        });
    }

    // Cerrar modal al hacer clic fuera
    if (examModal) {
        examModal.addEventListener('click', (e) => {
            if (e.target === examModal) {
                examModal.style.display = 'none';
            }
        });
    }
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    loadCourseDataFromUrl();
    updateUserName();
    initTabs();
    initExamModal();

    // Eventos de navegación entre clases
    const prevButton = document.querySelector('.previous-class');
    const nextButton = document.querySelector('.next-class');

    if (prevButton) {
        prevButton.addEventListener('click', irModuloAnterior);
    }

    if (nextButton) {
        nextButton.addEventListener('click', irModuloSiguiente);
    }

    // Evento para comentarios con Enter
    const commentInput = document.getElementById("questionInput");
    if (commentInput) {
        commentInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                postComment();
            }
        });
    }

    // Toggle menú perfil
    const profileToggle = document.getElementById('profile-toggle');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            profileDropdown.classList.remove('active');
        });
    }

    // Toggle menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Carrito
    const carritoToggle = document.getElementById('carrito-toggle');
    if (carritoToggle) {
        carritoToggle.addEventListener('click', () => {
            window.location.href = 'carrito.html';
        });
    }

    // Actualizar contador carrito
    const contadorCarrito = document.getElementById('contador-carrito');
    if (contadorCarrito) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    // Función para cargar avatar desde localStorage
    function loadAvatarFromStorage() {
        const savedAvatar = localStorage.getItem('userAvatar');
        const userName = localStorage.getItem('userName') || 'Usuario';
        const inicial = userName.charAt(0).toUpperCase();

        const avatarImgHeader = document.getElementById('avatar-img-header');
        const avatarInicialHeader = document.getElementById('avatar-inicial-header');
        const userNameElement = document.getElementById('userName');

        // Actualizar nombre
        if (userNameElement) {
            userNameElement.textContent = userName;
        }

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

    loadAvatarFromStorage();
});
