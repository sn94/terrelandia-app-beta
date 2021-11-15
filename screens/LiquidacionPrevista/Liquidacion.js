import React from "react";
import {  Text, View } from "react-native";
import styles  from "../../layouts/AppStyles";
 
//servicios
 
export default function index ({ total_cuotas_cobradas,intereses_cobrados, total}) {  

    //    onEndReached={LoadMoreRandomData} 
    return   <View style={{ marginTop: 10 ,marginBottom:10,height: 110, backgroundColor:"white", ... styles.column  }}>
            <View style={styles.row}>
            <Text style={  {...styles.NormalText, fontSize:16 }}>Cuotas cobradas</Text>
                <Text style={ {...styles.NormalText, fontSize:16 }}> { total_cuotas_cobradas}</Text>
               
            </View>
            <View style={styles.row}>
            <Text style={  {...styles.NormalText, fontSize:16 }}>Intereses cobrados</Text>
                <Text style={ {...styles.NormalText, fontSize:16 }}> { intereses_cobrados}</Text>
               
            </View>
            <View style={styles.row}>
            <Text style={ {...styles.NormalText, fontSize:16 }}>TOTAL</Text>
                <Text style={ {...styles.NormalText, fontSize:16 }}> { total}</Text>
               
            </View>
        </View>
    // <FlatList style={estilos.lista} data={data} renderItem={renderItem} keyExtractor={(item, index) => index}></FlatList>
}