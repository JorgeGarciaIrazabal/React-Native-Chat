import React, {Component, PropTypes} from 'react';
import {View, StyleSheet, Text, AsyncStorage, Button} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';
import {observer} from 'mobx-react/native'

import routes  from '../routes';
import core_styles from '../styles/core-styles';
import theme       from '../styles/ui-theme';
import API from "../services/api";
import User from "../models/user";
import FacebookLoginButton from "../components/FacebookLoginButton";
import LocalStorage from "../services/localStorage";
import Loading from '../components/Loading';
import constants from '../services/constants';

@observer
class Login extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };
  /** @type LocalStorage */
  localStorage = LocalStorage.get();

  componentWillMount() {
    this.redirectIfLoggedIn()
  }

  async logIn(user: User) {
    try {
      await this.setSelf(user);
      this.props.navigator.replace(routes.chat)
    }
    catch (e) {
      console.error(e);
    }
  }

  async redirectIfLoggedIn() {
    if (constants.env === 'local' && false) {
      let user = new User();
      user.email = 'develop+develop@gmail.com';
      user.password = '__develop';
      await this.setSelf(user);
      this.props.navigator.replace(routes.chat)
    }
    try {
      this.props.store.self = await this.localStorage.getSelf();
      // this.props.navigator.replace(routes.chat)
    } catch (e) {
      // nothing to do
    }
  }

  async setSelf(user) {
    try {
      this.props.store.loading = true;
      let api = await API.get();
      let loggedUserJson = await api.UserHub.server.logIn(user);
      let loggedUser = User.constructFromJson(loggedUserJson);
      this.props.store.self = loggedUser;
      await this.localStorage.setSelf(loggedUser);
    }
    finally {
      this.props.store.loading = false;
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
        {
          this.props.store.loading ?
            <Text>Testing</Text> :
            <View/>
        }
        <Loading show={this.props.store.loading}/>
      </View>
    );
  }
}
export default Login;