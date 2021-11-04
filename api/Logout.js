
import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import makeRequest from '../api/index';
import Theme,  { Colors } from '../layouts/AppStyles';

//LOGIN
import Login from '../screens/Login/index'
import { AuthContext } from './AuthContext';

export default function () {


    const { auth, setAuth } = useContext(AuthContext)

    const headers = {
        'Content-Type': 'application/json', 'Accept': 'application/json',
        'Authorization': 'Bearer ' + auth
    }
    makeRequest('api/logout', {}, headers)
        .then(
            res => {
                if (res.status == 200) { 
                    console.log("CORRECTO CIERRE")
                    setAuth(''); }

            }
        )
        .catch(
            e => {
                console.log(E.response);
                setAuth('');
            }
        )
    return auth ? <View style={{width:"100%",flex:1, backgroundColor: Colors.primary, display:"flex", justifyContent: 'center', alignItems:"center"}}>
        <Text style={{...Theme.TextH1, color: "white", textAlign:"center", width:"100%"}}>Cerrando sesion..</Text>
    </View> : <Login></Login>



}