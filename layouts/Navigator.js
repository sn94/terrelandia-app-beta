

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext } from "react";
//Sidebar

import SideBar from '../layouts/SideBar'
//screens

import Login from '../screens/Login/index';
import Logout from '../api/Logout'
import ResetPassword from '../screens/ResetPassword'
import Loteamientos from '../screens/Loteamientos/index';

//Iconos

import Icon from 'react-native-vector-icons/FontAwesome5'
//Themes
import tema, { Colors } from '../layouts/AppStyles'


//Context
import { AuthContext } from "../api/AuthContext";
import { Image } from "react-native";
import Detail from "../screens/Loteamientos/Detail";


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
      <Stack.Screen name="DetalleLoteamiento" component={Detail}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  }

  const BeforeAuth = () => {

    return <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  }


  const AfterAuth = () => {
    return <Drawer.Navigator initialRouteName="LoteamientosGroup" screenOptions={{ headerShown: false }} drawerContent={(props) => <SideBar {...props} />}  >
      <Drawer.Screen name="LoteamientosGroup" component={LoteamientosOpts}
        options={{
          headerShown: true, title: 'Loteamientos', ...tema.HeaderBar,
          drawerIcon: () => <Icon name="map-marked-alt" size={20} solid color={Colors.black}></Icon>,

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