// chatbot.js

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  const button = document.querySelector(`[onclick="toggleSection('${sectionId}')"]`);

  // Si la sección está visible, ocúltala
  if (section.style.display === 'block') {
    section.style.display = 'none';
    button.classList.remove('open');
  } else {
    // Ocultar todas las demás secciones
    document.querySelectorAll('.section-content').forEach(sec => {
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

  // Codificar solo el mensaje del usuario
  const encodedMessage = encodeURIComponent(userMessage);

  // Abrir ChatGPT con solo el mensaje
  window.open(`https://chat.openai.com/?q=${encodedMessage}`, "_blank");

  // Confirmar al usuario
  addBotMessage(`✅ ¡Listo! He enviado tu pregunta a ChatGPT.`);
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
    document.querySelectorAll('.section-content').forEach(sec => {
      sec.style.display = 'none';
    });
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.remove('open');
    });
  }
});
