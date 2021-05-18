import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/header';

export default class BookDonateScreen extends Component{
  constructor(){
    super()
    this.state = {
      requestedBooksList : []
    }
  this.requestRef= null
  }

  getRequestedBooksList =()=>{
    this.requestRef = db.collection("requested_books")
    .onSnapshot((snapshot)=>{
      var requestedBooksList1 = snapshot.docs.map(document => document.data());
      console.log(requestedBooksList1)
      this.setState({
        requestedBooksList : requestedBooksList1 
       })
    })
  }

  componentDidMount(){
    this.getRequestedBooksList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    console.log("high")
    console.log(item.book_name + item.reason_to_request)
    return (
      //<View style = {{height : 90, backgroundColor: 'green'}}>
      <ListItem
        key={i}
        bottomDivider
        >
          <ListItem.Content>
        <ListItem.Title>{item.book_name}</ListItem.Title>
        <ListItem.Subtitle>{item.reason_to_request}</ListItem.Subtitle>
        </ListItem.Content>
            <TouchableOpacity onPress = {()=>this.props.navigation.navigate("RecieverDetails",{details:item})} style={styles.button}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          </ListItem>
      //</View>
    )
  }

  render(){
    return(
      <View style={{flex:1,backgroundColor: "pink"}}>
           <View style={{flex:0.2}}>
        <MyHeader title="Donate Books" navigation ={this.props.navigation}/>
        </View>
        <View style={{flex:0.8}}>
          {
            this.state.requestedBooksList.length === 0
            ?(
                <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBooksList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
