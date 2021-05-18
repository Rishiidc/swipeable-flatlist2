import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Alert, Modal, KeyboardAvoidingView} from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      isModalVisible: false,
      firstName: '', 
      lastName: '',
      address: '',
      phoneNumber: '',
      confirmPassword: ''
    }
  }
  showForm = ()=> {
    return(
      <Modal animationType = "fade" transparent = {true} visible = {this.state.isModalVisible}>
        <View style = {styles.ModalStyle}>
          <ScrollView style = {{width: '100%'}}><KeyboardAvoidingView>
            <TextInput style = {styles.loginBox }placeholder = "First Name" onChangeText = {Name =>{
              this.setState({firstName:Name})
            }}/>
            <TextInput style = {styles.loginBox }placeholder = "Last Name" onChangeText = {Name =>{
              this.setState({lastName:Name})
            }}/>
            <TextInput style = {styles.loginBox }placeholder = "Address" onChangeText = {Name =>{
              this.setState({address:Name})
            }}/>
            <TextInput style = {styles.loginBox }placeholder = "Phone Number" onChangeText = {Name =>{
              this.setState({phoneNumber:Name})
            }}/>
            <TextInput style = {styles.loginBox }placeholder = "E-mail ID" keyboardType = {'email-address'} onChangeText = {Name =>{
              this.setState({emailId:Name})
            }}/>
            <TextInput style = {styles.loginBox }placeholder = "Password" secureTextEntry = {true} onChangeText = {Name =>{
              this.setState({password:Name})
            }}/>
             <TextInput style = {styles.loginBox }placeholder = "Password" secureTextEntry = {true} onChangeText = {Name =>{
              this.setState({password:Name})
            }}/>
             <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.setState({isModalVisible:false})}}
            >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
            </KeyboardAvoidingView></ScrollView>
        </View>
      </Modal>
    )
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      this.props.navigation.navigate("bottomTab")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage)
    })
  }

  userSignUp = (emailId, password) =>{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      db.collection('Users').add({ "email_id": this.state.emailId, "Address": this.state.address, "first_name": this.state.firstName,
      "last_name": this.state.lastName, "phone_number": this.state.phoneNumber, }); 
      return alert("User Added Successfully")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage)
    });
  }


  render(){
    return(
      <View style={styles.container}>
        {this.showForm()}
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Book Santa App</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.setState({isModalVisible:true})}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
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
    color : '#ff3d00',
    fontSize:50,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'nunito'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    margin:10,
    paddingLeft:10
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
