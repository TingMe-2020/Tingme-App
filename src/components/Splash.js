import React, { useEffect, useState } from 'react';
import { ImageBackground, Platform } from 'react-native';
import ProgressPie from 'react-native-progress/Pie';
import { Text, View } from 'native-base';

const styles = {
  root: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    resizeMode: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    paddingTop: 300
  }
};

export default ({ hasUpdate, progress }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  if (!visible) {
    return <Text />;
  }
  const loaderProps = {
    borderWidth: 2,
    color: 'white',
    indeterminate: !hasUpdate
  };
  if (hasUpdate) {
    loaderProps.progress = progress;
  }
  return (
    <View style={styles.root}>
      <ImageBackground
        style={styles.image}
        source={{ uri: Platform.OS === 'ios' ? 'Splash' : 'splash' }}
        resizeMode="cover">
        <View style={styles.loader}>
          <ProgressPie {...loaderProps} />
        </View>
      </ImageBackground>
    </View>
  );
};
