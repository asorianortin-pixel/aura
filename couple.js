import {
    db,
    doc,
    getDoc
} from "./firestore.js";

import {
    auth
} from "./auth.js";

export async function getCurrentCouple(){

    const userSnap = await getDoc(
        doc(db, "users", auth.currentUser.uid)
    );

    const userData = userSnap.data();

    if(!userData.partnerId){
        return null;
    }

    const coupleSnap = await getDoc(
        doc(db, "couples", userData.partnerId)
    );

    if(!coupleSnap.exists()){
        return null;
    }

    return{

        id:coupleSnap.id,

        ...coupleSnap.data()

    };

}