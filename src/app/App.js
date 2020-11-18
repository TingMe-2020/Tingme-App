import React from 'react';
import { Provider } from 'react-redux';
import { StyleProvider, Root, Text } from 'native-base';
import i18n from 'tingme/i18n';
import store from 'tingme/store';
import { useTranslation } from 'react-i18next';

import getTheme from 'tingme/native-base-theme/components';
import commonColor from 'tingme/native-base-theme/variables/commonColor';

import { InAppNotificationProvider } from 'react-native-in-app-notification';
import NotificationBody from 'tingme/components/NotificationBody';

import { actions as userActions } from 'tingme/store/user';
import AppStack from './AppStack.container';

store.dispatch(userActions.checkToken());
// store.subscribe(() => {
// 	console.log(store.getState());
// });

// const App = () => {
// 	const { t } = useTranslation();
// 	return (
// 		<Provider store={store}>
// 			<StyleProvider style={getTheme(commonColor)}>
// 				<Root>
// 					<AppStack t={t} />
// 				</Root>
// 			</StyleProvider>
// 		</Provider>
// 	);
// };

const App = () => {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <StyleProvider style={getTheme(commonColor)}>
        <InAppNotificationProvider
          notificationBodyComponent={props => <NotificationBody {...props} />}>
          <Root>
            <AppStack t={t} />
          </Root>
        </InAppNotificationProvider>
      </StyleProvider>
    </Provider>
  );
};

export default App;
