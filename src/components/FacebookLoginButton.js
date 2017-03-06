import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

import {LoginButton, GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';

import User from "../models/user";
import core_styles from '../styles/core-styles';

export default class FacebookLoginButton extends Component {
  requiredUserFields = 'id, email, name, first_name, middle_name, last_name, birthday, gender, hometown, languages, about';

  static propTypes = {
    onUserFetched: PropTypes.func.isRequired,
  };

  async onLoginFinished(error, result) {
    if (!error && !result.isCancelled) {
      const userInfo = await this.getUserInfo();
      let user = this.constructUser(userInfo);
      const onUserFetched = this.props.onUserFetched;
      onUserFetched(user);
    }
  }

  constructUser(userInfo) {
    let user = new User();
    user.email = userInfo.email;
    user.name = userInfo.first_name;
    delete userInfo.first_name;
    user.lastName = userInfo.last_name;
    delete userInfo.last_name;
    user.password = userInfo.accessToken;
    delete userInfo.accessToken;
    user.pictureUrl = userInfo.pictureUrl;
    delete userInfo.pictureUrl;

    user.facebookData = userInfo;
    return user;
  }

  async getUserInfo() {
    try {
        const userInfo = await this.requestUserInfo();
        const token = await AccessToken.getCurrentAccessToken();
        userInfo.accessToken = token.accessToken;
        userInfo.pictureUrl = this.getUserPicture(userInfo.id);
        return userInfo
    }
    catch (e) {
      console.error(e);
    }
  }

  getUserPicture(userId) {
    return `http://graph.facebook.com/${userId}/picture?type=square&token=`;
  }

  async requestUserInfo() {
    return new Promise((resolve, reject) => {
      let useIfoRequest = new GraphRequest(
        '/me',
        {
          parameters: {
            fields: {
              string: this.requiredUserFields
            }
          }
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      new GraphRequestManager().addRequest(useIfoRequest).start();
    });
  }

  render() {
    return <View style={core_styles.facebookBtn}>
      <LoginButton
        readPermissions={['public_profile', 'email']}
        onLoginFinished={this.onLoginFinished.bind(this)}/>
    </View>
  }
}
