const app = document.getElementById("app");

const STORAGE_KEY = "aura_unlocked_activities";
const COMPLETED_KEY = "aura_completed_activities";
const CONTRACTS_KEY = "aura_signed_contracts";
const DEV_ACCESS_KEY = "aura_dev_access";

let screen = "loading";
let currentAudio = null;

window.addEventListener("load", () => {
    if (localStorage.getItem(DEV_ACCESS_KEY) === "true") {
        screen = "welcome";
        render();
        return;
    }

    renderComingSoonScreen();
});

window.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "a") {
        const developerArea = document.getElementById("developerArea");
        const devPassword = document.getElementById("devPassword");

        if (developerArea && devPassword) {
            developerArea.hidden = false;
            devPassword.focus();
        }
    }
});

function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
}

function readStorageArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function getUnlockedActivities() {
    return readStorageArray(STORAGE_KEY).map(String);
}

function isActivityUnlocked(activity) {
    return activity.status !== "locked" || getUnlockedActivities().includes(String(activity.id));
}

function saveUnlockedActivity(activity) {
    const unlockedIds = new Set(getUnlockedActivities());
    unlockedIds.add(String(activity.id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlockedIds]));
}

function getCompletedActivities() {
    return readStorageArray(COMPLETED_KEY);
}

function isActivityCompleted(activity) {
    return getCompletedActivities().includes(activity.id);
}

function saveCompletedActivity(activity) {
    const completed = getCompletedActivities();

    if (!completed.includes(activity.id)) {
        completed.push(activity.id);
    }

    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
}

function getSignedContracts() {
    return readStorageArray(CONTRACTS_KEY);
}

function isContractSigned(activity) {
    return getSignedContracts().includes(activity.id);
}

function saveSignedContract(activity) {
    const signed = getSignedContracts();

    if (!signed.includes(activity.id)) {
        signed.push(activity.id);
    }

    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(signed));
}

function getProgress() {
    if (!activities.length) return 0;
    return Math.round((getCompletedActivities().length / activities.length) * 100);
}

function getActivityDisplayTitle(activity) {
    return activity.activityTitle || activity.agendaTitle || "Actividad";
}

function render() {
    if (screen === "loading") {
        app.innerHTML = `
            <main class="loading-screen ambient-screen">
                <div class="orb orb-large" aria-hidden="true"></div>
                <div class="logo">AURA</div>
                <p class="subtitle">Preparando tu experiencia...</p>
                <div class="loading-meter" aria-hidden="true">
                    <span></span>
                </div>
            </main>`;
        return;
    }

    if (screen === "welcome") {
        renderWelcome();
    }
}

function renderWelcome() {
    app.innerHTML = `
        <main class="welcome-screen ambient-screen screen-enter">
            <div class="top-mark">AURA</div>

            <section class="hero-card">
                <p class="eyebrow accent">Experiencia privada</p>
                <h1>Bienvenido</h1>
                <p>
                    No estás a punto de abrir una aplicación. Estás a punto de entrar en una experiencia creada solo para vosotros.
                </p>
                <p>
                    Sigue el orden, respira el momento y deja que cada detalle aparezca cuando tenga que aparecer.
                </p>
            </section>

            <section class="card intro-rules">
                <h2>Antes de empezar</h2>
                <ul>
                    <li>Sigue el orden de las actividades.</li>
                    <li>Algunas puertas necesitarán contraseña.</li>
                    <li>La agenda se actualizará a medida que avances.</li>
                </ul>
            </section>

            <div class="action-stack">
                <button class="primary-button" id="agendaButton" type="button">Comenzar la aventura</button>
                <button class="secondary-button" id="challengesButton" type="button">Abrir retos</button>
            </div>
        </main>
    `;

    document.getElementById("agendaButton").addEventListener("click", renderAgenda);
    document.getElementById("challengesButton").addEventListener("click", renderChallenges);
}

function getVisibleActivities() {
    return activities.filter((activity, index) => {
        if (index === 0) return true;
        return isActivityCompleted(activities[index - 1]);
    });
}

function renderAgenda() {
    stopAudio();
    screen = "agenda";

    const completed = getCompletedActivities().length;
    const progress = getProgress();
    const visibleActivities = getVisibleActivities();

    const cards = visibleActivities.map((activity) => {
        const index = activities.indexOf(activity);
        const unlocked = isActivityUnlocked(activity);
        const completedActivity = isActivityCompleted(activity);
        const stateLabel = completedActivity ? "Completada" : unlocked ? "Disponible" : "Bloqueada";
        const stateClass = completedActivity ? "is-completed" : unlocked ? "is-unlocked" : "is-locked";
        const icon = completedActivity ? "✓" : unlocked ? "→" : lockSvg();

        return `
            <button class="card activity-card ${stateClass}" data-activity-index="${index}" type="button" aria-label="${activity.agendaTitle}, ${stateLabel}">
                <span class="card-copy">
                    <span class="time">${activity.time}</span>
                    <span class="title">${activity.agendaTitle}</span>
                    <span class="state">${stateLabel}</span>
                </span>
                <span class="status-icon" aria-hidden="true">${icon}</span>
            </button>`;
    }).join("");

    app.innerHTML = `
        <main class="agenda app-screen screen-enter">
            ${renderAppHeader("Tu experiencia", "Agenda")}

            <section class="progress-panel" aria-label="Progreso de la experiencia">
                <div class="progress-copy">
                    <span>${progress}% completado</span>
                    <span>${completed}/${activities.length}</span>
                </div>
                <div class="progress">
                    <div class="progress-value" style="width:${progress}%"></div>
                </div>
            </section>

            <section class="activity-list">${cards}</section>

            ${renderBottomNav("agenda")}
        </main>`;

    document.querySelectorAll("[data-activity-index]").forEach((card) => {
        card.addEventListener("click", () => handleActivitySelection(Number(card.dataset.activityIndex)));
    });

    attachBottomNavEvents();
}

function handleActivitySelection(index) {
    const activity = activities[index];

    if (isActivityUnlocked(activity)) {
        openActivity(index);
        return;
    }

    renderUnlockScreen(index);
}

function renderUnlockScreen(index) {
    stopAudio();
    const activity = activities[index];

    app.innerHTML = `
        <main class="unlock-screen ambient-screen screen-enter">
            <button class="back-button" id="backButton" type="button" aria-label="Volver a la agenda">
                <span aria-hidden="true">‹</span> Volver
            </button>

            <section class="unlock-panel" aria-labelledby="unlockTitle">
                <div class="lock-icon" aria-hidden="true">${lockSvg()}</div>
                <p class="eyebrow accent">Actividad bloqueada</p>
                <h1 id="unlockTitle">${activity.agendaTitle}</h1>
                <p class="unlock-hint">Introduce la contraseña para continuar.</p>

                <form id="unlockForm" novalidate>
                    <label class="sr-only" for="passwordInput">Contraseña</label>
                    <input id="passwordInput" name="password" type="password" placeholder="Contraseña"
                           autocomplete="off" autocapitalize="none" spellcheck="false" enterkeyhint="go" required>
                    <p class="error-message" id="passwordError" role="alert" aria-live="polite"></p>
                    <button class="primary-button unlock-button" type="submit">Desbloquear</button>
                </form>
            </section>
        </main>`;

    document.getElementById("backButton").addEventListener("click", renderAgenda);
    document.getElementById("unlockForm").addEventListener("submit", (event) => {
        event.preventDefault();
        verifyPassword(index);
    });

    requestAnimationFrame(() => document.getElementById("passwordInput").focus());
}

function verifyPassword(index) {
    const activity = activities[index];
    const form = document.getElementById("unlockForm");
    const input = document.getElementById("passwordInput");
    const error = document.getElementById("passwordError");

    if (input.value === activity.password) {
        saveUnlockedActivity(activity);
        openActivity(index);
        return;
    }

    error.textContent = "Contraseña incorrecta";
    input.setAttribute("aria-invalid", "true");
    form.classList.remove("has-error");
    void form.offsetWidth;
    form.classList.add("has-error");
    input.select();
}

function openActivity(index) {
    stopAudio();
    const activity = activities[index];
    const contractAccepted = isContractSigned(activity);
    const rules = activity.rules.length
        ? activity.rules.map((rule) => `<li>${rule}</li>`).join("")
        : "<li>Disfruta la actividad con calma y sigue el ritmo de la experiencia.</li>";

    app.innerHTML = `
        <main class="activity app-screen screen-enter">
            <button class="back-button" id="activityBackButton" type="button">
                <span aria-hidden="true">‹</span> Volver
            </button>

            <p class="eyebrow accent">${activity.time}</p>
            <h1>${getActivityDisplayTitle(activity)}</h1>

            <section class="card content-card">
                <div class="section-row">
                    <h2>Explicación</h2>
                    <span aria-hidden="true">›</span>
                </div>
                <p>${activity.explanation || "Esta parte de la experiencia está reservada. Cuando llegue el momento, aquí aparecerán las instrucciones."}</p>
            </section>

            <section class="card content-card">
                <div class="section-row">
                    <h2>Normas</h2>
                    <span aria-hidden="true">›</span>
                </div>
                <ul>${rules}</ul>
            </section>

            ${activity.contract ? `
                <section class="card content-card">
                    <h2>Contrato</h2>
                    <p class="contract-status ${contractAccepted ? "is-signed" : ""}">
                        ${contractAccepted ? "Firmado" : "Pendiente"}
                    </p>
                    <button class="primary-button compact-button" id="viewContractButton" type="button">Ver contrato</button>
                </section>` : ""}

            ${activity.music ? `
                <section class="card content-card">
                    <h2>Música</h2>
                    <button class="secondary-button media-button" id="playMusicButton" type="button">Reproducir música</button>
                </section>` : ""}

            ${activity.image ? `
                <section class="card content-card">
                    <h2>Imagen</h2>
                    <button class="secondary-button media-button" id="viewImageButton" type="button">Ver imagen</button>
                </section>` : ""}

            <button class="primary-button continue-button" id="completeButton" type="button" ${activity.contract && !contractAccepted ? "disabled" : ""}>
                ${activity.contract && !contractAccepted ? "Firma el contrato para continuar" : "Completar actividad"}
            </button>
        </main>
    `;

    document.getElementById("activityBackButton").addEventListener("click", renderAgenda);

    if (activity.contract) {
        document.getElementById("viewContractButton").addEventListener("click", () => renderContractScreen(activity));
    }

    if (activity.music) {
        attachMusicPlayer(activity);
    }

    if (activity.image) {
        document.getElementById("viewImageButton").addEventListener("click", () => renderImageScreen(activity));
    }

    document.getElementById("completeButton").addEventListener("click", () => {
        saveCompletedActivity(activity);

        if (index === activities.length - 1) {
            renderFinalScreen();
        } else {
            renderCompletedScreen();
        }
    });
}

function attachMusicPlayer(activity) {
    const musicButton = document.getElementById("playMusicButton");
    currentAudio = new Audio(activity.music);

    musicButton.addEventListener("click", () => {
        if (currentAudio.paused) {
            currentAudio.play();
            musicButton.textContent = "Pausar música";
        } else {
            currentAudio.pause();
            musicButton.textContent = "Reproducir música";
        }
    });
}

function renderCompletedScreen() {
    stopAudio();

    app.innerHTML = `
        <main class="complete-screen ambient-screen screen-enter">
            <div class="success-ring" aria-hidden="true">✓</div>
            <h1>Actividad completada</h1>
            <p>Una nueva parte de la aventura ya está preparada para ti.</p>
            <button class="primary-button" id="continueAdventure" type="button">Continuar</button>
        </main>
    `;

    document.getElementById("continueAdventure").addEventListener("click", renderAgenda);
}

function renderContractScreen(activity) {
    stopAudio();

    app.innerHTML = `
        <main class="activity app-screen screen-enter">
            <button class="back-button" id="contractBackButton" type="button">
                <span aria-hidden="true">‹</span> Volver
            </button>

            <section class="contract-card">
                <p class="eyebrow accent">Contrato de la experiencia</p>
                <h1>Acepto estar presente</h1>
                <p>${activity.contract}</p>
                <ul>
                    <li>Seguir el orden de las actividades.</li>
                    <li>No saltarme ninguna parte de la experiencia.</li>
                    <li>Vivir cada momento con presencia y emoción.</li>
                    <li>Disfrutar y dejarme sorprender.</li>
                </ul>
            </section>

            <button class="primary-button" id="agreeButton" type="button">Acepto y firmo</button>
        </main>
    `;

    document.getElementById("contractBackButton").addEventListener("click", () => openActivity(activities.indexOf(activity)));
    document.getElementById("agreeButton").addEventListener("click", () => {
        saveSignedContract(activity);
        openActivity(activities.indexOf(activity));
    });
}

function renderImageScreen(activity) {
    stopAudio();

    app.innerHTML = `
        <main class="activity app-screen screen-enter">
            <button class="back-button" id="imageBackButton" type="button">
                <span aria-hidden="true">‹</span> Volver
            </button>

            <figure class="image-frame">
                <img src="${activity.image}" alt="Imagen de la actividad">
            </figure>
        </main>
    `;

    document.getElementById("imageBackButton").addEventListener("click", () => openActivity(activities.indexOf(activity)));
}

function renderProgressScreen() {
    stopAudio();
    const completed = getCompletedActivities().length;
    const progress = getProgress();
    const unlocked = activities.filter(isActivityUnlocked).length;
    const pending = Math.max(activities.length - completed, 0);

    app.innerHTML = `
        <main class="progress-screen app-screen screen-enter">
            ${renderAppHeader("Tu progreso", `${progress}%`)}

            <section class="progress-orbit" aria-label="${progress}% completado">
                <div class="orbit-track" style="--progress:${progress * 3.6}deg">
                    <span>${progress}%</span>
                    <small>Completado</small>
                </div>
            </section>

            <section class="card stats-card">
                <p><span>${completed}</span> actividades completadas</p>
                <p><span>${unlocked}</span> actividades disponibles</p>
                <p><span>${pending}</span> partes por descubrir</p>
            </section>

            ${renderBottomNav("progress")}
        </main>
    `;

    attachBottomNavEvents();
}

function renderFinalScreen() {
    stopAudio();

    app.innerHTML = `
        <main class="complete-screen ambient-screen screen-enter">
            <div class="top-mark">AURA</div>
            <h1>Gracias</h1>
            <p>Has llegado al final de esta experiencia. Ojalá cada paso haya dejado una pequeña huella.</p>
            <button class="primary-button" id="restartButton" type="button">Volver al inicio</button>
        </main>
    `;

    document.getElementById("restartButton").addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}

function renderComingSoonScreen() {
    app.innerHTML = `
        <main class="welcome-screen ambient-screen screen-enter">
            <div class="top-mark" id="secretLogo">AURA</div>
            <section class="hero-card">
                <p class="eyebrow accent">Próximamente</p>
                <h1>Algo está tomando forma</h1>
                <p>Estoy preparando una experiencia muy especial para ti. Muy pronto podrás descubrirla.</p>
            </section>

            <button id="developerButton" class="ghost-button" type="button">Zona desarrolladora</button>

            <div id="developerArea" class="developer-area" hidden>
                <label class="sr-only" for="devPassword">Contraseña</label>
                <input id="devPassword" type="password" placeholder="Contraseña">
                <button class="primary-button" id="unlockDev" type="button">Entrar</button>
            </div>
        </main>
    `;

    let timer;
    const logo = document.getElementById("secretLogo");
    const developerArea = document.getElementById("developerArea");

    const revealDeveloperArea = () => {
        developerArea.hidden = false;
        document.getElementById("devPassword").focus();
    };

    logo.addEventListener("mousedown", () => {
        timer = setTimeout(revealDeveloperArea, 1600);
    });
    logo.addEventListener("mouseup", () => clearTimeout(timer));
    logo.addEventListener("mouseleave", () => clearTimeout(timer));
    logo.addEventListener("touchstart", () => {
        timer = setTimeout(revealDeveloperArea, 1600);
    }, { passive: true });
    logo.addEventListener("touchend", () => clearTimeout(timer));

    document.getElementById("developerButton").addEventListener("click", revealDeveloperArea);
    document.getElementById("unlockDev").addEventListener("click", unlockDeveloperAccess);
    document.getElementById("devPassword").addEventListener("keydown", (event) => {
        if (event.key === "Enter") unlockDeveloperAccess();
    });
}

function unlockDeveloperAccess() {
    if (document.getElementById("devPassword").value !== "Ripollet74") {
        return;
    }

    localStorage.setItem(DEV_ACCESS_KEY, "true");
    screen = "loading";
    render();

    setTimeout(() => {
        screen = "welcome";
        render();
    }, 1400);
}

function renderAppHeader(eyebrow, title) {
    return `
        <header class="app-header">
            <div>
                <p class="eyebrow">${eyebrow}</p>
                <h1>${title}</h1>
            </div>
            <div class="mini-logo" aria-hidden="true">AURA</div>
        </header>`;
}

function renderBottomNav(active) {
    return `
        <nav class="bottom-nav" aria-label="Navegación principal">
            <button class="${active === "agenda" ? "active" : ""}" data-nav="agenda" type="button">
                <span aria-hidden="true">${calendarSvg()}</span>
                Agenda
            </button>
            <button class="${active === "challenges" ? "active" : ""}" data-nav="challenges" type="button">
                <span aria-hidden="true">${targetSvg()}</span>
                Retos
            </button>
            <button class="${active === "progress" ? "active" : ""}" data-nav="progress" type="button">
                <span aria-hidden="true">${pulseSvg()}</span>
                Progreso
            </button>
        </nav>`;
}

function attachBottomNavEvents() {
    document.querySelectorAll("[data-nav]").forEach((button) => {
        button.addEventListener("click", () => {
            if (button.dataset.nav === "agenda") renderAgenda();
            if (button.dataset.nav === "challenges") renderChallenges();
            if (button.dataset.nav === "progress") renderProgressScreen();
        });
    });
}

function lockSvg() {
    return `
        <svg viewBox="0 0 24 24" role="img" aria-label="Bloqueada">
            <rect x="5" y="10" width="14" height="10" rx="3"></rect>
            <path d="M8.5 10V7.6a3.5 3.5 0 0 1 7 0V10"></path>
        </svg>`;
}

function calendarSvg() {
    return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="5" width="16" height="15" rx="3"></rect>
            <path d="M8 3v4M16 3v4M4 10h16"></path>
        </svg>`;
}

function targetSvg() {
    return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="7"></circle>
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path>
        </svg>`;
}

function pulseSvg() {
    return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 13h3l2-6 4 12 2-6h5"></path>
        </svg>`;
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js")
            .then(() => console.log("Service Worker registrado correctamente."))
            .catch((error) => console.error("Error registrando Service Worker:", error));
    });
}
