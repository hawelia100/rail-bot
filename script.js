const realTrains = [
    { n: "Vande Bharat Express (20835)", p: 1250 },
    { n: "Rajdhani Express (12431)", p: 2800 },
    { n: "Shatabdi Express (12015)", p: 950 },
    { n: "Tapaswini Express (18451)", p: 450 },
    { n: "Howrah Mail (12810)", p: 680 }
];

const cityCoords = {
    "ahmedabad": {x: 72, y: 23}, "mumbai": {x: 72, y: 19},
    "delhi": {x: 77, y: 28}, "rourkela": {x: 84, y: 22},
    "puri": {x: 85, y: 19}, "kolkata": {x: 88, y: 22},
    "raipur": {x: 81, y: 21}, "surat": {x: 72, y: 21}
};

const box = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const btn = document.getElementById('send-btn');

function show(msg, type, isPremium = false) {
    const d = document.createElement('div');
    d.className = `message ${type}-message ${isPremium ? 'premium-result' : ''}`;
    d.innerText = msg;
    box.appendChild(d);
    box.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
}

function getTrains(from, to) {
    const shuffled = [...realTrains].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(tr => ({
        n: tr.n,
        tm: `${Math.floor(Math.random() * 12) + 1}:30 PM`,
        p: tr.p,
        s: Math.random() > 0.3 ? `Available` : `Waitlist`
    }));
}

function reply(text) {
    const val = text.toLowerCase().trim();

    // 1. GREETING
    if (["hi", "hello", "hey"].includes(val)) {
        setTimeout(() => show("RailBot Online. Secure Line Active.", "bot"), 500);
        return;
    }

    // 2. SINGLE PLACE CHECK
    const knownCities = Object.keys(cityCoords);
    if (knownCities.includes(val) || (val.split(" ").length === 1 && val.length > 2)) {
        setTimeout(() => show("Even the best trains need a signal—tell me your journey details 🚦", "bot"), 500);
        return;
    }

    // 3. SEARCH LOGIC
    if (val.includes(" to ")) {
        const [from, to] = val.split(" to ").map(s => s.trim());
        
        // FAKE HANDSHAKE
        show(`📡 Establishing Encrypted Link to Central Server...`, "bot");

        setTimeout(() => {
            show(`🔑 Authentication Successful. Pulling Live Berths...`, "bot");
            document.body.style.boxShadow = "inset 0 0 100px rgba(212, 175, 55, 0.15)";

            setTimeout(() => {
                const results = getTrains(from, to);
                if (results.length > 0 && from !== to) {
                    show("Your journey just got clearer—check this out 👇", "bot");
                    
                    results.forEach((tr, i) => {
                        // Dynamic Price Logic: Fare changes every minute to look "Live"
                        const dynamicPrice = tr.p + (new Date().getMinutes() * 2);
                        const info = `🚆 ${tr.n}\n⏰ Departs: ${tr.tm}\n💺 Status: ${tr.s}\n💰 Current Fare: ₹${dynamicPrice}`;
                        
                        setTimeout(() => show(info, "bot", true), (i + 1) * 700);
                    });
                } else {
                    show("No direct trains found—want me to check alternate routes?", "bot");
                }
            }, 1200);
        }, 1000);
        return;
    }

    // 4. BLIND SPOT
    setTimeout(() => show("Looks like you found my blind spot 👀\nLet’s switch lanes", "bot"), 500);
}

btn.onclick = () => {
    if (input.value.trim() !== "") {
        show(input.value, "user");
        reply(input.value);
        input.value = "";
    }
};
input.onkeypress = (e) => { if (e.key === 'Enter') btn.onclick(); };
