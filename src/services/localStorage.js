import {AsyncStorage} from 'react-native'

import Singleton from './singleton';
import User from '../models/user';


export default class LocalStorage extends Singleton {
  SELF_KEY = 'USER_SELF';

  async setSelf(self: User) {
    return await AsyncStorage.setItem(this.SELF_KEY, self.toJson());
  }

  async getSelf(): User {
    const selfString = await AsyncStorage.getItem(this.SELF_KEY);
    return User.constructFromJson(JSON.parse(selfString));
  }
}

