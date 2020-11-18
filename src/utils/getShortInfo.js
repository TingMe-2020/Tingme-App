import moment from 'moment';

export const getBirthInfo = ({ birthday, birthdayVisibility }) => {
  if (!birthday) {
    return '';
  }
  switch (birthdayVisibility) {
    case 'NONE':
      return '';
    case 'SHOW_AGE':
      return moment().diff(birthday, 'years');
    case 'SHOW_BIRTHDATE':
      return moment(birthday).format('DD/MM');
    case 'SHOW_FULL':
      return moment(birthday).format('DD/MM/YYYY');
    default:
      return '';
  }
};

export const getShortInfo = ({ t, gender, birthInfo }) => {
  let shortInfo = [];
  let genderInfo;
  if (gender && gender !== 'NONE') {
    genderInfo = t(`common:${gender.toLowerCase()}`);
  }
  if (genderInfo) {
    shortInfo.push(genderInfo);
  }
  if (birthInfo) {
    shortInfo.push(birthInfo);
  }
  return shortInfo.join(', ');
};
