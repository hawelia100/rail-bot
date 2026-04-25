// 1. DYNAMIC DATA MATRIX (Add more cities here as needed)
const cityCoords = {
    "ahmedabad": {x: 72.5, y: 23.0},
    "mumbai": {x: 72.8, y: 19.0},
    "delhi": {x: 77.2, y: 28.6},
    "rourkela": {x: 84.8, y: 22.2},
    "puri": {x: 85.8, y: 19.8},
    "kolkata": {x: 88.3, y: 22.5},
    "bangalore": {x: 77.5, y: 12.9},
    "chennai": {x: 80.2, y: 13.0},
    "raipur": {x: 81.6, y: 21.2},
    "surat": {x: 72.8, y: 21.1}
};

const box = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const btn = document.getElementById('send-btn');

// Function to display messages in the UI
function show(msg, type) {
    const d = document.createElement('div');
    d.className = `message ${type}-message`;
    d.innerText = msg;
    box.appendChild(d);
    box.scrollTop = box.scrollHeight;
}

// Math Matrix to generate train details for ANY two cities
function getTrains(from, to) {
    const p1 = cityCoords[from] || {x: 70 + Math.random()*15, y: 15 + Math.random()*15};
    const p2 = cityCoords[to] || {x: 70 + Math.random()*15, y: 15 + Math.random()*15};
    
    const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) * 105;
    
    // Logic: If user types same city (e.g. Mumbai to Mumbai), return empty array
    if (from === to) return [];

    return [
        { n: `Vande Bharat (${Math.floor(Math.random()*9000+22000)})`, tm: "07:15 AM", p: Math.floor(distance * 2.8), s: "Available (48)" },
        { n: `Rajdhani Exp (${Math.floor(Math.random()*9000+12000)})`, tm: "04:30 PM", p: Math.floor(distance * 2.1), s: "Available (12)" }
    ];
}

// MAIN BOT LOGIC
function reply(text) {
    const val = text.toLowerCase().trim();

    // 1. GREETING
    if (["hi", "hello", "hey"].includes(val)) {
        setTimeout(() => show("Hello! I'm RailBot. Enter your route to start.", "bot"), 500);
        return;
    }

    // 2. CHECK FOR SINGLE CITY (Asking for more details)
    const knownCities = Object.keys(cityCoords);
    // If input is just a city name OR just a single word that isn't "to"
    if (knownCities.includes(val) || (val.split(" ").length === 1 && val.length > 2)) {
        setTimeout(() => {
            show("Even the best trains need a signal—tell me your journey details 🚦", "bot");
        }, 500);
        return;
    }

    // 3. SEARCH LOGIC (From X to Y)
    if (val.includes(" to ")) {
        const [from, to] = val.split(" to ").map(s => s.trim());
        
        if (from && to) {
            show(`🔍 Scanning networks for ${from} ➔ ${to}...`, "bot");

            setTimeout(() => {
                const results = getTrains(from, to);
                
                if (results.length > 0) {
                    // SUCCESS MESSAGE
                    show("Your journey just got clearer—check this out 👇", "bot");
                    
                    results.forEach((tr, i) => {
                        const info = `🚆 ${tr.n}\n⏰ Departs: ${tr.tm}\n💺 Status: ${tr.s}\n💰 Fare: ₹${tr.p}`;
                        setTimeout(() => show(info, "bot"), (i + 1) * 600);
                    });
                } else {
                    // NO TRAIN / SAME CITY ERROR
                    show("No direct trains found—want me to check alternate routes?", "bot");
                }
            }, 1200);
            return;
        }
    }

    // 4. FALLBACK (BLIND SPOT)
    setTimeout(() => {
        show("Looks like you found my blind spot 👀\nLet’s switch lanes", "bot");
    }, 500);
}

// EVENT LISTENERS
btn.onclick = () => {
    if (input.value.trim() !== "") {
        show(input.value, "user");
        reply(input.value);
        input.value = "";
    }
};

input.onkeypress = (e) => { if (e.key === 'Enter') btn.onclick(); };
