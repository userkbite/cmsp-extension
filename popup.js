const messageElement = document.getElementById("message");

// Lê a mensagem do localStorage quando o popup é aberto
const storedMessage = localStorage.getItem("correctAnswerMessage");
if (storedMessage) {
  messageElement.innerHTML = storedMessage; // Atualiza o texto do parágrafo
} else {
  messageElement.textContent = "Aguardando...";
}
