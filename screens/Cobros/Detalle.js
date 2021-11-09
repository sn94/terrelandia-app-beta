import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View, TouchableOpacity, Button } from "react-native";
import { Colors, Fonts } from "../../layouts/AppStyles";
import Icon from 'react-native-vector-icons/FontAwesome5'
//servicios
import { listarCobros } from '../../api/Service';





export default function ({ loteamiento, month = null, year = null }) { //id loteamiento
    //estados

    const [requesting, setRequesting] = useState(false)

    /*
    data { data, page, totalPages }
    */
    const [pagination, setPagination] = useState({ data: [], page: 1, totalPaginas: 0 });


    //  cONSULTA DE DATOS
    //liquidacion prevista


    const listarCobros_ = async () => {

        setRequesting(true)
        let parametros = { loteamiento: loteamiento, page: pagination.page };
        if (month) parametros.month = month;
        if (year) parametros.year = year;

        listarCobros(parametros)
            .then(jsonResp => {
                if (jsonResp?.status == 200) {
                    //   console.log(JSON.stringify(jsonResp.data) , null, 2)
                    setPagination({
                        data: jsonResp.data.data,
                        page: jsonResp.data.current_page,
                        totalPaginas: jsonResp.data.last_page
                    })

                } else
                    alert(jsonResp.data.message)
            })
            .catch(console.log).finally(() => {
                setRequesting(false)
            });



    }

    useEffect(function () {
        console.log("refrescando")
        console.log( loteamiento, month, year)
        if (!requesting)
            listarCobros_()
    }, [loteamiento, pagination.page, month]); //solo en el primer renderizado []





    const renderItem = (item) => (
        <View key={item.cuota_id} style={{ width: "100%", marginBottom: 10, padding: 5, backgroundColor: "white" }}>
            {
                !loteamiento && <Text style={{ fontFamily: Fonts.normal, fontSize: 24, textAlign: "left", marginTop: 5 }}>
                    Loteamiento: <Text style={{ fontWeight: "bold" }}>{item?.loteamiento}</Text></Text>

            }
            <Text style={{ fontFamily: Fonts.normal, fontSize: 16, marginLeft: 20 }}>
                {item.fecha}
            </Text>
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
                    <Text style={{ fontFamily: Fonts.normal, fontSize: 20, color: Colors.black }}>Ver Detalle</Text>
                </TouchableOpacity>
            </View>
        </View>
    );


    const Botones = () => {

        const anterior = () => {
            let before = (pagination.page - 1);
            setPagination({ ...pagination, page: before })
        }
        const siguiente = () => {
            let after = (pagination.page + 1);
            setPagination({ ...pagination, page: after })
        }
        const BtnAnt = () => <Button onPress={anterior} title='Anterior' />
        const BtnSig = () => <Button onPress={siguiente} title='Siguiente' />
        const styles = { marginBottom: 15, display: "flex", flexDirection: "row", justifyContent: "space-around" };

        if (!(pagination.totalPaginas)) return null;

        if (pagination.page == 1) return <View style={styles}>
            <BtnSig />
        </View>
        return pagination.page < pagination.totalPaginas ?
            <View style={styles}>
                <BtnAnt /><BtnSig />
            </View>
            :
            <View style={styles}>
                <BtnAnt />
            </View>
    }




    //    onEndReached={LoadMoreRandomData} 
    return <View style={{width:"100%"}}>
        {pagination?.data.map(renderItem)}
        {requesting && <ActivityIndicator size="large" color="#00ff00" />}
        {
            (pagination?.data?.length) > 0 && <View>
                <Text style={{ fontFamily: Fonts.normal, textAlign: "right", marginTop: 0, marginBottom: 5 }}>Página {pagination.page} de {pagination.totalPaginas}</Text>
                <Botones></Botones>
            </View>}

    </View>


    // <FlatList style={estilos.lista} data={data} renderItem={renderItem} keyExtractor={(item, index) => index}></FlatList>
}