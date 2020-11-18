import React from 'react';

import { TouchableOpacity, StyleSheet } from 'react-native';
import { View, Text, Icon } from 'native-base';

const styles = StyleSheet.create({
  keyBoard: { marginLeft: 2, marginRight: 2 },
  pinKeyContainer: { width: '33%' },
  pinKeyBox: { padding: 1 }
});

const PinKey = ({ label, onPress, height }) => {
  const fontSize = height / 9;
  const pinContainerHeight = (height - 4) / 4;
  return (
    <TouchableOpacity
      onPressIn={() => {
        if (!!label && onPress) {
          onPress(label);
        }
      }}
      style={[styles.pinKeyContainer, { height: pinContainerHeight }]}>
      <View center style={styles.pinKeyBox}>
        {!!label && (
          <View center full>
            {label !== 'BackSpace' && (
              <Text style={{ fontSize }} inverse bold>
                {label}
              </Text>
            )}
            {label === 'BackSpace' && (
              <Icon style={{ fontSize, color: 'rgba(255, 255, 255, 0.8)' }} name="ios-backspace" />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ({ onInput, height }) => {
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'BackSpace'];

  return (
    <View horizontal center wrap style={[styles.keyBoard, { height }]}>
      {buttons.map((value, i) => (
        <PinKey label={value} key={i} onPress={(value) => onInput(value)} height={height} />
      ))}
    </View>
  );
};
