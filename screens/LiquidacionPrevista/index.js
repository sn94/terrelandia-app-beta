import React, { useEffect, useState } from "react"
import AppStyles, { Fonts, Colors } from '../../layouts/AppStyles'
import Icon from 'react-native-vector-icons/FontAwesome5'

import Liquidacion from './Liquidacion'
import Gastos from "./Gastos";
//servicios
import { getLoteamiento, listarMisLoteamientos } from '../../api/Service';
import { View, Text } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { ActivityIndicator } from "react-native";
 
export default function Index() {
    const [requesting0, setRequesting0] = useState({ requesting: false, loteamientos: [] })
    const [requesting, setRequesting] = useState({ requesting: false, loteamiento: {} })

    const listarLoteamientos = () => {
        setRequesting0({ requesting: true, loteamientos: [] })
        listarMisLoteamientos()
            .then(respJson => {
                verLoteamiento( respJson.data?.[0]?.id)
                setRequesting0({ requesting: false, loteamientos: respJson.data })
            }).catch(e => {
                setRequesting0({ ...requesting0, requesting: false })
            })
    }
    const verLoteamiento = async ( idLoteamiento = null) => {

        setRequesting({ ...requesting, requesting: true })

       
        getLoteamiento(idLoteamiento)
            .then((jsonResp) => {
                if (jsonResp?.status == 200) {

                    setRequesting({ requesting: false, loteamiento: jsonResp.data })
                } else {
                    console.log(jsonResp.data.message)
                    setRequesting({ ...requesting, requesting: false })
                }
            }).catch((err) => {
                setRequesting({ ...requesting, requesting: false })
                alert(err)
            });
    }


    const { formatted_gastos_administrativos, formatted_comisiones_vendedores, otros_gastos } = requesting.loteamiento ?? {};
    const { formatted_total_cuotas_cobradas, formatted_intereses_cobrados, formatted_total } = requesting.loteamiento ?? {}

    useEffect(() => {
        listarLoteamientos()
    }, [])
    
    return <View style={{ ...AppStyles.Container, justifyContent: "flex-start" }}>
        <Text style={{ ...AppStyles.NormalText,width:"100%", textAlign: "left" }}>Loteamiento</Text>

        <Dropdown
            style={{ width: "100%", borderBottomColor: Colors.primary, borderBottomWidth:2, marginBottom:15 }}
            data={requesting0.loteamientos}
            search
            searchPlaceholder="Search"
            labelField="nombre"
            valueField="id"
            placeholder="Buscar loteamiento"
            selectedTextStyle={{ ... AppStyles.NormalText ,color:Colors.primary }}
            value={requesting0.loteamientos?.[0]?.id}
            onChange={item => {
                //setDropdown(item.value);
                verLoteamiento( item.id )
                
            }}

            renderItem={item => <Text style={{ ...AppStyles.NormalText }}>{item.nombre}</Text>}
        />
       {  requesting.requesting && <ActivityIndicator size="large" color="#00ff00" />}
        <View style={{ ...AppStyles.row, justifyContent: "flex-start" }}>
            <Icon name="file-invoice-dollar" size={30} color={Colors.black}  ></Icon>
            <Text style={{ fontFamily: Fonts.normal, fontSize: 24, marginLeft: 15 }}>
                <Text style={{ fontWeight: "bold", color: Colors.black }}>Liquidación Prevista</Text>
            </Text>
        </View>
        <Liquidacion {...{ formatted_total_cuotas_cobradas, formatted_intereses_cobrados, formatted_total }} />
        <View style={{ ...AppStyles.row, justifyContent: "flex-start" }}>
            <Icon name="file-invoice-dollar" size={30} color={Colors.black}  ></Icon>
            <Text style={{ fontFamily: Fonts.normal, fontSize: 24, marginLeft: 15 }}>
                <Text style={{ fontWeight: "bold", color: Colors.black }}>Gastos</Text>
            </Text>
        </View>
        <Gastos {...{ formatted_gastos_administrativos, formatted_comisiones_vendedores, otros_gastos }}></Gastos>
    </View>
}