import React, {Component, PropTypes} from 'react';
import {View, Text } from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {routes}  from '../routes';
import core_styles from '../styles/core-styles';
import theme       from '../styles/ui-theme';

class Contact extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  };


  render() {
    return (
      <View style={core_styles.form}>
      </View>
    );
  }
}
export default Contact;