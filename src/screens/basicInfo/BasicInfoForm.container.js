import { connect } from 'react-redux';
import BasicInfoForm from './BasicInfoForm';

import { actions } from 'tingme/store/user';

export default connect(
  ({ user }) => ({
    displayName: user.me.displayName,
    birthday: user.me.birthday,
    gender: user.me.gender,
    description: user.me.description,
    birthdayVisibility: user.me.birthdayVisibility,
    isSaving: user.savingBasicInfo
  }),
  dispatch => ({
    onSubmit(info) {
      dispatch(actions.setBasicInfo(info));
    }
  })
)(BasicInfoForm);
