import {AppRegistry} from 'react-native';
import React, {Component} from 'react';
import App from './src/app';


class React_Native_Chat extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('React_Native_Chat', () => React_Native_Chat);
