import * as React from 'react';
import { Button, View, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import Home from './Home';
import { SafeAreaView } from 'react-native-safe-area-context';

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();



const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(242, 242, 242)',
    background: 'rgb(242, 242, 242)',
    card: '#65962d',
    text: 'rgb(242, 242, 242)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',

  },
};
console.log(DefaultTheme)


export default function App() {
  return (





    <NavigationContainer theme={MyTheme}   >
      <Drawer.Navigator     initialRouteName="Home" screenOptions={{ headerShown: false }}  >

    
<Drawer.Screen name="Home" component={Home}  options = {{
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
        source={{
          uri:
            'https://clientes.terrelandia.com/public/img/logo_icon.png',
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          marginLeft: 15,
        }}
      />
      ),
    }} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>


    </NavigationContainer>


  );
}