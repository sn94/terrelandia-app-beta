import { Picker } from "@react-native-picker/picker"
import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
//http
import makeRequest from '../../api/index'

// Just some styles
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'yellow'
    },
    text: {
      fontSize: 24,
    },
    picker: {
      marginVertical: 30,
      width: 300,
      padding: 10,
      borderWidth: 1,
      borderColor: "#666",
    },
  });


export default function ( props) {


    let loteamiento = props?.loteamiento 
    const [pickerState, setPickerState] = useState({ currentLotea: loteamiento, data: [] })

    //listar loteamientos
    const listarLoteamientos = async () => {

        const urlLotea = "api/loteamientos";
        // setRequesting(true)
        const jsonResp = await makeRequest(urlLotea)
        if (jsonResp.status == 200) {
              
            setPickerState({ data: jsonResp.data })
        } else
            alert(jsonResp.data.message)
        //  setRequesting(false)
    }

    useEffect(() => {
        listarLoteamientos();
    },[]);
  
    return <View style={{width:"100%" , margin: 0}} >
        <Picker 
         style={styles.picker}
        selectedValue={ pickerState.currentLotea ?? 1}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setPickerState({ currentLotea: itemValue })}
    >
        {
            pickerState.data?.map(
               (ar )=>   <Picker.Item  key={ar.id} label={ar.nombre} value={ ar.id} /> 
            )
        }


    </Picker>
    </View>
}