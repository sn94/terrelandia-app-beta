import React from "react";
import {  Text, View } from "react-native";
import styles  from "../../layouts/AppStyles";
 
//servicios
 
export default function index({ gastos_administrativos, comisiones_vendedores,otros_gastos }) {  

    const style = {...styles.NormalText, fontSize:15 };
    //    onEndReached={LoadMoreRandomData} 
    return    <View style={{ marginTop: 10 ,marginBottom:10,height: 110, backgroundColor:"white", ... styles.column  }}>
            <View style={styles.row}>
            <Text style={  style}>Gastos administrativos</Text>
                <Text style={  style}> {gastos_administrativos}</Text>
            </View>
            <View style={styles.row}>
            <Text style={style}>Comisiones de vendedores</Text>
                <Text style={  style}> { comisiones_vendedores}</Text>
            </View>
            <View style={styles.row}>
            <Text style={ style }>Reparacion de puente</Text>
                <Text style={ style} > { otros_gastos }</Text>
            </View>
        </View>
    // <FlatList style={estilos.lista} data={data} renderItem={renderItem} keyExtractor={(item, index) => index}></FlatList>
}