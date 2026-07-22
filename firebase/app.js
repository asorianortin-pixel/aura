import {
    auth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
     signOut
} from "./auth.js";

import {
    db,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    serverTimestamp
} from "./firestore.js";

const authScreen = document.getElementById("auth-screen");

function generateAuraId() {

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "AURA-";

    for (let i = 0; i < 6; i++) {
        code += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    return code;
}

function generateCoupleId(){

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let id = "COUPLE-";

    for(let i=0;i<8;i++){

        id += chars.charAt(
            Math.floor(Math.random()*chars.length)
        );

    }

    return id;

}

async function getCurrentCouple() {

    const userSnap = await getDoc(
        doc(db, "users", auth.currentUser.uid)
    );

    const userData = userSnap.data();

    if (!userData.partnerId) {
        return null;
    }

    const coupleSnap = await getDoc(
        doc(db, "couples", userData.partnerId)
    );

    if (!coupleSnap.exists()) {
        return null;
    }

    return {
        id: coupleSnap.id,
        ...coupleSnap.data()
    };

}

async function hasPartner(){

    const couple = await getCurrentCouple();

    return couple !== null;

}

function renderPairScreen(userData){

    authScreen.innerHTML = `
        <div class="auth-card">

            <h1>❤️ Bienvenido</h1>

            <p>
                Tu Aura ID
            </p>

            <h2>${userData.auraId}</h2>

            <button id="copy-id">
                Copiar Aura ID
            </button>

            <hr>

            <input
                id="partner-id"
                placeholder="Introduce el Aura ID de tu pareja"
            >

            <button id="link-partner">
    Vincular
</button>

<button id="logout" class="secondary-btn">
    Cerrar sesión
</button>

</div>
`;
    document
    .getElementById("logout")
    .addEventListener("click", async () => {

        await signOut(auth);

    });

    document
        .getElementById("copy-id")
        .addEventListener("click", async ()=>{

            await navigator.clipboard.writeText(userData.auraId);

            alert("Aura ID copiado.");

        });
document
    .getElementById("link-partner")
    .addEventListener("click", async () => {

        const auraId = document
            .getElementById("partner-id")
            .value
            .trim()
            .toUpperCase();

        if (!auraId) {
            alert("Introduce un Aura ID.");
            return;
        }

        const q = query(
            collection(db, "users"),
            where("auraId", "==", auraId)
        );

        const result = await getDocs(q);

        if (result.empty) {
            alert("No existe ningún usuario con ese Aura ID.");
            return;
        }

        const partnerDoc = result.docs[0];

const partner = partnerDoc.data();

renderPartnerFound(partnerDoc.id, partner);

    });
   
}

function renderPartnerFound(uid, partner){

    authScreen.innerHTML = `

        <div class="auth-card">

            <h1>❤️ Usuario encontrado</h1>

            <h2>${partner.name}</h2>

            <p>@${partner.username}</p>

            <p style="margin-top:25px;">
                ¿Quieres enviar una solicitud?
            </p>

            <button id="send-request">
                Enviar solicitud
            </button>

            <button
                id="back-pair"
                class="secondary-btn">

                Cancelar

            </button>

        </div>

    `;
document
.getElementById("send-request")
.addEventListener("click",async()=>{

    await addDoc(
        collection(db,"requests"),
        {

            fromUid: auth.currentUser.uid,

            toUid: uid,

            status:"pending",

            createdAt:serverTimestamp()

        }
    );

    alert("❤️ Solicitud enviada.");

});
document
    .getElementById("back-pair")
    .addEventListener("click", async () => {

        const snap = await getDoc(
            doc(db, "users", auth.currentUser.uid)
        );

        renderPairScreen(snap.data());

    });
}

async function checkPendingRequests(user){

    const q = query(

        collection(db,"requests"),

        where("toUid","==",user.uid),

        where("status","==","pending")

    );

    const result = await getDocs(q);

    return result;

}

function renderLogin() {

    authScreen.innerHTML = `
        <div class="auth-card">

            <h1>AURA</h1>
            <p>Tu espacio privado ❤️</p>

            <input
                id="login-email"
                type="email"
                placeholder="Correo electrónico"
            >

            <input
                id="login-password"
                type="password"
                placeholder="Contraseña"
            >

            <button id="login-btn">
                Iniciar sesión
            </button>

            <button id="register-btn" class="secondary-btn">
                Crear cuenta
            </button>

        </div>
    `;

    document
        .getElementById("register-btn")
        .addEventListener("click", renderRegister);
        document
    .getElementById("login-btn")
    .addEventListener("click", async () => {

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        if (!email || !password) {
            alert("Introduce tu correo y contraseña.");
            return;
        }

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        } catch (error) {

            alert("Correo o contraseña incorrectos.");

        }

    });
}

function renderRegister(){

    authScreen.innerHTML = `
        <div class="auth-card">

            <h1>AURA</h1>
            <p>Crea tu cuenta ✨</p>

            <input
                id="name"
                placeholder="Nombre"
            >

            <input
                id="username"
                placeholder="Username"
            >

            <input
                id="email"
                type="email"
                placeholder="Correo"
            >

            <input
                id="password"
                type="password"
                placeholder="Contraseña"
            >

            <input
                id="password2"
                type="password"
                placeholder="Repetir contraseña"
            >

            <button id="create-account">
                Crear cuenta
            </button>

            <button id="back-login" class="secondary-btn">
                Ya tengo cuenta
            </button>

        </div>
    `;

    document
        .getElementById("back-login")
        .addEventListener("click", renderLogin);

    document
    .getElementById("create-account")
    .addEventListener("click", async () => {

        const email = document.getElementById("email").value.trim();
        const username = document
    .getElementById("username")
    .value
    .trim()
    .toLowerCase();
        const password = document.getElementById("password").value;
        const password2 = document.getElementById("password2").value;

        if (!email || !password || !password2) {
            alert("Completa todos los campos.");
            return;
        }

        if (password !== password2) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
const usernameQuery = query(
    collection(db, "users"),
    where("username", "==", username)
);

const usernameSnapshot = await getDocs(usernameQuery);

if (!usernameSnapshot.empty) {
    alert("Ese nombre de usuario ya existe.");
    return;
}
            const userCredential =
    await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

const user = userCredential.user;
const auraId = generateAuraId();
await setDoc(
    doc(db, "users", user.uid),
    {

        uid: user.uid,

        auraId: auraId,

        name: document.getElementById("name").value.trim(),

        username: username,

        email,

        partnerId: null,

        photo: null,

        createdAt: new Date().toISOString()

    }
);

alert("🎉 Cuenta creada correctamente");
renderPairScreen({
    auraId,
    partnerId: null
});
           

        } catch (error) {

    console.error("Código:", error.code);
    console.error("Mensaje:", error.message);
    console.error(error);

    alert(error.code + "\n\n" + error.message);

}

    });

}

onAuthStateChanged(auth, async (user) => {

    if (user) {

        const snap = await getDoc(
            doc(db, "users", user.uid)
        );

        const userData = snap.data();
        const requests = await checkPendingRequests(user);

if(!requests.empty){

    const request = requests.docs[0];

    renderPendingRequest(request);

    return;

}

        if (userData.partnerId) {

    const coupleSnap = await getDoc(
        doc(db, "couples", userData.partnerId)
    );

    if (!coupleSnap.exists()) {

        await updateDoc(
            doc(db, "users", user.uid),
            {
                partnerId: null
            }
        );

        renderPairScreen(userData);

        return;

    }

    authScreen.style.opacity = "0";

    setTimeout(() => {

        authScreen.style.display = "none";

    }, 300);

    return;

}
renderPairScreen(userData);

    } else {

        authScreen.style.display = "flex";
        authScreen.style.opacity = "1";

        renderLogin();

    }

});

async function renderPendingRequest(request){

    const requestData = request.data();

    authScreen.innerHTML = `

        <div class="auth-card">

            <h1>❤️ Nueva solicitud</h1>

            <p>
                Tienes una solicitud pendiente.
            </p>

            <button id="accept-request">
                Aceptar
            </button>

            <button
                id="reject-request"
                class="secondary-btn">

                Rechazar

            </button>

        </div>

    `;

    document
    .getElementById("accept-request")
    .addEventListener("click", async () => {

        const coupleId = generateCoupleId();

await setDoc(
    doc(db, "couples", coupleId),
    {
        id: coupleId,

        members: [
            auth.currentUser.uid,
            requestData.fromUid
        ],

        createdAt: serverTimestamp(),

        status: "active",

        anniversary: null,

        theme: "default"

    }
);

await updateDoc(
    doc(db, "users", auth.currentUser.uid),
    {
        partnerId: coupleId
    }
);

await updateDoc(
    doc(db, "users", requestData.fromUid),
    {
        partnerId: coupleId
    }
);

        await deleteDoc(
            doc(db, "requests", request.id)
        );

        location.reload();

    });

    document
    .getElementById("reject-request")
    .addEventListener("click", async () => {

        await deleteDoc(
            doc(db, "requests", request.id)
        );

        location.reload();

    });
}

function renderProfile(){

    authScreen.innerHTML = `

        <div class="profile-screen">

            <h1>👤 Mi perfil</h1>

            <div class="profile-list">

                <button class="profile-item" id="personal-btn">
                    👤 Información personal
                </button>

                <button class="profile-item" id="relationship-btn">
                    ❤️ Relación
                </button>

                <button class="profile-item" id="favorites-btn">
                    ⭐ Gustos
                </button>

                <button class="profile-item" id="other-btn">
                    ⚙️ Otros
                </button>

            </div>

        </div>

    `;

    document
        .getElementById("personal-btn")
        .addEventListener("click", renderPersonalInfo);

}

async function renderPersonalInfo(){

    const snap = await getDoc(
        doc(db,"users",auth.currentUser.uid)
    );

    const user = snap.data();

    authScreen.innerHTML = `

        <div class="profile-screen">

            <h1>👤 Información personal</h1>

            <input
                id="name"
                placeholder="Nombre"
                value="${user.name || ""}"
            >

            <input
                id="username"
                placeholder="Username"
                value="${user.username || ""}"
            >

            <input
                id="birthday"
                type="date"
                value="${user.birthday || ""}"
            >

            <select id="gender">

                <option value="">Género</option>

                <option value="Mujer">Mujer</option>

                <option value="Hombre">Hombre</option>

                <option value="No binario">No binario</option>

            </select>

            <textarea
                id="bio"
                placeholder="Biografía"
            >${user.bio || ""}</textarea>

            <button id="save-personal">

                Guardar

            </button>

            <button
                id="back-profile"
                class="secondary-btn">

                Volver

            </button>

        </div>

    `;

    document
        .getElementById("save-personal")
        .addEventListener("click", async()=>{

            await updateDoc(

                doc(db,"users",auth.currentUser.uid),

                {

                    name:document.getElementById("name").value,

                    username:document.getElementById("username").value,

                    birthday:document.getElementById("birthday").value,

                    gender:document.getElementById("gender").value,

                    bio:document.getElementById("bio").value

                }

            );

            alert("Perfil actualizado ❤️");

        });

    document
        .getElementById("back-profile")
        .addEventListener("click",renderProfile);

}