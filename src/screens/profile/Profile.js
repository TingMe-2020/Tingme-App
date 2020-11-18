import React, { useEffect } from 'react';
import { useDimensions } from 'react-native-hooks';
import { H3, View, Content, Spinner, Container, Text } from 'native-base';

import DateTimePicker from 'react-native-modal-datetime-picker';

import EditableInfo from './EditableInfo';
import EditableProfilePicture from './EditableProfilePicture.container';
import EditableFeaturePhotos from './EditableFeaturePhotos.container';
import RequestStatusCard from './RequestStatusCard.container';

import theme from 'tingme/native-base-theme/variables/commonColor';
// import data from 'tingme/utils/data/profileDetail';

const ProfileScreen = ({
  me,
  profileDetail,
  screenProps,
  navigation,
  isLoading,
  hasError,
  onGetProfileDetail
}) => {
  const userId = navigation.getParam('userId');
  let editable = userId === me.id;

  const dimensions = useDimensions();
  const { t } = screenProps;

  useEffect(() => {
    onGetProfileDetail(userId);
  }, [userId]);

  if (isLoading) {
    return (
      <View grow center>
        <Spinner color={theme.primaryColorStart} />
      </View>
    );
  }

  if (hasError) {
    return (
      <View grow center>
        <H3 note>{t('common:profileDetail404')}</H3>
      </View>
    );
  }

  const containerWitdth = dimensions.window.width - theme.spacingUnit * 8;
  let profile = editable ? me : profileDetail;

  return (
    <Container>
      <Content contentContainerStyle={{ flexGrow: 1 }}>
        <EditableProfilePicture
          onBack={() => navigation.pop()}
          style={{ width: dimensions.window.width, height: dimensions.window.width }}
          editable={editable}
          source={profile.profilePicture}
          navigation={navigation}
          t={t}
        />
        <View screenContent style={{ marginTop: theme.spacingUnit * 10 }}>
          <EditableInfo
            editable={editable}
            displayName={profile.displayName}
            navigation={navigation}
            description={profile.description}
            birthday={profile.birthday}
            birthdayVisibility={profile.birthdayVisibility}
            gender={profile.gender}
            interactions={profile.interactions}
            t={t}
          />
          <RequestStatusCard
            t={t}
            style={{ marginTop: theme.spacingUnit4, marginBottom: theme.spacingUnit4 }}
          />
          {(editable || (profile.featuredPhotos && profile.featuredPhotos.length > 0)) && (
            <View style={{ marginTop: theme.spacingUnit6, marginBottom: theme.spacingUnit6 }}>
              <Text style={{ marginBottom: theme.spacingUnit2 }}>Photo</Text>
              <EditableFeaturePhotos
                width={containerWitdth}
                images={profile.featuredPhotos}
                editable={editable}
                t={t}
              />
            </View>
          )}
        </View>
      </Content>
    </Container>
  );
};

export default ProfileScreen;
