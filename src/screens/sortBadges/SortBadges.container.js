import { connect } from 'react-redux';
import SortBadges from './SortBadges';

import { actions } from 'tingme/store/user';

const mapState = ({ user }) => ({
  featuredBadges: user.me.featuredBadges,
  selectedBadges: user.me.selectedBadges,
  availableBadges: user.availableBadges
});

const mapDispatch = dispatch => ({
  onGetAvailableBadges() {
    dispatch(actions.getAvailableBadges());
  },
  onSetSelectedBadges(badges) {
    dispatch(actions.setSelectedBadges(badges));
  },
  onSetFeaturedBadges(badges) {
    dispatch(actions.setFeaturedBadges(badges));
  }
});

export default connect(
  mapState,
  mapDispatch
)(SortBadges);
