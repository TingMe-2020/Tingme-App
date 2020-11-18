import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Footer, FooterTab, Button, Icon, Badge, Text } from 'native-base';
import { Platform, Keyboard } from 'react-native';

import themeVariables from 'tingme/native-base-theme/variables/commonColor';

const getIconName = (route) => {
  switch (route.key) {
    case 'Home':
      return 'ios-home';
    case 'Conversations':
      return 'ios-mail';
    case 'Contacts':
      return 'ios-contacts';
  }
  return 'ios-home';
};

const useKeyboard = () => {
  const [keyboard, setKeyboard] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => setKeyboard(true));
    const hideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboard(false));
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return keyboard;
};

const BottomBar = (props) => {
  const { navigation, jumpTo, unreadRequestsCount, unreadConversationsCount } = props;
  const keyboard = useKeyboard();

  if (Platform.OS === 'android' && keyboard) {
    return null;
  }

  return (
    <Footer style={{ backgroundColor: '#fff', elevation: 4 }}>
      <FooterTab style={{ backgroundColor: '#fff', elevation: 4 }}>
        {navigation.state.routes.map((route) => {
          const isFocused = navigation.isFocused(route.key);
          if (route.key === 'navigationHelper') {
            return false;
          }
          return (
            <Button
              vertical
              style={{ height: themeVariables.footerHeight }}
              key={route.key}
              onPress={() => navigation.navigate(route.key)}
              badge={
                (route.key === 'Contacts' && unreadRequestsCount > 0) ||
                (route.key === 'Conversations' && unreadConversationsCount > 0)
              }>
              {route.key === 'Contacts' && unreadRequestsCount > 0 && (
                <Badge>
                  <Text>{unreadRequestsCount}</Text>
                </Badge>
              )}
              {route.key === 'Conversations' && unreadConversationsCount > 0 && (
                <Badge>
                  <Text>{unreadConversationsCount}</Text>
                </Badge>
              )}
              <Icon
                name={getIconName(route)}
                style={{
                  color: isFocused ? themeVariables.brandPrimary : themeVariables.textColorNote
                }}
              />
            </Button>
          );
        })}
      </FooterTab>
    </Footer>
  );
};

export default connect(({ user }) => ({
  unreadRequestsCount: user.me.unreadRequestsCount,
  unreadConversationsCount: user.me.unreadConversationsCount
}))(BottomBar);
