// chatbot.js

function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  const button = document.querySelector(`[onclick="toggleSection('${sectionId}')"]`);
  
  // Alternar visibilidad
  if (section.style.display === 'none' || section.style.display === '') {
    section.style.display = 'block';
    button.classList.add('open');
  } else {
    section.style.display = 'none';
    button.classList.remove('open');
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
  const message = input.value.trim();
  if (!message) return;

  addUserMessage(message);
  input.value = "";

  // Respuestas simples
  if (message.toLowerCase().includes("hola")) {
    addBotMessage("¡Hola! Usa los botones para acceder a recursos.");
  } else if (message.toLowerCase().includes("gracias")) {
    addBotMessage("¡De nada! Estoy aquí para ayudarte.");
  } else if (message.toLowerCase().includes("adiós") || message.toLowerCase().includes("salir")) {
    addBotMessage("¡Hasta luego! Vuelve cuando necesites ayuda.");
    setTimeout(() => toggleChatbot(), 1500);
  } else {
    addBotMessage("Puedes usar los botones de abajo para acceder a materiales o hacerme preguntas simples.");
  }
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
