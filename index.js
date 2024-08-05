/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PersonalInfo from './sourceCode/screens/allScreens/Wantjob/PersonalInfo';
LogBox.ignoreAllLogs()
AppRegistry.registerComponent(appName, () => App);
