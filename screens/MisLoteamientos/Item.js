import React from "react"
import {   Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import AppStyles, { Colors, Fonts } from '../../layouts/AppStyles'
import { base_url } from '../../api/index'



const loteamientoItemStyle = StyleSheet.create({

    item: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,

        marginBottom: 5,
        padding: 2
    }
})
export default function ({ data , navigation}) {

    const verDetalle= ()=>{
        navigation.navigate("Cobros", { loteamiento: data})
    }
 
    const item = data
    const fullPath = base_url + '/public/res/loteamientos/' + item.imagen;
    return <TouchableOpacity style={loteamientoItemStyle.item} onPress={verDetalle}>
        <Image style={{ width: "100%", height: 200, flex: 1 }} source={{ uri: fullPath }}></Image>

        <Text style={AppStyles.TextH1}>{item.nombre} </Text>
        <Text style={{ fontFamily: Fonts.normal, }}>{item.departamento}, {item.ciudad}</Text>
      
    </TouchableOpacity>
}