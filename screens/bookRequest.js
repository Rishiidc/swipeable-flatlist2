import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Alert, Modal, KeyboardAvoidingView} from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import MyHeader from '../components/header'

export default class BookRequest extends Component {
    constructor(){
        super()
        this.state={
          userId:firebase.auth().currentUser.email,
         BookName:'',
         reason:''
        }
      }
     createUniqueId(){ return Math.random().toString(36).substring(7); }
     addRequest =(bookName,reasonToRequest)=>{ var userId = this.state.userId;
       var randomRequestId = this.createUniqueId();
        db.collection('requested_books').add({ "user_id": userId, "book_name":bookName, "reason_to_request":reasonToRequest, "request_id" : randomRequestId, }); 
        this.setState({ bookName :'', reasonToRequest : '' });
        return Alert.alert("Book Requested Successfully") }
    render(){
        return(
        <View style={styles.container}>
           <MyHeader title="Book Request" navigation ={this.props.navigation}/>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="Book Name"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              BookName: text
            })
          }}
        />
         <TextInput
          style={[styles.loginBox,{height:300}]}
          placeholder="Reason"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              reason: text
            })
          }}
        />
        </View>
        <TouchableOpacity style = {styles.button} onPress = {()=>{
          this.addRequest(this.state.BookName,this.state.reason)
        }}><Text>Submit Request</Text></TouchableOpacity>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#F8BE85'
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title :{
      fontWeight:'300',
      paddingBottom:30,
      color : '#ff3d00'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderBottomWidth: 1.5,
      borderColor : '#ff8a65',
      margin:10,
      paddingLeft:10,
      fontSize:25,
      fontFamily: 'nunito'
    },
    button:{
      width:300,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      backgroundColor:"#ff9800",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
    },
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
    },
    buttonContainer:{
      flex:1,
      alignItems:'center'
    },
    ModalStyle: {
      flex:1, borderRadius:20, justifyContent:'center', alignItems:'center', backgroundColor:"#ffff", marginRight:30, marginLeft : 30, marginTop:80, marginBottom:80    
    }
  })
  