
import React, { useState } from "react";
import { Text, TextInput, Image, ActivityIndicator, TouchableOpacity, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import AppStyles, { Colors, Fonts } from "../../layouts/AppStyles";
//api
import makeRequest from "../../api";


export default function ResetPassword() {

    const [ruc, setRuc] = useState('')
    const [requesting, setRequesting] = useState({ sent: false, requesting: false, error: false, message: '' })


    const resetPassw = async () => {

        const urlreset = "api/password/reset";
        setRequesting({ requesting: true })
        const jsonResp = await makeRequest(urlreset, { ruc: ruc },
             { 'Content-Type': 'application/json' },"POST")

        if (jsonResp.status == 200)
            setRequesting({ sent: true, message: jsonResp.data.message })
        else {
             
            setRequesting({ sent: true, error: true, message: jsonResp.data.error });
        }
        //setRequesting(false)
    }


    return <LinearGradient colors={['#b0e3fd', 'white']} style={AppStyles.Container} >
        <Image style={{ width: 200, height: 250, marginBottom: 40 }} source={{ uri: 'https://clientes.terrelandia.com/public/img/password.PNG' }} />

        <Text style={{ width: 320, color: Colors.gray, fontSize: 30, fontFamily: Fonts.title }} >¿Olvidaste tu contraseña? </Text>
        <Text style={AppStyles.Text} >Cédula o RUC </Text>
        <TextInput onChangeText={setRuc} style={AppStyles.TextInput} />


        <TouchableOpacity style={AppStyles.Button} onPress={resetPassw}>
            <Text style={AppStyles.ButtonText}>Reestablecer </Text>
            {requesting.requesting ? <ActivityIndicator size="large" color="#00ff00" /> : undefined}

        </TouchableOpacity>

        {requesting.sent && <Text style={requesting.error ? AppStyles.AlertDanger : AppStyles.AlertSuccess}>{requesting.message}</Text>}
    </LinearGradient>



}