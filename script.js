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
    // Add these to your trainDatabase array
{ from: "rourkela", to: "puri", train: "Vande Bharat Exp (20835)", time: "02:00 PM", price: 1125, seats: "Available (192)" },
{ from: "rourkela", to: "puri", train: "Tapaswini Exp (18451)", time: "06:20 PM", price: 330, seats: "Waitlist (12)" },
{ from: "rourkela", to: "puri", train: "Kalinga Utkal Exp (18478)", time: "02:50 PM", price: 395, seats: "Available (24)" },
    
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
    function processInput(input) {
    const text = input.toLowerCase().trim();

    // 1. Handling Greetings
    const greetings = ["hi", "hello", "hey", "good morning", "good evening"];
    if (greetings.some(g => text === g)) {
        setTimeout(() => {
            addMessage("Hello! I'm your RailBot concierge. Where are you planning to travel? (e.g., 'Ahmedabad to Mumbai')", "bot");
        }, 500);
        return;
    }

    // 2. Handling the "Search" Intent (REPLACED SECTION)
    if (text.includes(" to ")) {
        const cities = text.split(" to ");
        const fromCity = cities[0].trim();
        const toCity = cities[1].trim();

        addMessage(`Searching for best trains from ${fromCity} to ${toCity}...`, "bot");

        setTimeout(() => {
            // This uses .filter to find ALL matching trains in your database
            const matches = trainDatabase.filter(t => t.from === fromCity && t.to === toCity);

            if (matches.length > 0) {
                addMessage(`✅ Found ${matches.length} trains for your journey:`, "bot");
                
                matches.forEach((match, index) => {
                    // This generates the cinematic response for each train found
                    const response = `🚆 ${match.train}\n⏰ Time: ${match.time}\n💺 Status: ${match.seats}\n💰 Fare: ₹${match.price}`;
                    
                    // index * 500 makes them appear one after another, very smoothly!
                    setTimeout(() => addMessage(response, "bot"), (index + 1) * 500); 
                });
            } else {
                addMessage(`Sorry, I couldn't find a direct train from ${fromCity} to ${toCity}. Try "Rourkela to Puri"!`, "bot");
            }
        }, 1500);
        return;
    }

    // 3. Fallback for other messages
    setTimeout(() => {
        addMessage("I'm specialized in train bookings. Please provide a route (e.g., 'Delhi to Jaipur') so I can assist you.", "bot");
    }, 500);
}

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
