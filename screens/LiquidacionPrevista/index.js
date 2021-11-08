import React, { useEffect,useState } from "react"
import AppStyles,{Fonts, Colors} from '../../layouts/AppStyles'
import Icon from 'react-native-vector-icons/FontAwesome5'

import Liquidacion  from './Liquidacion'
import Gastos from "./Gastos";
//servicios
import {  getLoteamiento } from '../../api/Service';
import { View,Text } from "react-native";




export default function Index () {
    const [requesting, setRequesting] = useState({requesting:false, loteamiento:{}})

    
    const verLoteamiento = async () => {

        setRequesting({ ...requesting, requesting: true })

        let idLoteamiento = 1;
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


    const { formatted_gastos_administrativos, formatted_comisiones_vendedores, otros_gastos } =requesting.loteamiento ?? {};
    const { formatted_total_cuotas_cobradas, formatted_intereses_cobrados, formatted_total } = requesting.loteamiento ?? {}

    useEffect( ()=>{
        verLoteamiento()
    }, [])

    return <View style={{...AppStyles.Container, justifyContent:"flex-start"} }>
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