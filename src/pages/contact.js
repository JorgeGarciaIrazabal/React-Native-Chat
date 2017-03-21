import React, { Component, PropTypes } from 'react';
import { ListView } from 'react-native';

import { observer } from 'mobx-react/native';

import SingleContact from '../components/singleContact';

@observer
class Contact extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([{name: 'Contact 1', image: 'https://randomuser.me/api/portraits/men/4.jpg'},
                                    {name: 'Contact 2', image: 'https://randomuser.me/api/portraits/women/22.jpg'},
                                    {name: 'Contact 3', image: 'https://randomuser.me/api/portraits/men/47.jpg'},
                                    {name: 'Contact 4', image: 'https://randomuser.me/api/portraits/women/53.jpg'},
                                    {name: 'Contact 5', image: 'https://randomuser.me/api/portraits/men/38.jpg'},
                                    {name: 'Contact 6', image: 'https://randomuser.me/api/portraits/women/62.jpg'}]),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <SingleContact data={rowData}/>}
      />
    );
  }
}
export default Contact;