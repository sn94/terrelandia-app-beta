
import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator } from "react-native";

import AppStyles from "../../layouts/AppStyles";

import Item from "./Item";
//api 
import { listarMisLoteamientos } from '../../api/Service'


export default function Loteamientos({ navigation }) {


    const [requesting, setRequesting] = useState(false)
    const [data, setData] = useState([])

    
    const listarLoteamientos_ = async () => {

        setRequesting(true)
        const jsonResp = await listarMisLoteamientos()
        if (jsonResp?.status == 200) {
            console.log(jsonResp.data)
            setData(jsonResp.data)
        } else
            alert(jsonResp.data.message)
        setRequesting(false)
    }

    useEffect(function () {

        listarLoteamientos_()

    }, [])//solo en el primer renderizado

    const renderItem = ({ item }) => (
        <Item key={item} navigation={navigation} data={item}  ></Item>
    );
    return <SafeAreaView style={AppStyles.Container}>
        {requesting ? <ActivityIndicator size="large" color="#00ff00" /> : null}
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </SafeAreaView>



}