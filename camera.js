// camera.js - Versión mejorada
let photoGallery = JSON.parse(localStorage.getItem('photoGallery')) || [];

function openCamera(challengeId, challengeTitle) {
    const modal = document.createElement('div');
    modal.id = "cameraModal";
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.98); z-index: 10000; display: flex; 
        flex-direction: column; align-items: center; justify-content: center;
    `;

    modal.innerHTML = `
        <h2 style="color:white; margin-bottom:10px;">${challengeTitle}</h2>
        <video id="cameraVideo" autoplay playsinline style="width:100%; max-height:70vh; background:#000;"></video>
        <div style="margin-top:20px;">
            <button id="captureBtn" style="padding:15px 40px; font-size:18px; margin:5px;">📸 Tomar Foto</button>
            <button id="cancelBtn" style="padding:15px 40px; font-size:18px; margin:5px;">Cancelar</button>
        </div>
    `;

    document.body.appendChild(modal);

    const video = document.getElementById('cameraVideo');
    const captureBtn = document.getElementById('captureBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
    })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        alert("Error al abrir cámara: " + err.message);
        modal.remove();
    });

    captureBtn.onclick = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        canvas.getContext('2d').drawImage(video, 0, 0);

        const photoData = canvas.toDataURL('image/jpeg', 0.85);

        // Guardar
        photoGallery.push({
    id: Date.now(),
    activityId: challengeId,
    title: challengeTitle,
    day: new Date().toLocaleDateString('es-ES'),
    time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    timestamp: new Date().toISOString(),
    photo: photoData
});

        localStorage.setItem('photoGallery', JSON.stringify(photoGallery));

        // Marcar en la actividad
        const activity = activities.find(a => a.id === challengeId);
        if (activity) activity.photoProof = photoData;

        // Cerrar
        video.srcObject.getTracks().forEach(track => track.stop());
        modal.remove();

        alert("✅ Foto guardada correctamente!");
        
        // Recargar la pantalla de la actividad
        const currentIndex = activities.findIndex(a => a.id === challengeId);
        if (currentIndex !== -1) openActivity(currentIndex);
    };

    cancelBtn.onclick = () => {
        if (video.srcObject) video.srcObject.getTracks().forEach(track => track.stop());
        modal.remove();
    };
}

// === FUNCIÓN PARA FOTO DE PERFIL ===
window.takeProfilePhoto = function() {
    const modal = document.createElement('div');
    modal.id = "profileCameraModal";
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.98); z-index: 10000; display: flex; 
        flex-direction: column; align-items: center; justify-content: center;
    `;

    modal.innerHTML = `
        <h2 style="color:white; margin-bottom:15px;">📸 Foto de Perfil</h2>
        <video id="profileVideo" autoplay playsinline style="width:90%; max-height:60vh; background:#000; border-radius:12px;"></video>
        <div style="margin-top:20px; display:flex; gap:15px;">
            <button id="captureProfileBtn" style="padding:15px 30px; font-size:18px; background:#ff3366; color:white; border:none; border-radius:50px;">📸 Capturar</button>
            <button id="cancelProfileBtn" style="padding:15px 30px; font-size:18px; background:#333; color:white; border:none; border-radius:50px;">Cancelar</button>
        </div>
    `;

    document.body.appendChild(modal);

    const video = document.getElementById('profileVideo');
    const captureBtn = document.getElementById('captureProfileBtn');
    const cancelBtn = document.getElementById('cancelProfileBtn');

    let stream;

    navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
    })
    .then(s => {
        stream = s;
        video.srcObject = stream;
    })
    .catch(err => {
        alert("No se pudo acceder a la cámara: " + err.message);
        modal.remove();
    });

    captureBtn.onclick = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        canvas.getContext('2d').drawImage(video, 0, 0);

        const photoData = canvas.toDataURL('image/jpeg', 0.85);

        // Guardar en Firestore
        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                photoURL: photoData
            });
            alert("✅ Foto de perfil actualizada");
            
            // Recargar perfil
            if (typeof renderProfile === 'function') {
                renderProfile(document.getElementById("app"));
            }
        } catch (e) {
            alert("Error al guardar foto");
        }

        // Limpiar
        if (stream) stream.getTracks().forEach(track => track.stop());
        modal.remove();
    };

    cancelBtn.onclick = () => {
        if (stream) stream.getTracks().forEach(track => track.stop());
        modal.remove();
    };
};
