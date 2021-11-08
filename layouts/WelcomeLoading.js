import React from "react";
import { Text, View } from "react-native";
import Theme, { Colors } from "./AppStyles";

export default function (){

    return <View style={{width:"100%",flex:1, backgroundColor: Colors.primary, display:"flex", justifyContent: 'center', alignItems:"center"}}>
    <Text style={{...Theme.TextH1, color: "white", textAlign:"center", width:"100%"}}>Aguarde..</Text>
</View>
} 