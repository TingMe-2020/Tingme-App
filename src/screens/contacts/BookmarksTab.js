import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { View, Text, Spinner } from 'native-base';

import ContactItem from 'tingme/components/ContactItem';

import { getShortInfo } from 'tingme/utils/getShortInfo';
import theme from 'tingme/native-base-theme/variables/commonColor';

export default ({ bookmarkedUsers, onGetBookmarkedUsers, navigation, t }) => {
  useEffect(() => {
    onGetBookmarkedUsers();
  }, []);

  if (!bookmarkedUsers) {
    return (
      <View grow center>
        <Spinner />
      </View>
    );
  }

  if (bookmarkedUsers.length < 1) {
    return (
      <View grow center lightBg>
        <Text note>{t('emptyContactsList')}</Text>
      </View>
    );
  }
  return (
    <View style={{ paddingTop: theme.spacingUnit4 }}>
      <FlatList
        data={bookmarkedUsers}
        renderItem={({ item }) => (
          <ContactItem
            {...item}
            shortInfo={getShortInfo({
              t: t,
              gender: item.gender,
              birthInfo: item.birthInfo
            })}
            onPress={() => navigation.navigate('Profile', { userId: item.id })}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
