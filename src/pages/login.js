import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { LoginButton, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { Button } from 'react-native-material-ui';

import { routes }  from '../routes';
import core_styles from '../styles/core-styles';
import theme       from '../styles/ui-theme';


class Login extends Component {

  _responseInfoCallback(error, result) {
    if (error) {
      alert('Error login: ' + error.toString());
    } else {
      alert('Logged in with: ' + result.name.toString());
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
        <View style={core_styles.facebookBtn}>
          <LoginButton
            publishPermissions={["publish_actions"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("login has error: " + result.error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {
                  let infoRequest = new GraphRequest(
                    '/me',
                    null,
                    this._responseInfoCallback,
                  );
                  new GraphRequestManager().addRequest(infoRequest).start();
                }
              }
            }
            onLogoutFinished={() => alert("logout.")}/>
        </View>
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