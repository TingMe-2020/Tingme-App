import React from 'react';
import moment from 'moment';

import { H3, Text, View } from 'native-base';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { getBirthInfo, getShortInfo } from 'tingme/utils/getShortInfo';

import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({});

export default ({
  displayName,
  birthday,
  gender = '',
  description,
  birthdayVisibility = '',
  birthInfo,
  editable,
  navigation,
  interactions,
  t
}) => {
  let shortInfo;
  if (editable) {
    shortInfo = getShortInfo({
      t,
      gender,
      birthInfo: getBirthInfo({ birthday, birthdayVisibility })
    });
  } else {
    shortInfo = getShortInfo({ t: t, gender: gender, birthInfo });
  }

  return (
    <TouchableWithoutFeedback onPress={() => editable && navigation.navigate('BasicInfo')}>
      <View>
        <View horizontal between>
          <H3>{displayName || 'Anonymous'}</H3>
          {editable && !!interactions && (
            <View horizontal>
              <H3>{interactions.totalProfileViewCount}</H3>
              <H3 note padLeft>
                {t('views')}
              </H3>
              <H3 padLeft2>{interactions.totalScanCount}</H3>
              <H3 note padLeft>
                {t('scans')}
              </H3>
            </View>
          )}
        </View>
        {!!shortInfo && <Text note>{shortInfo}</Text>}
        {description && (
          <Text note style={{ marginTop: theme.spacingUnit2 }}>
            {description}
          </Text>
        )}
        {editable && (
          <Text note info style={{ marginTop: theme.spacingUnit2 }}>
            {t('edit')}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
