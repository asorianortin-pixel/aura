const CHALLENGES_KEY = "aura_accepted_challenges";
const CURRENT_CHALLENGE_KEY = "aura_current_challenge";
const LAST_CHALLENGE_KEY = "aura_last_challenge";

let filtersVisible = false;
let selectedLevel = "all";

const LEVELS = [
    { id: "all", label: "Todos" },
    { id: "soft", label: "Suaves" },
    { id: "hard", label: "Intensos" },
    { id: "extreme", label: "Extremos" },
    { id: "forbidden", label: "Prohibidos" }
];

function getAcceptedChallenges() {
    try {
        const accepted = JSON.parse(localStorage.getItem(CHALLENGES_KEY) || "[]");
        return Array.isArray(accepted) ? accepted : [];
    } catch {
        return [];
    }
}

function saveAcceptedChallenge(id) {
    const accepted = getAcceptedChallenges();

    if (!accepted.includes(id)) {
        accepted.push(id);
    }

    localStorage.setItem(CHALLENGES_KEY, JSON.stringify(accepted));
}

function getCurrentChallenge() {
    try {
        return JSON.parse(localStorage.getItem(CURRENT_CHALLENGE_KEY));
    } catch {
        return null;
    }
}

function saveCurrentChallenge(challenge) {
    localStorage.setItem(CURRENT_CHALLENGE_KEY, JSON.stringify(challenge));
}

function getLastChallenge() {
    return Number(localStorage.getItem(LAST_CHALLENGE_KEY));
}

function saveLastChallenge(id) {
    localStorage.setItem(LAST_CHALLENGE_KEY, id);
}

function getRandomChallenge() {
    const accepted = getAcceptedChallenges();
    const lastChallenge = getLastChallenge();

    let available = challenges.filter((challenge) => {
        if (accepted.includes(challenge.id)) return false;
        if (selectedLevel !== "all" && challenge.level !== selectedLevel) return false;
        return true;
    });

    if (available.length > 1) {
        available = available.filter((challenge) => challenge.id !== lastChallenge);
    }

    if (!available.length) return null;

    return available[Math.floor(Math.random() * available.length)];
}

function nextChallenge() {
    const challenge = getRandomChallenge();

    if (!challenge) {
        renderCompletedChallenges();
        return;
    }

    saveCurrentChallenge(challenge);
    saveLastChallenge(challenge.id);
    renderChallenges();
}

function acceptCurrentChallenge() {
    const challenge = getCurrentChallenge();
    if (!challenge) return;

    saveAcceptedChallenge(challenge.id);
    nextChallenge();
}

function renderCompletedChallenges() {
    app.innerHTML = `
        <main class="complete-screen ambient-screen screen-enter">
            <div class="success-ring" aria-hidden="true">✓</div>
            <h1>Retos completados</h1>
            <p>Has completado todos los retos disponibles. Esta parte de AURA queda guardada como un pequeño secreto más.</p>
            <div class="action-stack">
                <button class="primary-button" id="restartChallenges" type="button">Vivirlos de nuevo</button>
                <button class="secondary-button" id="backHome" type="button">Volver al inicio</button>
            </div>
        </main>
    `;

    document.getElementById("restartChallenges").addEventListener("click", () => {
        localStorage.removeItem(CHALLENGES_KEY);
        localStorage.removeItem(CURRENT_CHALLENGE_KEY);
        localStorage.removeItem(LAST_CHALLENGE_KEY);
        selectedLevel = "all";
        filtersVisible = false;
        renderChallenges();
    });

    document.getElementById("backHome").addEventListener("click", () => {
        screen = "welcome";
        render();
    });
}

function renderChallenges() {
    let challenge = getCurrentChallenge();
    const accepted = getAcceptedChallenges();

    if (!challenge || accepted.includes(challenge.id)) {
        challenge = getRandomChallenge();

        if (challenge) {
            saveCurrentChallenge(challenge);
        }
    }

    if (!challenge) {
        renderCompletedChallenges();
        return;
    }

    app.innerHTML = `
        <main class="challenges-screen app-screen screen-enter">
            ${window.renderAppHeader("Retos", "Acepta o descarta")}

            <button id="toggleFilters" class="filter-toggle" type="button">
                ${targetSvg()} Filtrar retos
            </button>

            <section id="filtersPanel" class="filters-panel" ${filtersVisible ? "" : "hidden"}>
                <p>Nivel</p>
                <div>
                    ${LEVELS.map((level) => `
                        <button class="filter-chip" data-level="${level.id}" type="button">${level.label}</button>
                    `).join("")}
                </div>
            </section>

            <section class="challenge-card card">
                <p class="eyebrow accent">Reto aleatorio</p>
                <div class="challenge-orb" aria-hidden="true">
                    ${targetSvg()}
                </div>
                <h2>${challenge.title}</h2>
                <p>${challenge.description}</p>
                <div class="reward">
                    <span>Recompensa</span>
                    <strong>+${challenge.points} puntos</strong>
                </div>
            </section>

            <div class="challenge-actions">
                <button id="discardChallenge" class="decision-button discard" type="button" aria-label="Descartar reto">×</button>
                <button id="acceptChallenge" class="decision-button accept" type="button" aria-label="Aceptar reto">✓</button>
            </div>

            ${window.renderBottomNav("challenges")}
        </main>
    `;

    document.getElementById("toggleFilters").addEventListener("click", () => {
        filtersVisible = !filtersVisible;
        renderChallenges();
    });

    document.getElementById("acceptChallenge").addEventListener("click", acceptCurrentChallenge);
    document.getElementById("discardChallenge").addEventListener("click", nextChallenge);

    document.querySelectorAll(".filter-chip").forEach((chip) => {
        if (chip.dataset.level === selectedLevel) {
            chip.classList.add("active");
        }

        chip.addEventListener("click", () => {
            selectedLevel = chip.dataset.level;
            localStorage.removeItem(CURRENT_CHALLENGE_KEY);
            renderChallenges();
        });
    });

   window.attachBottomNavEvents();
}
