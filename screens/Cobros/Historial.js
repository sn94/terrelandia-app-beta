import React, { useState, useEffect } from "react";
import AppStyles, { Colors, Fonts } from "../../layouts/AppStyles";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { View, Text } from "react-native";


export default function index() {

    return <View style={{ ...AppStyles.Container, justifyContent:"flex-start" }}>
        <View style={{ marginTop: 10, padding: 5, width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
            <Icon name="file-invoice-dollar" size={30} color={Colors.black}  ></Icon>
            <Text style={{ fontFamily: Fonts.normal,marginLeft:10, fontSize: 24, color: Colors.black }}>
                <Text style={{ fontWeight: "bold", }}>Historial de cobranzas</Text>
            </Text>
        </View>


    </View>
}