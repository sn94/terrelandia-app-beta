

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext } from "react";
//Sidebar

import SideBar from '../layouts/SideBar'
//screens

import Login from '../screens/Auth/Login';
import Logout from '../screens/Auth/Logout'
import ResetPassword from '../screens/ResetPassword'
import Loteamientos from '../screens/MisLoteamientos/index';
import LiquidacionPrevista from "../screens/LiquidacionPrevista/index";
import Historial from "../screens/Cobros/Historial";
//Iconos

import Icon from 'react-native-vector-icons/FontAwesome5'
//Themes
import { Fonts, Colors } from '../layouts/AppStyles'

//Context
import { AuthContext } from "../api/AuthContext";
import Cobro from "../screens/Cobros/index";
import WelcomeLoading from "./WelcomeLoading";
import { Image } from "react-native";


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();



const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.black,
    background: 'rgb(242, 242, 242)',
    card: 'white',
    text: Colors.black,
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',


  },
};


export default function () {

  //estado del token definira la navegacion
  const { auth } = useContext(AuthContext);






  const LoteamientosOpts = () => {
    return <>
      <Stack.Screen name="Loteamientos" component={Loteamientos}
        options={{ headerShown: false }} />
      <Stack.Screen name="Cobros" component={Cobro}
        options={{ headerShown: false }} />
    </>
  }

  const BeforeAuth = () => {

    return <>
      <Stack.Screen name="Waiting" component={WelcomeLoading} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </>
  }


  const AfterAuth = () => {
    return <>
      <Drawer.Screen name="LoteamientosGroup" component={LoteamientosOpts}
        options={
          ({ navigation }) => {

            return {
              headerShown: true, title: 'Mis Loteamientos',
              drawerIcon: () => (<Icon name="map-marked-alt" size={20} solid color={Colors.black}></Icon>),
            };
          }
        } />
      <Drawer.Screen name="LiquidacionPrevista" component={LiquidacionPrevista}
        options={{
          headerShown: true, title: 'Liquidacion prevista',
          drawerIcon: () => (<Icon name="file-invoice-dollar" size={20} solid color={Colors.black}></Icon>),
        }} />
      <Drawer.Screen name="HistorialCobranza" component={Historial}
        options={{
          headerShown: true, title: 'Historial de cobranzas',
          drawerIcon: () => (<Icon name="file-invoice-dollar" size={20} solid color={Colors.black}></Icon>),
        }} />
      <Drawer.Screen name="Logout" component={Logout}
        options={{
          headerShown: false, title: 'Salir', drawerIcon: () => (<Icon name="sign-out-alt" size={20} solid color={Colors.black}></Icon>)
        }} />
    </>

  }
  //drawerContent={()=>( <Image style={{width:100,height:100}} source={{uri: 'https://clientes.terrelandia.com/public/img/logo.png'}}/>)}



  return <NavigationContainer theme={MyTheme}>
    <Drawer.Navigator initialRouteName="LoteamientosGroup"
      screenOptions={
        {
          headerShown: auth ? true : false,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontFamily: Fonts.normal,
            color: Colors.gray
          },
          headerRight: () => (<Image source={
            { uri: "https://clientes.terrelandia.com/public/img/logo_icon.png" }}
            style={
              { width: 50, height: 50, marginRight: 5 }
            }
          />)
        }}


      drawerContent={(props) => auth && (<SideBar {...props} />)}

      navigationOptions={({ navigation }) => ({
        headerTitleStyle: {
          fontFamily: Fonts.normal,
          color: Colors.gray
        },
        headerLeft: (<Icon onPress={() => navigation.openDrawer()} style={{ marginLeft: 7 }} name="bars" size={20} solid color="#000000"></Icon>),
      })
      }
    >
      {auth ? (<Drawer.Screen name="AfterAuthGroup" component={AfterAuth}
        options={{ headerShown: false }} />)
        :
        (<Drawer.Screen name="beforeAuthGroup" component={BeforeAuth}
          options={{ headerShown: false }} />)
      }
    </Drawer.Navigator>
  </NavigationContainer>
}