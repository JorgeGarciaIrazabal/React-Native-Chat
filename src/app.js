import React, {Component} from 'react';
import {Navigator, NativeModules, StatusBar, View} from 'react-native';
import {COLOR, ThemeProvider, Toolbar} from 'react-native-material-ui';
import routes from './routes';
import core_styles from './styles/core-styles';
import theme from './styles/ui-theme';
import firebase from 'firebase';
import firebaseConfig from './config/firebase.config';

firebase.initializeApp(firebaseConfig);

const UIManager = NativeModules.UIManager;

export default class App extends Component {
  static configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }
  static renderScene(route, navigator) {
    return (
      <View style={core_styles.container}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" translucent />
        <View style={{ backgroundColor: COLOR.green500, height: 24 }} />
        <View style={core_styles.container}>
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => navigator.pop()}
            centerElement={route.name}
          />
          <route.Page
            route={route}
            navigator={navigator}
          />
        </View>
      </View>
    );
  }
  componentWillMount() {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <ThemeProvider uiTheme={theme}>

        <Navigator
          style={core_styles.container}
          configureScene={App.configureScene}
          initialRoute={routes.login}
          renderScene={App.renderScene}
        />
      </ThemeProvider>
    );
  }
}

