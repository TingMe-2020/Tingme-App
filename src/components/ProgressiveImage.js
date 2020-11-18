import React, { Component } from 'react';
import { Animated, View, Image, StyleSheet, Platform } from 'react-native';
import { CachedImage } from 'react-native-cached-image';

import themeVariables from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default class ProgressiveImage extends Component {
  static defaultProps = {
    thumbnailFadeDuration: 250,
    imageFadeDuration: 250,
    thumbnailBlurRadius: 5,
    onLoadThumbnail: () => {},
    onLoadImage: () => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      imageOpacity: new Animated.Value(0),
      thumbnailOpacity: new Animated.Value(0)
    };
  }

  onLoadThumbnail() {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: this.props.thumbnailFadeDuration
    }).start();
    this.props.onLoadThumbnail();
  }

  onLoadImage() {
    Animated.timing(this.state.imageOpacity, {
      toValue: 1,
      duration: this.props.imageFadeDuration
    }).start();
    this.props.onLoadImage();
  }

  renderSourceImage() {
    const { style, imageSource } = this.props;

    return (
      <CachedImage
        source={imageSource}
        style={[styles.image, style]}
        onLoad={() => this.onLoadImage()}
      />
    );
  }

  render() {
    const {
      style,
      placeHolderSource,
      thumbnailSource,
      thumbnailBlurRadius,
      imageSource,
      useBgPlaceholder
    } = this.props;
    return (
      <View style={style}>
        {useBgPlaceholder ? (
          <View style={{ ...style, backgroundColor: themeVariables.brandLight }} />
        ) : (
          <Image resizeMode="cover" style={[styles.image, style]} source={placeHolderSource} />
        )}
        {thumbnailSource && (
          <Animated.Image
            resizeMode="cover"
            style={[styles.image, { opacity: this.state.thumbnailOpacity }, style]}
            source={thumbnailSource}
            onLoad={() => this.onLoadThumbnail()}
            blurRadius={thumbnailBlurRadius}
          />
        )}
        {this.renderSourceImage()}
      </View>
    );
  }
}
