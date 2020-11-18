import React, { Component } from 'react';
import { Animated, Platform, Easing } from 'react-native';

import { Thumbnail, View } from 'native-base';

import themeVariables from 'tingme/native-base-theme/variables/commonColor';

export default class BadgesItem extends Component {
  constructor(props) {
    super(props);
    this._active = new Animated.Value(0);
    this._style = {
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: this._active.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] })
            }
          ],
          shadowRadius: this._active.interpolate({ inputRange: [0, 1], outputRange: [0, 5] })
        },
        android: {
          transform: [
            { scale: this._active.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] }) }
          ],
          elevation: this._active.interpolate({ inputRange: [0, 1], outputRange: [0, 4] })
        }
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active)
      }).start();
    }
  }

  render() {
    const { data, active } = this.props;
    if (!data) {
      return (
        <View
          style={{
            height: 100,
            paddingTop: 10,
            paddingBottom: 10
          }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginRight: 5,
              marginBottom: 5,
              backgroundColor: themeVariables.brandLight
            }}
          />
        </View>
      );
    }

    return (
      <Animated.View
        style={{
          ...this._style,
          height: 100,
          paddingTop: 10,
          paddingBottom: 10
        }}>
        <Thumbnail large padRight source={{ uri: data }} />
      </Animated.View>
    );
  }
}
