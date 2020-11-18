import React from 'react';
import { Content, Container } from 'native-base';

import BasicInfoForm from './BasicInfoForm.container';

const BasicInfoScreen = ({ screenProps, navigation, isFirstTime }) => {
  const { t } = screenProps;

  const formProps = {};
  if (!isFirstTime) {
    formProps.onSubmitPress = () => navigation.pop();
    formProps.onCancalPress = () => navigation.pop();
  }

  return (
    <Container>
      <Content contentContainerStyle={{ flexGrow: 1 }}>
        <BasicInfoForm t={t} isFirstTime={isFirstTime} {...formProps} />
      </Content>
    </Container>
  );
};

export default BasicInfoScreen;
