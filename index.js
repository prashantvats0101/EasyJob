/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Selection from './sourceCode/screens/allScreens/StartingScreens/Selection';
LogBox.ignoreAllLogs()
AppRegistry.registerComponent(appName, () => App);
