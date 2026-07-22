const activities = [
    {
        id: 1,
        day: "viernes",
        agendaTitle: "Inicio de la Aventura",
        activityTitle: "Llegada",
        time: "17:30 – 18:00",
        password: "1234",
        explanation: `Ya estamos aquí, mi amor 😈

Te doy 30 minutos para que te instales tranquilo: deshagas la maleta, te duches si quieres, te pongas cómodo y respires hondo 😌


Mientras tanto yo me voy a preparar… me voy a poner bien guarra y cachonda solo para ti 🔥


Cuando termines, te quiero sentado y relajado… porque a partir de ahí empieza de verdad el vicio 😏


Este ratito es solo para que cargues pilas… que después pienso comerte entero toda la noche 🍆💦
`,
        rules: [
            "30 minutos de relax obligatorios ⏰",
            "No me mires todavía 👀",
            "No me toques todavía 🙅‍♀️",
            "Sin prisas todavía, que esto es solo el calentamiento 😏"
        ] ,
        contract: "Acepto vivir esta parte de la experiencia con presencia, calma y ganas de dejarme sorprender.",
        music: "",
        image: "",
        status: "locked",
        progress: 5,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 2,
        day: "viernes",
        agendaTitle: "Bienvenida Especial",
        activityTitle: "Carta + Baile",
        time: "18:00 – 18:30",
        password: "1234",
        explanation: `Es el momento de que leas la carta que te he escrito 😈


En ella te explico todo lo que siento y lo guarra que pienso portarme este finde. Léela despacito y con atención.

Quiero que cuando termines de leer estés con la polla dura y con muchas ganas de empezar a usar a tu zorra`,
        rules: [],
        contract: "Acepto abrir esta actividad sin prisa, siguiendo el orden de AURA y dejando que el momento haga su parte.",
        music: "",
        image: "",
        status: "locked",
        progress: 10,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 3,
        day: "viernes",
        agendaTitle: "Primer Calor",
        activityTitle: "Calentamiento",
        time: "18:30 – 19:00",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 15,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 4,
        day: "viernes",
        agendaTitle: "Momento Nuestro",
        activityTitle: "Sesión de fotos y vídeo",
        time: "19:00 – 20:00",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 20,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 5,
        day: "viernes",
        agendaTitle: "Preparación",
        activityTitle: "Entrenamiento",
        time: "20:00 – 20:45",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 25,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 6,
        day: "viernes",
        agendaTitle: "Elección Especial",
        activityTitle: "Shein",
        time: "20:45 – 21:15",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 30,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 7,
        day: "viernes",
        agendaTitle: "Momento Sabroso",
        activityTitle: "Cena",
        time: "21:15 – 22:15",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 35,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 8,
        day: "viernes",
        agendaTitle: "La Caja Prohibida",
        activityTitle: "",
        time: "22:15 – 23:15",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 40,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 9,
        day: "viernes",
        agendaTitle: "Refrescante Nocturno",
        activityTitle: "Piscina",
        time: "23:15 – 00:15",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 45,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 10,
        day: "viernes",
        agendaTitle: "Entrega Total",
        activityTitle: "BDSM",
        time: "00:15 – 01:15",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 50,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 11,
        day: "viernes",
        agendaTitle: "Diversión Guardada",
        activityTitle: "Juegos",
        time: "01:15 – 02:30",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 55,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 12,
        day: "viernes",
        agendaTitle: "Pausa Necesaria",
        activityTitle: "Descanso",
        time: "02:30 – 03:00",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 60,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 13,
        day: "viernes",
        agendaTitle: "Otro Mundo",
        activityTitle: "Roleplay",
        time: "03:00 – 04:00",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 65,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 14,
        day: "viernes",
        agendaTitle: "Sin Final",
        activityTitle: "Maxipolvo",
        time: "04:00 – 05:30",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 70,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 15,
        day: "sábado",
        agendaTitle: "Buenos Días",
        activityTitle: "Despertar",
        time: "09:00 – 09:45",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 75,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 16,
        day: "sábado",
        agendaTitle: "Mañana Juntos",
        activityTitle: "Ducha + Desayuno",
        time: "09:45 – 10:45",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 80,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 17,
        day: "sábado",
        agendaTitle: "Luz Especial",
        activityTitle: "Sesión de fotos y vídeo",
        time: "10:45 – 11:30",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 85,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 18,
        day: "sábado",
        agendaTitle: "Último Esfuerzo",
        activityTitle: "Último Polvo",
        time: "11:30 – 12:15",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 90,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    },
    {
        id: 19,
        day: "sábado",
        agendaTitle: "Vuelta a la Realidad",
        activityTitle: "Despedida",
        time: "12:15 – 13:00",
        password: "1234",
        explanation: "",
        rules: [],
        contract: "",
        music: "",
        image: "",
        status: "locked",
        progress: 100,
        transitionMessage: "",
        requiresPhoto: true,           // ← Nuevo
    photoProof: null               // ← Para guardar la foto
    }
];
