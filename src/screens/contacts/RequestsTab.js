import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { View, Text, Spinner } from 'native-base';

import ContactItem from 'tingme/components/ContactItem';

import { getShortInfo } from 'tingme/utils/getShortInfo';
import theme from 'tingme/native-base-theme/variables/commonColor';

export default ({
  requests,
  navigation,
  onGetRequests,
  t
}) => {
  useEffect(() => {
    onGetRequests();
  }, []);

  if (!requests) {
    return (
      <View grow center>
        <Spinner />
      </View>
    );
  }

  if (requests.length < 1) {
    return (
      <View grow center lightBg>
        <Text note>{t('emptyRequestsList')}</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: theme.spacingUnit4 }}>
      <FlatList
        data={requests}
        renderItem={({ item }) => (
          <ContactItem
            {...item.profile}
            shortInfo={getShortInfo({
              t: t,
              gender: item.profile.gender,
              birthInfo: item.profile.birthInfo
            })}
            onPress={() => navigation.navigate('Profile', { userId: item.profile.id })}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
