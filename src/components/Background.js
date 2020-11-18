import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Dimensions } from 'react-native';

import theme from 'tingme/native-base-theme/variables/commonColor';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width,
    height,
    alignItems: 'center'
  }
});

export default ({ children }) => {
  return (
    <LinearGradient
      colors={[theme.primaryColorStart, theme.primaryColorEnd]}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      {children}
    </LinearGradient>
  );
};
