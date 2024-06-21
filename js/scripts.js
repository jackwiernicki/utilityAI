// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatMessages = document.getElementById('chat-messages');
    const chatContainer = document.getElementById('chat-container');

    chatbotSend.addEventListener('click', () => {
        sendMessage();
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userInput = chatbotInput.value.trim();
        if (userInput) {
            appendUserMessage(userInput);
            // Simulate chatbot response
            simulateChatbotResponse();
            chatbotInput.value = '';
            chatbotInput.focus(); // Keep input focused after sending message
        }
    }

    function simulateChatbotResponse() {
        const responses = ["What was that?", "Can you speak up? I can't hear you!"];
        const randomIndex = Math.floor(Math.random() * responses.length);
        const randomResponse = responses[randomIndex];
        setTimeout(() => {
            appendBotMessage(randomResponse);
            chatContainer.scrollTop = chatContainer.scrollHeight; // Adjust scroll after appending message
        }, 500); // Simulate delay for more realistic feel
    }

    function appendUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'user');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function appendBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'bot');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});


