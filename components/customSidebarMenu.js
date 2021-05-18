import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import firebase from 'firebase'
import db from '../config'

export default class CustomSidebar extends React.Component{
    constructor(){
        super()
        this.state = {userID: firebase.auth().currentUser.email,
            image: '#',
            name: '',
            docID: ''
            }
    }
    selectPicture = async ()=>{
        const {cancelled,uri} = await 
        ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.All, 
            allowsEditing: true, 
            aspect: [4, 3],
            quality: 1,
         });
          if (!cancelled) { this.uploadImage(uri, this.state.userID); } };
           uploadImage = async (uri, imageName) => 
           { var response = await fetch(uri);
             var blob = await response.blob();
             var ref = firebase .storage() .ref() .child("user_profiles/" + imageName);
              return ref.put(blob).then((response) => { this.fetchImage(imageName); }); };

            fetchImage = (imageName) => { 
                var storageRef = firebase .storage() .ref() .child("user_profiles/" + imageName); 
                // Get the download URL 
                storageRef .getDownloadURL() .then((url) => { this.setState({ image: url }); }) .catch((error) => { this.setState({ image: "#" }); }); };

            getUserProfile() { 
                db.collection("Users") .where("email_id", "==", this.state.userID) 
                .onSnapshot((querySnapshot) => { querySnapshot.forEach((doc) => 
                { this.setState({ name: doc.data().first_name + " " + doc.data().last_name, docId: doc.id, image: doc.data().image, }); }); }); }
            
            componentDidMount() {
                this.fetchImage(this.state.userID)
                this.getUserProfile()
            }


   render() { return ( 
            <View style={{ flex: 1 }}>
            <Avatar rounded source={{ uri: this.state.image }} size="medium" onPress={() => this.selectPicture()} containerStyle={styles.imageContainer} showEditButton /> 
            <DrawerItems {...this.props} />
            </View> ); 
            }

}

            

var styles = StyleSheet.create({ 
    container: { flex: 1 },
    drawerItemsContainer: { flex: 0.8, },
    logOutContainer: { flex: 0.2, justifyContent: "flex-end", paddingBottom: 30, },
    logOutButton: { height: 30, width: "100%", justifyContent: "center", padding: 10, }, 
    imageContainer: { flex: 0.75, width: "40%", height: "20%", marginLeft: 20, marginTop: 30, borderRadius: 40, }, 
    logOutText: { fontSize: 30, fontWeight: "bold", }, 
});

 

