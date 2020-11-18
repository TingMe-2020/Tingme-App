import React from 'react';
import { withNavigation } from 'react-navigation';
import { Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { View, Text, Icon } from 'native-base';

import ProgressiveImage from 'tingme/components/ProgressiveImage';
import { getBirthInfo, getShortInfo } from 'tingme/utils/getShortInfo';
import theme from 'tingme/native-base-theme/variables/commonColor';

const { width, height } = Dimensions.get('window');
const imageWidth = (width - theme.spacingUnit * 12) / 3;

const styles = StyleSheet.create({
  nearbyList: {
    marginTop: theme.spacingUnit4
  },
  title: {
    marginBottom: theme.spacingUnit4
  },
  listWrapper: {
    marginLeft: -theme.spacingUnit,
    marginRight: -theme.spacingUnit,
    flexWrap: 'wrap',
    flexGrow: 1,
    flexDirection: 'row'
  },
  nearbyItem: {
    paddingLeft: theme.spacingUnit,
    paddingRight: theme.spacingUnit,
    marginBottom: theme.spacingUnit4,
    width: `${100 / 3}%`
  },
  nearbyContent: {
    width: '100%'
  },
  avatarWrapper: {
    marginBottom: theme.spacingUnit,
    position: 'relative'
  },
  avatar: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: theme.borderRadiusMedium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2
  },
  iconWrapper: {
    position: 'absolute',
    bottom: -10,
    right: 10,
    elevation: 3,
    width: 20,
    height: 20,
    backgroundColor: theme.primaryColorStart,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: 'white',
    fontSize: 13
  }
});

const NearbyList = ({ nearbyUsers, navigation, t }) => {
  return (
    <View style={styles.nearbyList}>
      <Text bold style={styles.title}>
        {t('scanResults', { length: nearbyUsers.length })}
      </Text>
      <View style={styles.listWrapper}>
        {nearbyUsers.map(user => (
          <View style={styles.nearbyItem}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: user.id })}>
              <View style={styles.nearbyContent}>
                <View style={styles.avatarWrapper}>
                  {!!user.profilePicture ? (
                    <ProgressiveImage
                      style={styles.avatar}
                      imageSource={{ uri: user.profilePicture }}
                      placeHolderSource={require('tingme/asset/logo-gray.png')}
                    />
                  ) : (
                    <Image style={styles.avatar} source={require('tingme/asset/logo-gray.png')} />
                  )}
                  <View style={styles.iconWrapper}>
                    <Icon name="ios-heart" style={styles.icon} />
                  </View>
                </View>
                <Text bold>{user.displayName}</Text>
                <Text note>
                  {getShortInfo({ t, gender: user.gender, birthInfo: user.birthInfo })}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default withNavigation(NearbyList);
