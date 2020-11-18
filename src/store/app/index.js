import slice from './slice';
import * as operations from './operations';

export const reducer = slice.reducer;

export const actions = {
  ...slice.actions,
  ...operations
};
