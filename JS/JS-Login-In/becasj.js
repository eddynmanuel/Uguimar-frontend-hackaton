document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const carritoToggle = document.getElementById('carrito-toggle');
    const contadorCarrito = document.getElementById('contador-carrito');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    // Estado de la beca
    let estadoBeca = {
        cursosCompletados: [],
        examenAprobado: false,
        calificacionExamen: 0,
        documentosSubidos: {
            dni: false,
            expediente: false,
            justificacion: false,
            foto: false
        },
        solicitudEnviada: false
    };

    // Datos de cursos para beca
    const CURSOS_BECA = {
        curso1: {
            nombre: 'Introducción a la Programación',
            videoUrl: 'https://youtube.com/watch?v=pQN-pnXPaVg',
            instructor: 'Ana García'
        },
        curso2: {
            nombre: 'Fundamentos de Desarrollo Web',
            videoUrl: 'https://youtube.com/watch?v=1PnVor36_40',
            instructor: 'Carlos López'
        },
        curso3: {
            nombre: 'Lógica de Programación',
            videoUrl: 'https://youtube.com/watch?v=W6NZfCO5SIk',
            instructor: 'María García'
        }
    };

    // Preguntas del examen
    const PREGUNTAS_EXAMEN = [
        {
            pregunta: '¿Qué es una variable en programación?',
            opciones: [
                'Un tipo de bucle',
                'Un espacio en memoria para almacenar datos',
                'Una función matemática',
                'Un tipo de error'
            ],
            respuestaCorrecta: 1
        },
        {
            pregunta: '¿Cuál es el operador de asignación en la mayoría de lenguajes?',
            opciones: ['==', '=', '===', ':='],
            respuestaCorrecta: 1
        },
        {
            pregunta: '¿Qué significa HTML?',
            opciones: [
                'Hyper Text Markup Language',
                'High Tech Modern Language',
                'Home Tool Markup Language',
                'Hyper Tool Multi Language'
            ],
            respuestaCorrecta: 0
        },
        {
            pregunta: '¿Cuál de estos NO es un tipo de dato primitivo?',
            opciones: ['String', 'Number', 'Array', 'Boolean'],
            respuestaCorrecta: 2
        },
        {
            pregunta: '¿Qué estructura de control se usa para repetir código?',
            opciones: ['if', 'switch', 'for', 'try'],
            respuestaCorrecta: 2
        },
        {
            pregunta: '¿Cuál es la función de CSS?',
            opciones: [
                'Estructurar el contenido web',
                'Dar estilo y diseño a las páginas',
                'Agregar interactividad',
                'Conectar con bases de datos'
            ],
            respuestaCorrecta: 1
        },
        {
            pregunta: '¿Qué es una función en programación?',
            opciones: [
                'Un tipo de variable',
                'Un bloque de código reutilizable',
                'Un error del sistema',
                'Una base de datos'
            ],
            respuestaCorrecta: 1
        },
        {
            pregunta: '¿Qué es un algoritmo?',
            opciones: [
                'Un lenguaje de programación',
                'Una secuencia de pasos para resolver un problema',
                'Un tipo de computadora',
                'Un sistema operativo'
            ],
            respuestaCorrecta: 1
        },
        {
            pregunta: '¿Cuál es el resultado de 5 + 3 * 2?',
            opciones: ['16', '11', '13', '10'],
            respuestaCorrecta: 1
        },
        {
            pregunta: '¿Qué es JavaScript?',
            opciones: [
                'Un lenguaje de marcado',
                'Un lenguaje de estilos',
                'Un lenguaje de programación',
                'Un sistema operativo'
            ],
            respuestaCorrecta: 2
        }
    ];

    // Cargar estado guardado
    function cargarEstado() {
        const estadoGuardado = localStorage.getItem('estadoBeca');
        if (estadoGuardado) {
            estadoBeca = JSON.parse(estadoGuardado);
            actualizarUI();
        }
    }

    // Guardar estado
    function guardarEstado() {
        localStorage.setItem('estadoBeca', JSON.stringify(estadoBeca));
    }

    // Actualizar la interfaz según el estado
    function actualizarUI() {
        actualizarProgresoCursos();
        actualizarPasosBeca();
        actualizarEstadoExamen();
        actualizarSeccionDocumentos();

        if (estadoBeca.solicitudEnviada) {
            mostrarSeccionExito();
        }
    }

    // Actualizar progreso de cursos
    function actualizarProgresoCursos() {
        const totalCursos = 3;
        const completados = estadoBeca.cursosCompletados.length;
        const porcentaje = (completados / totalCursos) * 100;

        document.getElementById('progreso-cursos-fill').style.width = `${porcentaje}%`;
        document.getElementById('progreso-cursos-texto').textContent = `${completados} de ${totalCursos} cursos completados`;

        // Actualizar cada curso
        ['curso1', 'curso2', 'curso3'].forEach((cursoId, index) => {
            const estaCompletado = estadoBeca.cursosCompletados.includes(cursoId);
            const cursoAnterior = index === 0 ? null : `curso${index}`;
            const cursoAnteriorCompletado = cursoAnterior ? estadoBeca.cursosCompletados.includes(cursoAnterior) : true;

            const btnCurso = document.getElementById(`btn-${cursoId}`);
            const estadoCurso = document.getElementById(`estado-${cursoId}`);
            const progresoCurso = document.getElementById(`progreso-${cursoId}`);
            const progresoTexto = document.getElementById(`progreso-texto-${cursoId}`);

            if (estaCompletado) {
                btnCurso.innerHTML = '<i class="fas fa-check"></i> Completado';
                btnCurso.classList.remove('disabled');
                btnCurso.classList.add('completado');
                btnCurso.disabled = false;
                estadoCurso.innerHTML = '<i class="fas fa-check"></i>';
                estadoCurso.classList.remove('bloqueado', 'en-progreso');
                estadoCurso.classList.add('completado');
                progresoCurso.style.width = '100%';
                progresoTexto.textContent = '100%';
            } else if (cursoAnteriorCompletado) {
                btnCurso.innerHTML = '<i class="fas fa-play"></i> Iniciar Curso';
                btnCurso.classList.remove('disabled', 'completado');
                btnCurso.disabled = false;
                estadoCurso.innerHTML = '<i class="fas fa-play"></i>';
                estadoCurso.classList.remove('bloqueado', 'completado');
                estadoCurso.classList.add('en-progreso');
            } else {
                btnCurso.innerHTML = '<i class="fas fa-lock"></i> Bloqueado';
                btnCurso.classList.add('disabled');
                btnCurso.classList.remove('completado');
                btnCurso.disabled = true;
                estadoCurso.innerHTML = '<i class="fas fa-lock"></i>';
                estadoCurso.classList.add('bloqueado');
                estadoCurso.classList.remove('en-progreso', 'completado');
            }
        });
    }

    // Actualizar pasos de beca
    function actualizarPasosBeca() {
        const pasos = document.querySelectorAll('.paso');
        const lineas = document.querySelectorAll('.paso-linea');

        let pasoActual = 1;
        if (estadoBeca.cursosCompletados.length === 3) pasoActual = 2;
        if (estadoBeca.examenAprobado) pasoActual = 3;
        if (estadoBeca.solicitudEnviada) pasoActual = 4;

        pasos.forEach((paso, index) => {
            const numeroPaso = index + 1;
            paso.classList.remove('activo', 'completado');

            if (numeroPaso < pasoActual) {
                paso.classList.add('completado');
            } else if (numeroPaso === pasoActual) {
                paso.classList.add('activo');
            }
        });

        lineas.forEach((linea, index) => {
            if (index < pasoActual - 1) {
                linea.classList.add('completada');
            } else {
                linea.classList.remove('completada');
            }
        });
    }

    // Actualizar estado del examen
    function actualizarEstadoExamen() {
        const todosLosCursosCompletados = estadoBeca.cursosCompletados.length === 3;
        const btnExamen = document.getElementById('btn-iniciar-examen');
        const iconoExamen = document.getElementById('examen-icono');
        const tituloExamen = document.getElementById('examen-titulo');
        const descripcionExamen = document.getElementById('examen-descripcion');

        if (estadoBeca.examenAprobado) {
            btnExamen.innerHTML = `<i class="fas fa-check-circle"></i> Examen Aprobado (${estadoBeca.calificacionExamen}%)`;
            btnExamen.classList.remove('habilitado');
            btnExamen.classList.add('completado');
            btnExamen.disabled = true;
            btnExamen.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            iconoExamen.innerHTML = '<i class="fas fa-check"></i>';
            iconoExamen.classList.add('aprobado');
            iconoExamen.classList.remove('desbloqueado');
            tituloExamen.textContent = '¡Examen Aprobado!';
            descripcionExamen.textContent = `Felicitaciones, aprobaste con ${estadoBeca.calificacionExamen}%. Ahora puedes subir tus documentos.`;
        } else if (todosLosCursosCompletados) {
            btnExamen.innerHTML = '<i class="fas fa-clipboard-list"></i> Iniciar Examen';
            btnExamen.classList.add('habilitado');
            btnExamen.classList.remove('disabled');
            btnExamen.disabled = false;
            iconoExamen.innerHTML = '<i class="fas fa-clipboard-list"></i>';
            iconoExamen.classList.add('desbloqueado');
            tituloExamen.textContent = 'Examen Disponible';
            descripcionExamen.textContent = '¡Felicitaciones! Has completado todos los cursos. Ahora puedes realizar el examen de admisión.';
        } else {
            btnExamen.innerHTML = '<i class="fas fa-lock"></i> Examen Bloqueado';
            btnExamen.classList.remove('habilitado');
            btnExamen.classList.add('disabled');
            btnExamen.disabled = true;
            iconoExamen.innerHTML = '<i class="fas fa-lock"></i>';
            iconoExamen.classList.remove('desbloqueado', 'aprobado');
            tituloExamen.textContent = 'Examen Bloqueado';
            descripcionExamen.textContent = `Completa los ${3 - estadoBeca.cursosCompletados.length} cursos restantes para desbloquear el examen.`;
        }
    }

    // Actualizar sección de documentos
    function actualizarSeccionDocumentos() {
        const seccionDocumentos = document.getElementById('seccion-documentos');
        const overlay = document.getElementById('overlay-documentos');
        const btnEnviar = document.getElementById('btn-enviar-solicitud');

        if (estadoBeca.examenAprobado) {
            seccionDocumentos.classList.remove('bloqueado');
            overlay.classList.add('oculto');
        } else {
            seccionDocumentos.classList.add('bloqueado');
            overlay.classList.remove('oculto');
        }

        // Verificar si todos los documentos están subidos
        const todosLosDocumentos = Object.values(estadoBeca.documentosSubidos).every(v => v);
        if (todosLosDocumentos && estadoBeca.examenAprobado) {
            btnEnviar.classList.add('habilitado');
            btnEnviar.disabled = false;
        } else {
            btnEnviar.classList.remove('habilitado');
            btnEnviar.disabled = true;
        }
    }

    // Mostrar sección de éxito
    function mostrarSeccionExito() {
        document.getElementById('seccion-cursos').style.display = 'none';
        document.getElementById('seccion-examen').style.display = 'none';
        document.getElementById('seccion-documentos').style.display = 'none';
        document.getElementById('seccion-exito').classList.remove('oculto');
    }

    // Manejar clic en cursos
    function manejarClicCurso(cursoId) {
        if (estadoBeca.cursosCompletados.includes(cursoId)) {
            alert('¡Ya has completado este curso!');
            return;
        }

        const curso = CURSOS_BECA[cursoId];
        const confirmacion = confirm(`¿Deseas iniciar el curso "${curso.nombre}"?\n\nPara simular, el curso se marcará como completado.`);

        if (confirmacion) {
            estadoBeca.cursosCompletados.push(cursoId);
            guardarEstado();
            actualizarUI();

            if (estadoBeca.cursosCompletados.length === 3) {
                alert('¡Felicitaciones! Has completado todos los cursos previos. Ahora puedes realizar el examen de admisión.');
            }
        }
    }

    // Manejar examen
    function iniciarExamen() {
        if (estadoBeca.cursosCompletados.length < 3) {
            alert('Debes completar todos los cursos antes de realizar el examen.');
            return;
        }

        if (estadoBeca.examenAprobado) {
            alert('Ya has aprobado el examen.');
            return;
        }

        mostrarModalExamen();
    }

    // Mostrar modal de examen
    function mostrarModalExamen() {
        const modal = document.getElementById('modal-examen');
        const modalBody = document.getElementById('modal-examen-body');

        // Seleccionar preguntas aleatorias
        const preguntasExamen = PREGUNTAS_EXAMEN.sort(() => Math.random() - 0.5).slice(0, 5);

        let htmlExamen = `
            <div class="examen-contenedor">
                <div class="examen-timer">
                    <i class="fas fa-clock"></i>
                    <span id="tiempo-examen">15:00</span>
                </div>
                <form id="form-examen">
        `;

        preguntasExamen.forEach((pregunta, index) => {
            htmlExamen += `
                <div class="pregunta-card">
                    <h4>Pregunta ${index + 1}</h4>
                    <p>${pregunta.pregunta}</p>
                    <div class="opciones">
                        ${pregunta.opciones.map((opcion, opcionIndex) => `
                            <label class="opcion">
                                <input type="radio" name="pregunta${index}" value="${opcionIndex}" required>
                                <span>${opcion}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `;
        });

        htmlExamen += `
                    <button type="submit" class="btn-enviar-examen">
                        <i class="fas fa-paper-plane"></i> Enviar Examen
                    </button>
                </form>
            </div>
        `;

        modalBody.innerHTML = htmlExamen;
        modal.classList.remove('oculto');

        // Agregar estilos del examen
        agregarEstilosExamen();

        // Manejar envío del examen
        document.getElementById('form-examen').addEventListener('submit', function (e) {
            e.preventDefault();
            evaluarExamen(preguntasExamen);
        });
    }

    // Agregar estilos del examen
    function agregarEstilosExamen() {
        if (!document.getElementById('estilos-examen')) {
            const estilos = document.createElement('style');
            estilos.id = 'estilos-examen';
            estilos.textContent = `
                .examen-contenedor {
                    max-width: 600px;
                    margin: 0 auto;
                }
                .examen-timer {
                    text-align: center;
                    font-size: 1.5rem;
                    color: var(--primary-color);
                    margin-bottom: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                .pregunta-card {
                    background: var(--gray-100);
                    padding: 1.5rem;
                    border-radius: 10px;
                    margin-bottom: 1.5rem;
                }
                .pregunta-card h4 {
                    color: var(--primary-color);
                    margin-bottom: 0.5rem;
                }
                .pregunta-card p {
                    color: var(--dark-blue);
                    font-weight: 500;
                    margin-bottom: 1rem;
                }
                .opciones {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .opcion {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    background: white;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                .opcion:hover {
                    background: var(--accent-color);
                }
                .opcion input:checked + span {
                    color: var(--primary-color);
                    font-weight: 600;
                }
                .opcion:has(input:checked) {
                    border-color: var(--primary-color);
                    background: var(--accent-color);
                }
                .btn-enviar-examen {
                    width: 100%;
                    padding: 1rem;
                    border: none;
                    border-radius: 10px;
                    background: var(--gradient-primary);
                    color: white;
                    font-weight: 600;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }
                .btn-enviar-examen:hover {
                    transform: scale(1.02);
                    box-shadow: 0 6px 20px rgba(30, 144, 255, 0.4);
                }
            `;
            document.head.appendChild(estilos);
        }
    }

    // Evaluar examen
    function evaluarExamen(preguntas) {
        const formData = new FormData(document.getElementById('form-examen'));
        let correctas = 0;

        preguntas.forEach((pregunta, index) => {
            const respuesta = formData.get(`pregunta${index}`);
            if (parseInt(respuesta) === pregunta.respuestaCorrecta) {
                correctas++;
            }
        });

        const calificacion = (correctas / preguntas.length) * 100;
        const aprobado = calificacion >= 80;

        // Cerrar modal de examen
        document.getElementById('modal-examen').classList.add('oculto');

        // Mostrar resultado
        mostrarResultadoExamen(aprobado, calificacion);
    }

    // Mostrar resultado del examen
    function mostrarResultadoExamen(aprobado, calificacion) {
        const modal = document.getElementById('modal-resultado');
        const icono = document.getElementById('resultado-icono');
        const titulo = document.getElementById('resultado-titulo');
        const mensaje = document.getElementById('resultado-mensaje');

        if (aprobado) {
            icono.innerHTML = '<i class="fas fa-check-circle"></i>';
            icono.classList.add('aprobado');
            icono.classList.remove('reprobado');
            titulo.textContent = '¡Felicitaciones!';
            titulo.style.color = 'var(--success-color)';
            mensaje.textContent = `Has aprobado el examen con una calificación de ${calificacion.toFixed(0)}%. Ahora puedes subir tus documentos para completar la solicitud de beca.`;

            estadoBeca.examenAprobado = true;
            estadoBeca.calificacionExamen = calificacion.toFixed(0);
            guardarEstado();
        } else {
            icono.innerHTML = '<i class="fas fa-times-circle"></i>';
            icono.classList.add('reprobado');
            icono.classList.remove('aprobado');
            titulo.textContent = 'No aprobaste';
            titulo.style.color = 'var(--error-color)';
            mensaje.textContent = `Obtuviste ${calificacion.toFixed(0)}%. Necesitas al menos 80% para aprobar. ¡Puedes intentarlo de nuevo!`;
        }

        modal.classList.remove('oculto');
    }

    // Manejar subida de archivos
    function manejarArchivoSubido(inputId, nombreId, previewId, cardId, campoEstado) {
        const input = document.getElementById(inputId);
        const nombreSpan = document.getElementById(nombreId);
        const preview = document.getElementById(previewId);
        const card = document.getElementById(cardId);

        input.addEventListener('change', function () {
            const archivo = this.files[0];
            if (archivo) {
                nombreSpan.textContent = archivo.name;
                card.classList.add('cargado');
                estadoBeca.documentosSubidos[campoEstado] = true;
                guardarEstado();
                actualizarSeccionDocumentos();

                // Mostrar preview si es imagen
                if (archivo.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                    };
                    reader.readAsDataURL(archivo);
                } else {
                    preview.innerHTML = `<i class="fas fa-file-pdf" style="font-size: 3rem; color: #e74c3c;"></i>`;
                }
            }
        });
    }

    // Manejar envío de solicitud
    function manejarEnvioSolicitud(e) {
        e.preventDefault();

        const todosLosDocumentos = Object.values(estadoBeca.documentosSubidos).every(v => v);
        if (!todosLosDocumentos) {
            alert('Por favor, sube todos los documentos requeridos.');
            return;
        }

        if (!estadoBeca.examenAprobado) {
            alert('Debes aprobar el examen antes de enviar la solicitud.');
            return;
        }

        estadoBeca.solicitudEnviada = true;
        guardarEstado();
        actualizarPasosBeca();
        mostrarSeccionExito();
    }

    // Event Listeners
    menuToggle.addEventListener('click', () => navegacionPrincipal.classList.toggle('active'));

    profileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuDesplegable.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
    });

    // Cursos
    document.querySelectorAll('.btn-curso-beca').forEach(btn => {
        btn.addEventListener('click', function () {
            const cursoId = this.dataset.curso;
            manejarClicCurso(cursoId);
        });
    });

    // Examen
    document.getElementById('btn-iniciar-examen').addEventListener('click', iniciarExamen);

    // Cerrar modal examen
    document.getElementById('cerrar-modal-examen').addEventListener('click', () => {
        document.getElementById('modal-examen').classList.add('oculto');
    });

    // Cerrar modal resultado
    document.getElementById('btn-cerrar-resultado').addEventListener('click', () => {
        document.getElementById('modal-resultado').classList.add('oculto');
        actualizarUI();
    });

    // Documentos
    manejarArchivoSubido('dni', 'nombre-dni', 'preview-dni', 'card-dni', 'dni');
    manejarArchivoSubido('expediente', 'nombre-expediente', 'preview-expediente', 'card-expediente', 'expediente');
    manejarArchivoSubido('justificacion-financiera', 'nombre-justificacion', 'preview-justificacion', 'card-justificacion', 'justificacion');
    manejarArchivoSubido('foto-carnet', 'nombre-foto', 'preview-foto', 'card-foto', 'foto');

    // Formulario de documentos
    document.getElementById('form-documentos-beca').addEventListener('submit', manejarEnvioSolicitud);

    // Carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
    }

    carritoToggle.addEventListener('click', () => {
        window.location.href = 'carrito.html';
    });

    // Usuario
    function updateUserName() {
        const userNameElement = document.getElementById('userName');
        const userName = localStorage.getItem('userName');
        if (userName && userNameElement) {
            userNameElement.textContent = userName;
        }
    }

    function loadAvatarFromStorage() {
        const savedAvatar = localStorage.getItem('userAvatar');
        const userName = localStorage.getItem('userName') || 'Usuario';
        const inicial = userName.charAt(0).toUpperCase();

        const avatarImgHeader = document.getElementById('avatar-img-header');
        const avatarInicialHeader = document.getElementById('avatar-inicial-header');

        if (savedAvatar && avatarImgHeader && avatarInicialHeader) {
            avatarImgHeader.src = savedAvatar;
            avatarImgHeader.style.display = 'block';
            avatarInicialHeader.style.display = 'none';
        } else if (avatarInicialHeader) {
            if (avatarImgHeader) avatarImgHeader.style.display = 'none';
            avatarInicialHeader.style.display = 'flex';
            avatarInicialHeader.textContent = inicial;
        }

        const profileToggle = document.getElementById('profile-toggle');
        if (profileToggle && profileToggle.classList.contains('avatar-inicial')) {
            profileToggle.textContent = inicial;
        }
    }

    // Cerrar sesión
    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userLastName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userRole');
            localStorage.removeItem('estadoBeca');
            window.location.href = '../Principal/Principal.html';
        });
    }

    // Inicialización
    actualizarContadorCarrito();
    updateUserName();
    loadAvatarFromStorage();
    cargarEstado();
});