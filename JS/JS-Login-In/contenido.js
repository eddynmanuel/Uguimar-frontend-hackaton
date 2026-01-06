// Función para cargar el video, el título del curso y los recursos desde la URL
function loadCourseDataFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('videoUrl');
    const cursoNombre = urlParams.get('cursoNombre');
    const cursoId = urlParams.get('cursoId');
    
    if (videoUrl) {
        const videoPlayer = document.getElementById('video-player');
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            let videoId = '';
            if (videoUrl.includes('youtube.com/watch?v=')) {
                videoId = videoUrl.split('v=')[1].split('&')[0];
            } else if (videoUrl.includes('youtu.be/')) {
                videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
            }
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            videoPlayer.src = embedUrl;
        } else {
            videoPlayer.src = videoUrl;
        }
    }
    
    if (cursoNombre) {
        const cursoTitulo = document.getElementById('curso-titulo');
        if (cursoTitulo) {
            cursoTitulo.textContent = decodeURIComponent(cursoNombre);
        }
    }

    if (cursoId) {
        fetchCursoRecursos(cursoId);
    }
}

// Función para obtener los recursos del curso
function fetchCursoRecursos(cursoId) {
    fetch(`/api/curso-recurso/${cursoId}`)
        .then(response => response.json())
        .then(data => {
            if (data.recursoUrl) {
                const btnRecursos = document.getElementById('btn-recursos');
                btnRecursos.onclick = function() {
                    window.open(data.recursoUrl, '_blank');
                };
                btnRecursos.disabled = false;
            } else {
                console.error('No se encontró la URL del recurso');
            }
        })
        .catch(error => console.error('Error fetching curso recursos:', error));
}

// Variables para progreso y clase actual
let currentProgress = 0;
const totalClasses = 10;
const progressBar = document.getElementById("progress-header");
const progressPercentage = document.getElementById("progress-percentage");
const nextClassButton = document.getElementById("next-class-btn");

// Función para actualizar el progreso del curso
function updateProgress() {
    if (currentProgress < totalClasses) {
        currentProgress++;
        const progress = Math.round((currentProgress / totalClasses) * 100);
        progressBar.style.width = `${progress}%`;
        progressPercentage.innerText = `${progress}%`;
    } else {
        alert("¡Has completado todas las clases!");
    }
}

// Evento para el botón "Siguiente Clase"
if (nextClassButton) {
    nextClassButton.addEventListener("click", updateProgress);
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
const commentInput = document.querySelector(".input-question");
const questionsContainer = document.querySelector(".questions");

function postComment() {
    if (commentInput && questionsContainer) {
        const commentText = commentInput.value.trim();
        if (commentText === "") {
            alert("Por favor escribe un comentario.");
            return;
        }

        const newComment = document.createElement("div");
        newComment.classList.add("question");
        newComment.innerHTML = `
            <p><strong>Tú:</strong> ${commentText}</p>
            <div class="reaction-buttons">
                <button class="reaction-btn" onclick="addReaction('like', 'new')">👍</button>
                <span class="reaction-count" id="like-count-new">0</span>
                <button class="reaction-btn" onclick="addReaction('love', 'new')">❤️</button>
                <span class="reaction-count" id="love-count-new">0</span>
            </div>
        `;
        questionsContainer.appendChild(newComment);
        commentInput.value = "";
    }
}

// Evento para enviar comentario con la tecla Enter
if (commentInput) {
    commentInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            postComment();
        }
    });
}

// Función para actualizar el nombre de usuario
function updateUserName() {
    const userNameElement = document.getElementById('userName');
    const userName = localStorage.getItem('userName');
    if (userNameElement && userName) {
        userNameElement.textContent = userName;
    }
}

// Evento para el botón de recursos
const btnRecursos = document.getElementById('btn-recursos');
if (btnRecursos) {
    btnRecursos.addEventListener('click', (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const cursoId = urlParams.get('cursoId');
        if (cursoId) {
            fetchCursoRecursos(cursoId);
        } else {
            console.error('No se encontró el ID del curso');
        }
    });
}

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
    loadCourseDataFromUrl();
    updateUserName();
});

// Inicializar el botón de recursos como deshabilitado
document.addEventListener('DOMContentLoaded', function() {
    const btnRecursos = document.getElementById('btn-recursos');
    if (btnRecursos) {
        btnRecursos.disabled = true;
    }
});








