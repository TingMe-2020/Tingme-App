import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { View, Text, Spinner } from 'native-base';

import ContactItem from 'tingme/components/ContactItem';

import { getShortInfo } from 'tingme/utils/getShortInfo';
import theme from 'tingme/native-base-theme/variables/commonColor';

// import contactsData from 'tingme/utils/data/userList';

export default ({
  contacts,
  navigation,
  onGetContacts,
  t
}) => {
  useEffect(() => {
    onGetContacts();
  }, []);
  // const contacts = contactsData.map(c => ({ profile: { ...c } }));
  if (!contacts) {
    return (
      <View flexCenter>
        <Spinner />
      </View>
    );
  }

  if (contacts.length < 1) {
    return (
      <View grow center lightBg>
        <Text note>{t('emptyContactsList')}</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: theme.spacingUnit4 }}>
      <FlatList
        data={contacts}
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
