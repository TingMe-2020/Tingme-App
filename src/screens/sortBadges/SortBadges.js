import React, { useState } from 'react';
import { useDimensions } from 'react-native-hooks';

import { FlatList, TouchableWithoutFeedback } from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Content,
  View,
  Spinner,
  Text,
  Body,
  Icon,
  Button
} from 'native-base';
import SortableList from 'react-native-sortable-list';

import Background from 'tingme/components/Background';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import BadgesItem from './BadgesItem';

import themeVariables from 'tingme/native-base-theme/variables/commonColor';
import config from 'tingme/config';

const transformData = arrBadges => {
  let transformedData = {};
  arrBadges.forEach((badge, index) => {
    transformedData[index.toString()] = badge;
  });
  return transformedData;
};

const undoTransform = transformedData => {
  let arrBadges = [];
  for (let key in transformedData) {
    arrBadges[parseInt(key)] = transformedData[key];
  }
  return arrBadges;
};

export default ({
  featuredBadges,
  selectedBadges,
  availableBadges,
  onGetAvailableBadges,
  onSetSelectedBadges,
  onSetFeaturedBadges,
  navigation,
  screenProps: { t }
}) => {
  const dimensions = useDimensions();

  const type = navigation.getParam('type');
  let choosenBadges = type === 'FEATURED_BADGES' ? featuredBadges : selectedBadges;
  const maxBadgesCount =
    type === 'FEATURED_BADGES' ? config.maxFeaturedBadgesCount : config.maxSelectedBadgesCount;
  for (let i = 0; i < maxBadgesCount; i++) {
    if (!choosenBadges[i]) {
      choosenBadges[i] = null;
    }
  }
  let [badgesOnSortView, setBadgesOnSortView] = useState(choosenBadges);
  let [nextOrder, setNextOrder] = useState(
    Array.from({ length: maxBadgesCount }, (v, k) => `${k}`)
  );

  if (!availableBadges) {
    onGetAvailableBadges();
    return (
      <View flexCenter>
        <Spinner />
      </View>
    );
  }

  if (availableBadges && availableBadges.length < 1) {
    return (
      <View flexCenter>
        <View>
          <Text style={{ marginBottom: 10 }} note>
            {t('common:noBadgesTitle')}
          </Text>
          <Text note>✔ {t('common:noBadgesLine1')}</Text>
          <Text note>✔ {t('common:noBadgesLine2')}</Text>
          <Text note>✔ {t('common:noBadgesLine3')}</Text>
        </View>
      </View>
    );
  }

  const cardWidth = dimensions.window.width - themeVariables.cardItemPadding * 2 - 10;
  const haveAvailableSlot = () => badgesOnSortView.filter(Boolean).length < maxBadgesCount;
  const handleSave = () => {
    const newBadgesArray = undoTransform(badgesOnSortView);
    type === 'FEATURED_BADGES'
      ? onSetFeaturedBadges(newBadgesArray)
      : onSetSelectedBadges(newBadgesArray);
    navigation.pop();
  };

  return (
    <Background>
      <Card transparent>
        <CardItem>
          <Text note italic>
            {t('common:sortBadgesDescription')}
          </Text>
        </CardItem>
        <CardItem>
          <View style={{ flex: 1 }}>
            <SortableList
              style={{
                height: 100,
                width: cardWidth
              }}
              horizontal
              data={transformData(badgesOnSortView)}
              renderRow={({ data, active }) => {
                return <BadgesItem data={data} active={active} />;
              }}
              onChangeOrder={nextOrder => setNextOrder(nextOrder)}
            />
          </View>
        </CardItem>
        <CardItem
          bordered
          style={{ justifyContent: 'flex-end', flexDirection: 'row' }}
          button
          onPress={() => handleSave()}>
          <Button iconLeft light small onPress={() => handleSave()}>
            <MaterialIcons name="save" style={{ marginLeft: 16, fontSize: 17 }} />
            <Text uppercase={false}>{t('common:save')}</Text>
          </Button>
        </CardItem>
        <CardItem>
          <FlatList
            style={{ flexDirection: 'column' }}
            numColumns={Math.floor(cardWidth / 60)}
            data={availableBadges}
            renderItem={({ item }) => {
              const isSelected = badgesOnSortView.includes(item);
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (!isSelected && haveAvailableSlot()) {
                      badgesOnSortView[badgesOnSortView.indexOf(null)] = item;
                      setBadgesOnSortView(badgesOnSortView);
                    }
                    if (isSelected) {
                      badgesOnSortView[badgesOnSortView.indexOf(item)] = null;
                      setBadgesOnSortView(badgesOnSortView);
                    }
                  }}>
                  <View
                    style={{
                      borderWidth: 2,
                      marginBottom: 5,
                      marginRight: 5,
                      width: 59,
                      height: 59,
                      borderColor: isSelected ? themeVariables.brandSuccess : 'transparent',
                      borderRadius: 28,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Thumbnail source={{ uri: item }} />
                    {isSelected && (
                      <View style={{ position: 'absolute', bottom: -12, right: -5 }}>
                        <Icon name="ios-checkmark" style={{ color: themeVariables.brandSuccess }} />
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
            keyExtractor={(item, index) => item.index}
          />
        </CardItem>
      </Card>
    </Background>
  );
};
