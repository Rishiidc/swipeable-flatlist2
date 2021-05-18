import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './appTabNavigator'
import CustomSidebar from './customSidebarMenu'
import SettingsScreen from '../screens/settingsScreen'
import NotificationScreen from '../screens/notificationScreen'

export const AppDrawerNavigator = createDrawerNavigator({Home: {screen:AppTabNavigator},
Setting: {screen: SettingsScreen}, Notification: {screen: NotificationScreen}},{contentComponent:CustomSidebar},{initialRouteName:'Home'})