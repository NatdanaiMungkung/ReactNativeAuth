import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header,Button, Spinner, CardSection,Card} from './src/components/common'
import firebase from 'firebase'
import LoginForm from './src/components/LoginForm'

class App extends Component {
  state = {loggedIn:null}
  UNSAFE_componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyB4XmNFWJMe6IHATR3QWwCyJzgOOxiKhJs",
        authDomain: "authen-bc115.firebaseapp.com",
        databaseURL: "https://authen-bc115.firebaseio.com",
        projectId: "authen-bc115",
        storageBucket: "authen-bc115.appspot.com",
        messagingSenderId: "779233236429",
        appId: "1:779233236429:web:827150a2e33f723560e084",
        measurementId: "G-FWKZDKBJE6"
      });
      
    }

    firebase.auth().onAuthStateChanged((user)=> {
      console.log(user);
      this.setState({loggedIn: user != undefined && user != null})
  })
    
  }

  renderContent() {
    const {buttonStyle} = styles;
    switch (this.state.loggedIn) {
      case true:
        return <Card><CardSection><Button onPress={()=>firebase.auth().signOut()}>Log Out</Button></CardSection></Card>
      case false:
        return <LoginForm/>
      default:
        return <Spinner size="large"/>
    }
  }
  render() {
    return (
    <View>
      <Header headerText="Authentication"/> 
      {this.renderContent()}
    </View>
  )}
}

const styles = {
  buttonStyle : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
}
export default App
