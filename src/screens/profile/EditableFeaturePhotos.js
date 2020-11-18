import React, { useState } from 'react';
import { StaticCollage } from 'react-native-images-collage';
import { openPicker, openCamera } from 'tingme/utils/imagePicker';

import {
  TouchableOpacity,
  Image,
  // TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native';
import { View, Icon, ActionSheet } from 'native-base';
import ProgressiveImage from 'tingme/components/ProgressiveImage';

import PhotoView from '@merryjs/photo-viewer';
import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  imagesList: {
    marginLeft: -theme.spacingUnit,
    marginRight: -theme.spacingUnit,
    position: 'relative'
  },
  imageWrapper: {
    paddingLeft: theme.spacingUnit,
    paddingRight: theme.spacingUnit,
    width: `${100 / 3}%`,
    marginBottom: theme.spacingUnit2
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    borderRadius: theme.borderRadiusMedium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2
  },
  editIcon: {
    backgroundColor: '#d2d2d2',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -10,
    bottom: 10,
    elevation: 3
  }
});

const dimensions = Dimensions.get('window');

export default ({
  width,
  height,
  images,
  editable,
  t,
  onSave,
  isLoading,
  onSetFeaturedPhotoStart
}) => {
  let collageHeight = width / 1.5 + theme.spacingUnit2;
  let collageMatrix = [3, 3];

  /** Test data */
  // let images = [
  //   'https://k2.okccdn.com/php/load_okc_image.php/images/400x400/400x400/54x243/1067x1256/2/8704648290840187937.webp?v=2',
  //   'https://k3.okccdn.com/php/load_okc_image.php/images/400x400/400x400/183x0/1308x1125/2/1111223082516169138.webp?v=2',
  //   'https://k1.okccdn.com/php/load_okc_image.php/images/400x400/400x400/0x433/1016x1449/2/7696147782636672836.webp?v=2',
  //   'https://k3.okccdn.com/php/load_okc_image.php/images/400x400/400x400/188x0/1312x1124/2/1179689111364665772.webp?v=2',
  //   'https://k1.okccdn.com/php/load_okc_image.php/images/400x400/400x400/10x484/1026x1500/2/8988095460845025241.webp?v=2',
  //   'https://k1.okccdn.com/php/load_okc_image.php/images/400x400/400x400/55x252/1071x1268/2/8877156051523251212.webp?v=2'
  // ];

  let [isImageViewVisible, setImageViewVisible] = useState(false);
  let [initialIndex, setInitialIndex] = useState(0);
  const [featurePhotos, setFeaturePhotos] = useState(images);

  if (!editable) {
    if (images.length < 3) {
      collageHeight = width / 2;
      collageMatrix = [3];
    }
    if (images.length === 1) {
      collageHeight = (width * 2) / 3;
    }
    if (images.length === 3) {
      collageHeight = width / 3;
      collageMatrix = [3];
    }

    return (
      <React.Fragment>
        <StaticCollage
          direction="column"
          images={images}
          width={width + 10}
          height={collageHeight}
          matrix={collageMatrix}
          onPhotoPress={photo => {
            setImageViewVisible(true);
            setInitialIndex(photo.index);
          }}
          containerStyle={{ borderWidth: 0, marginLeft: -5, marginRight: -5, marginBottom: -10 }}
          seperatorStyle={{ borderWidth: 0 }}
          imageStyle={{
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 10,
            borderRadius: theme.borderRadiusMedium,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 1.5,
            elevation: 20
          }}
        />
        <PhotoView
          data={images.map(img => ({
            source: { uri: img }
          }))}
          visible={isImageViewVisible}
          onDismiss={() => setImageViewVisible(false)}
          hideCloseButton={false}
          hideShareButton={true}
          hideStatusBar={false}
          initial={initialIndex}
        />
      </React.Fragment>
    );
  }

  const openActionSheet = (photoIndex, uploadOnly) => {
    let buttons = [];

    const onViewButtonPress = () => {
      setInitialIndex(photoIndex);
      setImageViewVisible(true);
    };
    const onOpenCameraPress = () => {
      openCamera({}, image => {
        onSetFeaturedPhotoStart();
        const imgUri = `data:image/jpeg;base64,${image}`;
        const newFeaturePhotos = [...featurePhotos];
        if (featurePhotos[photoIndex]) {
          newFeaturePhotos[photoIndex] = imgUri;
        } else {
          newFeaturePhotos.push(imgUri);
        }
        onSave(imgUri, photoIndex);
        setFeaturePhotos(newFeaturePhotos);
      });
    };
    const onOpenPickerPress = () => {
      openPicker({}, image => {
        onSetFeaturedPhotoStart();
        const imgUri = `data:image/jpeg;base64,${image}`;
        const newFeaturePhotos = [...featurePhotos];
        if (featurePhotos[photoIndex]) {
          newFeaturePhotos[photoIndex] = imgUri;
        } else {
          newFeaturePhotos.push(imgUri);
        }
        onSave(imgUri, photoIndex);
        setFeaturePhotos(newFeaturePhotos);
      });
    };
    const onDeleteButtonPress = () => {
      onSetFeaturedPhotoStart();
      const newFeaturePhotos = [...featurePhotos];
      newFeaturePhotos.splice(photoIndex, 1);
      setFeaturePhotos(newFeaturePhotos);
      onSave('', photoIndex);
    };

    if (!uploadOnly) {
      buttons.push({
        text: t('common:viewPhoto'),
        icon: 'ios-eye',
        iconColor: theme.brandPrimary,
        onPress: onViewButtonPress
      });
    }

    buttons.push(
      {
        text: t('common:takePhoto'),
        icon: 'ios-camera',
        iconColor: theme.brandPrimary,
        onPress: onOpenCameraPress
      },
      {
        text: t('common:chooseExisting'),
        icon: 'md-images',
        iconColor: theme.brandPrimary,
        onPress: onOpenPickerPress
      }
    );

    let cancelButtonIndex = 3;
    let destructiveButtonIndex = undefined;

    if (!uploadOnly) {
      cancelButtonIndex = 4;
      destructiveButtonIndex = 3;
      buttons.push({
        text: t('common:deleteImage'),
        icon: 'ios-trash',
        iconColor: theme.brandDanger,
        onPress: onDeleteButtonPress
      });
    }
    buttons.push({ text: t('common:cancel'), icon: 'ios-close' });

    ActionSheet.show(
      {
        options: buttons.map(btn => ({ text: btn.text, icon: btn.icon, iconColor: btn.iconColor })),
        cancelButtonIndex,
        destructiveButtonIndex
      },
      buttonIndex => {
        buttons[buttonIndex] && buttons[buttonIndex].onPress && buttons[buttonIndex].onPress();
      }
    );
  };

  return (
    <View horizontal wrap style={styles.imagesList}>
      {[0, 1, 2, 3, 4, 5].map(index => (
        <View key={index} style={styles.imageWrapper}>
          <TouchableOpacity onPress={() => openActionSheet(index, !featurePhotos[index])}>
            <View style={styles.imageContainer}>
              {!featurePhotos[index] && (
                <Image
                  source={require('tingme/asset/logo-gray.png')}
                  style={{
                    borderRadius: theme.borderRadiusMedium,
                    width: (dimensions.width - theme.spacingUnit * 12) / 3,
                    height: (dimensions.width - theme.spacingUnit * 12) / 3
                  }}
                  resizeMode="contain"
                />
              )}
              {!!featurePhotos[index] && (
                <ProgressiveImage
                  useBgPlaceholder
                  imageSource={{ uri: featurePhotos[index] }}
                  style={{
                    borderRadius: theme.borderRadiusMedium,
                    width: (dimensions.width - theme.spacingUnit * 12) / 3,
                    height: (dimensions.width - theme.spacingUnit * 12) / 3
                  }}
                />
              )}
              <View style={styles.editIcon}>
                <Icon name="create" style={{ color: 'white', fontSize: 12 }} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}

      <PhotoView
        data={images.map(img => ({
          source: { uri: img }
        }))}
        visible={isImageViewVisible}
        onDismiss={() => setImageViewVisible(false)}
        hideCloseButton={false}
        hideShareButton={true}
        hideStatusBar={false}
        initial={initialIndex}
      />
    </View>
  );
};
