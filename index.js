/** @format */

import {AppRegistry, UIManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent(appName, () => App);
