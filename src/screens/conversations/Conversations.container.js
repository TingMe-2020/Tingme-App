import { connect } from 'react-redux';

import { actions, selectors } from 'tingme/store/conversation';

import Conversations from './Conversations';

export default connect(
  state => ({
    conversations: state.conversation.conversations ? selectors.getConversations(state) : [],
    myId: state.user.me.id
  }),
  dispatch => ({
    loadConversations: async timestamp => dispatch(actions.loadConversations({ timestamp }))
  })
)(Conversations);
