// views/sexCounterView.js

function loadSexStats() {
    return JSON.parse(localStorage.getItem('sexStats')) || {
        totalFucks: 0,
        hisCum: 0,
        herCum: 0
    };
}

function saveSexStats(stats) {
    localStorage.setItem('sexStats', JSON.stringify(stats));
}

function renderSexCounter() {
    let stats = loadSexStats();

    let html = `
        <main class="stats-screen app-screen screen-enter">
            <button class="back-button" onclick="renderMoreMenu()">← Volver</button>
            <div class="app-header">
                <h1>Contador de Polvos 🔥</h1>
            </div>
            <div style="padding:20px; display:flex; flex-direction:column; gap:15px;">
                <div class="stat-card">
                    <h2>Polvos completos</h2>
                    <p class="big-number">${stats.totalFucks}</p>
                    <button onclick="addFuck()">+1 Polvo</button>
                </div>
                <div class="stat-card">
                    <h2>Corridas de él</h2>
                    <p class="big-number">${stats.hisCum}</p>
                    <button onclick="addHisCum()">+1</button>
                </div>
                <div class="stat-card">
                    <h2>Corridas de ella</h2>
                    <p class="big-number">${stats.herCum}</p>
                    <button onclick="addHerCum()">+1</button>
                </div>
            </div>
            ${renderBottomNav("more")}
        </main>
    `;

    app.innerHTML = html;
}

function addFuck() {
    let stats = loadSexStats();
    stats.totalFucks++;
    saveSexStats(stats);
    renderSexCounter();
}

function addHisCum() {
    let stats = loadSexStats();
    stats.hisCum++;
    saveSexStats(stats);
    renderSexCounter();
}

function addHerCum() {
    let stats = loadSexStats();
    stats.herCum++;
    saveSexStats(stats);
    renderSexCounter();
}

window.renderSexCounter = renderSexCounter;