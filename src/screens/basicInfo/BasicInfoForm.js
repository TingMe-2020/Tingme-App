import moment from 'moment';
import React, { useState } from 'react';

import { Text, View, Form, Item, Input, Icon, Picker, Textarea } from 'native-base';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';
import CircularButton from 'tingme/components/CircularButton';

import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  form: {
    width: '100%',
    padding: theme.spacingUnit4
  },
  featureContainer: {
    marginTop: theme.spacingUnit4,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  featureItem: {
    paddingLeft: theme.spacingUnit2,
    paddingRight: theme.spacingUnit2
  }
});

export default ({
  displayName,
  birthday,
  gender,
  description,
  birthdayVisibility,
  t,
  isSaving,
  isFirstTime = false,
  onSubmitPress,
  onCancelPress,
  onSubmit
}) => {
  const [displayNameValue, setDisplayNameValue] = useState(displayName);
  const [birthdayValue, setBirthdayValue] = useState(birthday);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [genderValue, setGenderValue] = useState(gender || 'NONE');
  const [birthdayVisibilityValue, setBirthdayVisibilityValue] = useState(
    birthdayVisibility || 'NONE'
  );
  const [descriptionValue, setDescriptionValue] = useState(description);

  return (
    <Form style={styles.form}>
      <View formPadder>
        <Text bold>{t('common:name')}</Text>
        <Item regular>
          <Input
            value={displayNameValue}
            onChangeText={v => setDisplayNameValue(v)}
            placeholder={t('common:namePlaceholder')}
          />
        </Item>
      </View>

      <View formPadder>
        <Text bold>{t('common:birthday')}</Text>
        <Item regular>
          <Input
            editable={false}
            placeholder={t('common:birthdayPlaceholder')}
            value={birthdayValue ? moment(birthdayValue).format('DD/MM/YYYY') : ''}
          />
          <TouchableWithoutFeedback onPress={() => setPickerVisible(true)}>
            <View inputOverlay />
          </TouchableWithoutFeedback>
        </Item>
        <View inputBox style={{ marginTop: theme.spacingUnit2 }}>
          <Form>
            <Picker
              mode="dropdown"
              selectedValue={birthdayVisibilityValue}
              onValueChange={v => setBirthdayVisibilityValue(v)}
              iosIcon={<Icon style={{ color: 'white' }} name="ios-arrow-down-outline" />}>
              <Picker.Item label={t('common:birthdayHidden')} value="NONE" />
              <Picker.Item label={t('common:birthdayShowAge')} value="SHOW_AGE" />
              <Picker.Item label={t('common:birthdayShowBirthdate')} value="SHOW_BIRTHDATE" />
              <Picker.Item label={t('common:birthdayShowFull')} value="SHOW_FULL" />
            </Picker>
          </Form>
        </View>
      </View>

      <View formPadder>
        <Text bold>{t('common:gender')}</Text>
        <View inputBox>
          <Picker
            mode="dropdown"
            selectedValue={genderValue}
            onValueChange={v => setGenderValue(v)}
            iosIcon={<Icon name="ios-arrow-down-outline" />}>
            <Picker.Item label={t('common:notSpecified')} value="NONE" />
            <Picker.Item label={t('common:male')} value="MALE" />
            <Picker.Item label={t('common:female')} value="FEMALE" />
            <Picker.Item label={t('common:other')} value="OTHER" />
          </Picker>
        </View>
      </View>
      <View formPadder>
        <Text bold>{t('common:description')}</Text>
        <Textarea
          value={descriptionValue}
          onChangeText={v => setDescriptionValue(v)}
          placeholder={t('common:descriptionPlaceholder')}
          rowSpan={5}
          bordered
        />
      </View>
      <View center style={styles.featureContainer}>
        {!isFirstTime && (
          <View style={styles.featureItem}>
            <CircularButton onPress={() => onCancelPress && onCancelPress()}>
              <Icon name="ios-close" style={{ fontSize: 40, color: 'black', fontWeight: 'bold' }} />
            </CircularButton>
          </View>
        )}
        <View style={styles.featureItem}>
          <CircularButton
            onPress={() => {
              onSubmitPress && onSubmitPress();
              onSubmit &&
                onSubmit({
                  displayName: displayNameValue,
                  birthday: birthdayValue ? moment(birthdayValue).valueOf() : null,
                  gender: genderValue,
                  birthdayVisibility: birthdayVisibilityValue,
                  description: descriptionValue
                });
            }}>
            <Icon name="ios-arrow-forward" />
          </CircularButton>
        </View>
      </View>
      <DateTimePicker
        isVisible={pickerVisible}
        onConfirm={date => {
          setBirthdayValue(date);
          setPickerVisible(false);
        }}
        onCancel={() => setPickerVisible(false)}
        date={birthdayValue ? new Date(birthdayValue) : new Date()}
        maximumDate={new Date()}
        minimumDate={new Date('01/01/1910')}
      />
    </Form>
  );
};
