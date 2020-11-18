import React from 'react';

import { Image, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native';
import { View, Icon, ActionSheet, Spinner } from 'native-base';

import ProgressiveImage from 'tingme/components/ProgressiveImage';
import ActionButtons from './ActionButtons.container';

import { openPicker, openCamera } from 'tingme/utils/imagePicker';
import theme from 'tingme/native-base-theme/variables/commonColor';

const styles = StyleSheet.create({
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  actionButtons: {
    position: 'absolute',
    bottom: -30,
    right: theme.spacingUnit2
  },
  editIconWrapper: {
    backgroundColor: '#d2d2d2',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: -20,
    elevation: 3
  },
  editIcon: {
    color: 'white',
    fontSize: 20
  }
});

export default ({ editable, source = '', style, onSave, t, isLoading, navigation }) => {
  const openActionSheet = () =>
    ActionSheet.show(
      {
        options: [
          {
            text: t('common:takePhoto'),
            icon: 'ios-camera',
            iconColor: theme.brandPrimary
          },
          {
            text: t('common:chooseExisting'),
            icon: 'md-images',
            iconColor: theme.brandPrimary
          },
          {
            text: t('common:deleteImage'),
            icon: 'ios-trash',
            iconColor: theme.brandDanger
          },
          { text: t('common:cancel'), icon: 'ios-close', iconColor: theme.brandPrimary }
        ],
        cancelButtonIndex: 3,
        destructiveButtonIndex: 2
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          openCamera(
            {
              cropping: true,
              cropperCircleOverlay: true
            },
            image => {
              const imgUri = `data:image/jpeg;base64,${image}`;
              onSave(imgUri);
            }
          );
        }
        if (buttonIndex === 1) {
          openPicker(
            {
              cropping: true,
              cropperCircleOverlay: true
            },
            image => {
              const imgUri = `data:image/jpeg;base64,${image}`;
              onSave(imgUri);
            }
          );
        }
        if (buttonIndex === 2) {
          onSave('');
        }
      }
    );

  //Case not editable
  if (!editable) {
    if (!source) {
      return (
        <View style={{ ...style, backgroundColor: '#dddddd', position: 'relative' }} center>
          <Image
            source={require('tingme/asset/logo-gray.png')}
            style={{ width: 150, height: 150 }}
          />
          <ActionButtons t={t} navigation={navigation} style={styles.actionButtons} />
        </View>
      );
    }
    return (
      <View style={{ ...style, position: 'relative' }} center>
        <ProgressiveImage style={style} imageSource={{ uri: source }} useBgPlaceholder={true} />
        <ActionButtons t={t} navigation={navigation} style={styles.actionButtons} />
      </View>
    );
  }

  // Case editable with source
  if (editable && !!source) {
    return (
      <TouchableWithoutFeedback onPress={() => !isLoading && openActionSheet()}>
        <View style={{ position: 'relative' }}>
          <View style={style}>
            <ProgressiveImage style={style} imageSource={{ uri: source }} useBgPlaceholder={true} />
          </View>
          {isLoading && (
            <View style={styles.loaderOverlay} center>
              <Spinner />
            </View>
          )}
          <View style={styles.editIconWrapper}>
            <Icon name="create" style={styles.editIcon} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  // Case editable without source
  return (
    <TouchableOpacity onPress={() => !isLoading && openActionSheet()}>
      <View style={{ ...style, backgroundColor: '#dddddd', position: 'relative' }} center>
        <Image source={require('tingme/asset/logo-gray.png')} style={{ width: 150, height: 150 }} />
        <View style={styles.editIconWrapper}>
          <Icon name="create" style={styles.editIcon} />
        </View>
        {isLoading && (
          <View style={styles.loaderOverlay} center>
            <Spinner color={theme.primaryColorStart} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
