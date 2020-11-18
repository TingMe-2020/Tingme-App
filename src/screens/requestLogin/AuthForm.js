import React, { useState } from 'react';
import { View, Text, H3, Card, CardItem, Icon, Body } from 'native-base';
import PhoneInput from 'react-native-phone-input';
import GoogleLibphonenumber from 'google-libphonenumber';
import CountryPicker from 'react-native-country-picker-modal';
import CircularButton from 'tingme/components/CircularButton';

import themeVariables from 'tingme/native-base-theme/variables/commonColor';

const phoneUtil = GoogleLibphonenumber.PhoneNumberUtil.getInstance();

export default ({ onSubmit = console.log, t, phoneNumber, onInputFocus }) => {
  let phoneInput, countryPicker;
  const [phoneNumberValue, setPhoneNumberValue] = useState(phoneNumber || '+84');
  const [error, setError] = useState('');

  const submitPhoneNumber = () => {
    try {
      const number = phoneUtil.parseAndKeepRawInput(phoneNumberValue, phoneInput.getISOCode());
      if (!phoneUtil.isValidNumber(number)) {
        setError(t('error:phoneNumber'));
        return;
      }
    } catch (e) {
      setError(t('error:phoneNumber'));
      return;
    }

    onSubmit && onSubmit(phoneNumberValue);
  };

  return (
    <Card transparent>
      <CardItem header>
        <H3>{t('common:phoneNumber')}</H3>
      </CardItem>
      <CardItem>
        <Body>
          <PhoneInput
            initialCountry="vn"
            value={phoneNumberValue}
            onChangePhoneNumber={() => setPhoneNumberValue(phoneInput.getValue())}
            allowZeroAfterCountryCode={false}
            onPressFlag={() => countryPicker.openModal()}
            ref={node => (phoneInput = node)}
            textStyle={{
              height: 30,
              fontSize: themeVariables.inputFontSize,
              borderBottomWidth: 1,
              borderColor: !error
                ? themeVariables.inputBorderColor
                : themeVariables.inputErrorBorderColor
            }}
            textProps={{ onFocus: () => onInputFocus() }}
          />
          {!!error && (
            <Text error style={{ paddingVertical: 10 }}>
              {error}
            </Text>
          )}
        </Body>
        <CountryPicker
          ref={node => (countryPicker = node)}
          cca2={''}
          translation="eng"
          onChange={country => phoneInput.selectCountry(country.cca2.toLowerCase())}
          countryList={['VN']}
        />
      </CardItem>
      <CardItem center>
        <View style={{ width: '90%' }}>
          <Text note center>
            {t('common:phoneFieldDescription')}
          </Text>
        </View>
      </CardItem>
      <CardItem center>
        <CircularButton onPress={() => submitPhoneNumber()}>
          <Icon name="ios-arrow-forward" />
        </CircularButton>
      </CardItem>
    </Card>
  );
};
