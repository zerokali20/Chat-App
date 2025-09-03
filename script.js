document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const chatBox = document.getElementById("chat-box");

    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = userInput.value.trim();
        if (messageText === "") return;

        // Display user's message
        addMessage(messageText, "user-msg");
        userInput.value = "";

        // Send message to the backend and get a response
        fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: messageText }),
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data.reply, "bot-msg");
        })
        .catch((error) => {
            console.error('Error:', error);
            addMessage("Sorry, something went wrong.", "bot-msg");
        });
    }

    function addMessage(text, className) {
        const messageElement = document.createElement("p");
        messageElement.className = className;
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
});