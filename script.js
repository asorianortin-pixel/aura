const app = document.getElementById("app");
const STORAGE_KEY = "aura_unlocked_activities";
const COMPLETED_KEY = "aura_completed_activities";
let screen = "loading";

render();

setTimeout(() => {
    screen = "welcome";
    render();
}, 2500);

function getUnlockedActivities() {
    try {
        const storedIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(storedIds) ? storedIds.map(String) : [];
    } catch {
        return [];
    }
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
    try {
        return JSON.parse(localStorage.getItem(COMPLETED_KEY) || "[]");
    } catch {
        return [];
    }
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

function render() {
    if (screen === "loading") {
        app.innerHTML = `
            <main class="loading-screen">
                <div class="logo">AURA</div>
                <div class="subtitle">Preparando tu experiencia...</div>
            </main>`;
        return;
    }

   if (screen === "welcome") {

    app.innerHTML = `
        <main class="welcome-screen screen-enter">

            <div class="logo">AURA</div>

            <h2 style="margin-top:30px;">Bienvenido</h2>

            <p style="margin-top:25px;line-height:1.8;max-width:340px;">

                No estás a punto de abrir una aplicación.

                <br><br>

                Estás a punto de vivir una experiencia creada exclusivamente para ti.

                <br><br>

                No tengas prisa.

                Sigue cada paso.

                Y disfruta del momento.

            </p>

            <div class="card" style="margin-top:35px;text-align:left;max-width:340px;">

                <strong>Antes de empezar:</strong>

                <br><br>

                • Sigue el orden de las actividades.<br><br>

                • Algunas necesitarán una contraseña.<br><br>

                • La siguiente actividad aparecerá cuando completes la anterior.

            </div>

            <button
                class="primary-button"
                id="startButton"
                style="margin-top:40px;">

                Comenzar la aventura

            </button>

        </main>
    `;

    document
        .getElementById("startButton")
        .addEventListener("click", renderAgenda);

        return;
}

}

function renderAgenda() {
    screen = "agenda";

    const visibleActivities = activities.filter((activity, index) => {

    if (index === 0) return true;

    const previous = activities[index - 1];

    return isActivityCompleted(previous);

});

const cards = visibleActivities.map((activity) => {

    const index = activities.indexOf(activity);
        const unlocked = isActivityUnlocked(activity);
        const stateClass = unlocked ? "is-unlocked" : "is-locked";
        const stateLabel = unlocked ? "Disponible" : "Bloqueada";

        return `
            <button class="card activity-card ${stateClass}" data-activity-index="${index}" type="button"
                    aria-label="${activity.agendaTitle}, ${stateLabel}">
                <span class="card-copy">
                    <span class="time">${activity.time}</span>
                    <span class="title">${activity.agendaTitle}</span>
                </span>
                <span class="status-icon" aria-hidden="true">${unlocked ? "✓" : "⌾"}</span>
            </button>`;
    }).join("");

    app.innerHTML = `
        <main class="agenda screen-enter">
            <p class="eyebrow">Tu experiencia</p>
            <h1>Agenda</h1>
            <div class="progress" aria-label="Progreso de la experiencia">
                <div class="progress-value"></div>
            </div>
            <div class="activity-list">${cards}</div>
        </main>`;

    document.querySelectorAll("[data-activity-index]").forEach((card) => {
        card.addEventListener("click", () => handleActivitySelection(Number(card.dataset.activityIndex)));
    });
}

function handleActivitySelection(index) {
    const activity = activities[index];
    if (isActivityUnlocked(activity)) {
        openActivity(index);
    } else {
        renderUnlockScreen(index);
    }
}

function renderUnlockScreen(index) {
    const activity = activities[index];

    app.innerHTML = `
        <main class="unlock-screen screen-enter">
            <button class="back-button" id="backButton" type="button" aria-label="Volver a la agenda">
                <span aria-hidden="true">‹</span> Volver
            </button>

            <section class="unlock-panel" aria-labelledby="unlockTitle">
                <div class="lock-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" role="img">
                        <rect x="5" y="10" width="14" height="11" rx="3"></rect>
                        <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10"></path>
                    </svg>
                </div>
                <p class="eyebrow">Actividad bloqueada</p>
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
    const activity = activities[index];
    const rules = activity.rules.map((rule) => `<li>${rule}</li>`).join("");

    app.innerHTML = `
        <main class="activity screen-enter">

            <button class="back-button" id="activityBackButton" type="button">
                <span aria-hidden="true">‹</span> Volver
            </button>

            <p class="eyebrow">${activity.time}</p>

            <h1>${activity.activityTitle}</h1>

            <section class="card content-card">
                <h2>Explicación</h2>
                <p>${activity.explanation}</p>
            </section>

            <section class="card content-card">
                <h2>Normas</h2>
                <ul>${rules}</ul>
            </section>
            ${activity.contract ? `
<section class="card content-card">

    <h2>Contrato</h2>

    <p id="contractStatus">
    ${activity.contractAccepted ? "✅ Firmado" : "⭕ Pendiente"}
</p>

    <button
        class="primary-button"
        id="viewContractButton"
        type="button">

        Ver contrato

    </button>

</section>
` : ""}
${activity.music ? `
<section class="card content-card">

    <h2>Música</h2>

    <button
        class="primary-button"
        id="playMusicButton"
        type="button">

        🎵 Reproducir música

    </button>

</section>
` : ""}
${activity.image ? `
<section class="card content-card">

    <h2>Imagen</h2>

    <button
        class="primary-button"
        id="viewImageButton"
        type="button">

        🖼️ Ver imagen

    </button>

</section>
` : ""}

            <button
    class="primary-button continue-button"
    id="completeButton"
    type="button"
    ${activity.contract && !activity.contractAccepted ? "disabled" : ""}>

    ${activity.contract && !activity.contractAccepted
        ? "Firma el contrato para continuar"
        : "Completar actividad"}

</button>
        </main>
    `;

    document
        .getElementById("activityBackButton")
        .addEventListener("click", renderAgenda);
if (activity.contract) {

    document
        .getElementById("viewContractButton")
        .addEventListener("click", () => {

            renderContractScreen(activity);

        });

}
if (activity.music) {

    const musicButton = document.getElementById("playMusicButton");
    const audio = new Audio(activity.music);

    musicButton.addEventListener("click", () => {

        if (audio.paused) {
            audio.play();
            musicButton.textContent = "⏸️ Pausar música";
        } else {
            audio.pause();
            musicButton.textContent = "🎵 Reproducir música";
        }

    });

}
if (activity.image) {

    document
        .getElementById("viewImageButton")
        .addEventListener("click", () => {

            renderImageScreen(activity);

        });

}
    document
        .getElementById("completeButton")
        .addEventListener("click", () => {

            saveCompletedActivity(activity);

            renderCompletedScreen();

        });
}
function renderCompletedScreen() {

    app.innerHTML = `
        <main class="welcome-screen screen-enter">

            <h1>✨ Actividad completada</h1>

            <p>
               Una nueva parte de la aventura ya está preparada para ti.
            </p>

            <button
                class="primary-button"
                id="continueAdventure">

                Continuar

            </button>

        </main>
    `;

    document
        .getElementById("continueAdventure")
        .addEventListener("click", renderAgenda);

}
function renderContractScreen(activity) {

    app.innerHTML = `
        <main class="activity screen-enter">
        <button class="back-button" id="contractBackButton" type="button">
    <span aria-hidden="true">‹</span> Volver
</button>

            <h1>Contrato</h1>

            <section class="card content-card">

                <p>${activity.contract}</p>

            </section>

            <button
                class="primary-button"
                id="agreeButton"
                type="button">

                Estoy de acuerdo

            </button>

        </main>
    `;
document
    .getElementById("contractBackButton")
    .addEventListener("click", () => {

        openActivity(activities.indexOf(activity));

    });
    document
        .getElementById("agreeButton")
        .addEventListener("click", () => {

            activity.contractAccepted = true;

            openActivity(activities.indexOf(activity));

        });

}
function renderImageScreen(activity) {

    app.innerHTML = `
        <main class="activity screen-enter">

            <button class="back-button" id="imageBackButton" type="button">
                <span aria-hidden="true">‹</span> Volver
            </button>

            <img
                src="${activity.image}"
                alt="Imagen de la actividad"
                style="
                    width:100%;
                    border-radius:18px;
                    object-fit:cover;
                ">

        </main>
    `;

    document
        .getElementById("imageBackButton")
        .addEventListener("click", () => {

            openActivity(activities.indexOf(activity));

        });

}