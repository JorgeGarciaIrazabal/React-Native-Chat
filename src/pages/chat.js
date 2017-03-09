import React, {Component, PropTypes} from 'react';
import {Text, ActivityIndicator, StyleSheet, View} from 'react-native';
import Loading from '../components/Loading';

import {observer} from 'mobx-react/native'

import {routes}  from '../routes';

@observer
class Chat extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View>
        <Text>In Chat Page</Text>
        <Loading show={this.props.store.loading}/>
      </View>
    );
  }
}
export default Chat;