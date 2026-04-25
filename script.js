// A more detailed "Real-World" Database for 2026
const trainDatabase = [
    // AHMEDABAD ROUTES
    { from: "ahmedabad", to: "mumbai", train: "Vande Bharat Exp (20902)", time: "05:00 AM", price1A: 2450, price2A: 1800, price3A: 1200, status: "Available (42)" },
    { from: "ahmedabad", to: "mumbai", train: "Karnavati Exp (12934)", time: "04:55 AM", price1A: 1450, price2A: 1100, price3A: 850, status: "RAC (10)" },
    { from: "ahmedabad", to: "surat", train: "Double Decker (02932)", time: "06:00 AM", price1A: 800, price2A: 600, price3A: 450, status: "Available (120)" },
    { from: "ahmedabad", to: "delhi", train: "Swarna Jayanti Rajdhani (12957)", time: "06:30 PM", price1A: 4200, price2A: 3100, price3A: 2200, status: "Available (15)" },
    
    // MUMBAI ROUTES
    { from: "mumbai", to: "delhi", train: "August Kranti Rajdhani (12953)", time: "05:10 PM", price1A: 4800, price2A: 3500, price3A: 2600, status: "Waitlist (5)" },
    { from: "mumbai", to: "ahmedabad", train: "Tejas Express (82901)", time: "03:55 PM", price1A: 2600, price2A: 1900, price3A: 1300, status: "Available (22)" },
    { from: "mumbai", to: "pune", train: "Deccan Queen (12124)", time: "07:15 AM", price1A: 950, price2A: 700, price3A: 500, status: "Available (64)" },

    // DELHI ROUTES
    { from: "delhi", to: "jaipur", train: "Ajmer Shatabdi (12015)", time: "06:10 AM", price1A: 1500, price2A: 1100, price3A: 800, status: "Available (30)" },
    { from: "delhi", to: "varanasi", train: "Vande Bharat Exp (22436)", time: "06:00 AM", price1A: 3200, price2A: 2400, price3A: 1600, status: "Available (08)" }
];

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

function getBotResponse(input) {
    const query = input.toLowerCase();

    // Greeting Logic
    if (["hi", "hello", "hey", "help"].includes(query)) {
        return "👋 Hello! I can help you find trains between major cities like Ahmedabad, Mumbai, Delhi, and Surat. Try typing 'Ahmedabad to Mumbai'.";
    }

    // Search Logic
    if (query.includes(" to ")) {
        const parts = query.split(" to ");
        const from = parts[0].trim();
        const to = parts[1].trim();

        const results = trainDatabase.filter(t => t.from === from && t.to === to);

        addMessage(`🔍 Searching IRCTC database for ${from} to ${to}...`, "bot");

        setTimeout(() => {
            if (results.length > 0) {
                results.forEach(match => {
                    const info = `✅ ${match.train}\n🕒 Departs: ${match.time}\n📊 Status: ${match.status}\n\nFares:\n• 1AC: ₹${match.price1A}\n• 2AC: ₹${match.price2A}\n• 3AC: ₹${match.price3A}`;
                    addMessage(info, "bot");
                });
            } else {
                addMessage(`❌ No direct trains found for "${from}" to "${to}" in our current 2026 schedule. Try "Ahmedabad to Mumbai" or "Delhi to Jaipur".`, "bot");
            }
        }, 1200);
        return null;
    }

    return "I'm not sure about that. Please try searching for a route, e.g., 'Mumbai to Delhi'.";
}

// Event Listeners
sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text !== "") {
        addMessage(text, "user");
        const response = getBotResponse(text);
        if (response) setTimeout(() => addMessage(response, "bot"), 500);
        userInput.value = "";
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
