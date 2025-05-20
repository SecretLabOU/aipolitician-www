// chat.js - Simple chat functionality for AI Politician
document.addEventListener('DOMContentLoaded', function() {
    const chatbox = document.getElementById('chatbox');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const politicianSelector = document.querySelectorAll('.politician-selector');
    let currentPolitician = 'trump'; // Default politician

    // Initial system message
    addSystemMessage("You are now chatting with Donald Trump. Ask any policy question or discuss current events.");

    // Politician selection
    politicianSelector.forEach(selector => {
        selector.addEventListener('click', function() {
            const politician = this.getAttribute('data-politician');
            
            // Update UI to show selected politician
            politicianSelector.forEach(item => {
                if (item.getAttribute('data-politician') === politician) {
                    item.querySelector('figure').style.border = '3px solid #3273dc';
                    item.querySelector('.check-icon').style.display = 'block';
                } else {
                    item.querySelector('figure').style.border = '3px solid transparent';
                    item.querySelector('.check-icon').style.display = 'none';
                }
            });

            // Update current politician and add system message
            currentPolitician = politician;
            const politicianName = politician.charAt(0).toUpperCase() + politician.slice(1);
            addSystemMessage(`Switching to ${politicianName}`);
        });
    });

    // Handle message submission
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = messageInput.value.trim();
        
        if (message) {
            // Add user message to chat
            addUserMessage(message);
            
            // Clear input
            messageInput.value = '';
            
            // Simulate AI response after a short delay
            setTimeout(() => {
                const aiResponse = generateResponse(message, currentPolitician);
                addAIMessage(aiResponse, currentPolitician);
                
                // Scroll to bottom
                chatbox.scrollTop = chatbox.scrollHeight;
            }, 1000);
        }
    });

    // Add a system message to the chatbox
    function addSystemMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'px-4 py-3';
        messageElement.style.display = 'flex';
        messageElement.style.justifyContent = 'center';
        
        messageElement.innerHTML = `
            <div style="background-color: #f7f7f8; padding: 8px 16px; border-radius: 8px; max-width: 85%;">
                <p class="is-size-7 has-text-grey">${text}</p>
            </div>
        `;
        
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Add a user message to the chatbox
    function addUserMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'px-5 py-3';
        messageElement.style.display = 'flex';
        messageElement.style.justifyContent = 'flex-end';
        
        messageElement.innerHTML = `
            <div style="max-width: 85%;">
                <div style="background-color: #f0f7fb; padding: 12px 16px; border-radius: 8px; margin-left: auto;">
                    <p>${text}</p>
                </div>
            </div>
        `;
        
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Add an AI message to the chatbox
    function addAIMessage(text, politician) {
        const messageElement = document.createElement('div');
        messageElement.className = 'px-5 py-3';
        messageElement.style.display = 'flex';
        
        messageElement.innerHTML = `
            <img src="static/images/${politician}.jpeg" alt="${politician}" 
                 style="height: 32px; width: 32px; border-radius: 4px; margin-right: 12px; margin-top: 3px;" 
                 onerror="this.src='https://bulma.io/images/placeholders/32x32.png'">
            <div style="max-width: 85%;">
                <div style="padding: 12px 16px; border-radius: 8px; background-color: #f7f7f8;">
                    <p>${text}</p>
                </div>
            </div>
        `;
        
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    // Simple response generator based on politician
    function generateResponse(message, politician) {
        const responses = {
            trump: [
                "Look, let me tell you, it's going to be tremendous. Really tremendous. Nobody knows more about this than me, believe me.",
                "We're going to make America great again, and we're going to do it fast. So fast your head will spin.",
                "The fake news won't tell you this, but we've done more than anybody. More than anybody in history, maybe ever.",
                "I've been saying this for years, nobody wanted to listen. Now everyone agrees with me. Everyone.",
                "We're going to win so much, you're going to get tired of winning. That I can tell you."
            ],
            biden: [
                "Look, here's the deal. We need to build back better, and that's exactly what my administration is focused on.",
                "The fact of the matter is, this is about dignity and respect for working families. That's what drives every decision I make.",
                "I've been around long enough to know that America can overcome any challenge when we work together and invest in our people.",
                "Let me be clear: I'm not looking to punish anybody, but the wealthy and corporations need to pay their fair share.",
                "We need to restore the soul of America. That's not hyperbole, that's a fact. We need to remember who we are."
            ]
        };
        
        // Get responses for the current politician or default to empty array
        const politicianResponses = responses[politician] || [];
        
        // If no responses available, return a generic message
        if (politicianResponses.length === 0) {
            return "I don't have a response for that at the moment.";
        }
        
        // Select a random response
        const randomIndex = Math.floor(Math.random() * politicianResponses.length);
        return politicianResponses[randomIndex];
    }
}); 