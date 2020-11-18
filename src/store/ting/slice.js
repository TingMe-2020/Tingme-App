import { createSlice } from 'redux-starter-kit';

const initialState = {
  contacts: null,
  requests: null,
  unreadRequestsCount: 0
};

export default createSlice({
  slice: 'ting',
  initialState,
  reducers: {
    getRequestsSuccess: (state, action) => ({
      ...state,
      requests: action.payload.result,
      unreadRequestsCount: action.payload.result.length
    }),
    getAcceptedRequestsSuccess: (state, action) => ({
      ...state,
      contacts: action.payload.result
    })
  }
});
