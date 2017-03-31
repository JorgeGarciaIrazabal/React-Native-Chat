import {observable} from 'mobx';

class ChatStore {
  /** @type string*/
  @observable messageBody = '';

  /** @type User*/
  @observable sender;
}

export default ChatStore