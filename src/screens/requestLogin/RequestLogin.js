import React, { useRef } from 'react';
import { Content, Spinner, View } from 'native-base';
import { StyleSheet, Image, Dimensions } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import AuthForm from './AuthForm';
import theme from 'tingme/native-base-theme/variables/commonColor';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  logoBg: {
    width,
    height: height / 2,
    minHeight: 350,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: width / 2.5,
    height: width / 2.5
  },
  spinnerWrapper: {
    height: height / 2
  },
  authForm: {
    paddingTop: theme.spacingUnit5,
    paddingLeft: theme.spacingUnit4,
    paddingRight: theme.spacingUnit4
  }
});

export default ({ screenProps, submitPhoneNumber, isLoading, phoneNumber }) => {
  const content = useRef(null);

  return (
    <Content contentContainerStyle={{ flexGrow: 1 }} ref={content}>
      <LinearGradient
        colors={[theme.primaryColorStart, theme.primaryColorEnd]}
        style={styles.logoBg}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Image
          style={styles.logo}
          source={require('tingme/asset/logo-white.png')}
          resizeMode="cover"
        />
      </LinearGradient>
      {isLoading && (
        <View center style={styles.spinnerWrapper}>
          <Spinner color={theme.primaryColorStart} />
        </View>
      )}
      {!isLoading && (
        <View style={styles.authForm}>
          <AuthForm
            t={screenProps.t}
            onSubmit={submitPhoneNumber}
            phoneNumber={phoneNumber}
            onInputFocus={() => {
              if (content && content.current) {
                setTimeout(() => {
                  content.current._root.scrollToPosition(100, 1800);
                }, 300);
              }
            }}
          />
        </View>
      )}
    </Content>
  );
};
