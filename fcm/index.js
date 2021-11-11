import { getAuthStateWithoutHook } from "../api/AuthContext";

import messaging from '@react-native-firebase/messaging'

import { updateToken } from '../api/Service'

const registerFcmToken = async() => {

    let auth = await getAuthStateWithoutHook()
    if (auth)
        messaging().getToken().then((ar) =>
            updateToken(ar)

        ).then(respuesta => console.log(respuesta.data.message)).catch(e => console.log("token retrieval err", e))

    else console.log("Autentiquese para registrar el token")
}

export { registerFcmToken }