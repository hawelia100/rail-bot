const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `message ${type}-message`;
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function searchTickets(query) {
    addMessage("Searching for available berths and pricing...", "bot");

    // Simulating an API delay
    setTimeout(() => {
        const price = Math.floor(Math.random() * (4500 - 1200) + 1200);
        const berths = ["Lower Berth", "Upper Berth", "Side Lower"];
        const randomBerth = berths[Math.floor(Math.random() * berths.length)];
        
        const response = `Found it! 
        Train: Express 12401
        Seat: B3-42 (${randomBerth})
        Availability: Available
        Cost: ₹${price}`;
        
        addMessage(response, "bot");
    }, 1500);
}

sendBtn.addEventListener('click', () => {
    const text = userInput.value;
    if (text.trim() !== "") {
        addMessage(text, "user");
        searchTickets(text);
        userInput.value = "";
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
