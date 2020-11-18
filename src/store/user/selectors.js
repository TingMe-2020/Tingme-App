import { createSelector } from 'redux-starter-kit';

export const getNearbyUsers = createSelector(['user.nearby'], nearby => {
  if (!nearby) {
    return null;
  }
  return Object.values(nearby);
});
