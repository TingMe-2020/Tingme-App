import React from 'react';
import moment from 'moment';
import { Text, View } from 'native-base';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import ProgressiveImage from 'tingme/components/ProgressiveImage';

import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacingUnit4,
    alignItems: 'center',
    width: '100%'
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
    flex: 1,
    marginLeft: theme.spacingUnit4,
    marginRight: theme.spacingUnit4,
    justifyContent: 'center'
  },
  timestamp: {
    marginTop: theme.spacingUnit2
  }
});

export default props => {
  const {
    conversationPicture,
    conversationName,
    lastMessage,
    lastMessageAt,
    onPress,
    lastSenderId,
    lastSeen,
    myId
  } = props;
  const seen = lastSeen.find(s => s.userId === myId) || { seenAt: 0 };
  const unread = Number(lastMessageAt) > Number(seen.seenAt);

  return (
    <TouchableOpacity onPress={onPress}>
      <View horizontal style={styles.wrapper}>
        <View center style={styles.avatarWrapper}>
          {!!conversationPicture ? (
            <ProgressiveImage
              style={styles.avatar}
              imageSource={{ uri: conversationPicture }}
              placeHolderSource={require('tingme/asset/logo-gray.png')}
            />
          ) : (
            <Image source={require('tingme/asset/logo-gray.png')} style={styles.avatar} />
          )}
        </View>
        <View style={styles.info}>
          <Text bold={unread} numberOfLines={1}>
            {conversationName}
          </Text>
          <Text note bold={unread} numberOfLines={2}>
            {`${myId === lastSenderId ? 'You: ' : ''}${lastMessage}`}
          </Text>
          <View style={styles.timestamp}>
            <Text numberOfLines={1} note bold={unread} italic>
              {moment(lastMessageAt).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
