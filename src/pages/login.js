import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Text, AsyncStorage, Button} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';
import {observer} from 'mobx-react/native'

import {routes}  from '../routes';
import core_styles from '../styles/core-styles';
import theme       from '../styles/ui-theme';
import API from "../services/api";
import User from "../models/user";
import FacebookLoginButton from "../components/FacebookLoginButton";
import LocalStorage from "../services/localStorage";

@observer
class Login extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };
  /** @type LocalStorage */
  localStorage = LocalStorage.get();

  async logIn(user: User) {
    try {
      let api = await API.get();
      let loggedUserJson = await api.UserHub.server.logIn(user);
      let loggedUser = User.constructFromJson(loggedUserJson);
      this.props.store.self = loggedUser;
      await this.localStorage.setSelf(loggedUser);
    }
    catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View style={core_styles.form}>
        <Sae
          label={'Email Address'}
          inputStyle={core_styles.input}
          labelStyle={core_styles.input}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={theme.palette.primaryColor}
          // TextInput props
          autoCapitalize={'none'}
        />
        <Sae
          label={'Password'}
          inputStyle={core_styles.input}
          labelStyle={core_styles.input}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={theme.palette.primaryColor}
          // TextInput props
          autoCapitalize={'none'}
          secureTextEntry={true}
        />
        <FacebookLoginButton onUserFetched={this.logIn.bind(this)}/>

      </View>
    );
  }
}
export default Login;