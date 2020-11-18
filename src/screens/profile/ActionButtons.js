import React from 'react';

import { TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { View, Icon, ActionSheet } from 'native-base';

import CircularButton from 'tingme/components/CircularButton';

import theme from 'tingme/native-base-theme/variables/commonColor';

const statusText = {
  SENT: 'tingSuccess',
  RECEIVED: 'tingReceived',
  ACCEPTED: 'tingAccepted',
  BLOCKED: 'userBlocked'
};

const styles = StyleSheet.create({
  buttonWrapper: {
    marginRight: theme.spacingUnit2
  },
  buttonIcon: {
    color: theme.brandPrimary
  }
});

export default ({
  t,
  style,
  canTing,
  onTing,
  targetId,
  
  onCancelRequest,
  onDeclineRequest,
  onAcceptRequest,
  navigation,
  isWaiting,
  onBlockUser,
  onUnblockUser,
  onBookmarkUser,
  bookmarked,
  conversationId,

  onMessagePress = () => {},
  onGiftPress = () => {}
}) => {
  const openMoreActions = () => {
    let buttons = [
      { text: t('common:bookmark'), icon: 'ios-bookmark', color: theme.brandWarning },
      { text: t('common:block'), icon: 'ios-cut' },
      { text: t('common:report'), icon: 'ios-flag' },
      { text: t('common:cancel'), icon: 'ios-close' }
    ];
    if (Platform.OS === 'ios') {
      buttons = [t('common:bookmark'), t('common:block'), t('common:report'), t('common:cancel')];
    }
    ActionSheet.show({ options: buttons, cancelButtonIndex: 3 }, buttonIndex => {
      if (buttonIndex === 0) {
        if (bookmarked) {
          Alert.alert(t('common:userBookmarkedTitle'), t('common:userBookmarkedMessage'), [
            { text: t('common:ok'), onPress: () => {} }
          ]);
        } else {
          !isWaiting && onBookmarkUser(targetId);
        }
      }
      if (buttonIndex === 1) {
        if (requestStatus === 'BLOCKED') {
          Alert.alert(t('common:userBlockedTitle'), t('common:userBlocked'), [
            { text: t('common:ok'), onPress: () => {} }
          ]);
        } else {
          onBlockUser(targetId);
        }
      }
      if (buttonIndex === 2) {
        // onReportPress();
        Alert.alert(t('common:noPermissionTitle'), t('common:noPermissionMessage'), [
          { text: t('common:ok'), onPress: () => {} }
        ]);
      }
    });
  };

  const buttons = [
    { icon: 'ios-heart', disabled: !canTing, onPress: () => canTing && onTing(targetId) },
    {
      icon: 'ios-paper-plane',
      onPress: () =>
        navigation.navigate('ConversationDetail', { conversationId, targetUserId: targetId })
    },
    { icon: 'ios-more', onPress: () => openMoreActions() }
  ];

  return (
    <View style={style}>
      <View horizontal grow wrap>
        {buttons.map((button, i) => (
          <View style={styles.buttonWrapper}>
            <CircularButton onPress={button.onPress} size={60}>
              <Icon name={button.icon} style={styles.buttonIcon} />
            </CircularButton>
          </View>
        ))}
      </View>
    </View>
  );
};


