import {observable} from 'mobx';

import Model from './model';
import User from './user';

export default class Message extends Model{
  /** @type User*/
  @observable sender;

  /** @type User*/
  @observable receiver;

  /** @type string*/
  @observable body = '';

  constructor(sender: User=null, receiver: User=null, body: string=null) {
    super();
    this.sender = sender;
    this.receiver = receiver;
    this.body = body;
  }
}
