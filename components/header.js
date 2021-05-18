import React, {Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import firebase, { firestore } from 'firebase';
import db from '../config';
import {DrawerActions} from 'react-navigation-drawer';

export default class MyHeader extends React.Component{
  constructor(props){
    super(props)
    this.state = {userID:firebase.auth().currentUser.email, value: ''}
  }
  getUnreadNotifications(){
    db.collection('all_notifications').where("notification_status","==","unread").where("targetted_user_ID","==",this.state.userID)
  }
  BellIconWithBadge = () =>{
    return(
      <View>
        <Icon name = "bell" type = "font-awesome" color = "green" onPress = {(this.props.navigation.navigate('Notification'))}/>
        <Badge value = {this.state.value} containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }
  render(){
     return (
    <SafeAreaProvider>
    <Header
      leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer)}/>}
      centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      rightComponent = {<this.BellIconWithBadge {...this.props}/>}
      backgroundColor = "#eaf8fe"
    />
    </SafeAreaProvider>
  );
  }
};


