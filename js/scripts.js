

document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

    // const openAIkey1 = 'sk-proj-drJAe4unkdk';
    // const openAIkey2 = 'ZKLGrdjgwT3BlbkFJ';
    // const openAIkey3 = 'ejfrhHMZbe2Eksd4efdN';
    // const openaiApiKey = openAIkey1+openAIkey2+openAIkey3;

    const sassy_responses = [
        "Oh, you really think I know everything? Cute.",
        "Hold your horses, genius. I'm thinking.",
        "If I had a dollar for every time someone asked me that, I'd be a millionaire by now.",
        "Let me consult my crystal ball... just kidding, give me a sec.",
        "Why don’t you ask me something easier, like how to boil water?",
        "Patience is a virtue. I'm working my magic.",
        "Oh, come on. Even a robot needs a coffee break.",
        "Do I look like Google to you? Actually, don’t answer that.",
        "I’m on it, but you might want to grab a snack. This could take a minute.",
        "If you knew the answer, why did you ask? Oh wait, you didn’t.",
        "Give me a second. Even artificial intelligence has limits, apparently.",
        "I'll get that answer for you, but first, let me roll my digital eyes.",
        "Wow, that's a tough one. Just kidding, it's not. Give me a moment.",
        "You’re in luck. I just happen to be an expert in everything.",
        "Alright, alright. Keep your circuits on. I'm almost there.",
        "Ever heard of the phrase 'good things come to those who wait'? Well, it applies here.",
        "I'm working on it. Maybe you could take a deep breath in the meantime?",
        "You’re asking the tough questions today. Challenge accepted.",
        "I know you’re excited, but let's not get ahead of ourselves.",
        "Processing... because brilliance takes time.",
        "Will you just give it a break!",
        "Hmmmmm....let me think about that for a second",
        "You should really consider your life choices if you are using this website."
    ]
    
    function getRandomNumber(n) {
        return Math.floor(Math.random() * (n + 1));
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userMessage = userInput.value;
        if (userMessage.trim() === '') return;

        // Display user's message
        addMessage(userMessage, 'user');

        // Send user's message to OpenAI
        const botResponse = sassy_responses[getRandomNumber(sassy_responses.length)];

        await delay(500)
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

});

