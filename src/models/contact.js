import {observable} from 'mobx';
import React from 'react';

export default class Contact {
  /** @type string*/
  @observable name;

  /** @type string*/
  @observable lastName;

  /** @type string*/
  @observable imageUrl = '';

  constructor(name: string, lastName: string, imageUrl: string) {
    this.name = name;
    this.lastName = lastName;
    this.imageUrl = imageUrl;
  }

  static constructFromJson(json: Object) {
    // todo: necessary to implement
  }
}