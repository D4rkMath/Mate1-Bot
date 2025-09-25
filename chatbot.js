// chatbot.js

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  const button = document.querySelector(`[onclick="toggleSection('${sectionId}')"]`);

  // Si la sección está visible, ocúltala
  if (section.style.display === 'block') {
    section.style.display = 'none';
    button.classList.remove('open');
  } else {
    // Ocultar todas las demás secciones (incluyendo .section-content-wide)
    document.querySelectorAll('.section-content, .section-content-wide').forEach(sec => {
      if (sec.id !== sectionId) {
        sec.style.display = 'none';
      }
    });

    // Quitar clase "open" de todos los botones
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('open');
    });

    // Mostrar solo la sección seleccionada
    section.style.display = 'block';
    button.classList.add('open');

    // Cargar los tutoriales cada vez que se abre la sección
if (sectionId === 'tutoriales') {
  loadTutoriales();
    }
  }
}

function toggleChatbot() {
  const container = document.getElementById("chatbotContainer");
  const isVisible = container.classList.contains("show");
  container.classList.toggle("show", !isVisible);
}

function addBotMessage(text) {
  const messagesDiv = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = "message bot-message";
  messageDiv.innerHTML = `<p>${text}</p>`;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addUserMessage(text) {
  const messagesDiv = document.getElementById("chatMessages");
  const messageDiv = document.createElement("div");
  messageDiv.className = "message user-message";
  messageDiv.innerHTML = `<p>${text}</p>`;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function openLink(url) {
  window.open(url, "_blank");
}

//function openChatGPT() {
//  const prompt = encodeURIComponent("Soy estudiante de Matemática I en la Universidad Científica del Sur. Necesito ayuda con funciones, límites o derivadas.");
//  window.open(`https://chat.openai.com/?q=${prompt}`, "_blank");
//}

function sendMessage() {
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addUserMessage(userMessage);
  input.value = "";

   // Mostrar mensaje de espera + spinner
  addBotMessage(`
    Enviando tu pregunta al Tutor Virtual ... 
    <div class="loading-spinner"></div>
  `);

  // Esperar 3 segundos antes de redirigir
  setTimeout(() => {
  // Codificar el mensaje del usuario
  const encodedMessage = encodeURIComponent(userMessage);
  // Añadir timestamp para evitar caché
  const timestamp = new Date().getTime();

  // Usar SOLO el parámetro ?q= (¡no ?prompt=!)
  const fullUrl = `https://chatgpt.com/g/g-682e08db72c4819197938ac94c4ada63-tutor-virtual-para-el-curso-de-matematica-l/?prompt=${encodedMessage}&t=${timestamp}`;
    
  // Abrir en nueva pestaña
  window.open(fullUrl, "_blank", "noopener,noreferrer");

  // 👇 Aquí eliminamos el spinner del DOM
    const lastMessage = document.querySelector(".message.bot-message:last-child");
    if (lastMessage) {
      const spinner = lastMessage.querySelector(".loading-spinner");
      if (spinner) {
        spinner.remove(); // Elimina el spinner
      }
    }

  // Confirmar al usuario
 // addBotMessage(`✅ ¡Listo! He enviado tu pregunta a Math-GPT.`);
  },4000); // 4 segundos
}

// Inicializar al cargar
document.addEventListener("DOMContentLoaded", function () {
  // Cargar el HTML del chatbot dinámicamente
  fetch('chatbot.html')
    .then(response => response.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    })
    .catch(err => console.error("Error cargando chatbot.html:", err));
});

// Enviar con Enter 
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && e.target.id === "userInput") {
    sendMessage();
  }
});

// Cerrar secciones al hacer clic fuera
document.addEventListener('click', function(e) {
  if (!e.target.closest('.options-menu')) {
     // Cerrar todos los desplegables
    document.querySelectorAll('.section-content, .section-content-wide').forEach(sec => {
      sec.style.display = 'none';
    });
      // Quitar clase "open" de todos los botones
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('open');
    });
  }
});

// Función para cargar los tutoriales dinámicamente
function loadTutoriales() {
  const container = document.getElementById('tutoriales');
  
  // Evitar cargar múltiples veces
  if (container.dataset.loaded) return;
  
  container.innerHTML = '<p style="text-align:center;padding:15px;color:#666;">Cargando tutoriales...</p>';

  fetch('tutoriales.html')
    .then(response => {
      if (!response.ok) throw new Error('Archivo tutoriales.html no encontrado');
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;

      // Añadir CSS
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'tutoriales.css';
      document.head.appendChild(style);

      // Añadir JS
      const script = document.createElement('script');
      script.src = 'tutoriales.js';
      script.onload = () => {
        container.dataset.loaded = 'true'; // Marcar como cargado
      };
      script.onerror = () => {
        container.innerHTML = '<p style="color:red;text-align:center;">Error al cargar los tutoriales.</p>';
      };
      document.body.appendChild(script);
    })
    .catch(err => {
      console.error('Error:', err);
      container.innerHTML = `<p style="color:red;text-align:center;">${err.message}</p>`;
    });
}
