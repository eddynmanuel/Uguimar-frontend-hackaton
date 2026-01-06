document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navegacionPrincipal = document.getElementById('main-nav');
    const profileToggle = document.getElementById('profile-toggle');
    const menuDesplegable = document.getElementById('profile-dropdown');
    const inputBusqueda = document.getElementById('busqueda-curso');
    const botonesAgregarCarrito = document.querySelectorAll('.btn-agregar-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    const carritoToggle = document.getElementById('carrito-toggle');
    const searchForm = document.getElementById('search-form');
    const listaEscuelas = document.getElementById('lista-escuelas');
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
    // Function to generate thumbnail URL from video URL
    function generateThumbnailUrl(videoUrl) {
        if (!videoUrl) return 'https://via.placeholder.com/300x200?text=No+Video';
    
        try {
            if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                let videoId;
                if (videoUrl.includes('youtube.com/watch?v=')) {
                    videoId = videoUrl.split('watch?v=')[1].split('&')[0];
                } else if (videoUrl.includes('youtu.be/')) {
                    videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
                } else {
                    return 'https://via.placeholder.com/300x200?text=Invalid+YouTube+URL';
                }
                return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            } else if (videoUrl.includes('vimeo.com')) {
                return 'https://via.placeholder.com/300x200?text=Vimeo+Thumbnail';
            } else {
                return 'https://via.placeholder.com/300x200?text=Video+Thumbnail';
            }
        } catch (error) {
            console.error('Error generating thumbnail URL:', error);
            return 'https://via.placeholder.com/300x200?text=Error+Loading+Thumbnail';
        }
    }
  
    // Function to create course element
    function createCourseElement(curso) {
      const cursoElement = document.createElement('div');
      cursoElement.className = 'curso';
      cursoElement.innerHTML = `
          <img src="${generateThumbnailUrl(curso.videoUrl)}" alt="${curso.nombre}">
          <h3>${curso.nombre}</h3>
          <p>${curso.instructor}</p>
          <div class="calificacion">
              <i class="fas fa-star"></i>
              <span>4.5</span>
          </div>
      `;
      cursoElement.addEventListener('click', () => {
          window.location.href = `cursoContenido.html?videoUrl=${encodeURIComponent(curso.videoUrl)}`;
      });
      return cursoElement;
    }
  
    // Function to fetch schools
    function fetchEscuelas() {
        fetch('/api/iniescuelas')
            .then(response => response.json())
            .then(escuelas => {
                const listaEscuelas = document.getElementById('lista-escuelas');
                listaEscuelas.innerHTML = '';
                escuelas.forEach(escuela => {
                    const escuelaElement = document.createElement('div');
                    escuelaElement.className = 'escuela';
                    escuelaElement.innerHTML = `
                        <i class="fas fa-school escuela-icono"></i>
                        <h3>${escuela.nombre}</h3>
                        <p>${escuela.descripcion}</p>
                    `;
                    // Add this click event listener
                    escuelaElement.addEventListener('click', () => {
                        window.location.href = `ruta.html?escuela_id=${escuela.id}`;
                    });
                    listaEscuelas.appendChild(escuelaElement);
                });
            })
            .catch(error => console.error('Error fetching schools:', error));
    }
  
    // Add this at the end of the DOMContentLoaded event listener
  function updateUserName() {
      const userNameElement = document.getElementById('userName');
      const userName = localStorage.getItem('userName');
      if (userName) {
          userNameElement.textContent = userName;
      }
  }
  
  // Call the function to update the user name
  updateUserName();
  
    // Function to fetch featured courses
    function fetchCursos() {
        fetch('/api/inicursos')
            .then(response => response.json())
            .then(cursos => {
                const listaCursos = document.getElementById('lista-cursos');
                listaCursos.innerHTML = '';
                cursos.forEach(curso => {
                    listaCursos.appendChild(createCourseElement(curso));
                });
            })
            .catch(error => console.error('Error fetching featured courses:', error));
    }
  
    // Function to fetch random courses (recommended)
    function fetchCursosAleatorios() {
        fetch('/api/inicursos-random')
            .then(response => response.json())
            .then(cursos => {
                const listaCursosRecomendados = document.getElementById('lista-cursos-recomendados');
                listaCursosRecomendados.innerHTML = '';
                cursos.forEach(curso => {
                    listaCursosRecomendados.appendChild(createCourseElement(curso));
                });
            })
            .catch(error => console.error('Error fetching recommended courses:', error));
    }
  
    // Function to toggle the navigation menu
    menuToggle.addEventListener('click', function() {
        navegacionPrincipal.classList.toggle('active');
    });
  
    // Function to toggle the profile menu
    profileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        menuDesplegable.classList.toggle('active');
    });
  
    // Close the profile menu when clicking outside of it
    document.addEventListener('click', function(e) {
        if (!menuDesplegable.contains(e.target) && e.target !== profileToggle) {
            menuDesplegable.classList.remove('active');
        }
    });
  
    // Function to search courses and redirect to the results page
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = inputBusqueda.value.trim();
        if (searchTerm) {
            window.location.href = `busqueda.html?q=${encodeURIComponent(searchTerm)}`;
        }
    });
  
    // Function to add to cart
    function agregarAlCarrito(e) {
        if (e.target.classList.contains('btn-agregar-carrito')) {
            const curso = {
                id: e.target.dataset.id,
                nombre: e.target.dataset.nombre,
                precio: parseFloat(e.target.dataset.precio)
            };
            
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const cursoEnCarrito = carrito.find(item => item.id === curso.id);
            
            if (cursoEnCarrito) {
                alert('Este curso ya está en tu carrito');
            } else {
                carrito.push(curso);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarContadorCarrito();
                
                e.target.textContent = 'Agregado al carrito';
                setTimeout(() => {
                    e.target.textContent = 'Agregar al carrito';
                }, 2000);
            }
        }
    }
  
    // Function to update the cart counter
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        contadorCarrito.textContent = carrito.length;
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
  
  
    // Add click event to "Add to cart" buttons
    document.addEventListener('click', agregarAlCarrito);
  
    // Initialize the cart counter
    actualizarContadorCarrito();
  
    // Redirect to the cart page when clicking on the cart icon
    carritoToggle.addEventListener('click', function() {
        window.location.href = 'planesj.html';
    });
  
    // Load all data
    fetchEscuelas();
    fetchCursos();
    fetchCursosAleatorios();
  });
  
  








