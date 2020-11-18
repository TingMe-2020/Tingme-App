import io from 'socket.io-client';
import wildcard from 'socketio-wildcard';

import config from 'tingme/config';
import { getStorageItem } from 'tingme/utils/asyncStorage';
import { actions as appActions } from 'tingme/store/app';

const transformSocketData = data => ({
  ...data,
  data: {
    ...data.custom
  }
});

class SocketMiddleware {
  constructor() {
    this.createInstance();
  }

  createInstance() {
    const patch = wildcard(io.Manager);
    this.socket = io(config.socketBaseUrl, { autoConnect: false });
    patch(this.socket);
    return this.socket;
  }

  getInstance() {
    return this.socket;
  }

  async addListeners(dispatch, getState) {
    const socket = this.getInstance();
    socket.connect();

    const token = await getStorageItem('userToken');
    if (token) {
      socket.emit('room', token);
      socket.on('*', event => {
        const data = transformSocketData(event.data[1]);
        dispatch(
          appActions.handleNotification({ ...data, foreground: true, message: { ...data } })
        );
      });
    }
  }

  reconnect(dispatch, getState) {
    this.createInstance();
    this.addListeners(dispatch, getState);
  }

  disconnect() {
    const socket = this.getInstance();
    socket.disconnect();
  }
}

const socketMiddleware = new SocketMiddleware();

export default socketMiddleware;
