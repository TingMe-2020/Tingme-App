import React from 'react';
import { Animated, Easing } from 'react-native';

class BlinkingView extends React.Component {
  state = {
    blink: new Animated.Value(1)
  };

  componentDidMount() {
    const loop = () =>
      Animated.sequence([
        Animated.timing(this.state.blink, {
          toValue: 1,
          easing: Easing.step0,
          duration: 400
        }),
        Animated.timing(this.state.blink, {
          toValue: 0,
          easing: Easing.step0,
          duration: 400
        })
      ]).start(loop);
    loop();
  }

  render() {
    const { blink } = this.state;

    return (
      <Animated.View
        style={{
          ...this.props.style,
          opacity: blink
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default BlinkingView;
