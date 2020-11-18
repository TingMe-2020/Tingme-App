import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { H1, H3, Text, View, Spinner } from 'native-base';

import theme from 'tingme/native-base-theme/variables/commonColor';

import Background from 'tingme/components/Background';
import BlinkingView from 'tingme/components/BlinkingView';
import KeyBoard from 'tingme/components/KeyBoard';

import CodeInput from 'react-native-confirmation-code-input';
import withDisableDelay from 'tingme/utils/withDisableDelay';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    paddingTop: 60
  },
  description: {
    paddingTop: theme.spacingUnit2,
    paddingBottom: 40
  },
  pinInput: {
    marginLeft: -theme.spacingUnit,
    marginRight: -theme.spacingUnit,
    width: '100%'
  },
  pinBoxWrapper: {
    paddingLeft: theme.spacingUnit,
    paddingRight: theme.spacingUnit,
    width: '25%'
  },
  pinBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  keyBoard: {
    marginLeft: theme.spacingUnit4,
    marginRight: theme.spacingUnit4
  },
  errorText: {
    marginTop: theme.spacingUnit2
  },
  resendBtn: {
    marginTop: theme.spacingUnit4
  }
});

const ResendButton = withDisableDelay(5000, disabled => ({ disabled }))(props => (
  <TouchableOpacity {...props}>
    <Text info uppercase={false}>
      Resend OTP
    </Text>
  </TouchableOpacity>
));

const OTP = ({ phoneNumber = '+84366720194', onFulfill, onResend, screenProps }) => {
  const { t } = screenProps;
  const [state, setState] = useState({ code: [], error: false, isLoading: false });

  const handleInput = async value => {
    let { error, code } = state;
    if (state.error) {
      setState({ ...state, error: false });
    }
    if (value === 'BackSpace') {
      setState({ ...state, code: [] });
      return;
    }
    code.push(value.toString());
    if (code.length === 4) {
      const inputedCode = code.join('');
      setState({ ...state, code: [], isLoading: true });
      const isValid = await onFulfill(inputedCode);
      if (!isValid) {
        setState({ code: [], isLoading: false, error: true });
        return;
      }
    }
    setState({ ...state, code });
  };

  const { code, error } = state;
  const blinkingIndex = code.length;

  return (
    <Background>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <H3 bold inverse style={styles.title}>
          {t('common:otpLabel')}
        </H3>
        <Text note inverse style={styles.description}>
          {t('common:otpDescription', { phoneNumber })}
        </Text>
        {!state.isLoading && (
          <View halfWidth center>
            <View style={styles.pinInput} horizontal>
              {[0, 1, 2, 3].map(index => (
                <View key={index} center style={styles.pinBoxWrapper}>
                  <View style={styles.pinBox}>
                    {!!code[index] && <H1 bold>{code[index]}</H1>}
                    {index === blinkingIndex && (
                      <BlinkingView>
                        <H1>_</H1>
                      </BlinkingView>
                    )}
                  </View>
                </View>
              ))}
            </View>
            {!!error && (
              <Text error inverse style={styles.errorText}>
                {t('common:otpError')}
              </Text>
            )}
            <View fullWidth center style={styles.resendBtn}>
              <ResendButton
                onPress={() => {
                  onResend();
                }}
              />
            </View>
          </View>
        )}
        {state.isLoading && (
          <View style={styles.spinner} center>
            <Spinner color="white" />
          </View>
        )}
      </View>
      <View style={styles.keyBoard}>
        <KeyBoard onInput={value => handleInput(value)} height={height * 0.5} />
      </View>
    </Background>
  );
};

OTP.navigationOptions = {
  header: null
};

export default OTP;
