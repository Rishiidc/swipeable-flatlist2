import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/header';
import SwipeableFlatlist from '../components/SwipeableFlatlist';
import db from '../config';

export default class notificationScreen extends Component {
    constructor(props){
        super(props);
        this.state = {userID: firebase.auth().currentUser.email, allNotifications: []};
        this.notificationRef = null;
    }
    getNotifications = ()=> {
       this.notificationRef = db.collection("all_notifications")
       .where("notification_status","==","unread")
       .where("targetted_user_ID","==",this.state.userID)
       .onSnapshot(snapshot=>{
           var allNotifications = []
           snapshot.docs.map(doc=>{
            var notification = doc.data()
        notification["doc_ID"] = doc.id
        allNotifications.push(notification)
           })
        this.setState({allNotifications : allNotifications}) 
       })

    }
   componentDidMount = ()=> {
       this.getNotifications()
   }
   componentWillUnmount = ()=> {
       this.notificationRef()
   }

   render(){
       return(
           <View style = {{flex: 1}}>
           <View style = {{flex: 0.1}}>
               <MyHeader title = {"notifications"} navigation = {this.props.navigation}/>
           </View>
           <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no notifications</Text>
              </View>
            )
            :(
              <SwipeableFlatlist allNotifications={this.state.allNotifications}/>
            )
          }
        </View>


        </View>
       )
   }
}