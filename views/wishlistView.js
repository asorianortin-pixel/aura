// views/wishlistView.js
import { auth } from "../firebase/auth.js";
import {
    db,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "../firebase/firestore.js";

let currentTab = "alba";
let wishlistData = [];
let editingWishId = null;

export async function renderWishlist(app) {
    app.innerHTML = `
        <div class="page wishlist-page">
            <div class="top-bar">
                <button id="back-main">←</button>
                <h2>Wishlist</h2>
                <button id="add-wish-btn">＋</button>
            </div>

            <div class="wishlist-tabs">
                <button id="tab-alba"> Alba</button>

<button id="tab-alejandro"> Alejandro</button>
            </div>

            <div id="wishlist-content" class="wishlist-content"></div>
        </div>
    `;

    document.getElementById("back-main").addEventListener("click", () => window.renderMoreMenu ? window.renderMoreMenu() : history.back());

    document.getElementById("add-wish-btn").addEventListener("click", showAddWishModal);

    document.getElementById("tab-alba").addEventListener("click", () => { currentTab = "alba"; loadWishlist(); });
    document.getElementById("tab-alejandro").addEventListener("click", () => { currentTab = "alejandro"; loadWishlist(); });

    loadWishlist();
}

async function loadWishlist() {
    const content = document.getElementById("wishlist-content");
    content.innerHTML = `<p style="text-align:center;padding:50px;color:#666;">Cargando deseos...</p>`;

    try {
        const snapshot = await getDocs(collection(db, "wishlist"));
        wishlistData = [];
        let html = '<div style="padding:15px; display:flex; flex-direction:column; gap:15px;">';

        if (snapshot.empty) {
        
            html += `<p style="text-align:center; padding:60px; color:#888;">Aún no hay deseos.<br>¡Añade el primero con el botón + !</p>`;
        } else {
            snapshot.forEach((docSnap) => {
                const wish = docSnap.data();
                wishlistData.push({
    id: docSnap.id,
    ...wish
});
                if (wish.owner !== currentTab) return;
                const imageUrl = wish.image || '../assets/images/foto1.jpg'; // usa una imagen que ya tengas
                html += `
                    <div style="
position:relative;
background:#1f1f1f;
border-radius:16px;
overflow:hidden;
border:1px solid ${wish.purchased ? "#34c759" : "#ff3366"};">
                        <img src="${imageUrl}" style="width:100%; height:180px; object-fit:cover;">
                        ${wish.purchased ? `
<div style="
position:absolute;
top:15px;
left:15px;
background:#34c759;
color:white;
padding:6px 12px;
border-radius:999px;
font-size:12px;
font-weight:bold;
z-index:2;">
🎁 COMPRADO
</div>
` : ""}
                        <div style="padding:15px;">
                            <h4 style="margin:0 0 8px 0;">${wish.name}</h4>
                            ${wish.description ? `<p style="margin:5px 0; color:#ccc;">${wish.description}</p>` : ''}
                            ${wish.price ? `<p style="margin:8px 0 0 0; font-weight:bold; color:${wish.purchased ? "#34c759" : "#ff3366"};">${wish.price} €</p>` : ''}
                            ${wish.link ? `<a href="${wish.link}" target="_blank" style="color:#ff6699; font-size:14px;">Abrir producto →</a>` : ''}
                        <div style="position:absolute;top:15px;right:15px;">

    <button
        class="wish-menu-btn"
        data-id="${docSnap.id}"
        style="
            background:rgba(0,0,0,.55);
            border:none;
            color:white;
            width:36px;
            height:36px;
            border-radius:50%;
            font-size:22px;
            cursor:pointer;">
        ⋮
    </button>

    <div
        class="wish-menu"
        id="menu-${docSnap.id}"
        style="
            display:none;
            position:absolute;
            right:0;
            top:42px;
            background:#252525;
            border-radius:12px;
            overflow:hidden;
            min-width:170px;
            box-shadow:0 10px 30px rgba(0,0,0,.45);">
<button class="edit-wish"
        data-id="${docSnap.id}">
    ✏️ Editar
</button>

        <button
    class="status-wish"
    data-id="${docSnap.id}">
    ${wish.purchased ? "↩️ Marcar como pendiente" : "🎁 Marcar como comprado"}
</button>

        <button class="delete-wish"
                data-id="${docSnap.id}">
            🗑 Eliminar
        </button>

    </div>

</div>
                            </div>
                    </div>
                `;
            });
        }

        html += '</div>';
        content.innerHTML = html;
        document.querySelectorAll(".wish-menu-btn").forEach(btn=>{

    btn.onclick=()=>{

        document.querySelectorAll(".wish-menu").forEach(menu=>{

            if(menu.id!==`menu-${btn.dataset.id}`)
                menu.style.display="none";

        });

        const menu=document.getElementById(`menu-${btn.dataset.id}`);

        menu.style.display=
            menu.style.display==="block"
            ? "none"
            : "block";

    };

});
document.querySelectorAll(".delete-wish").forEach(btn => {

    btn.onclick = async () => {

        const confirmar = confirm("¿Quieres eliminar este regalo?");

        if (!confirmar) return;

        try {

            await deleteDoc(doc(db, "wishlist", btn.dataset.id));

            loadWishlist();

        } catch (err) {

            console.error(err);

            alert("No se pudo eliminar el regalo.");

        }

    };

});
document.querySelectorAll(".edit-wish").forEach(btn => {

    btn.onclick = () => {

        const wish = wishlistData.find(w => w.id === btn.dataset.id);

        if (!wish) return;

        showAddWishModal(wish, wish.id);

    };

});
document.querySelectorAll(".status-wish").forEach(btn => {

    btn.onclick = async () => {

        const wish = wishlistData.find(w => w.id === btn.dataset.id);

        if (!wish) return;

        try {

            await updateDoc(doc(db, "wishlist", wish.id), {
                purchased: !wish.purchased
            });

            loadWishlist();

        } catch (err) {

            console.error(err);
            alert("No se pudo actualizar el estado.");

        }

    };

});
document.addEventListener("click", (e) => {

    if (
        !e.target.closest(".wish-menu") &&
        !e.target.closest(".wish-menu-btn")
    ) {

        document.querySelectorAll(".wish-menu").forEach(menu => {

            menu.style.display = "none";

        });

    }

});

}catch (err) {

    console.error(err);

    content.innerHTML = `
        <p style="text-align:center;padding:50px;color:#888;">
            Error al cargar la wishlist.
        </p>
    `;

}
}

function showAddWishModal(wish = null, wishId = null) {
    const modal = document.createElement('div');
    modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:10000;display:flex;align-items:center;justify-content:center;`;

    modal.innerHTML = `
        <div style="background:#1a1a1a;padding:25px;border-radius:20px;width:90%;max-width:420px;">
            <h3 style="text-align:center;margin-bottom:20px;color:#ff3366;">
    ${wish ? "✏️ Editar deseo" : "➕ Nuevo Deseo"}
</h3>
            
           <input
    type="text"
    id="wish-name"
    value="${wish?.name || ""}"
    placeholder="Nombre del deseo"
    style="width:100%;padding:12px;margin:8px 0;background:#222;border:none;border-radius:8px;color:white;">
<textarea
id="wish-desc"
placeholder="Descripción"
rows="2"
style="width:100%;padding:12px;margin:8px 0;background:#222;border:none;border-radius:8px;color:white;">${wish?.description || ""}</textarea>            
<input
type="text"
id="wish-price"
value="${wish?.price || ""}"
placeholder="Precio aproximado (€)"
style="width:100%;padding:12px;margin:8px 0;background:#222;border:none;border-radius:8px;color:white;">
            
            <input
type="url"
id="wish-link"
value="${wish?.link || ""}"
placeholder="Enlace del producto"
style="width:100%;padding:12px;margin:8px 0;background:#222;border:none;border-radius:8px;color:white;">

            
            <input
type="text"
id="wish-image"
value="${wish?.image || ""}"
placeholder="URL de imagen (se llena solo)"
style="width:100%;padding:12px;margin:8px 0;background:#222;border:none;border-radius:8px;color:white;">

            <div style="display:flex;gap:10px;margin-top:25px;">
                <button id="cancel-wish" style="flex:1;padding:14px;background:#333;border:none;border-radius:12px;color:white;">Cancelar</button>
                <button id="save-wish" style="flex:1;padding:14px;background:#ff3366;border:none;border-radius:12px;color:white;">
    ${wish ? "Guardar cambios" : "Guardar deseo"}
</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const linkInput = document.getElementById("wish-link");

let timeout;

linkInput.addEventListener("input", () => {

    clearTimeout(timeout);

    timeout = setTimeout(loadPreview, 700);

});

    async function loadPreview() {

    const link = document.getElementById("wish-link").value.trim();

    if (!link) {
        alert("Pega primero un enlace.");
        return;
    }

    try {

        const res = await fetch(
            `https://api.microlink.io/?url=${encodeURIComponent(link)}`
        );

        const data = await res.json();

        if (data.status === "success") {

            if (data.data.title) {
                document.getElementById("wish-name").value = data.data.title;
            }

            if (data.data.image?.url) {
                document.getElementById("wish-image").value = data.data.image.url;
            }

        } else {

            alert("No se pudo obtener la vista previa.");

        }

    } catch (err) {

        console.error(err);
        alert("Error obteniendo la imagen.");

    }

}

    document.getElementById("cancel-wish").addEventListener("click", () => {
    modal.remove();
});

document.getElementById("save-wish").addEventListener("click", async () => {

    const wish = {
    name: document.getElementById("wish-name").value.trim(),
    description: document.getElementById("wish-desc").value.trim(),
    price: document.getElementById("wish-price").value.trim(),
    link: document.getElementById("wish-link").value.trim(),
    image: document.getElementById("wish-image").value.trim(),
    owner: currentTab,
    purchased: wishId ? (wishlistData.find(w => w.id === wishId)?.purchased ?? false) : false,
    createdBy: auth.currentUser?.uid || null,
    createdAt: Date.now()
};

    if (!wish.name) {
        alert("Pon un nombre al deseo.");
        return;
    }

    try {

      if (wishId) {

    await updateDoc(doc(db, "wishlist", wishId), wish);

} else {

    await addDoc(collection(db, "wishlist"), wish);

}

modal.remove();

loadWishlist();

        } catch (err) {

        console.error(err);

        alert("Error al guardar el deseo.");

    }

});

}
