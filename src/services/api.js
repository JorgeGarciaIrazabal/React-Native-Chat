import HubsApi from '../hubsApi';
import constants from './constants';

export default class API {
  /** @type HubsAPI */
  static hubsApi = null;

  static async setup() {
    API.hubsApi = new HubsApi(10000);
    await API.hubsApi.connect(constants.serverWebSocketUrl);
  }

  /** @return HubsAPI */
  static async get() {
    if(API.hubsApi === null) {
      await API.setup();
    }
    return API.hubsApi;
  }
}

