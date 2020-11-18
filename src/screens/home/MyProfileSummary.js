import React from 'react';

import { TouchableWithoutFeedback, StyleSheet, Image } from 'react-native';
import { View, H3, Text, Icon } from 'native-base';
import ProgressiveImage from 'tingme/components/ProgressiveImage';

import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacingUnit4
  },
  avatarWrapper: {
    position: 'relative',
    marginTop: -12,
    marginLeft: -12,
    marginBottom: -12,
    padding: 12,
    width: 124,
    height: 124,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadiusMedium
  },
  editIcon: {
    backgroundColor: '#d2d2d2',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 13,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 25,
    elevation: 3
  },
  infoWrapper: {
    paddingTop: theme.spacingUnit2
  },
  viewDetails: {
    color: theme.brandInfo
  }
});

export default ({ displayName, profilePicture, shortInfo, t, onPress, interactions }) => (
  <TouchableWithoutFeedback onPress={() => onPress()}>
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        {!!profilePicture ? (
          <ProgressiveImage
            style={styles.avatar}
            imageSource={{ uri: profilePicture }}
            placeHolderSource={require('tingme/asset/logo-gray.png')}
          />
        ) : (
          <Image source={require('tingme/asset/logo-gray.png')} style={styles.avatar} />
        )}
        <View style={styles.editIcon}>
          <Icon name="create" style={{ color: 'white', fontSize: 16 }} />
        </View>
      </View>
      <View style={styles.infoWrapper}>
        <H3 numberOfLines={1} italic={!displayName}>
          {!!displayName ? displayName : t('common:anonymous')}
        </H3>
        {!!interactions && (
          <View horizontal>
            <H3 note style={{ marginRight: theme.spacingUnit2 }}>
              {t('viewsCount', { count: interactions.totalProfileViewCount })}
            </H3>
            <H3 note>{t('scansCount', { count: interactions.totalScanCount })}</H3>
          </View>
        )}
        <Text style={styles.viewDetails}>{t('viewDetails')}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);
