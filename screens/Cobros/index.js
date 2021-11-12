

import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useEffect, useState } from "react/cjs/react.development";
import { Colors, Fonts } from '../../layouts/AppStyles'
import ListaDeCobros from './Detalle';
import { getTotals } from '../../api/Service'

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





export default function Index({ route }) {

    const [requesting, setRequesting] = useState({ requesting: false, loteamiento: {} })
    const idLoteamiento = route?.params?.loteamiento?.id

 
    const verLoteamiento = async () => {

        setRequesting({ ...requesting, requesting: true })

        getTotals({  loteamiento: idLoteamiento})
            .then((jsonResp) => {
                if (jsonResp?.status == 200) {
            
                    setRequesting({ requesting: false, loteamiento: jsonResp.data })
                } else {
                   
                    setRequesting({ ...requesting, requesting: false })
                }
            }).catch((err) => {
                setRequesting({ ...requesting, requesting: false })
                alert(err)
            });
    }
    const { loteamiento } = requesting
    const ParticularLoteamiento = () => {
        return <>
            <View style={detailStyles.titular}>
                <Text style={{ fontFamily: Fonts.normal, fontSize: 24, color: Colors.black, textAlign: "left", marginTop: 5 }}>
                    Loteamiento: <Text style={{ fontWeight: "bold" }}>{loteamiento?.nombre}</Text></Text>
                <TouchableOpacity><Text style={{ fontFamily: Fonts.normal, }}>Ver mapa (pdf)</Text></TouchableOpacity>
            </View>

            <View style={detailStyles.greenBox}>
                <View >
                    <Text style={detailStyles.BoxText}>Cobrados</Text>
                    <Text style={detailStyles.BoxText}>{loteamiento?.total_cuotas_cobradas}</Text>
                </View>

                <Icon name="arrow-up" size={70} solid color="#ffffff"></Icon>
            </View>
            <View style={detailStyles.redBox}>
                <View >
                    <Text style={detailStyles.BoxText}>En Mora</Text>
                    <Text style={detailStyles.BoxText}>{loteamiento?.total_cuotas_en_mora}</Text>
                </View>

                <Icon name="arrow-down" size={70} solid color="#ffffff"></Icon>
            </View>
        </>
    }

    useEffect(function () {
        
        verLoteamiento() //fetch data ...
    }, [])

    return <ScrollView style={{ padding: 10, }}>
        {requesting.requesting && <ActivityIndicator size="large" color="#00ff00" />}
        <ParticularLoteamiento />
        <View style={{ marginTop: 10, padding: 5, width: 240, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Icon name="file-invoice-dollar" size={30} color={Colors.black}  ></Icon>
            <Text style={{ fontFamily: Fonts.normal, fontSize: 24, color: Colors.black }}>
                <Text style={{ fontWeight: "bold", }}>Últimas cobranzas</Text>
            </Text>
        </View>
        <ListaDeCobros loteamiento={loteamiento.loteamiento}></ListaDeCobros>
    </ScrollView>

}