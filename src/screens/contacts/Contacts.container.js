import { connect } from 'react-redux';
import Contacts from './Contacts';

export default connect(({ user }) => ({
  unreadRequestsCount: user.me.unreadRequestsCount
}))(Contacts);
