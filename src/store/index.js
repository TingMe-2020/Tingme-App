import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from 'redux-starter-kit';

import { reducer as userReducer } from './user';
import { reducer as appReducer } from './app';
import { reducer as tingReducer } from './ting';
import { reducer as conversationReducer } from './conversation';
import socketMiddleware from './socketMiddleware';

const reducer = combineReducers({
  app: appReducer,
  user: userReducer,
  conversation: conversationReducer,
  ting: tingReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return reducer(state, action);
};

const middleware = [thunk.withExtraArgument({ socketMiddleware })];

const store = configureStore({
  reducer: rootReducer,
  middleware
});

export default store;
