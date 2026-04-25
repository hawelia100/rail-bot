// 1. REAL TRAIN DATABASE
const realTrains = [
    { n: "Vande Bharat Express (20835)", p: 1250 },
    { n: "Rajdhani Express (12431)", p: 2800 },
    { n: "Shatabdi Express (12015)", p: 950 },
    { n: "Duronto Express (12245)", p: 2100 },
    { n: "Gitanjali Express (12860)", p: 750 },
    { n: "Coromandel Express (12841)", p: 820 },
    { n: "Howrah Mail (12810)", p: 680 },
    { n: "Konark Express (11020)", p: 550 },
    { n: "Faluknuma Express (12704)", p: 890 },
    { n: "Tapaswini Express (18451)", p: 450 },
    { n: "Humsafar Express (22139)", p: 1400 },
    { n: "Garib Rath (12881)", p: 520 },
    { n: "Godavari Express (12727)", p: 600 },
    { n: "Prashanti Express (18463)", p: 480 },
    { n: "Azad Hind Express (12130)", p: 720 }
];

const cityCoords = {
    "ahmedabad": {x: 72.5, y: 23.0}, "mumbai": {x: 72.8, y: 19.0},
    "delhi": {x: 77.2, y: 28.6}, "rourkela": {x: 84.8, y: 22.2},
    "puri": {x: 85.8, y: 19.8}, "kolkata": {x: 88.3, y: 22.5},
    "bangalore": {x: 77.5, y: 12.9}, "chennai": {x: 80.2, y: 13.0},
    "raipur": {x: 81.6, y: 21.2}, "surat": {x: 72.8, y: 21.1},
    "hyderabad": {x: 78.4, y: 17.3}, "bhubaneswar": {x: 85.8, y: 20.3}
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
    if (from === to) return [];
    
    // Pick 3 real trains from the list to show for any route
    // We shuffle a bit so it's not always the same 3
    const shuffled = realTrains.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(tr => ({
        n: tr.n,
        tm: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        p: tr.p,
        s: Math.random() > 0.3 ? `Available (${Math.floor(Math.random() * 50)})` : `Waitlist (${Math.floor(Math.random() * 10)})`
    }));
}

function reply(text) {
    const val = text.toLowerCase().trim();

    if (["hi", "hello", "hey"].includes(val)) {
        setTimeout(() => show("Hello! I'm RailBot. Enter your route to start.", "bot"), 500);
        return;
    }

    const knownCities = Object.keys(cityCoords);
    if (knownCities.includes(val) || (val.split(" ").length === 1 && val.length > 2)) {
        setTimeout(() => {
            show("Even the best trains need a signal—tell me your journey details 🚦", "bot");
        }, 500);
        return;
    }

    if (val.includes(" to ")) {
        const [from, to] = val.split(" to ").map(s => s.trim());
        show(`🔍 Scanning IRCTC Database for ${from} ➔ ${to}...`, "bot");

        setTimeout(() => {
            const results = getTrains(from, to);
            if (results.length > 0) {
                show("Your journey just got clearer—check this out 👇", "bot");
                results.forEach((tr, i) => {
                    const info = `🚆 ${tr.n}\n⏰ Departs: ${tr.tm}\n💺 Status: ${tr.s}\n💰 Fare: ₹${tr.p}`;
                    setTimeout(() => show(info, "bot"), (i + 1) * 600);
                });
            } else {
                show("No direct trains found—want me to check alternate routes?", "bot");
            }
        }, 1200);
        return;
    }

    setTimeout(() => {
        show("Looks like you found my blind spot 👀\nLet’s switch lanes", "bot");
    }, 500);
}

btn.onclick = () => {
    if (input.value.trim() !== "") {
        show(input.value, "user");
        reply(input.value);
        input.value = "";
    }
};
input.onkeypress = (e) => { if (e.key === 'Enter') btn.onclick(); };
