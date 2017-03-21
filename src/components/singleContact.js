import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';

import contact_styles from '../styles/contact-styles';

export default class SingleContact extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  _onPressButton() {
    console.log('item selected');
  }

  render() {
      return (
        <TouchableHighlight onPress={this._onPressButton}>
            <View style={contact_styles.container}>
              <Image source={{ uri: this.props.data.image}} style={contact_styles.photo} />
              <Text style={contact_styles.text}>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
      );
  }
}