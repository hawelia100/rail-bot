// 1. DYNAMIC DATA MATRIX
const cityCoords = {
    "ahmedabad": {x: 72.5, y: 23.0},
    "mumbai": {x: 72.8, y: 19.0},
    "delhi": {x: 77.2, y: 28.6},
    "rourkela": {x: 84.8, y: 22.2},
    "puri": {x: 85.8, y: 19.8},
    "kolkata": {x: 88.3, y: 22.5},
    "bangalore": {x: 77.5, y: 12.9},
    "chennai": {x: 80.2, y: 13.0}
};

const box = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const btn = document.getElementById('send-btn');

function show(msg, type) {
    const d = document.createElement('div');
    d.className = `message ${type}-message`;
    d.innerText = msg;
    box.appendChild(d);
    box.scrollTop = box.scrollHeight;
}

function getTrains(from, to) {
    // Math to calculate distance between any two coordinates
    const p1 = cityCoords[from] || {x: 70 + Math.random()*15, y: 15 + Math.random()*15};
    const p2 = cityCoords[to] || {x: 70 + Math.random()*15, y: 15 + Math.random()*15};
    
    const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) * 105;
    
    return [
        { n: `Vande Bharat (${Math.floor(Math.random()*9000+22000)})`, tm: "07:15 AM", p: Math.floor(distance * 2.8), s: "Available (48)" },
        { n: `Rajdhani Exp (${Math.floor(Math.random()*9000+12000)})`, tm: "04:30 PM", p: Math.floor(distance * 2.1), s: "Available (12)" },
        { n: `Shatabdi Exp (${Math.floor(Math.random()*9000+12000)})`, tm: "06:00 AM", p: Math.floor(distance * 1.8), s: "RAC (04)" }
    ];
}

function reply(text) {
    const val = text.toLowerCase().trim();

    // 1. Greeting
    if (["hi", "hello", "hey"].includes(val)) {
        setTimeout(() => show("Hello! I'm RailBot. Enter a route (e.g., 'Rourkela to Puri') to see schedules.", "bot"), 500);
        return;
    }

    // 2. Search Logic (A to B and B to A)
    if (val.includes(" to ")) {
        const [from, to] = val.split(" to ").map(s => s.trim());
        show(`🔍 Scanning networks for ${from} ➔ ${to}...`, "bot");

        setTimeout(() => {
            const results = getTrains(from, to);
            show(`✅ Results for ${from.toUpperCase()} ➔ ${to.toUpperCase()}:`, "bot");
            
            results.forEach((tr, i) => {
                const info = `🚆 ${tr.n}\n⏰ Departs: ${tr.tm}\n💺 Status: ${tr.s}\n💰 Fare: ₹${tr.p}`;
                setTimeout(() => show(info, "bot"), (i + 1) * 600);
            });
        }, 1200);
        return;
    }

    // 3. YOUR CUSTOM EDITED MESSAGE
    setTimeout(() => {
        show("Looks like you found my blind spot 👀\nLet’s switch lanes", "bot");
    }, 500);
}

// Control Logic
btn.onclick = () => {
    if (input.value.trim() !== "") {
        show(input.value, "user");
        reply(input.value);
        input.value = "";
    }
};

input.onkeypress = (e) => { if (e.key === 'Enter') btn.onclick(); };
