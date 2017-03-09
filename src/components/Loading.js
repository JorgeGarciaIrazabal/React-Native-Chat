import React, {Component, PropTypes} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import loading_styles from '../styles/loading-styles';

export default class Loading extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
  };

  render() {
    const Dimensions = require('Dimensions');
    const {width, height} = Dimensions.get('window');
    if (this.props.show) {
      return (
        <View style={[loading_styles.container, {width: width, height: height}]}>
          <ActivityIndicator
            animating={true}
            style={loading_styles.centering}
            size={100}
          />
          <View style={[loading_styles.overlay, {width: width, height: height}]}/>
        </View>
      );
    } else {
      return (
        <View/>
      );
    }
  }
}