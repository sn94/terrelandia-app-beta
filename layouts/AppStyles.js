 import React from "react";
 import { Image, StyleSheet } from "react-native";

 const Colors = {
     black: "#444444",
     gray: "#949494",
     primary: "#65962d",
     lightPrimary: "#b1d03b"
 }
 const Fonts = {
     title: "NooplaRegular",
     normal: "NunitoRegular"
 }

 const tema = StyleSheet.create({
     Logo: {
         width: 170,
         height: 170,
         marginBottom: 30
     },
     HeaderBar: {

         headerStyle: {
             backgroundColor: '#ffffff',
         },
         headerTitleStyle: {
             fontFamily: Fonts.normal,
             color: Colors.gray
         },
         headerRight: ({ tintColor }) => ( <
             Image source = {
                 { uri: "https://clientes.terrelandia.com/public/img/logo_icon.png" }
             }
             style = {
                 { width: 50, height: 50, marginRight: 5 }
             }

             />
         )
     },
     Container: {
         flex: 1,
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         flexDirection: "column",
         width: "100%",
         height: "100%",
         padding: 10

     },
     row: { width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" },
     column: { width: "100%", display: "flex", flexDirection: "column" },
     AlertSuccess: {
         marginTop: 10,
         color: "white",
         fontSize: 20,
         width: 320,
         padding: 5,
         borderRadius: 10,
         backgroundColor: Colors.lightPrimary,

     },
     AlertDanger: {
         marginTop: 10,
         backgroundColor: "#ffbbbb",
         color: "white",
         fontSize: 20,
         width: 320,
         padding: 5,
         borderRadius: 10
     },
     TextH1: {
         color: Colors.primary,
         fontSize: 24,
         marginTop: 15,
         fontWeight: "400",
         textAlign: "left",
         width: 320,
         fontFamily: Fonts.title
     },
     Text: {
         color: Colors.gray,
         fontSize: 20,
         marginTop: 10,
         marginBottom: 0,
         fontWeight: "400",
         textAlign: "left",
         width: 320,
         fontFamily: Fonts.title,
         padding: 0,
     },
     NormalText: {
         fontFamily: Fonts.normal,
         fontSize: 20,
         color: Colors.black
     },
     TextInput: {
         borderBottomColor: Colors.primary,
         borderBottomWidth: 1,
         color: Colors.gray,
         fontSize: 20,
         width: 320,
         marginBottom: 10,


     },
     Button: {
         backgroundColor: Colors.primary,
         width: 320,
         height: 50,
         display: "flex",
         justifyContent: "center",
         flexDirection: "row",
         alignItems: "center"

     },
     ButtonText: { fontSize: 20, fontFamily: Fonts.title, color: "rgb(242, 242, 242)" }
 })

 export default tema
 export { Colors, Fonts }