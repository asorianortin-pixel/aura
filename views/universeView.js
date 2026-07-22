export function renderUniverse(app) {

    app.innerHTML = `
        <main class="universe-screen app-screen universe-redesign screen-enter">
            <div class="universe-nebula universe-nebula-top" aria-hidden="true"></div>
            <div class="universe-nebula universe-nebula-bottom" aria-hidden="true"></div>

            <button class="back-button" id="backUniverse">
                ← Volver
            </button>

            <header class="universe-hero">
                <p class="universe-brand">AURA</p>
                <div class="universe-title-row">
                    <div class="universe-orbit-icon" aria-hidden="true">${planetSvg()}</div>
                    <h1>Nuestro<br><span>Universo</span></h1>
                </div>
            </header>

            <section class="universe-time-card">
                <h2><span aria-hidden="true">${heartFillSvg()}</span> Tiempo juntos</h2>
                <p id="love-time" class="universe-love-time">--</p>
                <p id="love-since" class="universe-love-since">Desde...</p>
            </section>

            <section class="universe-menu" aria-label="Secciones de Nuestro Universo">
                ${universeMenuCard("history-card", bookSvg(), "Nuestra historia")}
                ${universeMenuCard("", heartSvg(), "Recuerdos")}
                ${universeMenuCard("importantDatesCard", calendarSvg(), "Fechas importantes")}
                ${universeMenuCard("placesCard", pinSvg(), "Lugares")}
                ${universeMenuCard("", trophySvg(), "Logros")}
                ${universeMenuCard("", capsuleSvg(), "Capsula del tiempo")}
                ${universeMenuCard("", constellationSvg(), "Constelacion")}
            </section>
            <div class="app-header">
                <p class="eyebrow">AURA</p>
                <h1>🌌 Nuestro Universo</h1>
            </div>

            <div class="card universe-main-card">
                <h2>❤️ Tiempo juntos</h2>

                <h1 id="love-time" style="margin:15px 0;font-size:32px;">
                    --
                </h1>

                <p id="love-since">
                    Desde...
                </p>

            </div>

            <div class="card universe-card" id="history-card">
                <span>📖 Nuestra historia</span>
                <span>›</span>
            </div>

            <div class="card universe-card">
                <span>📸 Recuerdos</span>
                <span>›</span>
            </div>

            <div
    class="card universe-card"
    id="importantDatesCard">

    <span>🗓 Fechas importantes</span>
    <span>›</span>

</div>

            <div class="card universe-card" id="placesCard">

    <h3>🌍 Nuestros Lugares</h3>

    <p>
        Guarda los lugares especiales de vuestra historia.
    </p>

</div>

            <div class="card universe-card">
                <span>🏆 Logros</span>
                <span>›</span>
            </div>

            <div class="card universe-card">
                <span>💌 Cápsula del tiempo</span>
                <span>›</span>
            </div>

            <div class="card universe-card">
                <span>✨ Constelación</span>
                <span>›</span>
            </div>

        </main>
    `;
document.getElementById("backUniverse").innerHTML = `<span aria-hidden="true">&#8592;</span> Volver`;
document
    .getElementById("history-card")
    .addEventListener("click", () => renderHistory(app));

document
    .getElementById("importantDatesCard")
    .addEventListener("click", () => renderImportantDates(app));

document
    .getElementById("placesCard")
    .addEventListener("click", () => renderPlaces(app));

document
    .getElementById("backUniverse")
    .addEventListener("click", window.renderMoreMenu);
    const RELATIONSHIP_KEY = "aura_relationship_date";

    const startDate = localStorage.getItem(RELATIONSHIP_KEY);

    if (!startDate) {

    renderUniverseSetup(app);
    return;

}


updateLoveCounter(startDate);

    document
        .getElementById("backUniverse")
        .addEventListener("click", window.renderMoreMenu);

}

function updateLoveCounter(date) {

    const start = new Date(date);
    const today = new Date();

    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();
    let days = today.getDate() - start.getDate();

    if (days < 0) {

        months--;

        const lastMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += lastMonth.getDate();
    }

    if (months < 0) {

        years--;
        months += 12;
    }

    document.getElementById("love-time").textContent =
        `${years} años ${months} meses ${days} días`;

    document.getElementById("love-since").textContent =
        "Desde el " + start.toLocaleDateString("es-ES");

}

function universeMenuCard(id, icon, label) {
    return `
        <button class="universe-card-redesign" ${id ? `id="${id}"` : ""} type="button">
            <span class="universe-card-icon" aria-hidden="true">${icon}</span>
            <span class="universe-card-label">${label}</span>
            <span class="universe-card-chevron" aria-hidden="true">&#8250;</span>
        </button>
    `;
}

function renderUniverseBottomNav() {
    return `
        <nav class="universe-bottom-nav" aria-label="Navegacion principal">
            <button type="button" onclick="renderAgenda()">
                ${homeSvg()}
                <span>Inicio</span>
            </button>
            <button type="button" onclick="renderChallenges()">
                ${flameSvg()}
                <span>Desafios</span>
            </button>
            <button type="button" onclick="renderGallery()">
                ${imageSvg()}
                <span>Galeria</span>
            </button>
            <button class="active" type="button" onclick="renderMoreMenu()">
                ${menuSvg()}
                <span>Mas</span>
            </button>
        </nav>
    `;
}

function planetSvg() {
    return `
        <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="15"></circle>
            <path d="M8 38c9 8 29 5 44-7 5-4 7-8 5-10-3-4-17 0-32 10S5 45 8 38Z"></path>
            <path d="M17 43c8 3 21 0 34-8"></path>
        </svg>`;
}

function heartFillSvg() {
    return `
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 21s-7.5-4.4-9.5-9.2C.9 8 3.1 4.8 6.7 4.8c2 0 3.5 1 4.3 2.3.8-1.3 2.3-2.3 4.3-2.3 3.6 0 5.8 3.2 4.2 7C19.5 16.6 12 21 12 21Z"></path>
        </svg>`;
}

function bookSvg() {
    return `<svg viewBox="0 0 24 24"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v18H7.5A3.5 3.5 0 0 0 4 23V5.5Z"></path><path d="M4 5.5A3.5 3.5 0 0 0 .5 2H0v18h.5A3.5 3.5 0 0 1 4 23"></path></svg>`;
}

function heartSvg() {
    return `<svg viewBox="0 0 24 24"><path d="M12 21s-8-4.8-10-10C.5 7 2.8 4 6.5 4 8.7 4 10.4 5.2 12 7.2 13.6 5.2 15.3 4 17.5 4 21.2 4 23.5 7 22 11c-2 5.2-10 10-10 10Z"></path></svg>`;
}

function calendarSvg() {
    return `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M7 3v4M17 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"></path></svg>`;
}

function pinSvg() {
    return `<svg viewBox="0 0 24 24"><path d="M12 22s7-6.1 7-13A7 7 0 0 0 5 9c0 6.9 7 13 7 13Z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>`;
}

function trophySvg() {
    return `<svg viewBox="0 0 24 24"><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"></path><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6"></path></svg>`;
}

function capsuleSvg() {
    return `<svg viewBox="0 0 24 24"><path d="M10.4 21.2a5 5 0 0 1-7.1-7.1l10.8-10.8a5 5 0 0 1 7.1 7.1L10.4 21.2Z"></path><path d="M8.7 8.7l6.6 6.6"></path></svg>`;
}

function constellationSvg() {
    return `<svg viewBox="0 0 24 24"><path d="M5 17l6-10 8 12M5 17l14 2M11 7l8 12"></path><circle cx="5" cy="17" r="1.5"></circle><circle cx="11" cy="7" r="1.5"></circle><circle cx="19" cy="19" r="1.5"></circle></svg>`;
}

function homeSvg() {
    return `<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"></path><path d="M5.5 10.5V21h13V10.5"></path><path d="M9.5 21v-6h5v6"></path></svg>`;
}

function flameSvg() {
    return `<svg viewBox="0 0 24 24"><path d="M12 22c4 0 7-2.8 7-6.8 0-3.6-2.1-6-5.8-10.2-.3 2.6-1.2 4.3-2.7 5.4.1-2-1-3.8-2.5-5.4C6.8 8.9 5 11.5 5 15.2 5 19.2 8 22 12 22Z"></path></svg>`;
}

function imageSvg() {
    return `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="8" cy="9" r="1.5"></circle><path d="M21 16l-5.5-5.5L5 20"></path></svg>`;
}

function menuSvg() {
    return `<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>`;
}

function renderUniverseSetup(app){

    app.innerHTML = `

        <main class="universe-screen app-screen screen-enter">

            <div class="app-header">
                <p class="eyebrow">Bienvenidos</p>
                <h1>🌌 Nuestro Universo</h1>
            </div>

            <div class="card universe-main-card">

                <h2>❤️ ¿Cuándo comenzó vuestra historia?</h2>

                <p>
                    Esta fecha será el inicio de vuestro universo.
                </p>

                <input
                    type="date"
                    id="relationship-date"
                    class="text-input"
                >

                <button
                    class="primary-button"
                    id="saveUniverse"
                >
                    ✨ Crear nuestro universo
                </button>

            </div>

        </main>

    `;

    document
        .getElementById("saveUniverse")
        .addEventListener("click",()=>{

            const value =
                document.getElementById("relationship-date").value;

            if(!value){

                alert("Selecciona una fecha.");

                return;

            }

            localStorage.setItem(
                "aura_relationship_date",
                value
            );

            renderUniverse(app);

        });

}
function renderHistory(app){

    const memories = JSON.parse(localStorage.getItem("aura_memories")) || [];

    let historyHTML = "";

    if(memories.length === 0){

        historyHTML = `
            <div class="card universe-main-card">

                <h2>Aún no hay recuerdos</h2>

                <p>Cada momento importante aparecerá aquí.</p>

            </div>
        `;

    }else{

        historyHTML = memories.map(memory => `

            <div
    class="card universe-card history-item"
    data-id="${memory.id}">

    <strong>${memory.title}</strong>

    <small>${new Date(memory.date).toLocaleDateString("es-ES")}</small>

    ${memory.place ? `<p>📍 ${memory.place}</p>` : ""}

</div>

        `).join("");

    }

    app.innerHTML = `

        <main class="app-screen screen-enter">

            <button class="back-button" id="backHistory">
                ← Volver
            </button>

            <div class="app-header">
                <p class="eyebrow">Nuestro Universo</p>
                <h1>📖 Nuestra Historia</h1>
            </div>

            ${historyHTML}

            <button class="primary-button" id="addMemory">
                ➕ Añadir recuerdo
            </button>

        </main>

    `;

    document
        .getElementById("backHistory")
        .addEventListener("click", () => renderUniverse(app));

    document
        .getElementById("addMemory")
        .addEventListener("click", () => renderAddMemory(app));

    document
    .querySelectorAll(".history-item")
    .forEach(card => {

        card.addEventListener("click", () => {

            renderMemoryDetail(
                app,
                Number(card.dataset.id)
            );

        });

    });

}

function renderImportantDates(app){

    const dates =
        JSON.parse(localStorage.getItem("aura_important_dates")) || [];

    let datesHTML = "";

    if(dates.length === 0){

        datesHTML = `
            <div class="card universe-main-card">

                <h2>No hay fechas importantes</h2>

                <p>Añade aniversarios, cumpleaños o cualquier fecha especial.</p>

            </div>
        `;

    }else{

        datesHTML = dates.map(date => `

            <div
    class="card universe-card important-date-item"
    data-id="${date.id}">

    <strong>${date.title}</strong>

    <small>${new Date(date.date).toLocaleDateString("es-ES")}</small>

</div>

        `).join("");

    }

    app.innerHTML = `

        <main class="app-screen screen-enter">

            <button class="back-button" id="backDates">
                ← Volver
            </button>

            <div class="app-header">
                <p class="eyebrow">Nuestro Universo</p>
                <h1>🗓 Fechas importantes</h1>
            </div>

            ${datesHTML}

            <button
                class="primary-button"
                id="addImportantDate">

                ➕ Añadir fecha

            </button>

        </main>

    `;

    document
        .getElementById("backDates")
        .addEventListener("click", () => renderUniverse(app));

    document
        .getElementById("addImportantDate")
        .addEventListener("click", () => renderAddImportantDate(app));

    document
    .querySelectorAll(".important-date-item")
    .forEach(card => {

        card.addEventListener("click", () => {

            renderImportantDateDetail(
                app,
                Number(card.dataset.id)
            );

        });

    });

}

function renderImportantDateDetail(app, id){

    const dates =
        JSON.parse(localStorage.getItem("aura_important_dates")) || [];

    const date =
        dates.find(d => d.id === id);

    if(!date){

        alert("No se ha encontrado la fecha.");

        renderImportantDates(app);

        return;

    }

    app.innerHTML = `

        <main class="app-screen screen-enter">

            <button class="back-button" id="backDateDetail">
                ← Volver
            </button>

            <div class="app-header">
                <p class="eyebrow">Fechas importantes</p>
                <h1>${date.title}</h1>
            </div>

            <div class="card universe-main-card">

                <p><strong>📅 Fecha</strong></p>

                <p>${new Date(date.date).toLocaleDateString("es-ES")}</p>

            </div>

            <button
                class="primary-button"
                id="editImportantDate">

                ✏️ Editar fecha

            </button>

            <button
                class="danger-button"
                id="deleteImportantDate">

                🗑 Eliminar fecha

            </button>

        </main>

    `;

    document
        .getElementById("backDateDetail")
        .addEventListener("click", () => renderImportantDates(app));

    document
    .getElementById("deleteImportantDate")
    .addEventListener("click", () => {

        if(!confirm("¿Eliminar esta fecha?")){
            return;
        }

        const dates =
            JSON.parse(localStorage.getItem("aura_important_dates")) || [];

        const updatedDates =
            dates.filter(d => d.id !== id);

        localStorage.setItem(
            "aura_important_dates",
            JSON.stringify(updatedDates)
        );

        renderImportantDates(app);

    });
    
    document
    .getElementById("editImportantDate")
    .addEventListener("click", () => {

        renderEditImportantDate(app, id);

    });

}

function renderEditImportantDate(app, id){

    const dates =
        JSON.parse(localStorage.getItem("aura_important_dates")) || [];

    const date =
        dates.find(d => d.id === id);

    if(!date){

        alert("No se ha encontrado la fecha.");

        renderImportantDates(app);

        return;

    }

    app.innerHTML = `

        <main class="app-screen screen-enter">

            <button class="back-button" id="backEditDate">
                ← Volver
            </button>

            <div class="app-header">
                <p class="eyebrow">Editar fecha</p>
                <h1>🗓 ${date.title}</h1>
            </div>

            <div class="card universe-main-card">

                <input
                    id="importantDateTitle"
                    class="text-input"
                    value="${date.title}"
                >

                <input
                    id="importantDate"
                    type="date"
                    class="text-input"
                    value="${date.date}"
                >

                <button
                    class="primary-button"
                    id="updateImportantDate">

                    💾 Guardar cambios

                </button>

            </div>

        </main>

    `;

    document
        .getElementById("backEditDate")
        .addEventListener("click", () => renderImportantDateDetail(app, id));

    document
        .getElementById("updateImportantDate")
        .addEventListener("click", () => updateImportantDate(app, id));

}

function updateImportantDate(app, id){

    const dates =
        JSON.parse(localStorage.getItem("aura_important_dates")) || [];

    const index =
        dates.findIndex(d => d.id === id);

    if(index === -1){

        alert("No se ha encontrado la fecha.");

        renderImportantDates(app);

        return;

    }

    const title =
        document.getElementById("importantDateTitle").value.trim();

    const date =
        document.getElementById("importantDate").value;

    if(!title || !date){

        alert("Completa el título y la fecha.");

        return;

    }

    dates[index] = {

        ...dates[index],

        title,

        date

    };

    dates.sort((a,b)=>new Date(a.date)-new Date(b.date));

    localStorage.setItem(
        "aura_important_dates",
        JSON.stringify(dates)
    );

    renderImportantDateDetail(app, id);

}

function renderAddImportantDate(app){

    app.innerHTML = `

        <main class="app-screen screen-enter">

            <button class="back-button" id="backAddDate">
                ← Volver
            </button>

            <div class="app-header">
                <p class="eyebrow">Nueva fecha</p>
                <h1>🗓 Añadir fecha importante</h1>
            </div>

            <div class="card universe-main-card">

                <input
                    id="importantDateTitle"
                    class="text-input"
                    placeholder="Título"
                >

                <input
                    id="importantDate"
                    type="date"
                    class="text-input"
                >

                <button
                    class="primary-button"
                    id="saveImportantDate">

                    💾 Guardar fecha

                </button>

            </div>

        </main>

    `;

    document
        .getElementById("backAddDate")
        .addEventListener("click", () => renderImportantDates(app));

    document
        .getElementById("saveImportantDate")
        .addEventListener("click", () => saveImportantDate(app));

}

function saveImportantDate(app){

    const title =
        document.getElementById("importantDateTitle").value.trim();

    const date =
        document.getElementById("importantDate").value;

    if(!title || !date){

        alert("Completa el título y la fecha.");

        return;

    }

    const dates =
        JSON.parse(localStorage.getItem("aura_important_dates")) || [];

    dates.push({

        id: Date.now(),

        title,

        date

    });

    dates.sort((a,b)=>new Date(a.date)-new Date(b.date));

    localStorage.setItem(
        "aura_important_dates",
        JSON.stringify(dates)
    );

    renderImportantDates(app);

}

function renderPlaces(app){

    const places =
        JSON.parse(localStorage.getItem("aura_places")) || [];

    app.innerHTML = `

<main class="places-screen screen-enter">

    <button class="back-button" id="backPlaces">
        ←
    </button>

    <div class="app-header">

        <p class="eyebrow">
            Nuestro Universo
        </p>

        <h1>
            🌍 Nuestros Lugares
        </h1>

    </div>

    <div class="places-map">

    <div id="placesMap"></div>

    <div class="places-map-vignette" aria-hidden="true"></div>

    <section
        class="place-preview-sheet"
        id="placePreview"
        aria-live="polite"
        hidden>
    </section>

    <button
        class="floating-add"
        id="addPlace">

        +

    </button>

</div>

</main>

`;

const map = L.map("placesMap",{

    zoomControl:false,
    attributionControl:false

}).setView([41.5433,2.1573],11);

L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
        subdomains:"abcd",
        maxZoom:20
    }
).addTo(map);


places.forEach(place => {

    if(!place.lat || !place.lng){
        return;
    }

    const marker = L.marker(
        [place.lat, place.lng],
        {
            icon: createPlaceMarkerIcon(place)
        }
    ).addTo(map);

    marker.on("click", () => {

        showPlacePreview(app, place);

    });

});

document
.getElementById("backPlaces")
.addEventListener("click",()=>renderUniverse(app));

let addingPlace = false;

document
.getElementById("addPlace")
.addEventListener("click",()=>{

    addingPlace = true;

    document.getElementById("addPlace").textContent = "📍";

    alert("Toca cualquier punto del mapa para añadir un lugar.");

});

let tempMarker = null;
map.on("click",(e)=>{

    if(!addingPlace){
        return;
    }

    addingPlace = false;

    document.getElementById("addPlace").textContent = "+";

    if(tempMarker){
        map.removeLayer(tempMarker);
    }

    tempMarker = L.marker([
        e.latlng.lat,
        e.latlng.lng
    ]).addTo(map);

    renderAddPlace(
    app,
    e.latlng.lat,
    e.latlng.lng
);

});

}

function createPlaceMarkerIcon(place) {

    const meta = getPlaceVisualMeta(place);

    return L.divIcon({
        className: "",
        iconSize: [92, 102],
        iconAnchor: [46, 82],
        popupAnchor: [0, -74],
        html: `
            <button class="aura-place-marker aura-place-marker--${meta.state}" type="button" aria-label="${place.name}">
                <span class="aura-place-marker-pin">
                    <span class="aura-place-marker-icon">${meta.typeIcon}</span>
                    <span class="aura-place-marker-state">${meta.stateIcon}</span>
                </span>
                <span class="aura-place-marker-dot"></span>
                <span class="aura-place-marker-name">${place.name}</span>
            </button>
        `
    });

}

function showPlacePreview(app, place) {

    const preview = document.getElementById("placePreview");

    if(!preview){
        return;
    }

    const meta = getPlaceVisualMeta(place);
    const dateLabel = place.date
        ? new Date(place.date).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        : "Fecha por guardar";

    preview.hidden = false;
    preview.innerHTML = `
        <div class="place-sheet-handle" aria-hidden="true"></div>

        <div class="place-sheet-content">
            <div class="place-photo place-photo--${meta.type}" aria-hidden="true">
                <span>${meta.typeIcon}</span>
            </div>

            <div class="place-info">
                <h2>${place.name}</h2>
                <p class="place-location">${pinMiniSvg()} ${place.city}</p>

                <div class="place-meta-row place-meta-row--${meta.state}">
                    <span>${meta.stateIcon}</span>
                    <strong>${meta.stateLabel}</strong>
                </div>

                <div class="place-meta-row">
                    <span>${calendarMiniSvg()}</span>
                    <span>${dateLabel}</span>
                </div>

                <div class="place-meta-row">
                    <span>${meta.typeIcon}</span>
                    <span>${meta.typeLabel}</span>
                </div>
            </div>
        </div>

        <div class="place-actions">
            <button type="button" id="viewPlaceDetail">
                <span>${bookSvg()}</span>
                Ver lugar
                <span class="place-action-chevron">&#8250;</span>
            </button>
            <button type="button" id="editPlaceFromMap">
                <span>${editSvg()}</span>
                Editar
                <span class="place-action-chevron">&#8250;</span>
            </button>
            <button class="danger" type="button" id="deletePlaceFromMap">
                <span>${trashSvg()}</span>
                Eliminar
                <span class="place-action-chevron">&#8250;</span>
            </button>
        </div>
    `;

    document
        .getElementById("viewPlaceDetail")
        .addEventListener("click", () => renderPlaceDetail(app, place.id));

    document
        .getElementById("editPlaceFromMap")
        .addEventListener("click", () => renderEditPlace(app, place.id));

    document
        .getElementById("deletePlaceFromMap")
        .addEventListener("click", () => deletePlaceAndReturnToMap(app, place.id));

}

function deletePlaceAndReturnToMap(app, id) {

    if(!confirm("¿Eliminar este lugar?")){
        return;
    }

    const places =
        JSON.parse(localStorage.getItem("aura_places")) || [];

    const updatedPlaces =
        places.filter(place => place.id !== id);

    localStorage.setItem(
        "aura_places",
        JSON.stringify(updatedPlaces)
    );

    renderPlaces(app);

}

function getPlaceVisualMeta(place) {

    const state = normalizePlaceState(place.status);
    const type = inferPlaceType(place);

    const states = {
        especial: {
            state: "especial",
            stateIcon: "♥",
            stateLabel: "Especial"
        },
        favorito: {
            state: "favorito",
            stateIcon: "★",
            stateLabel: "Favorito"
        },
        sueno: {
            state: "sueno",
            stateIcon: "✦",
            stateLabel: "Sueño"
        },
        pendiente: {
            state: "pendiente",
            stateIcon: "◷",
            stateLabel: "Pendiente"
        }
    };

    const types = {
        restaurante: {
            type: "restaurante",
            typeIcon: restaurantSvg(),
            typeLabel: "Restaurante"
        },
        hotel: {
            type: "hotel",
            typeIcon: hotelSvg(),
            typeLabel: "Hotel"
        },
        playa: {
            type: "playa",
            typeIcon: beachSvg(),
            typeLabel: "Playa"
        },
        viaje: {
            type: "viaje",
            typeIcon: planeSvg(),
            typeLabel: "Viaje"
        },
        mirador: {
            type: "mirador",
            typeIcon: mountainSvg(),
            typeLabel: "Mirador"
        },
        parque: {
            type: "parque",
            typeIcon: parkSvg(),
            typeLabel: "Parque"
        },
        lugar: {
            type: "lugar",
            typeIcon: pinMiniSvg(),
            typeLabel: "Lugar"
        }
    };

    return {
        ...states[state],
        ...types[type]
    };

}

function normalizePlaceState(status) {

    if(status === "favorito"){
        return "favorito";
    }

    if(status === "pendiente"){
        return "pendiente";
    }

    if(status === "sueno"){
        return "sueno";
    }

    return "especial";

}

function inferPlaceType(place) {

    const text = `${place.name || ""} ${place.city || ""}`.toLowerCase();

    if(/restaurante|cena|bar|caf[eé]|comida|brunch/.test(text)){
        return "restaurante";
    }

    if(/hotel|suite|hostal|apartamento|spa/.test(text)){
        return "hotel";
    }

    if(/playa|cala|mar|mallorca|ibiza|costa/.test(text)){
        return "playa";
    }

    if(/viaje|airport|aeropuerto|par[ií]s|venecia|roma|londres|t[uú]nez/.test(text)){
        return "viaje";
    }

    if(/mirador|vistas|tibidabo|monta[ñn]a|atardecer/.test(text)){
        return "mirador";
    }

    if(/parque|feria|atracci[oó]n|jard[ií]n/.test(text)){
        return "parque";
    }

    return "lugar";

}

function pinMiniSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.1 7-13A7 7 0 0 0 5 9c0 6.9 7 13 7 13Z"></path><circle cx="12" cy="9" r="2.4"></circle></svg>`;
}

function calendarMiniSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3"></rect><path d="M8 3v4M16 3v4M4 10h16"></path></svg>`;
}

function editSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"></path><path d="m14 7 3 3"></path></svg>`;
}

function trashSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16"></path><path d="M9 7V4h6v3"></path><path d="M6 7l1 14h10l1-14"></path><path d="M10 11v6M14 11v6"></path></svg>`;
}

function restaurantSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v18"></path><path d="M4 3v6a3 3 0 0 0 6 0V3"></path><path d="M16 3c2.2 1.3 3.5 3.7 3.5 6.5V21"></path></svg>`;
}

function hotelSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5"></path><path d="M4 13h16v6"></path><path d="M8 13V9h5a3 3 0 0 1 3 3v1"></path><path d="M4 19h18"></path></svg>`;
}

function beachSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16c2-1.5 4-1.5 6 0s4 1.5 6 0 3-1.4 4-.8"></path><path d="M7 12a6 6 0 0 1 10 0"></path><path d="M12 12v7"></path><path d="M12 12l4-4M12 12 8 8"></path></svg>`;
}

function planeSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l18-7-7 18-3-8-8-3Z"></path><path d="M11 14 21 4"></path></svg>`;
}

function mountainSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 19 7-12 4 7 2-3 5 8H3Z"></path><circle cx="17" cy="6" r="1.8"></circle></svg>`;
}

function parkSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6"></circle><path d="M12 6v12M6 12h12M8 8l8 8M16 8l-8 8"></path></svg>`;
}

function arrowLeftSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"></path></svg>`;
}

function foldedMapSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"></path><path d="M9 3v15M15 6v15"></path></svg>`;
}

function plusSvg() {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>`;
}

function renderPlaceDetail(app,id){

    const places =
        JSON.parse(localStorage.getItem("aura_places")) || [];

    const place =
        places.find(p=>p.id===id);

    if(!place){

        renderPlaces(app);

        return;

    }

    app.innerHTML=`

        <main class="app-screen screen-enter">

            <button
                class="back-button"
                id="backPlace">

                ← Volver

            </button>

            <div class="app-header">

                <p class="eyebrow">
                    Nuestros Lugares
                </p>

                <h1>📍 ${place.name}</h1>

            </div>

            <div class="card universe-main-card">

                <p><strong>Ciudad</strong></p>

                <p>${place.city}</p>

                <br>

                <p><strong>Estado</strong></p>

                <p>

                    ${
                        place.status==="visitado"
                        ?"❤️ Visitado"
                        :place.status==="favorito"
                        ?"⭐ Favorito"
                        :place.status==="pendiente"
                        ?"🕒 Pendiente"
                        :"✨ Sueño"
                    }

                </p>

            </div>

            <button
                class="primary-button"
                id="editPlace">

                ✏️ Editar

            </button>

            <button
                class="danger-button"
                id="deletePlace">

                🗑 Eliminar

            </button>

        </main>

    `;

    document
        .getElementById("backPlace")
        .addEventListener("click",()=>renderPlaces(app));

    document
    .getElementById("deletePlace")
    .addEventListener("click", () => {

        if(!confirm("¿Eliminar este lugar?")){
            return;
        }

        const places =
            JSON.parse(localStorage.getItem("aura_places")) || [];

        const updatedPlaces =
            places.filter(p => p.id !== id);

        localStorage.setItem(
            "aura_places",
            JSON.stringify(updatedPlaces)
        );

        renderPlaces(app);

    });


    document
    .getElementById("editPlace")
    .addEventListener("click", () => {

        renderEditPlace(app, id);

    });

}

function renderEditPlace(app, id){

    const places =
        JSON.parse(localStorage.getItem("aura_places")) || [];

    const place =
        places.find(p => p.id === id);

    if(!place){

        alert("No se ha encontrado el lugar.");

        renderPlaces(app);

        return;

    }

    app.innerHTML = `

        <main class="app-screen screen-enter">

            <button class="back-button" id="backEditPlace">
                ← Volver
            </button>

            <div class="app-header">

                <p class="eyebrow">Editar lugar</p>

                <h1>📍 ${place.name}</h1>

            </div>

            <div class="card universe-main-card">

                <input
                    id="placeName"
                    class="text-input"
                    value="${place.name}"
                >

                <input
                    id="placeCity"
                    class="text-input"
                    value="${place.city}"
                >

                <select
                    id="placeStatus"
                    class="text-input">

                    <option value="visitado" ${place.status==="visitado"?"selected":""}>❤️ Visitado</option>

                    <option value="favorito" ${place.status==="favorito"?"selected":""}>⭐ Favorito</option>

                    <option value="pendiente" ${place.status==="pendiente"?"selected":""}>🕒 Pendiente</option>

                    <option value="sueno" ${place.status==="sueno"?"selected":""}>✨ Sueño</option>

                </select>

                <button
                    class="primary-button"
                    id="updatePlace">

                    💾 Guardar cambios

                </button>

            </div>

        </main>

    `;

    document
        .getElementById("backEditPlace")
        .addEventListener("click", () => renderPlaceDetail(app, id));

    document
        .getElementById("updatePlace")
        .addEventListener("click", () => updatePlace(app, id));

}

function updatePlace(app, id){

    const places =
        JSON.parse(localStorage.getItem("aura_places")) || [];

    const index =
        places.findIndex(p => p.id === id);

    if(index === -1){

        alert("No se ha encontrado el lugar.");

        renderPlaces(app);

        return;

    }

    const name =
        document.getElementById("placeName").value.trim();

    const city =
        document.getElementById("placeCity").value.trim();

    const status =
        document.getElementById("placeStatus").value;

    if(!name || !city){

        alert("Completa todos los campos.");

        return;

    }

    places[index] = {

        ...places[index],

        name,

        city,

        status

    };

    localStorage.setItem(
        "aura_places",
        JSON.stringify(places)
    );

    renderPlaceDetail(app, id);

}

function renderAddPlace(app, lat, lng){

    window.selectedPlaceLat = lat;
    window.selectedPlaceLng = lng;

    app.innerHTML = `

        <main class="app-screen screen-enter">

            <button class="back-button" id="backAddPlace">
                ← Volver
            </button>

            <div class="app-header">

                <p class="eyebrow">Nuevo lugar</p>

                <h1>🌍 Añadir lugar</h1>

            </div>

            <div class="card universe-main-card">

                <input
                    id="placeName"
                    class="text-input"
                    placeholder="Nombre del lugar">

                <input
                    id="placeCity"
                    class="text-input"
                    placeholder="Ciudad">

                <select
                    id="placeStatus"
                    class="text-input">

                    <option value="visitado">❤️ Visitado</option>
                    <option value="favorito">⭐ Favorito</option>
                    <option value="pendiente">🕒 Pendiente</option>
                    <option value="sueno">✨ Sueño</option>

                </select>

                <button
                    class="primary-button"
                    id="savePlace">

                    Guardar lugar

                </button>

            </div>

        </main>

    `;

    document
        .getElementById("backAddPlace")
        .addEventListener("click", () => renderPlaces(app));

    document
        .getElementById("savePlace")
        .addEventListener("click", () => savePlace(app));

}

function savePlace(app){

    const name =
        document.getElementById("placeName").value.trim();

    const city =
        document.getElementById("placeCity").value.trim();

    const status =
        document.getElementById("placeStatus").value;

    if(!name || !city){

        alert("Completa todos los campos.");

        return;

    }

    const places =
        JSON.parse(localStorage.getItem("aura_places")) || [];

    places.push({

    id: Date.now(),

    name,

    city,

    status,

    lat: window.selectedPlaceLat,

    lng: window.selectedPlaceLng

});

    localStorage.setItem(
        "aura_places",
        JSON.stringify(places)
    );

    renderPlaces(app);

}

function renderMemoryDetail(app, id){

    const memories =
        JSON.parse(localStorage.getItem("aura_memories")) || [];

    const memory =
        memories.find(m => m.id === id);

    if(!memory){

        alert("No se ha encontrado el recuerdo.");

        renderHistory(app);

        return;

    }

    app.innerHTML = `

        <main class="app-screen screen-enter">

            <button class="back-button" id="backMemoryDetail">
                ← Volver
            </button>

            <div class="app-header">
                <p class="eyebrow">Nuestra Historia</p>
                <h1>${memory.title}</h1>
            </div>

            <div class="card universe-main-card">

                <p><strong>📅 Fecha:</strong></p>
                <p>${new Date(memory.date).toLocaleDateString("es-ES")}</p>

                ${
                    memory.place
                    ? `
                        <p style="margin-top:15px;">
                            <strong>📍 Lugar:</strong>
                        </p>

                        <p>${memory.place}</p>
                    `
                    : ""
                }

                ${
                    memory.description
                    ? `
                        <p style="margin-top:15px;">
                            <strong>❤️ Descripción:</strong>
                        </p>

                        <p>${memory.description}</p>
                    `
                    : ""
                }

            </div>

            <button
    class="primary-button"
    id="editMemory">

    ✏️ Editar recuerdo

</button>

            <button
            class="danger-button"
             id="deleteMemory">

    🗑 Eliminar recuerdo

</button>

        </main>

    `;

    document
        .getElementById("backMemoryDetail")
        .addEventListener("click", () => renderHistory(app));

    document
    .getElementById("editMemory")
    .addEventListener("click", () => {

        renderEditMemory(app, id);

    });

    document
    .getElementById("deleteMemory")
    .addEventListener("click", () => {

        if(!confirm("¿Eliminar este recuerdo?")){
            return;
        }

        const memories =
            JSON.parse(localStorage.getItem("aura_memories")) || [];

        const updatedMemories =
            memories.filter(m => m.id !== id);

        localStorage.setItem(
            "aura_memories",
            JSON.stringify(updatedMemories)
        );

        renderHistory(app);

    });

}

function renderEditMemory(app, id){

    const memories =
        JSON.parse(localStorage.getItem("aura_memories")) || [];

    const memory =
        memories.find(m => m.id === id);

    if(!memory){

        alert("No se ha encontrado el recuerdo.");

        renderHistory(app);

        return;

    }

    app.innerHTML = `

    <main class="app-screen screen-enter">

        <button class="back-button" id="backEditMemory">
            ← Volver
        </button>

        <div class="app-header">
            <p class="eyebrow">Editar recuerdo</p>
            <h1>✏️ ${memory.title}</h1>
        </div>

        <div class="card universe-main-card">

            <input
                id="memoryTitle"
                class="text-input"
                value="${memory.title}"
            >

            <input
                id="memoryDate"
                type="date"
                class="text-input"
                value="${memory.date}"
            >

            <input
                id="memoryPlace"
                class="text-input"
                value="${memory.place || ""}"
                placeholder="Lugar"
            >

            <textarea
                id="memoryDescription"
                class="text-input"
            >${memory.description || ""}</textarea>

            <button
                class="primary-button"
                id="updateMemory">

                💾 Guardar cambios

            </button>

        </div>

    </main>

    `;

    document
        .getElementById("backEditMemory")
        .addEventListener("click", () => renderMemoryDetail(app, id));

    document
    .getElementById("updateMemory")
    .addEventListener("click", () => updateMemory(app, id));

}

function updateMemory(app, id){

    const memories =
        JSON.parse(localStorage.getItem("aura_memories")) || [];

    const index =
        memories.findIndex(m => m.id === id);

    if(index === -1){

        alert("No se ha encontrado el recuerdo.");

        renderHistory(app);

        return;

    }

    const title =
        document.getElementById("memoryTitle").value.trim();

    const date =
        document.getElementById("memoryDate").value;

    if(!title || !date){

        alert("Completa el título y la fecha.");

        return;

    }

    memories[index] = {

        ...memories[index],

        title,

        date,

        place: document.getElementById("memoryPlace").value,

        description: document.getElementById("memoryDescription").value

    };

    memories.sort((a,b)=>new Date(a.date)-new Date(b.date));

    localStorage.setItem(
        "aura_memories",
        JSON.stringify(memories)
    );

    renderMemoryDetail(app, id);

}

function renderAddMemory(app){

    app.innerHTML = `

    <main class="app-screen screen-enter">

        <button class="back-button" id="backMemory">
            ← Volver
        </button>

        <div class="app-header">
            <p class="eyebrow">Nuevo recuerdo</p>
            <h1>❤️ Añadir recuerdo</h1>
        </div>

        <div class="card universe-main-card">

            <input
                id="memoryTitle"
                class="text-input"
                placeholder="Título"
            >

            <input
                id="memoryDate"
                type="date"
                class="text-input"
            >

            <input
                id="memoryPlace"
                class="text-input"
                placeholder="Lugar (opcional)"
            >

            <textarea
                id="memoryDescription"
                class="text-input"
                placeholder="Describe este momento..."
            ></textarea>

            <button
                class="primary-button"
                id="saveMemory">

                ❤️ Guardar recuerdo

            </button>

        </div>

</main>

    `;

    document
        .getElementById("backMemory")
        .addEventListener("click",()=>renderHistory(app));

    document
    .getElementById("saveMemory")
    .addEventListener("click", () => saveMemory(app));

}
function saveMemory(app){

    const title =
        document.getElementById("memoryTitle").value.trim();

    const date =
        document.getElementById("memoryDate").value;

    if(!title || !date){

        alert("Completa el título y la fecha.");

        return;

    }

    const memories =
        JSON.parse(localStorage.getItem("aura_memories")) || [];

    memories.push({

    id: Date.now(),

    title,

    date,

    place: document.getElementById("memoryPlace").value,

    description: document.getElementById("memoryDescription").value,

    createdAt: Date.now()

});

    memories.sort((a,b)=>new Date(a.date)-new Date(b.date));

    localStorage.setItem(
        "aura_memories",
        JSON.stringify(memories)
    );

    renderHistory(app);

}
