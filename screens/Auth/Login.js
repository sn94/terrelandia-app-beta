
import React, { useState, useContext } from "react";
import { Text, TextInput, Image, ActivityIndicator, TouchableOpacity, Alert } from "react-native";

import LinearGradient from 'react-native-linear-gradient';
import AppStyles, { Colors, Fonts } from "../../layouts/AppStyles";
//api
import makeRequest from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../api/AuthContext";
import WelcomeLoading from "../../layouts/WelcomeLoading";

//FCM
import { registerFcmToken } from '../../fcm/index'

export default function Login({ navigation }) {


    const [cedula, setCedula] = useState('')
    const [pass, setPass] = useState('')
    const [requesting, setRequesting] = useState(false)
    //actualiza auth token
    const { auth, setAuth } = useContext(AuthContext);

    const signIn = async () => {

        if (cedula == '') { Alert.alert('Ingrese su RUC o numero de cedula'); return; }
        if (pass == '') { Alert.alert('Proporcione su contraseña'); return; }

        const urlLogin = "api/login";
        setRequesting(true)
        const jsonResp = await makeRequest(urlLogin, { ruc: cedula, password: pass },
            { 'Content-Type': 'application/json' }, "POST")
        if (jsonResp.status == 200) {
            {
                //GUARDAR TOKEN AUTH
                const theToken = jsonResp.data.token;
                await AsyncStorage.setItem("auth", theToken);
                //registrar token fcm
                registerFcmToken()
                //actualizar contexto
                setAuth(theToken);
                // navigation.navigate('Loteamientos')
            }
        } else
            alert(jsonResp.data.message)
        setRequesting(false)
    }
    const resetPassword = () => {
        navigation.navigate('ResetPassword')
    }


    return auth ? <WelcomeLoading /> :
        <LinearGradient colors={['#b0e3fd', 'white']} style={AppStyles.Container} >
            <Image style={AppStyles.Logo} source={{ uri: 'https://clientes.terrelandia.com/public/img/logo.png' }} />
            <Text style={{ width: 320, color: "black", fontSize: 24, fontFamily: Fonts.title }} > ¡Bienvenido! </Text>
            <Text style={AppStyles.Text} > Ingresa tus datos </Text>

            <Text style={AppStyles.Text} > Cédula o RUC </Text>
            <TextInput onChangeText={setCedula} style={AppStyles.TextInput} />
            <Text style={AppStyles.Text} > Contraseña </Text>
            <TextInput onChangeText={setPass} secureTextEntry={true} style={AppStyles.TextInput} />


            <TouchableOpacity style={AppStyles.Button} onPress={signIn}>
                <Text style={AppStyles.ButtonText}>Ingresar</Text>
                {requesting ? <ActivityIndicator size="large" color="#00ff00" /> : undefined}

            </TouchableOpacity>
            <TouchableOpacity onPress={resetPassword}>
                <Text style={{ width: 320, fontFamily: Fonts.title, marginTop: 10, color: Colors.primary, fontSize: 20, textDecorationLine: "underline" }}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </LinearGradient>



}