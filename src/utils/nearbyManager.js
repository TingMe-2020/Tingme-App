// import {
//   NativeEventEmitter,
//   NativeModules,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import {DeviceEventEmitter} from 'react-native';
// import {} from 'react-native-trace-manager';
// let {NearbyManager} = NativeModules;

// const nearbyManagerEmitter = new NativeEventEmitter(NearbyManager);

// const noop = () => {};

// NearbyManager = {
//   init: noop,
//   startAdvertisingWithUsername: noop,
//   stopAdvertising: noop,
//   startDiscovering: noop,
//   stopDiscovering: noop,
//   ...NearbyManager,
// };

// let ready = false;

// const doInit = (uuid) => {
//   NearbyManager.init(uuid);
//   nearbyManagerEmitter.emit('ready');
//   ready = true;
// };

// export const init = async (uuid = '7b550bd4-ac73-4f54-aa36-2412f3680d43') => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//       ]);
//       if (
//         granted['android.permission.ACCESS_COARSE_LOCATION'] ===
//           PermissionsAndroid.RESULTS.GRANTED &&
//         granted['android.permission.ACCESS_FINE_LOCATION'] ===
//           PermissionsAndroid.RESULTS.GRANTED
//       ) {
//         doInit(uuid);
//       } else {
//         throw new Error('location permission not granted');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   } else {
//     doInit(uuid);
//   }
// };

// const doWhenReady = (cb) => {
//   if (ready) {
//     cb();
//   } else {
//     nearbyManagerEmitter.once('ready', cb);
//   }
// };

// export const startAdvertisingWithUsername = (username) => {
//   doWhenReady(() => NearbyManager.startAdvertisingWithUsername(username));
// };

// export const stopAdvertising = () => {
//   NearbyManager.stopAdvertising();
// };

// export const startDiscovering = () => {
//   doWhenReady(() => NearbyManager.startDiscovering());
// };

// export const stopDiscovering = () => {
//   NearbyManager.stopDiscovering();
// };

// export const addUsersChangeListener = (cb) => {
//   nearbyManagerEmitter.addListener('userChanged', ({users}) => {
//     if (cb) {
//       cb(users);
//     }
//   });
// };
