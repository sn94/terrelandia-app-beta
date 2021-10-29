// 3 Ways to Add Image Icon Inside Navigation Bar in React Native
// https://aboutreact.com/react-native-image-icon-inside-navigation-bar/

import React from 'react';

import {View, Image} from 'react-native';

const ActionBarImage = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={{
          uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png',
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          marginLeft: 15,
        }}
      />
    </View>
  );
};

export default ActionBarImage;