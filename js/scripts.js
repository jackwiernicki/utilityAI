// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatContainer = document.getElementById('chat-container');

    chatbotSend.addEventListener('click', () => {
        const userInput = chatbotInput.value;
        if (userInput) {
            appendUserMessage(userInput);
            // Placeholder for chatbot API call
            // Backend API integration will be added here
            simulateChatbotResponse(userInput); // Simulate response for now
            chatbotInput.value = '';
        }
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const userInput = chatbotInput.value;
            if (userInput) {
                appendUserMessage(userInput);
                // Placeholder for chatbot API call
                // Backend API integration will be added here
                simulateChatbotResponse(userInput); // Simulate response for now
                chatbotInput.value = '';
            }
        }
    });

    function simulateChatbotResponse(userInput) {
        setTimeout(() => {
            appendBotMessage(`I'm sorry, I don't have that capability yet.`);
        }, 500);
    }

    function appendUserMessage(message) {
        const chatBox = document.getElementById('chat-box');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'user');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatBox.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function appendBotMessage(message) {
        const chatBox = document.getElementById('chat-box');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'bot');
        messageElement.innerHTML = `<p>${message}</p>`;
        chatBox.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});

