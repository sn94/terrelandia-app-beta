import * as React from 'react';
import { Button, View, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Login from './screens/Login/index';

import SplashScreen from 'react-native-splash-screen';
import ResetPassword from './screens/ResetPassword';
import Loteamientos from './screens/Loteamientos';
import tema, { Fonts, Colors}  from './layouts/AppStyles';
import { useEffect } from 'react';
 
  
const Drawer = createDrawerNavigator();



const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(242, 242, 242)',
    background: 'rgb(242, 242, 242)',
    card: '#65962d',
    text: 'rgb( 242, 242, 242)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',


  },
};



export default function App() {
  /*
  drawerIcon: ({ tintColor }) => (
          <Image
            source={{uri:"https://clientes.terrelandia.com/public/img/logo_icon.png"}}
            style={{width:100,height:100}}
        
          />
        )
        */
        useEffect(() => {SplashScreen.hide(); }, []);
  return (
 
    <NavigationContainer theme={MyTheme}  >
      <Drawer.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}  >

        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="ResetPassword" component={ResetPassword} />
        <Drawer.Screen name="Loteamientos" component={Loteamientos}   
        options={{ headerShown:true,   title: 'Loteamientos', ...tema.HeaderBar
        
       }  }/>
 
      </Drawer.Navigator>


    </NavigationContainer>


  );
}