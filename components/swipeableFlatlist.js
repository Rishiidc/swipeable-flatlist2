import React from 'react';
import {Text, View} from 'react-native'
import {Dimensions} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableFlatlist extends React.Component{
    constructor(props){
        super(props)
        this.State = {allNotifications: this.props.allNotifications} 
    }

    renderItem = (data) =>{
        var {item,index} = data
        return(
            <ListItem key = {index} bottomDivider>
                <Icon name = "book" type = "font-awesome" color = "blue"/>
                <ListItem.Title>
                    {item.Book_Name}
                </ListItem.Title>
                <ListenItem.Subtitle>
                    {index}
                </ListenItem.Subtitle>
            </ListItem>

        )
    }

    renderHiddenItem = ({item,index}) =>{
        return(
            <View>
                <Text>Swipe to delete.</Text>
            </View>
        )
    }
    
    onSwipeValueChange = (data) =>{
        const {key,value} = data
        if(
            value<-Dimensions.get("window").width
        )
        {
            const newData = [...this.state.allNotifications]
            this.updateMarkAsRead(this.state.allNotifications[key],key)
        }
    }

    updateMarkAsRead = (notifications,key) =>{
        db.collection("all_notifications").doc(notifications.doc_ID).update({notification_status: "red"})
        var newData = this.state.allNotifications.filter((data,index)=>data[index]!=data[key])
        this.setState({allNotifications: newData})
    }

    render(){
        return(
            <View>
                <SwipeListView 
                disableRightSwipe
                data = {this.state.allNotifications}
                renderItem = {this.renderItem }
                renderHiddenItem = {this.renderHiddenItem}
                rightOpenValue = {-Dimensions.get('window').width}
                previewRowKey = {'0'}
                previewOpenValue = {-300}
                previewOpenDelay = {10000}
                onSwipeValueChange = {this.OnSwipeValueChange}
                keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}
