import {observable} from 'mobx';
import moment from 'moment';

export default class Message {
  /** @type User*/
  @observable sender;

  /** @type User*/
  @observable receiver;

  /** @type string*/
  @observable body = '';

  /** @type number utc timestamp*/
  @observable createdAt = '';


  constructor(sender: User, reciver: User, body: string) {
    this.sender = sender;
    this.receiver = reciver;
    this.body = body;
    this.createdAt = moment().utc().unix();
  }

  static constructFromJson(json: Object) {
    // todo: necessary to implement
  }
}