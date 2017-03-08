import {observable} from 'mobx';

class Store {
  /** @type Array<User>*/
  @observable users = [];

  /** @type Array<number>*/
  @observable contacts = [];

  /** @type Array<Message>*/
  @observable messages = [];

  /** @type User This user identify the person is currently using the app */
  @observable self = {};

  @observable loading = false;
}


const store = new Store();
export default store