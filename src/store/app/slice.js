import { createSlice } from 'redux-starter-kit';

const initialState = {
  navigation: {},
  notification: {},
  isScanning: false
};

export default createSlice({
  slice: 'app',
  initialState,
  reducers: {
    setNavigation: (state, action) => ({
      ...state,
      navigation: {
        ...action.payload
      }
    }),
    setNotification: (state, action) => ({
      ...state,
      notification: {
        ...action.payload
      }
    }),
    setScanning: (state, action) => {
      return { ...state, isScanning: action.payload };
    }
  }
});
