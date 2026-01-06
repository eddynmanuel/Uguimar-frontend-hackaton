document.addEventListener("DOMContentLoaded", () => {
    const certificateForm = document.getElementById("generateCertificateForm");
    const courseSelector = document.getElementById("courseName");
    const previewContainer = document.getElementById("previewContainer");
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    // Simulación de cursos almacenados (puedes adaptarlo para que se carguen desde tu sistema)
    const courses = ["JavaScript Básico", "HTML Avanzado", "CSS para Principiantes", "Desarrollo Web Completo"];

    // Cargar cursos en el selector
    const loadCourses = () => {
        courses.forEach(course => {
            const option = document.createElement("option");
            option.value = course;
            option.textContent = course;
            courseSelector.appendChild(option);
        });
    };

    // Generar vista previa y PDF del certificado
    const generateCertificate = (name, course, date) => {
        const jsPDF = window.jspdf.jsPDF; // Asegúrate de incluir jsPDF en tu proyecto
        const doc = new jsPDF();

        // Contenido del certificado
        doc.setFont("times", "bold");
        doc.setFontSize(24);
        doc.text("Certificado de Reconocimiento", 105, 40, null, null, "center");

        doc.setFontSize(16);
        doc.text(`Se le otorga el presente certificado a: ${name}`, 105, 80, null, null, "center");
        doc.text(`Por culminar satisfactoriamente el curso:`, 105, 100, null, null, "justified");
        doc.text(course, 105, 120, null, null, "center");

        doc.setFont("times","normal");
        doc.text(`Fecha de Inicio: ${date}`, 105, 130, null, null, "center");

        doc.setFont("times", "normal");
        doc.text(`Fecha de finalización: ${date}`, 105, 160, null, null, "center");

        doc.setFontSize(12);
        doc.text("Firma del Instructor", 50, 200);
        doc.text("Firma del Administrador", 150, 200);

        // Generar vista previa
        previewContainer.innerHTML = '<p>Vista previa generada. Descarga el certificado para verlo completo.</p>';

        // Descargar el certificado como PDF
        doc.save(`Certificado_${name}.pdf`);
    };

    // Manejar el formulario de generación de certificados
    certificateForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const studentName = document.getElementById("studentName").value.trim();
        const courseName = document.getElementById("courseName").value;
        const completionDate = document.getElementById("completionDate").value;

        if (studentName && courseName && completionDate) {
            generateCertificate(studentName, courseName, completionDate);
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
// Add this at the end of the DOMContentLoaded event listener
function updateUserName() {
    const userNameElement = document.getElementById('userName');
    const userName = localStorage.getItem('userName');
    if (userName) {
        userNameElement.textContent = userName;
    }
  }
  
 

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



  // Call the function to update the user name
  updateUserName();
  
    // Cargar cursos al inicio
    loadCourses();
});
