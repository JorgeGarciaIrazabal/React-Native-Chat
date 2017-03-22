import React, {Component, PropTypes} from 'react';
import {Text, ActivityIndicator, StyleSheet, View} from 'react-native';
import Loading from '../components/Loading';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Makiko} from 'react-native-textinput-effects';
import {Button, IconToggle} from 'react-native-material-ui';
import {observer} from 'mobx-react/native'

import routes  from '../routes';
import core_styles from '../styles/core-styles';
import theme from '../styles/ui-theme';
import Message from '../models/message';
import User from '../models/user';
import API from '../services/api';

@observer
class Chat extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  chatStore;
  api;
  users;

  constructor(props) {
    super();
    /** @type ChatStore */
    this.chatStore = props.store.chatStore;
    this.sender = props.store.self;
    this.getApi();
  }

  async getApi() {
    this.api = await API.get();
    const usersJson = await this.api.UserHub.server.getUsers();
    this.users = usersJson.map((userJson => User.constructFromJson(userJson)));
    await this.api.UserHub.server.getUsersStatus(this.users.map(u => u.id));
    console.log(this.users);
  }

  sendMessage() {
    let message = new Message();
    message.sender = this.sender;
    message.body = this.chatStore.messageBody;
    message.receiver = this.chatStore.receiver;
    console.log(message.receiver);
  }

  render() {
    let {chatStore} = this.props.store;
    return (
      <View style={[core_styles.form, {flexDirection: 'column', justifyContent: 'space-between'}]}>
        <View style={core_styles.container}>

        </View>
        <View style={{flex:0, flexDirection: 'row'}}>
          <View style={{flex:1, flexDirection: 'row'}}>
            <Makiko
              label={'Message'}
              inputStyle={core_styles.input}
              labelStyle={core_styles.input}
              iconClass={FontAwesomeIcon}
              iconName={'comment'}
              iconColor={'white'}
              style={{flex:1, flexDirection: 'row'}}
              value={chatStore.messageBody}
              onChangeText={(messageBody) => {this.chatStore.messageBody = messageBody}}
            />
          </View>
          <IconToggle name="send" color={theme.palette.primaryColor} onPress={this.sendMessage.bind(this)}/>
        </View>
        <Loading show={this.props.store.loading}/>
      </View>
    );
  }
}
export default Chat;