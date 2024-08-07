/**
 * @format
 */

import {AppRegistry,LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Selection from './sourceCode/screens/allScreens/StartingScreens/Selection';
import Subscription_Intern from './sourceCode/screens/allScreens/Internship/Subscription_Intern';
LogBox.ignoreAllLogs()
AppRegistry.registerComponent(appName, () => Subscription_Intern);
