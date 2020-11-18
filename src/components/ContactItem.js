import React from 'react';
import { ListItem, Left, Thumbnail, Body, Text, Right, View, Icon, H3 } from 'native-base';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import ProgressiveImage from 'tingme/components/ProgressiveImage';
import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacingUnit4,
    alignItems: 'center'
  },
  avatarWrapper: {
    marginLeft: theme.spacingUnit4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadiusMedium
  },
  info: {
    marginLeft: theme.spacingUnit4
  }
});

export default ({ displayName, profilePicture, featuredBadges, onPress, shortInfo, t }) => (
  <TouchableOpacity onPress={onPress}>
    <View horizontal style={styles.wrapper}>
      <View center style={styles.avatarWrapper}>
        {!!profilePicture ? (
          <ProgressiveImage
            style={styles.avatar}
            imageSource={{ uri: profilePicture }}
            placeHolderSource={require('tingme/asset/logo-gray.png')}
          />
        ) : (
          <Image source={require('tingme/asset/logo-gray.png')} style={styles.avatar} />
        )}
      </View>
      <View style={styles.info}>
        <Text bold numberOfLines={1}>
          {!!displayName ? displayName : t('common:anonymous')}
        </Text>
        {!!shortInfo && <Text note>{shortInfo}</Text>}
      </View>
    </View>
  </TouchableOpacity>
);

//   {featuredBadges && featuredBadges.length > 0 && (
//     <Right style={{ height: 70, paddingVertical: 0, justifyContent: 'center' }}>
//       <View flexRow>
//         {featuredBadges.map((badge, i) => (
//           <Thumbnail key={i} userListBadge source={{ uri: badge }} />
//         ))}
//       </View>
//     </Right>
//   )}
