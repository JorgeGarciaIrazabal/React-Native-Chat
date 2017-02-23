import {observable} from 'mobx';

export default class User {
  /** @type string*/
  @observable name = '';

  /** @type string*/
  @observable lastName = '';

  /** @type string*/
  @observable email = '';

  /** @type number*/
  @observable id = '';

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  static constructFromJson(json: Object) {
    // todo: necessary to implement
  }
}