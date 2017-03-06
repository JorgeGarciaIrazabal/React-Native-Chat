const singletonEnforcer = Symbol();

export default class Singleton {
  static instance;

  constructor(enforcer) {
    if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }

  static get() {
    if (!this.instance) {
      this.instance = new this(singletonEnforcer);
    }
    return this.instance;
  }
}

