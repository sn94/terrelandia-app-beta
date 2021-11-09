import React, { useEffect, useState } from "react";
import AppStyles, { Colors, Fonts } from "../../layouts/AppStyles";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { View, Text, ScrollView } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import Detalle from "./Detalle";
import { listarMisLoteamientos } from '../../api/Service'

export default function index() {

    const [requesting0, setRequesting0] = useState({ requesting: false, loteamientos: [], selected: 1 })

    const [tiempos, setTiempos] = useState({ month: 1, year: 2021 });


    const listarLoteamientos = () => {
        setRequesting0({ ...requesting0, requesting: true, loteamientos: [] })
        listarMisLoteamientos()
            .then(respJson => {

                setRequesting0({ ...requesting0, requesting: false, loteamientos: respJson.data })
            }).catch(e => {
                setRequesting0({ ...requesting0, requesting: false })
            })
    }

    const meses = [
        { id: 1, mes: "Enero" }, { id: 2, mes: "Febrero" }, { id: 3, mes: "Marzo" }, { id: 4, mes: "Abril" }, { id: 5, mes: "Mayo" },
        { id: 6, mes: "Junio" }, { id: 7, mes: "Julio" }, { id: 8, mes: "Agosto" }, { id: 9, mes: "Septiembre" }, { id: 10, mes: "Octubre" },
        { id: 11, mes: "Noviembre" }, { id: 12, mes: "Diciembre" }
    ];
    useEffect(() => {
        listarLoteamientos()
    }, [])

    return <ScrollView  style={{padding:10}}>


        <View style={{ marginTop: 10, padding: 5, width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
            <Icon name="file-invoice-dollar" size={30} color={Colors.black}  ></Icon>
            <Text style={{ fontFamily: Fonts.normal, marginLeft: 10, fontSize: 24, color: Colors.black }}>
                <Text style={{ fontWeight: "bold", }}>Historial de cobranzas</Text>
            </Text>
        </View>
        <Dropdown
            style={{ width: "100%", borderBottomColor: Colors.primary, borderBottomWidth: 2, marginBottom: 15 }}
            data={requesting0.loteamientos}
            search
            searchPlaceholder="Search"
            labelField="nombre"
            valueField="id"
            placeholder="Buscar loteamiento"
            selectedTextStyle={{ ...AppStyles.NormalText, color: Colors.primary }}
            value={requesting0.loteamientos?.[0]?.id}
            onChange={item => {
                //setDropdown(item.value);
                setRequesting0({ ...requesting0, selected: item.id })
            }}

            renderItem={item => <Text style={{ ...AppStyles.NormalText }}>{item.nombre}</Text>}
        />
        <Dropdown
            style={{ width: "100%", borderBottomColor: Colors.primary, borderBottomWidth: 2, marginBottom: 15 }}
            data={meses}
            search
            searchPlaceholder="mes.."
            labelField="mes"
            valueField="id"
            placeholder="Buscar mes"
            selectedTextStyle={{ ...AppStyles.NormalText, color: Colors.primary }}
            value={ tiempos.month   ??  1}
            onChange={item => {
                //setDropdown(item.value);
                setTiempos({ ...tiempos, month: item.id })
            }}
            renderItem={item => <Text style={{ ...AppStyles.NormalText }}>{item.mes}</Text>}
        />
       <Detalle loteamiento={requesting0.selected} month={tiempos.month} ></Detalle>
    </ScrollView>
}