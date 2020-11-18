import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

export const openPicker = (options, onSuccess) =>
  ImagePicker.openPicker({
    width: 720,
    height: 720,
    compressImageMaxWidth: 720,
    compressImageMaxHeight: 720,
    mediaType: 'photo',
    ...options
  })
    .then(image =>
      ImageResizer.createResizedImage(image.path, 720, 720, 'JPEG', 100).then(response =>
        RNFS.readFile(response.path, 'base64').then(async result => {
          await onSuccess(result);
          ImagePicker.clean();
        })
      )
    )
    .catch(e => {
      // console.error(e);
    });

export const openCamera = (options, onSuccess) =>
  ImagePicker.openCamera({
    width: 720,
    height: 720,
    compressImageMaxWidth: 720,
    compressImageMaxHeight: 720,
    cropperCircleOverlay: true,
    useFrontCamera: true,
    mediaType: 'photo',
    ...options
  })
    .then(image =>
      ImageResizer.createResizedImage(image.path, 720, 720, 'JPEG', 100).then(response =>
        RNFS.readFile(response.path, 'base64').then(async result => {
          await onSuccess(result);
          ImagePicker.clean();
        })
      )
    )
    .catch(e => {
      // console.error(e);
    });
