import React from 'react'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import BookDonate from '../screens/bookDonate'
import BookRequest from '../screens/bookRequest'
import {AppStackNavigator} from '../components/appStacknavigator'

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks:{
        screen:AppStackNavigator
    },
    BookRequest:{
        screen:BookRequest
    }
},
{tabBarOptions: {labelStyle: {fontSize:30, fontFamily: "nunito"}}}
)