

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
import tema, { Colors } from '../layouts/AppStyles'


//Context
import { AuthContext } from "../api/AuthContext";
import DetailCobro from "../screens/Cobros/index";
import WelcomeLoading from "./WelcomeLoading";

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
    return <Stack.Navigator>
      <Stack.Screen name="Loteamientos" component={Loteamientos}
        options={{ headerShown: false }} />
      <Stack.Screen name="DetalleLoteamiento" component={DetailCobro}
        options={{ headerShown: false }} />

    </Stack.Navigator>
  }

  const BeforeAuth = () => {

    return <Stack.Navigator initialRouteName="Waiting" screenOptions={{ headerShown: false }} >

      <Stack.Screen name="Waiting" component={WelcomeLoading} />  
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  }


  const AfterAuth = () => {
    return <Drawer.Navigator initialRouteName="LoteamientosGroup" screenOptions={{ headerShown: false }} drawerContent={(props) => <SideBar {...props} />}  >
      <Drawer.Screen name="LoteamientosGroup" component={LoteamientosOpts}
        options={{
          headerShown: true, title: 'Mis Loteamientos', ...tema.HeaderBar,
          drawerIcon: () => <Icon name="map-marked-alt" size={20} solid color={Colors.black}></Icon>,

        }} />
          <Drawer.Screen name="LiquidacionPrevista" component={LiquidacionPrevista}
        options={{
          headerShown: true, title: 'Liquidacion prevista', ...tema.HeaderBar,
          drawerIcon: () => <Icon name="file-invoice-dollar" size={20} solid color={Colors.black}></Icon>,

        }} />
      <Drawer.Screen name="HistorialCobranza" component={Historial}
        options={{
          headerShown: true, title: 'Historial de cobranzas', ...tema.HeaderBar,
          drawerIcon: () => <Icon name="file-invoice-dollar" size={20} solid color={Colors.black}></Icon>,

        }} />

      <Drawer.Screen name="Logout" component={Logout}
        options={{
          headerShown: false, title: 'Salir', ...tema.HeaderBar, drawerIcon: () => <Icon name="sign-out-alt" size={20} solid color={Colors.black}></Icon>
        }} />
    </Drawer.Navigator>

  }
  //drawerContent={()=>( <Image style={{width:100,height:100}} source={{uri: 'https://clientes.terrelandia.com/public/img/logo.png'}}/>)}
 

  return <NavigationContainer theme={MyTheme}    >
    {
      auth ?
        <AfterAuth />
        :
        <BeforeAuth />
    }

  </NavigationContainer>
}