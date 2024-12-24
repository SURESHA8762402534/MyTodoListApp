import { AppRegistry } from 'react-native';
import App from './App';
import appData from './app.json';
const appName = appData.name
import { render } from 'react-dom';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
