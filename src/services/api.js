import HubsApi from '../hubsApi';

export default class API {
  /** @type HubsAPI */
  static hubsApi = null;

  static async setup() {
    API.hubsApi = new HubsApi(10000);
    await API.hubsApi.connect('ws://192.168.0.15:8844/');
  }

  /** @return HubsAPI */
  static async get() {
    if(API.hubsApi === null) {
      await API.setup();
    }
    return API.hubsApi;
  }
}

