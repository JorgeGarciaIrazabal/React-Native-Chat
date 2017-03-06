import {observable} from 'mobx';
import moment from 'moment';

export default class Model {
  /** @type string*/
  @observable id;
  /** @type Date */
  @observable createdAt;
  /** @type Date */
  @observable updatedAt;

  constructor() {
    this.createdAt = moment().utc().date();
  }

  static constructFromJson(json: Object) {
    let model = new this();
    let camelCasedJson = {};
    Object.keys(json).forEach((key) => {
      camelCasedJson[this._toCamelCase(key)] = json[key];
    });

    Object.assign(model, camelCasedJson);
    return model;
  }

  toJson(){
    return JSON.stringify(this);
  }

  static _toCamelCase(underscoreName: string){
      return underscoreName.replace(/(_[a-z])/g, function($1){return $1.toUpperCase().replace('_','');});
  }
}