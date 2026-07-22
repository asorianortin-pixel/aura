import { auth } from "./auth.js";
import {
    db,
    doc,
    getDoc,
    updateDoc
} from "./firestore.js";

import {
    collection,
    query,
    where,
    getDocs
} from "./firestore.js";

export async function renderProfile(app) {
    const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
    const user = snap.data() || {};
    const relationshipDate = localStorage.getItem("aura_relationship_date");

    let daysTogether = 0;
    const completedActivities = user.completedActivities || 0;
    const points = user.points || 0;


if (relationshipDate) {
    const start = new Date(relationshipDate);
    const today = new Date();

    daysTogether = Math.floor(
        (today - start) / (1000 * 60 * 60 * 24)
    );
}

    app.innerHTML = `
        <div class="page profile-page profile-screen screen-enter">
            <div class="profile-ambient" aria-hidden="true">
                <div class="profile-glow-orb"></div>
                <div class="profile-curve-line"></div>
            </div>

            <nav class="profile-nav">
                <button id="back-more" class="profile-nav-btn" aria-label="Volver">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button id="settings-btn" class="profile-nav-btn" aria-label="Ajustes">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                </button>
            </nav>

            <header class="profile-hero">
                <div class="profile-avatar-stage">
                    <div class="profile-avatar-glow"></div>
                    <div class="profile-avatar-ring"></div>
                    <div class="profile-picture-container">
                        <img id="profile-photo"
                             src="${user.photoURL || '../assets/images/foto1.jpg'}"
                             alt="Foto de perfil">
                        
                    </div>
                </div>

                <div class="profile-identity">
                    <h1 class="profile-name">
                        <span class="profile-sparkle" aria-hidden="true">
                            <svg viewBox="0 0 24 24"><path d="M12 2l1.4 4.3L18 8l-4.6 1.7L12 14l-1.4-4.3L6 8l4.6-1.7z"/></svg>
                        </span>
                        ${user.name || "Tu Nombre"}
                        <span class="profile-sparkle" aria-hidden="true">
                            <svg viewBox="0 0 24 24"><path d="M12 2l1.4 4.3L18 8l-4.6 1.7L12 14l-1.4-4.3L6 8l4.6-1.7z"/></svg>
                        </span>
                    </h1>
                    <p class="profile-username">@${user.username || "username"}</p>
                    <p class="member-since">Miembro desde ${user.memberSince || "2025"}</p>
                </div>

                <div class="profile-bio">
                    <p>"${user.bio || "Aquí construimos nuestro mejor nosotros, juntos. ❤️"}"</p>
                </div>
            </header>

            <section class="profile-stats" aria-label="Estadísticas">
                <div class="stat-item">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <span class="stat-number">${completedActivities}</span>
                    <span class="stat-label">Actividades completadas</span>
                </div>
                <div class="stat-divider" aria-hidden="true"></div>
                <div class="stat-item">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22c1.5-2.5 4-5.5 4-9a4 4 0 00-8 0c0 3.5 2.5 6.5 4 9z"/><path d="M12 13c.8-1.2 1.5-2.4 1.5-3.5a1.5 1.5 0 00-3 0c0 1.1.7 2.3 1.5 3.5z"/></svg>
                    </div>
                    <span class="stat-number">${daysTogether}</span>
                    <span class="stat-label">Días juntos</span>
                </div>
                <div class="stat-divider" aria-hidden="true"></div>
                <div class="stat-item">
                    <div class="stat-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                    </div>
                    <span class="stat-number">${points}</span>
                    <span class="stat-label">Puntos totales</span>
                </div>
            </section>

            <section class="profile-sections">
                <button class="section-card" id="personal-btn">
                    <span class="section-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    </span>
                    <span class="section-content">
                        <span class="section-title"> Información personal</span>
                        <span class="section-desc">Tus datos, tu historia.</span>
                    </span>
                    <span class="section-chevron" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                    </span>
                </button>
                <button class="section-card" id="favorites-btn">
                    <span class="section-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                    </span>
                    <span class="section-content">
                        <span class="section-title"> Gustos</span>
                        <span class="section-desc">Lo que nos gusta y nos representa.</span>
                    </span>
                    <span class="section-chevron" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                    </span>
                </button>
                <button class="section-card" id="other-btn">
                    <span class="section-icon">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                    </span>
                    <span class="section-content">
                        <span class="section-title"> Otros</span>
                        <span class="section-desc">Recuerdos, metas y más.</span>
                    </span>
                    <span class="section-chevron" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                    </span>
                </button>
            </section>
        </div>
    `;

    // Eventos
    document.getElementById("back-more").addEventListener("click", () => {
    window.renderMoreMenu();
});

    document.getElementById("personal-btn").addEventListener("click", () => renderPersonalInfo(app));
    document.getElementById("favorites-btn").addEventListener("click", renderFavorites);
    document.getElementById("other-btn").addEventListener("click", renderOther);
    document.getElementById("settings-btn").addEventListener("click", () => {
    renderEditProfile(app);
});
document
    .getElementById("settings-btn")
    .addEventListener("click", () => {

        renderEditProfile(app);

    });
}

async function renderEditProfile(app) {

    const snap = await getDoc(
        doc(db, "users", auth.currentUser.uid)
    );

    const user = snap.data() || {};

    app.innerHTML = `
        <div class="page personal-info-screen screen-enter">

            <nav class="profile-nav">
                <button id="back-profile" class="profile-nav-btn">
                    ←
                </button>

                <button id="save-edit-profile" class="profile-nav-btn profile-nav-btn--accent">
                    ✓
                </button>
            </nav>

            <header class="personal-header">
                <h1 class="personal-title">
                    Editar perfil
                </h1>
                <p class="personal-subtitle">
                    Personaliza cómo te ven en AURA.
                </p>
            </header>

            <div class="profile-form">

                <div class="profile-photo-editor">

                    <img
                        id="profile-photo-preview"
                        src="${user.photoURL || "../assets/images/foto1.jpg"}"
                    >

                    <button id="change-photo-btn">
                        Cambiar foto
                    </button>

                </div>

                <div class="field-card">
                    <div class="field-body">
                        <label>Nombre</label>
                        <input
                            id="edit-name"
                            type="text"
                            value="${user.name || ""}"
                        >
                    </div>
                </div>

                <div class="field-card">
                    <div class="field-body">
                        <label>Nombre de usuario</label>
                        <input
                            id="edit-username"
                            type="text"
                            value="${user.username || ""}"
                        >
                    </div>
                </div>

                <div class="field-card field-card--bio">
                    <div class="field-body field-body--full">
                        <label>Frase</label>

                        <textarea
                            id="edit-bio"
                            rows="4"
                        >${user.bio || ""}</textarea>

                    </div>
                </div>

            </div>

        </div>
    `;

    document
    .getElementById("back-profile")
    .addEventListener("click", () => renderProfile(app));

    document
    .getElementById("change-photo-btn")
    .addEventListener("click", editProfilePhoto);
document
    .getElementById("save-edit-profile")
    .addEventListener("click", async () => {

        const newUsername = document
    .getElementById("edit-username")
    .value
    .trim()
    .toLowerCase();
    const q = query(
    collection(db, "users"),
    where("username", "==", newUsername)
);

const result = await getDocs(q);

let usernameTaken = false;

result.forEach(docSnap => {
    if (docSnap.id !== auth.currentUser.uid) {
        usernameTaken = true;
    }
});

if (usernameTaken) {
    alert("❌ Ese nombre de usuario ya está en uso.");
    return;
}

        await updateDoc(
            doc(db, "users", auth.currentUser.uid),
            {

                name: document.getElementById("edit-name").value,

                username: newUsername,

                bio: document.getElementById("edit-bio").value

            }
        );

        alert("❤️ Perfil actualizado");

        renderProfile(app);

    });


}


// ==================== FOTO DE PERFIL ====================
function editProfilePhoto() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position:fixed; top:0; left:0; width:100%; height:100%; 
        background:rgba(0,0,0,0.95); display:flex; align-items:center; 
        justify-content:center; z-index:10000; flex-direction:column;
    `;
    
    modal.innerHTML = `
        <div style="background:#1a1a1a; padding:30px; border-radius:20px; text-align:center; width:85%; max-width:380px;">
            <h3 style="margin-bottom:20px; color:#ff3366;">📸 Actualizar Foto de Perfil</h3>
            
            <button id="btn-camera" style="display:block; width:100%; padding:16px; margin:12px 0; background:#ff3366; color:white; border:none; border-radius:12px; font-size:17px;">
                📸 Tomar foto con cámara
            </button>
            
            <button id="btn-gallery" style="display:block; width:100%; padding:16px; margin:12px 0; background:#333; color:white; border:none; border-radius:12px; font-size:17px;">
                🖼️ Elegir desde galería
            </button>
            
            <button id="btn-cancel" style="display:block; width:100%; padding:14px; margin:12px 0; background:transparent; color:#aaa; border:1px solid #444; border-radius:12px;">
                Cancelar
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Botones
    document.getElementById('btn-camera').onclick = () => {
        modal.remove();
        if (typeof window.takeProfilePhoto === 'function') {
            window.takeProfilePhoto();
        } else {
            alert("⚠️ Función de cámara no cargada");
        }
    };

    document.getElementById('btn-gallery').onclick = () => {
        modal.remove();
        chooseFromGallery();
    };

    document.getElementById('btn-cancel').onclick = () => modal.remove();
}

function chooseFromGallery() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (ev) => {
                await updateDoc(doc(db, "users", auth.currentUser.uid), { photoURL: ev.target.result });
                alert("✅ Foto guardada");
                renderProfile(document.getElementById("app"));
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

// ==================== SECCIONES ====================
async function renderPersonalInfo(app) {




    const snap = await getDoc(
        doc(db, "users", auth.currentUser.uid)
    );




    const user = snap.data();

    app.innerHTML = `
        <div class="page personal-info-screen screen-enter">
            <div class="profile-ambient personal-ambient" aria-hidden="true">
                <div class="profile-glow-orb personal-glow-orb"></div>
                <div class="profile-curve-line"></div>
            </div>

            <nav class="profile-nav personal-nav">
                <button id="back-profile" class="profile-nav-btn" aria-label="Volver">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button id="confirm-profile" class="profile-nav-btn profile-nav-btn--accent" aria-label="Confirmar cambios">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
                </button>
            </nav>

            <header class="personal-header">
                <h1 class="personal-title">
                    Información personal
                    <span class="personal-sparkle" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M12 2l1.4 4.3L18 8l-4.6 1.7L12 14l-1.4-4.3L6 8l4.6-1.7z"/></svg>
                    </span>
                </h1>
                <p class="personal-subtitle">Tus datos, tu historia.</p>
            </header>

            <div class="profile-form personal-form">
                <section class="personal-block">
                    <h2 class="personal-block-title">
                        <span class="personal-block-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                        </span>
                        Información básica
                    </h2>

                    <div class="field-card">
                        <span class="field-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        </span>
                        <div class="field-body">
                            <label for="profile-birthday">Fecha de nacimiento</label>
                            <input id="profile-birthday" type="date" value="${user?.birthday || ""}">
                        </div>
                    </div>

                    <div class="field-card field-card--select">
                        <span class="field-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>
                        </span>
                        <div class="field-body">
                            <label for="profile-gender">Género</label>
                            <select id="profile-gender">
                                <option value="">Selecciona...</option>
                                <option value="Mujer"${user?.gender === "Mujer" ? " selected" : ""}>Mujer</option>
                                <option value="Hombre"${user?.gender === "Hombre" ? " selected" : ""}>Hombre</option>
                                <option value="No binario"${user?.gender === "No binario" ? " selected" : ""}>No binario</option>
                                <option value="Prefiero no decirlo"${user?.gender === "Prefiero no decirlo" ? " selected" : ""}>Prefiero no decirlo</option>
                            </select>
                        </div>
                        <span class="field-chevron" aria-hidden="true">
                            <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                        </span>
                    </div>
                </section>

                

                <section class="personal-block">
    <h2 class="personal-block-title">
        <span class="personal-block-icon">🎁</span>
        Información para regalos
    </h2>

    <div class="field-card">
        <div class="field-body">
            <label for="profile-shirt-size">Talla de camiseta</label>
            <input
                id="profile-shirt-size"
                type="text"
                value="${user?.shirtSize || ""}"
                placeholder="Ej: S, M, L..."
            >
        </div>
    </div>

    <div class="field-card">
        <div class="field-body">
            <label for="profile-shoe-size">Talla de zapatos</label>
            <input
                id="profile-shoe-size"
                type="text"
                value="${user?.shoeSize || ""}"
                placeholder="Ej: 39"
            >
        </div>
    </div>
</section>

                <button id="save-profile" class="personal-save-btn" type="button">
                    <span class="personal-save-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>
                    </span>
                    <span class="personal-save-copy">
                        <span class="personal-save-title">Guardar cambios</span>
                        <span class="personal-save-desc">Actualiza tu información personal</span>
                    </span>
                    <span class="personal-save-chevron" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                    </span>
                </button>
            </div>
        </div>
    `;

    document
    .getElementById("back-profile")
    .addEventListener("click", () => renderProfile(app));

    document
        .getElementById("confirm-profile")
        .addEventListener("click", () => {
            document.getElementById("save-profile").click();
        });

    document
        .getElementById("save-profile")
        .addEventListener("click", async () => {




            await updateDoc(




                doc(db, "users", auth.currentUser.uid),




                {


                    birthday: document.getElementById("profile-birthday").value,

                    gender: document.getElementById("profile-gender").value,

                    shirtSize: document.getElementById("profile-shirt-size").value,
                    shoeSize: document.getElementById("profile-shoe-size").value

                }




            );




            alert("❤️ Perfil actualizado");




            renderProfile(app);




        });




}
// ==================== GUSTOS ====================
function renderFavorites() {
    app.innerHTML = `
        <div class="page">
            <div class="top-bar">
                <button id="back-profile">←</button>
                <h2>⭐ Gustos</h2>
            </div>
            <div class="profile-form">
                <label>Color favorito</label>
                <input type="text" id="fav-color" placeholder="Ej: Rojo, Negro, Morado">

                <label>Comida favorita</label>
                <input type="text" id="fav-food">

                <label>Bebida favorita</label>
                <input type="text" id="fav-drink">

                <label>Música / Artista favorito</label>
                <input type="text" id="fav-music">

                <label>Películas favoritas</label>
                <input type="text" id="fav-movies">

                <label>Series favoritas</label>
                <input type="text" id="fav-series">

                <label>Aficiones / Hobbies</label>
                <textarea id="hobbies" rows="3"></textarea>

                <button id="save-favorites">Guardar Gustos</button>
            </div>
        </div>
    `;

    document.getElementById("back-profile").addEventListener("click", () => renderProfile(app));

    document.getElementById("save-favorites").addEventListener("click", async () => {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            favColor: document.getElementById("fav-color").value,
            favFood: document.getElementById("fav-food").value,
            favDrink: document.getElementById("fav-drink").value,
            favMusic: document.getElementById("fav-music").value,
            favMovies: document.getElementById("fav-movies").value,
            favSeries: document.getElementById("fav-series").value,
            hobbies: document.getElementById("hobbies").value
        });
        alert("⭐ Gustos guardados");
        renderProfile(app);
    });
}


// ==================== OTROS ====================
function renderOther() {
    app.innerHTML = `
        <div class="page">
            <div class="top-bar">
                <button id="back-profile">←</button>
                <h2>⚙️ Otros</h2>
            </div>
            <div class="profile-form">
                <label>Ciudad</label>
                <input type="text" id="city">

                <label>Idiomas</label>
                <input type="text" id="languages" placeholder="Español, Inglés...">

                <label>Instagram</label>
                <input type="text" id="instagram">

                <label>Spotify</label>
                <input type="text" id="spotify">

                <label>TikTok</label>
                <input type="text" id="tiktok">

                <button id="save-other">Guardar</button>
            </div>
        </div>
    `;

    document.getElementById("back-profile").addEventListener("click", () => renderProfile(app));

    document.getElementById("save-other").addEventListener("click", async () => {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            city: document.getElementById("city").value,
            languages: document.getElementById("languages").value,
            instagram: document.getElementById("instagram").value,
            spotify: document.getElementById("spotify").value,
            tiktok: document.getElementById("tiktok").value
        });
        alert("⚙️ Información guardada");
        renderProfile(app);
    });
}