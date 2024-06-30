document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const openaiApiKey = 'sk-proj-TC6ARq34WMMmIlPGcrI6T3BlbkFJiFdWB4pPljUIjA4cR25u';

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userMessage = userInput.value;
        if (userMessage.trim() === '') return;

        // Display user's message
        addMessage(userMessage, 'user');

        // Send user's message to OpenAI
        const botResponse = await getBotResponse(userMessage);

        // Display bot's response
        addMessage(botResponse, 'bot');

        userInput.value = '';
    });

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerText = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function getBotResponse(message) {
        const response = await fetch(openaiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const botReply = data.choices[0].text.trim();
        return botReply;
    }
});
