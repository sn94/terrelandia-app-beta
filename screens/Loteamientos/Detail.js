

import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Colors, Fonts } from '../../layouts/AppStyles'
import Cobros from '../Cobros/index';


const Box = {
    width: "100%",

    padding: 20, borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5
};
const detailStyles = StyleSheet.create({
    titular: { width: "100%", marginBottom: 20, paddingLeft: 5 },

    greenBox: {
        ...Box,

        backgroundColor: Colors.lightPrimary,

    },
    redBox: {
        ...Box,

        backgroundColor: "#ff6666",
    },
    BoxText: { fontFamily: Fonts.normal, color: "white", fontSize: 24, fontWeight: "bold" }
})





export default function Detail({ route }) {



    const loteamiento = route?.params?.loteamiento;

    const ParticularLoteamiento = () => {
        return <>
            <View style={detailStyles.titular}>
                <Text style={{ fontFamily: Fonts.normal, fontSize: 24, textAlign: "left", marginTop: 5 }}>
                    Loteamiento: <Text style={{ fontWeight: "bold" }}>{loteamiento?.nombre}</Text></Text>
                <TouchableOpacity><Text style={{ fontFamily: Fonts.normal, }}>Ver mapa (pdf)</Text></TouchableOpacity>
            </View>

            <View style={detailStyles.greenBox}>
                <View >
                    <Text style={detailStyles.BoxText}>Cobrados</Text>
                    <Text style={detailStyles.BoxText}>{loteamiento?.formatted_total_cuotas_cobradas}</Text>
                </View>

                <Icon name="arrow-up" size={70} solid color="#ffffff"></Icon>
            </View>
            <View style={detailStyles.redBox}>
                <View >
                    <Text style={detailStyles.BoxText}>En Mora</Text>
                    <Text style={detailStyles.BoxText}>{loteamiento?.formatted_total_cuotas_en_mora}</Text>
                </View>

                <Icon name="arrow-down" size={70} solid color="#ffffff"></Icon>
            </View>
        </>
    }

    
    return <ScrollView style={{ padding: 10, }}>
        {loteamiento && <ParticularLoteamiento />}


        <View style={{ marginTop: 10, padding: 5, width: 240, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Icon name="file-invoice-dollar" size={30} color={Colors.black}  ></Icon>
            <Text style={{ fontFamily: Fonts.normal, fontSize: 24 }}>
                <Text style={{ fontWeight: "bold", color: Colors.black }}>Últimas cobranzas</Text>
            </Text>
        </View>
        <Cobros loteamiento={loteamiento?.id}></Cobros>
    </ScrollView>


}