// 1. DATABASE
const trainDatabase = [
    { from: "ahmedabad", to: "mumbai", train: "Vande Bharat (20902)", time: "05:00 AM", price: 1200, seats: "Available (42)" },
    { from: "rourkela", to: "puri", train: "Vande Bharat (20835)", time: "02:00 PM", price: 1125, seats: "Available (192)" },
    { from: "rourkela", to: "puri", train: "Tapaswini Exp (18451)", time: "06:20 PM", price: 330, seats: "Waitlist (12)" },
    { from: "mumbai", to: "delhi", train: "Rajdhani Exp (12431)", time: "04:00 PM", price: 2800, seats: "RAC (5)" }
];

// 2. UI ELEMENTS
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// 3. HELPER FUNCTIONS
function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `message ${type}-message`;
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function processInput(input) {
    const text = input.toLowerCase().trim();

    // Greeting Logic
    const greetings = ["hi", "hello", "hey"];
    if (greetings.some(g => text === g)) {
        setTimeout(() => {
            addMessage("Hello! I'm your RailBot. Where are you traveling? (e.g., 'Rourkela to Puri')", "bot");
        }, 500);
        return;
    }

    // Search Logic
    if (text.includes(" to ")) {
        const cities = text.split(" to ");
        const fromCity = cities[0].trim();
        const toCity = cities[1].trim();

        addMessage(`Searching trains from ${fromCity} to ${toCity}...`, "bot");

        setTimeout(() => {
            const matches = trainDatabase.filter(t => t.from === fromCity && t.to === toCity);

            if (matches.length > 0) {
                addMessage(`✅ Found ${matches.length} trains:`, "bot");
                matches.forEach((match, index) => {
                    const response = `🚆 ${match.train}\n⏰ Time: ${match.time}\n💺 Status: ${match.seats}\n💰 Fare: ₹${match.price}`;
                    setTimeout(() => addMessage(response, "bot"), (index + 1) * 600);
                });
            } else {
                addMessage(`No direct trains found for ${fromCity} to ${toCity}. Try 'Rourkela to Puri'.`, "bot");
            }
        }, 1500);
        return;
    }

    // Default Fallback
    setTimeout(() => {
        addMessage("Try searching a route like 'Mumbai to Delhi'.", "bot");
    }, 500);
}

// 4. EVENT LISTENERS
sendBtn.addEventListener('click', () => {
    const val = userInput.value;
    if (val.trim() !== "") {
        addMessage(val, "user");
        processInput(val);
        userInput.value = "";
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
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
