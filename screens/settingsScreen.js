import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MyHeader from '../components/header'
import db from '../config'
import firebase from 'firebase'

export default class SettingsScreen extends React.Component{
    constructor(){
        super()
        this.state = {
            emailID: '',
            firstName: '',
            lastname: '',
            address: '',
            contact: '',
            docID: ''
        }
    }
    getUserDetails = () =>{
         var email = firebase.auth().currentUser.email
         db.collection('Users').where('email_id','==',email).get()
         .then(Snapshot => {Snapshot.forEach(doc =>{
             var data = doc.data()
             this.setState({
                emailID: data.email_id,
                firstName: data.first_name,
                lastname: data.last_name,
                address: data.Address,
                contact: data.phone_number,
                docID: doc.id
             })
         })})
    }
    componentDidMount(){
        this.getUserDetails()
    }
    updateUserDetails =() =>{
        db.collection('Users').doc(this.state.docID).update({
            first_name: this.state.firstName,
            last_name: this.state.lastname,
            Address: this.state.Address,
            phone_number: this.state.contact
        })
        alert("Profile is updated!")
    }
    render(){
        return(
            <View style = {styles.container}>
                <MyHeader title = "Settings" navigation = {this.props.navigation}/>
                <View style = {styles.formContainer}>
                    <TextInput style = {styles.formTextInput}
                    placeholder = {"Firstname"}
                    onChangeText = {Text =>{
                        this.setState({firstName: Text})
                    }}
                    value = {this.state.firstName}
                    />
                     <TextInput style = {styles.formTextInput}
                    placeholder = {"Lastname"}
                    onChangeText = {Text =>{
                        this.setState({lastName: Text})
                    }}
                    value = {this.state.lastName}
                    />
                     <TextInput style = {styles.formTextInput}
                    placeholder = {"Contact"}
                    onChangeText = {Text =>{
                        this.setState({contact: Text})
                    }}
                    value = {this.state.contact}
                    />
                     <TextInput style = {styles.formTextInput}
                    placeholder = {"Address"}
                    onChangeText = {Text =>{
                        this.setState({Address: Text})
                    }}
                    value = {this.state.Address}
                    />

                <TouchableOpacity style = {styles.button} onPress = {()=>this.updateUserDetails()}>
                     <Text>Save</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container : {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex:1,
      width:'100%',
      alignItems: 'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
    buttonText:{
      fontSize:25,
      fontWeight:"bold",
      color:"#fff"
    }
  })