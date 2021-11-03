
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, FlatList, ActivityIndicator, View } from "react-native";

import AppStyles, { Colors, Fonts } from "../../layouts/AppStyles";
//api
import makeRequest from "../../api";


export default function Loteamientos({ navigation }) {


    const [requesting, setRequesting] = useState(false)
    const [data, setData] = useState([])


    const listarLoteamientos = async () => {

        const urlLotea = "api/loteamientos";
        setRequesting(true)
        const jsonResp = await makeRequest(urlLotea)
        if (jsonResp.status == 200) {
            //    console.log(JSON.stringify(jsonResp.data))
            setData(jsonResp.data)
        } else
            alert(jsonResp.data.message)
        setRequesting(false)
    }

    useEffect(function () {
        listarLoteamientos()
    }, [])//solo en el primer renderizado

    const renderItem = ({ item }) => (
        <View>
            <Text style={AppStyles.TextH1}>{item.nombre} </Text>
            <Text style={AppStyles.Text}>{item.departamento}, {item.ciudad}</Text>
        </View>
    );
    return requesting ? <ActivityIndicator size="large" color="#00ff00" /> :
        <SafeAreaView style={AppStyles.Container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>



}