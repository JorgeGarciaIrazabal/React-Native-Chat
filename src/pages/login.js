import {View, StyleSheet} from 'react-native';
import React, {Component, PropTypes} from 'react';
import {routes} from '../routes';
import core_styles from '../styles/core-styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';
import {Button} from 'react-native-material-ui';
import theme from '../styles/ui-theme';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;


class Login extends Component {
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
        <Button primary text="Login" />
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}

const propTypes = {
  navigator: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

Login.propTypes = propTypes;

export default Login;