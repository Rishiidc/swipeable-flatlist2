import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import {AppTabNavigator} from './components/appTabNavigator'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {AppDrawerNavigator} from './components/appDrawerNavigator'
import BookDonate from './screens/bookDonate'

export default function App() {
  return (
    <AppContainer/>
  );
}
const SwitchNavigator = createSwitchNavigator({
  welcome:{screen:WelcomeScreen},
  bottomTab:{screen:AppTabNavigator},
  Drawer:{screen:AppDrawerNavigator},
  Donate:{screen:BookDonate}
})
const AppContainer = createAppContainer(SwitchNavigator)
