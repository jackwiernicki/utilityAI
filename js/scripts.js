// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatResponse = document.getElementById('chat-response');
    const chatUserPrompt = document.getElementById('chat-user-prompt');

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
            displayUserMessage(userInput);
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
            displayBotMessage(randomResponse);
        }, 500); // Simulate delay for more realistic feel
    }

    function displayUserMessage(message) {
        chatUserPrompt.textContent = message;
    }

    function displayBotMessage(message) {
        chatResponse.textContent = message;
    }
});


