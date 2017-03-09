import {observable} from 'mobx';

import Model from './model';

export default class User extends Model {
  /** @type string*/
  @observable name = '';

  /** @type string*/
  @observable lastName = '';

  /** @type string*/
  @observable email;

  /** @type string*/
  @observable password = '';

  /** @type string*/
  @observable pictureUrl;

  /** @type Object*/
  @observable facebookData = {};
}