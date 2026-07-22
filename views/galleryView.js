// views/galleryView.js

let photoGallery = [];

function loadPhotos() {
    photoGallery = JSON.parse(localStorage.getItem('photoGallery')) || [];
}

function renderGallery() {
    loadPhotos();
    stopAudio();

    let html = `
        <main class="gallery-screen app-screen screen-enter">
            <button class="back-button" onclick="renderWelcome()">← Volver</button>
            <div class="app-header">
                <p class="eyebrow">Pruebas</p>
                <h1>Galería de Fotos</h1>
            </div>
    `;

    if (photoGallery.length === 0) {
        html += `
            <div style="text-align:center; padding:60px 20px; color:#666;">
                <p>Aún no hay fotos guardadas.</p>
                <p>Completa actividades que requieran prueba fotográfica.</p>
            </div>`;
    } else {
        html += `<div class="photo-grid">`;
        photoGallery.slice().reverse().forEach(photo => {
            html += `
                <div class="photo-card">
                    <img src="${photo.photo}" alt="${photo.title}">
                    <div class="photo-info">
                        <p class="photo-title">${photo.title}</p>
                        <p class="photo-date">${new Date(photo.timestamp).toLocaleDateString()}</p>
                    </div>
                </div>`;
        });
        html += `</div>`;
    }

    html += `</main>`;

    app.innerHTML = html;
}

// Estilos básicos (puedes moverlos a style.css después)
const style = document.createElement('style');
style.textContent = `
    .photo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 12px;
        padding: 15px;
    }
    .photo-card {
        border-radius: 12px;
        overflow: hidden;
        background: #1a1a1a;
    }
    .photo-card img {
        width: 100%;
        display: block;
    }
    .photo-info {
        padding: 10px;
    }
    .photo-title {
        font-size: 14px;
        margin: 0 0 4px 0;
        color: white;
    }
    .photo-date {
        font-size: 12px;
        color: #888;
        margin: 0;
    }
`;
document.head.appendChild(style);

window.renderGallery = renderGallery;