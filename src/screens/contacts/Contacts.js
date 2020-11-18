import React, { useState } from 'react';

import { Tab, Tabs, TabHeading, View, Text } from 'native-base';
import ContactsTab from './ContactsTab.container';
import RequestsTab from './RequestsTab.container';
import BookmarksTab from './BookmarksTab.container';

import theme from 'tingme/native-base-theme/variables/commonColor';

export default ({ screenProps, navigation, unreadRequestsCount }) => {
  const { t } = screenProps;
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Tabs
      initialPage={0}
      tabBarUnderlineStyle={{ backgroundColor: theme.brandPrimary, height: 2 }}
      onChangeTab={({ i }) => setCurrentTab(i)}>
      <Tab
        heading={t('common:contactTabHeading')}
        tabStyle={{ backgroundColor: theme.containerBgColor }}
        textStyle={{ color: theme.textColor }}
        activeTabStyle={{ backgroundColor: theme.containerBgColor }}
        activeTextStyle={{ color: theme.brandPrimary, fontWeight: 'normal' }}>
        <ContactsTab navigation={navigation} t={t} />
      </Tab>
      <Tab
        heading={
          <TabHeading style={{ backgroundColor: theme.containerBgColor }}>
            <Text
              style={{
                color: currentTab === 1 ? theme.brandPrimary : theme.textColor,
                fontWeight: 'normal'
              }}>
              {t('common:requestTabHeading')}
            </Text>
            {unreadRequestsCount > 0 && (
              <View unreadCount>
                <Text>{unreadRequestsCount}</Text>
              </View>
            )}
          </TabHeading>
        }
        tabStyle={{ backgroundColor: theme.containerBgColor }}
        textStyle={{ color: theme.textColor }}
        activeTabStyle={{ backgroundColor: theme.containerBgColor }}
        activeTextStyle={{ color: theme.brandPrimary, fontWeight: 'normal' }}>
        <RequestsTab navigation={navigation} t={t} />
      </Tab>
      <Tab
        heading={t('common:bookmarkTabHeading')}
        tabStyle={{ backgroundColor: theme.containerBgColor }}
        textStyle={{ color: theme.textColor }}
        activeTabStyle={{ backgroundColor: theme.containerBgColor }}
        activeTextStyle={{ color: theme.brandPrimary, fontWeight: 'normal' }}>
        <BookmarksTab navigation={navigation} t={t} />
      </Tab>
    </Tabs>
  );
};
