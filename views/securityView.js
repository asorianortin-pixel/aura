let firstPin = "";
let creatingPin = false;
let confirmingPin = false;

export function renderSecurityView(app, onSuccess) {

    let pin = "";

    const savedPin = localStorage.getItem("AURA_INTIMIDAD_PIN");

    if (!creatingPin && !confirmingPin) {
    creatingPin = !savedPin;
}

    app.innerHTML = `
        <div class="page security-page">

            <div style="
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                min-height:100vh;
                padding:30px;
                text-align:center;
                color:white;
            ">

                <div style="font-size:60px;">🔒</div>

                <button
                id="security-back"
                style="
                position:absolute;
                top:20px;
                left:20px;
                background:none;
                border:none;
                color:white;
                font-size:18px;
                cursor:pointer;
                    ">
                    ← Volver
                </button>

                <h2 style="margin-top:20px;">
    ${creatingPin
        ? (confirmingPin ? "Confirma tu PIN" : "Crea tu PIN")
        : "Intimidad protegida"}
</h2>

<p style="color:#999;">
    ${creatingPin
        ? (confirmingPin
            ? "Vuelve a introducir el PIN"
            : "Elige un PIN de 4 dígitos")
        : "Introduce tu PIN de 4 dígitos"}
</p>

                <div id="pin-dots"
                style="
                    display:flex;
                    gap:15px;
                    margin:35px 0;
                ">
                    <span>○</span>
                    <span>○</span>
                    <span>○</span>
                    <span>○</span>
                </div>

                <div id="pin-pad"
                style="
                    display:grid;
                    grid-template-columns:repeat(3,80px);
                    gap:15px;
                    justify-content:center;
                ">

                </div>

            </div>
        </div>
    `;

    const keypad = document.getElementById("pin-pad");

    const buttons = [
        "1","2","3",
        "4","5","6",
        "7","8","9",
        "","0","⌫"
    ];

    buttons.forEach(value=>{

        const btn=document.createElement("button");

        btn.textContent=value;

        btn.style.cssText=`
            height:70px;
            border:none;
            border-radius:18px;
            background:#1d1d1d;
            color:white;
            font-size:26px;
            cursor:pointer;
        `;

        keypad.appendChild(btn);

    });
    
    document.getElementById("security-back").addEventListener("click", () => {

    window.renderWishlist(app);

    });
    
    const dots = document.querySelectorAll("#pin-dots span");

function updateDots() {

    dots.forEach((dot, index) => {

        dot.textContent = index < pin.length ? "●" : "○";

    });

}

document.querySelectorAll("#pin-pad button").forEach(btn => {

    btn.addEventListener("click", () => {

        const value = btn.textContent;

        if (value === "") return;

        if (value === "⌫") {

            pin = pin.slice(0, -1);

            updateDots();

            return;

        }

        if (pin.length >= 4) return;

        pin += value;

        updateDots();

        if (pin.length === 4) {

    if (creatingPin) {

        if (!confirmingPin) {

            firstPin = pin;
            pin = "";
            confirmingPin = true;

            renderSecurityView(app, onSuccess);
            return;

        }

        if (pin === firstPin) {

        localStorage.setItem("AURA_INTIMIDAD_PIN", pin);

         creatingPin = false;
         confirmingPin = false;
         firstPin = "";

            onSuccess();

            return;
        }

        alert("Los PIN no coinciden");

        firstPin = "";
        pin = "";
        confirmingPin = false;

        renderSecurityView(app, onSuccess);

        return;

    }

    const PIN_CORRECTO = localStorage.getItem("AURA_INTIMIDAD_PIN") || "1234";

    if (pin === PIN_CORRECTO) {

        onSuccess();
        return;

    }

    alert("PIN incorrecto");

    pin = "";

    updateDots();

}

    });

});

}