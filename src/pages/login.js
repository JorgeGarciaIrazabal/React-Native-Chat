import {View, StyleSheet} from 'react-native';
import React, {Component, PropTypes} from 'react';
import {routes} from '../routes';
import core_styles from '../styles/core-styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';
import {Button} from 'react-native-material-ui';
import theme from '../styles/ui-theme';
import {observable} from 'mobx';


class Login extends Component {

  @observable user = null;

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  onAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(result => console.log(result))
    .catch(error => console.error(`Error: ${error.code}: ${error.message}`));
  }

  onLogout(){
    firebase.auth().signOut()
    .then(result => console.log('Logged out'))
    .catch(error => console.error(`Error: ${error.code}: ${error.message}`));
  }

  renderLoginButton() {
    return (<Button primary text="Google" onClick={onAuth}/>);
  }

  renderLogoutButton() {
    return (<Button primary text="Logout" onClick={onLogout}/>)
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
        {user ? renderLogoutButton() : renderLoginButton()}
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