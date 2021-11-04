import React, { useState, useEffect } from "react";
import { ActivityIndicator , Text, View, TouchableOpacity } from "react-native";
import makeRequest from '../../api/index';
import { Colors, Fonts } from "../../layouts/AppStyles";
import Icon from 'react-native-vector-icons/FontAwesome5'

 
export default function ({ loteamiento }) { //id loteamiento

    const [requesting, setRequesting] = useState(false)
    const [data, setData] = useState([])
    const listarCobros = async () => {

        const urlLotea = "api/cobros" + ( loteamiento? '?loteamiento=' + loteamiento : '' );
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
        listarCobros()
    }, [])//solo en el primer renderizado

    const renderItem = ( item, index ) => (
        <View key={index} style={{ width:"100%", marginBottom:10, padding: 5, backgroundColor:"white"}}>
            {
               ! loteamiento &&  <Text style={{ fontFamily: Fonts.normal, fontSize: 24, textAlign: "left", marginTop: 5 }}>
                    Loteamiento: <Text style={{ fontWeight: "bold" }}>{item?.loteamiento}</Text></Text>
                
            }
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Icon name="map-marked-alt" size={24} solid color={Colors.black}></Icon>
                    <Text style={{ fontFamily: Fonts.normal, fontSize: 24, marginLeft: 20 }}>
                        <Text style={{ fontWeight: "bold", color: Colors.black }}>{item.lote_description}</Text>
                    </Text>
                </View>
                <Text style={{ color: Colors.primary, fontFamily: Fonts.normal, fontSize: 24 }}>
                    <Text style={{ fontWeight: "bold" }}>Gs. {item.importe}</Text>
                </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 20 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Icon name="chart-pie" size={20} solid={false} color={Colors.gray} ></Icon>
                    <Text style={{ fontFamily: Fonts.normal, fontSize: 20, color: Colors.gray }}>{item.cuota_description} </Text>

                </View>
                <TouchableOpacity style={{ display: "flex", flexDirection: "row" }}>
                    <Icon name="search" size={20} solid color={Colors.black}></Icon>
                    <Text style={{ fontFamily: Fonts.normal, fontSize: 20 , color: Colors.black}}>Ver Detalle</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

    return requesting ? <ActivityIndicator size="large" color="#00ff00" /> : data.map(  renderItem)
    
    // <FlatList style={estilos.lista} data={data} renderItem={renderItem} keyExtractor={(item, index) => index}></FlatList>
}