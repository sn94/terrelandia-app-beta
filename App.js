import * as React from 'react';
 
//context
import { AuthContext, AuthProvider } from './api/AuthContext';
import SplashScreen from 'react-native-splash-screen'; 
import { useEffect } from 'react'; 
import Navigator from './layouts/Navigator';






export default function App() {
  /*
  drawerIcon: ({ tintColor }) => (
          <Image
            source={{uri:"https://clientes.terrelandia.com/public/img/logo_icon.png"}}
            style={{width:100,height:100}}
        
          />
        )
        */
  useEffect(() => { SplashScreen.hide(); }, []);

 

  return (
    <AuthProvider>
     <Navigator></Navigator>
    </AuthProvider>



  );
}