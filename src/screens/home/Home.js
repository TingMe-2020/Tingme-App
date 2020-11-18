import React, { Fragment } from 'react';
import { View, Content, Container } from 'native-base';
import { StyleSheet } from 'react-native';

import MyProfileSummary from './MyProfileSummary';
import ScanButton from './ScanButton';
import CTACard from './CTACard';
import FeaturesList from './FeaturesList';
import NearbyList from './NearbyList';

import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacingUnit2,
    marginBottom: theme.spacingUnit * 6
  },
  ctaWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});

const HomeScreen = ({
  me,
  nearbyUsers,
  navigation,
  screenProps: { t },
  interactionChartData,
  isScanning,
  onStartScan,
  onStopScan
}) => {
  return (
    <Container>
      <Content contentContainerStyle={{ flexGrow: 1 }}>
        <View screenContent>
          <View style={styles.infoSection}>
            <MyProfileSummary
              t={t}
              displayName={me.displayName}
              profilePicture={me.profilePicture}
              interactions={me.interactions}
              onPress={() => navigation.navigate('Profile', { userId: me.id })}
            />
            <View style={styles.ctaWrapper}>
              <ScanButton
                onStartScan={onStartScan}
                onStopScan={onStopScan}
                isScanning={isScanning}
              />
            </View>
          </View>

          {(!nearbyUsers || nearbyUsers.length < 1) && (
            <Fragment>
              <CTACard t={t} />
              <FeaturesList t={t} />
            </Fragment>
          )}

          {nearbyUsers && nearbyUsers.length > 0 && <NearbyList nearbyUsers={nearbyUsers} t={t} />}
        </View>
      </Content>
    </Container>
  );
};

// HomeScreen.navigationOptions = {
//   header: null
// };

export default HomeScreen;
