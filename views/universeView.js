export function renderUniverse(app) {

    app.innerHTML = `
        <main class="universe-screen app-screen screen-enter">

            <button class="back-button" id="backUniverse">
                ← Volver
            </button>

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

<main class="app-screen screen-enter places-screen">

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

document
.getElementById("backPlaces")
.addEventListener("click",()=>renderUniverse(app));

document
.getElementById("addPlace")
.addEventListener("click",()=>renderAddPlace(app));

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

function renderAddPlace(app){

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

        status

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