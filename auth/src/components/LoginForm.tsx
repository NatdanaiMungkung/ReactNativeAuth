import React, {Component} from 'react'
import {Text} from 'react-native'
import {Card,CardSection,Button,Input,Spinner} from './common'
import firebase from 'firebase'

class LoginForm extends Component {

    state = { email: "", password: "",error: "",loading:false}
    onButtonPress() {
        const {email, password} = this.state;
        console.log("Logging in with" + email + " and " + password)
        this.setState({error: "",loading:true})
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(this.onLoginSuccess.bind(this))
        .catch((e)=> {
            console.log(e)
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
            .catch((error)=> this.onLoginFail(error))
        })
    }

    onLoginSuccess() {
        this.setState({error: "",loading:false,email:"",password:""})
    }

    onLoginFail(error) {
        console.log(error)
        this.setState({error: "Failed to login",loading:false})
    }
    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small"/>
        } else {
            return <Button onPress={()=> this.onButtonPress()}>Login</Button>
        }
    }
    render() {
        const {errorTextStyle} = styles;
        return (
            <Card>
                <CardSection>
                    <Input value={this.state.email} onChangeText={email => this.setState({email})} label="Email" placeholder="user@gmail.com" secureTextEntry={false}/>
                </CardSection>
                <CardSection>
                    <Input value={this.state.password} onChangeText={password => this.setState({password})} label="Password" placeholder="password" secureTextEntry/>
                </CardSection>
                <Text style={errorTextStyle}>{this.state.error}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;