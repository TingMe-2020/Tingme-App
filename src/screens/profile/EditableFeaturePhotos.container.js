import { connect } from 'react-redux';
import EditableFeaturePhotos from './EditableFeaturePhotos';

import { actions } from 'tingme/store/user';

export default connect(
  ({ user }) => ({
    isLoading: user.featuredPhotosLoading
  }),
  dispatch => ({
    onSave(image, index) {
      dispatch(actions.setFeaturedPhoto({ image, index }));
    },
    onSetFeaturedPhotoStart() {
      dispatch(actions.setFeaturedPhotoStart());
    }
  })
)(EditableFeaturePhotos);
