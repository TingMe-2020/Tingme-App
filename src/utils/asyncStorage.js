import { AsyncStorage, Platform } from 'react-native';

let setStorageItem;
let getStorageItem;
let removeStorageItem;

if (global.__DEV__ === true && Platform.OS !== 'ios') {
  let storage = {};
  // const userToken =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMTYyMDEwMTQ5NTJkMDAwOThhZDI5MyIsImlhdCI6MTU2MTc5OTA0OH0.Twe6XBo9D5NVovxRHVy2pi9joojN0aueGzgWzb9Nn_M';
  setStorageItem = async (key, value) => {
    storage[key] = value;
    return;
  };
  getStorageItem = async key => {
    // if (key === 'userToken') {
    //   return userToken;
    // }
    return storage[key];
  };
  removeStorageItem = async key => {
    delete storage[key];
    return;
  };
} else {
  setStorageItem = async (key, value) => {
    await AsyncStorage.setItem(key, value);
  };
  getStorageItem = async key => {
    const value = await AsyncStorage.getItem(key);
    return value;
  };
  removeStorageItem = async key => {
    await AsyncStorage.removeItem(key);
  };
}

export { setStorageItem, getStorageItem, removeStorageItem };
