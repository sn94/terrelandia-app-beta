import React from "react";
import {  Text, View } from "react-native";
import styles  from "../../layouts/AppStyles";
 
//servicios
 
export default function index({ formatted_gastos_administrativos, formatted_comisiones_vendedores,otros_gastos }) {  

    //    onEndReached={LoadMoreRandomData} 
    return    <View style={{ marginTop: 10 ,marginBottom:10,height: 110, backgroundColor:"white", ... styles.column  }}>
            <View style={styles.row}>
            <Text style={styles.NormalText}>Cuotas cobradas</Text>
                <Text style={styles.NormalText}> {formatted_gastos_administrativos}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.NormalText}>Intereses cobrados</Text>
                <Text style={styles.NormalText}> { formatted_comisiones_vendedores}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.NormalText}>Reparacion de puente</Text>
                <Text style={styles.NormalText}> { otros_gastos }</Text>
            </View>
        </View>
    // <FlatList style={estilos.lista} data={data} renderItem={renderItem} keyExtractor={(item, index) => index}></FlatList>
}