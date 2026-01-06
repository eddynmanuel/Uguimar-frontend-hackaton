function submitExam() {
    const answers = {
        question1: document.querySelector('input[name="question1"]:checked'),
        question2: document.querySelector('input[name="question2"]:checked'),
        question3: document.querySelector('input[name="question3"]:checked')
    };

    if (!answers.question1 || !answers.question2 || !answers.question3) {
        alert("Por favor, responde todas las preguntas antes de enviar.");
        return;
    }

    // Lógica de evaluación (si es necesario)
    const score = (answers.question1.value === "c" ? 1 : 0) +
                  (answers.question2.value === "c" ? 1 : 0) +
                  (answers.question3.value === "b" ? 1 : 0);

    // Mostrar el modal de felicitaciones al terminar
    document.getElementById("congratulationsModal").style.display = "block";
}

function closeModal() {
    document.getElementById("congratulationsModal").style.display = "none";
}
