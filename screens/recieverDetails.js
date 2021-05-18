import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Alert, Modal, KeyboardAvoidingView} from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Header, Icon } from 'react-native-elements';
import { TouchableHighlightBase } from 'react-native';

export default class RecieverDetails extends Component{
    constructor(props){ super(props);
        console.log("recieverDetails")
        console.log(this.props.navigation.getParam('details'))
         this.state={ userId : firebase.auth().currentUser.email,
             userName : "",
              recieverId : this.props.navigation.getParam('details')["user_id"],
               requestId : this.props.navigation.getParam('details')["request_id"],
                bookName : this.props.navigation.getParam('details')["book_name"],
                 reason_for_requesting : this.props.navigation.getParam('details')["reason_to_request"],
                  recieverName : '',
                   recieverContact : '',
                    recieverAddress : '',
                     recieverRequestDocId : ''
                     } }
                     getRecieverDetails(){
                         db.collection('Users').where('emailID','==',this.state.recieverId).get()
                         .then(snapshot => {
                             snapshot.forEach(doc => {
                                 this.setState({
                                     recieverName: doc.data().first_name,
                                     recieverContact: doc.data().contact,
                                     recieverAddress: doc.data().address
                                 })
                             })
                         })
                         db.collection('requested_books').where('request_id','==',this.state.requestId).get() 
                         .then(snapshot=>{ snapshot.forEach(doc => { this.setState({recieverRequestDocId:doc.id})
                         }) 
                        })
                     }
                     getUserDetails(userId){
                        db.collection('Users').where('emailID','==',userId).get()
                        .then(snapshot => {
                            snapshot.forEach(doc => {
                                this.setState({
                                    userName: doc.data().first_name + doc.data().last_name
                                })
                            })
                        })
                    }
                    componentDidMount(){
                        this.getRecieverDetails()
                        this.getUserDetails(this.state.userId)
                    }
                    updateBookStatus(){
                        db.collection("all_donations").add({
                            book_name: this.state.bookName,
                            request_id: this.state.requestId,
                            requested_by: this.state.recieverName,
                            donor_id: this.state.userId,
                            request_status: "Doner Interested"
                        })
                    }
                    addNotification = ()=> {
                        db.collection("all_notifications").add({
                            targetted_user_id: this.state.recieverId,
                            donor_id: this.state.userId,
                            request_id: this.state.requestId,
                            book_name: this.state.bookName,
                            date: firebase.firestore.FieldValue.serverTimestamp,
                            Notification_status: "Unread",
                            message: this.state.userName+"Has Shown Interest"
                        })
                    }

                
                    render(){
                        return(
                            <View style = {styles.container}>
                                   <View style={{flex:0.1}}> 
                        <Header leftComponent ={<Icon name='arrow-left' type='feather' color='#696969' onPress={() => this.props.navigation.goBack()}/>} 
                        centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }} backgroundColor = "#eaf8fe" /> 
                        </View> 
                        <View style={{flex:0.3}}> 
                        <Card title={"Book Information"} titleStyle= {{fontSize : 20}} > 
                        <Card> 
                            <Text>Name : {this.state.bookName}</Text> 
                            </Card> 
                            <Card> 
                                <Text>Reason:{this.state.reason_for_requesting}</Text>
                            </Card> 
                            </Card> 
                            </View>
                                <View style = {{flex:0.3}}>
                                <Card title = {"Reciever Information"} titleStyle = {{fontSize: 20}}> 
                                   <Card><Text style = {{fontweight: 'bold'}}> Name : {this.state.recieverName}</Text></Card>
                                   <Card><Text style = {{fontweight: 'bold'}}> Contact : {this.state.recieverContact}</Text></Card>
                                   <Card><Text style = {{fontweight: 'bold'}}> Address : {this.state.recieverAddress}</Text></Card>
                                </Card>
                            </View>
                            <View style={styles.buttonContainer}> 
                            { this.state.recieverId !== this.state.userId ?( 
                            <TouchableOpacity style={styles.button} onPress={()=>{ 
                                this.updateBookStatus() 
                                this.addNotification() 
                                this.props.navigation.navigate('MyDonations') }}> 
                                <Text>I want to Donate</Text> 
                                </TouchableOpacity> ) : null } 
                                </View>
                        </View> 
                        )
                    }                   
}

const styles = StyleSheet.create({ 
    container: { flex:1, },
     buttonContainer:{ 
         flex:0.3, 
         justifyContent:'center', 
         alignItems:'center' 
        },
      button:{ 
          width:200, 
          height:50, 
          justifyContent:'center', 
          alignItems : 'center', 
          borderRadius: 10, 
          backgroundColor: 'orange', 
          shadowColor: "#000", 
          shadowOffset:{ 
              width: 0, 
              height: 8 }, 
              elevation : 16 
            } 
        })