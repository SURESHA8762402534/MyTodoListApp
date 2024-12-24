/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import appData from './app.json';
const appName = appData.name

AppRegistry.registerComponent(appName, () => App);
