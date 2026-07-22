import { auth } from "./auth.js";
import {
    db,
    doc,
    getDoc,
    updateDoc
} from "./firestore.js";

export async function renderProfile(app) {
    const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
    const user = snap.data() || {};

    app.innerHTML = `
        <div class="page profile-page">
            <div class="top-bar">
                <button id="back-more">←</button>
                <h2>Mi Perfil</h2>
                <button id="settings-btn">⚙️</button>
            </div>

            <div class="profile-header">
                <div class="profile-picture-container">
                    <img id="profile-photo" 
                         src="${user.photoURL || '../assets/images/foto1.jpg'}" 
                         alt="Foto de perfil">
                    <button id="edit-photo-btn" class="edit-photo-btn">✏️</button>
                </div>
                
                <h1 class="profile-name">${user.name || "Tu Nombre"}</h1>
                <p class="profile-username">@${user.username || "username"}</p>
                <p class="member-since">Miembro desde ${user.memberSince || "2025"}</p>

                <div class="profile-bio">
                    "${user.bio || "Aquí construimos nuestro mejor nosotros, juntos. ❤️"}"
                </div>
            </div>

            <div class="profile-stats">
                <div class="stat-item">
                    <span class="stat-number">12</span>
                    <span class="stat-label">Retos<br>completados</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">7</span>
                    <span class="stat-label">Días<br>seguidos</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">850</span>
                    <span class="stat-label">Puntos<br>totales</span>
                </div>
            </div>

            <div class="profile-sections">
                <button class="section-card" id="personal-btn">
                    👤 1. Información personal
                    <span class="section-desc">Tus datos, tu historia.</span>
                </button>
                <button class="section-card" id="relationship-btn">
                    ❤️ 2. Relación
                    <span class="section-desc">Nuestro vínculo, nuestro espacio.</span>
                </button>
                <button class="section-card" id="favorites-btn">
                    ⭐ 3. Gustos
                    <span class="section-desc">Lo que nos gusta y nos representa.</span>
                </button>
                <button class="section-card" id="gifts-btn">
                    🎁 4. Regalos
                    <span class="section-desc">Ideas y detalles para sorprendernos.</span>
                </button>
                <button class="section-card" id="other-btn">
                    ⚙️ 5. Otros
                    <span class="section-desc">Recuerdos, metas y más.</span>
                </button>
            </div>
        </div>
    `;

    // Eventos
    document.getElementById("back-more").addEventListener("click", window.renderMoreMenu);
    document.getElementById("edit-photo-btn").addEventListener("click", editProfilePhoto);

    document.getElementById("personal-btn").addEventListener("click", renderPersonalInfo);
    document.getElementById("relationship-btn").addEventListener("click", renderRelationship);
    document.getElementById("favorites-btn").addEventListener("click", renderFavorites);
    document.getElementById("gifts-btn").addEventListener("click", renderGifts);
    document.getElementById("other-btn").addEventListener("click", renderOther);
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
async function renderPersonalInfo() {




    const snap = await getDoc(
        doc(db, "users", auth.currentUser.uid)
    );




    const user = snap.data();




    app.innerHTML = `




        <div class="page">




            <div class="top-bar">




                <button id="back-profile">←</button>




                <h2>Información personal</h2>




            </div>




            <div class="profile-form">




                <label>Nombre</label>




                <input
                    id="profile-name"
                    value="${user.name || ""}"
                >




                <label>Username</label>




                <input
                    id="profile-username"
                    value="${user.username || ""}"
                >




                <label>Fecha de nacimiento</label>




                <input
                    id="profile-birthday"
                    type="date"
                    value="${user.birthday || ""}"
                >




                <label>Género</label>




                <select id="profile-gender">




                    <option value="">Selecciona...</option>




                    <option value="Mujer">Mujer</option>




                    <option value="Hombre">Hombre</option>




                    <option value="No binario">No binario</option>




                    <option value="Prefiero no decirlo">
                        Prefiero no decirlo
                    </option>




                </select>




                <label>Biografía</label>




                <textarea
                    id="profile-bio"
                >${user.bio || ""}</textarea>




                <button id="save-profile">




                    Guardar cambios




                </button>




            </div>




        </div>




    `;




    document
        .getElementById("back-profile")
        .addEventListener("click", renderProfile);




    document
        .getElementById("save-profile")
        .addEventListener("click", async () => {




            await updateDoc(




                doc(db, "users", auth.currentUser.uid),




                {




                    name: document.getElementById("profile-name").value,




                    username: document.getElementById("profile-username").value,




                    birthday: document.getElementById("profile-birthday").value,




                    gender: document.getElementById("profile-gender").value,




                    bio: document.getElementById("profile-bio").value




                }




            );




            alert("❤️ Perfil actualizado");




            renderProfile();




        });




}

function renderRelationship() {
    app.innerHTML = `
        <div class="page">
            <div class="top-bar">
                <button id="back-profile">←</button>
                <h2>❤️ Relación</h2>
            </div>

            <div class="profile-form">
                <label>Tipo de relación</label>
                <select id="relationship-type">
                    <option value="">Selecciona...</option>
                    <option value="Novios">Novios</option>
                    <option value="Prometidos">Prometidos</option>
                    <option value="Casados">Casados</option>
                    <option value="Pareja">Pareja</option>
                    <option value="Otra">Otra</option>
                </select>

                <label>Fecha de inicio</label>
                <input type="date" id="relationship-start">

                <label>Aniversario</label>
                <input type="date" id="anniversary">

                <label>¿Vivimos juntos?</label>
                <select id="live-together">
                    <option value="">Selecciona...</option>
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                </select>

                <label>Idioma del amor</label>
                <select id="love-language">
                    <option value="">Selecciona...</option>
                    <option value="Palabras de afirmación">Palabras de afirmación</option>
                    <option value="Tiempo de calidad">Tiempo de calidad</option>
                    <option value="Actos de servicio">Actos de servicio</option>
                    <option value="Regalos">Regalos</option>
                    <option value="Contacto físico">Contacto físico</option>
                </select>

                <button id="save-relationship">Guardar cambios</button>
            </div>
        </div>
    `;

    document.getElementById("back-profile").addEventListener("click", () => renderProfile(app));

    document.getElementById("save-relationship").addEventListener("click", async () => {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            relationshipType: document.getElementById("relationship-type").value,
            relationshipStart: document.getElementById("relationship-start").value,
            anniversary: document.getElementById("anniversary").value,
            liveTogether: document.getElementById("live-together").value,
            loveLanguage: document.getElementById("love-language").value
        });
        alert("❤️ Relación guardada");
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

// ==================== REGALOS ====================
function renderGifts() {
    app.innerHTML = `
        <div class="page">
            <div class="top-bar">
                <button id="back-profile">←</button>
                <h2>🎁 Regalos</h2>
            </div>
            <div class="profile-form">
                <label>Talla de ropa</label>
                <input type="text" id="clothing-size">

                <label>Talla de zapatos</label>
                <input type="text" id="shoe-size">

                <label>Perfume favorito</label>
                <input type="text" id="favorite-perfume">

                <label>Flores favoritas</label>
                <input type="text" id="favorite-flowers">

                <label>Chocolate favorito</label>
                <input type="text" id="favorite-chocolate">

                <label>Lista de deseos</label>
                <textarea id="wishlist" rows="4" placeholder="Cosas que te gustaría recibir..."></textarea>

                <button id="save-gifts">Guardar Regalos</button>
            </div>
        </div>
    `;

    document.getElementById("back-profile").addEventListener("click", () => renderProfile(app));

    document.getElementById("save-gifts").addEventListener("click", async () => {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            clothingSize: document.getElementById("clothing-size").value,
            shoeSize: document.getElementById("shoe-size").value,
            favoritePerfume: document.getElementById("favorite-perfume").value,
            favoriteFlowers: document.getElementById("favorite-flowers").value,
            favoriteChocolate: document.getElementById("favorite-chocolate").value,
            wishlist: document.getElementById("wishlist").value
        });
        alert("🎁 Información de regalos guardada");
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