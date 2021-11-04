// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView, 
  StyleSheet,
  Image
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
   
  const proileImage ='https://clientes.terrelandia.com/public/img/logo.png';

  return (
    <SafeAreaView style={{flex: 1}}>
     { /*Top Large Image */}
      <Image
        source={{uri:   proileImage}}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
     
     
        
      </DrawerContentScrollView>
     
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;