import React from 'react';
import { Image } from 'react-native';

export default () => (
  <Image
    style={{ width: 150, height: 150 }}
    source={require('tingme/asset/logo.png')}
    resizeMode="cover"
  />
);
