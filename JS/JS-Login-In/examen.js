// Examen.js - Funcionalidad completa para el examen de admisión

// Datos simulados de preguntas del examen
const PREGUNTAS_EXAMEN = [
    {
        id: 1,
        pregunta: "¿Cuál es el lenguaje de programación más utilizado para el desarrollo web frontend?",
        opciones: [
            { value: "a", texto: "Python" },
            { value: "b", texto: "Java" },
            { value: "c", texto: "JavaScript" },
            { value: "d", texto: "C++" }
        ],
        respuestaCorrecta: "c"
    },
    {
        id: 2,
        pregunta: "¿Qué significa HTML?",
        opciones: [
            { value: "a", texto: "Hyper Text Markup Language" },
            { value: "b", texto: "High Tech Modern Language" },
            { value: "c", texto: "Home Tool Markup Language" },
            { value: "d", texto: "Hyperlink and Text Markup Language" }
        ],
        respuestaCorrecta: "a"
    },
    {
        id: 3,
        pregunta: "¿Cuál de estos NO es un sistema de control de versiones?",
        opciones: [
            { value: "a", texto: "Git" },
            { value: "b", texto: "Docker" },
            { value: "c", texto: "SVN" },
            { value: "d", texto: "Mercurial" }
        ],
        respuestaCorrecta: "b"
    }
];

let tiempoRestante = 600; // 10 minutos en segundos
let intervaloTiempo = null;

// Función para iniciar el temporizador
function iniciarTemporizador() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;

    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        timerElement.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            submitExam();
        }

        // Alerta cuando queden 2 minutos
        if (tiempoRestante === 120) {
            alert('¡Quedan 2 minutos para terminar el examen!');
        }
    }, 1000);
}

// Función para enviar el examen
function submitExam() {
    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
    }

    const answers = {
        question1: document.querySelector('input[name="question1"]:checked'),
        question2: document.querySelector('input[name="question2"]:checked'),
        question3: document.querySelector('input[name="question3"]:checked')
    };

    // Verificar que todas las preguntas estén respondidas
    const preguntasSinResponder = Object.entries(answers)
        .filter(([key, value]) => !value)
        .map(([key]) => key.replace('question', ''));

    if (preguntasSinResponder.length > 0) {
        const confirmar = confirm(`Tienes ${preguntasSinResponder.length} pregunta(s) sin responder. ¿Deseas enviar el examen de todos modos?`);
        if (!confirmar) {
            iniciarTemporizador();
            return;
        }
    }

    // Calcular puntuación
    let correctas = 0;
    const respuestasCorrectas = {
        question1: 'c',
        question2: 'a',
        question3: 'b'
    };

    Object.entries(answers).forEach(([pregunta, respuesta]) => {
        if (respuesta && respuesta.value === respuestasCorrectas[pregunta]) {
            correctas++;
        }
    });

    const totalPreguntas = Object.keys(respuestasCorrectas).length;
    const porcentaje = Math.round((correctas / totalPreguntas) * 100);
    const aprobado = porcentaje >= 60;

    // Guardar resultado en localStorage
    const resultado = {
        fecha: new Date().toISOString(),
        correctas: correctas,
        total: totalPreguntas,
        porcentaje: porcentaje,
        aprobado: aprobado
    };
    localStorage.setItem('resultadoExamen', JSON.stringify(resultado));

    // Mostrar resultado
    mostrarResultado(correctas, totalPreguntas, porcentaje, aprobado);
}

// Función para mostrar el resultado
function mostrarResultado(correctas, total, porcentaje, aprobado) {
    const modal = document.getElementById("congratulationsModal");
    const resultadoTexto = document.getElementById("resultado-texto");
    const puntajeTexto = document.getElementById("puntaje-texto");

    if (resultadoTexto) {
        resultadoTexto.textContent = aprobado
            ? "¡Felicitaciones! Has aprobado el examen."
            : "No has aprobado el examen. Puedes intentarlo de nuevo.";
    }

    if (puntajeTexto) {
        puntajeTexto.textContent = `Obtuviste ${correctas} de ${total} respuestas correctas (${porcentaje}%)`;
    }

    if (modal) {
        modal.style.display = "block";
    }
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById("congratulationsModal");
    if (modal) {
        modal.style.display = "none";
    }

    // Redirigir según el resultado
    const resultado = JSON.parse(localStorage.getItem('resultadoExamen'));
    if (resultado && resultado.aprobado) {
        window.location.href = 'inicioj.html';
    }
}

// Función para reiniciar el examen
function reiniciarExamen() {
    // Limpiar respuestas
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.checked = false;
    });

    // Reiniciar temporizador
    tiempoRestante = 600;
    closeModal();
    iniciarTemporizador();
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    // Iniciar temporizador si existe el elemento
    if (document.getElementById('timer')) {
        iniciarTemporizador();
    }

    // Agregar evento al botón de reiniciar si existe
    const btnReiniciar = document.getElementById('btn-reiniciar');
    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', reiniciarExamen);
    }
});
