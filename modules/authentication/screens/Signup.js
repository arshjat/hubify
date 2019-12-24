import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Firebase from '../../../config/Firebase';
import { saveUser } from '../../../actions';
import { connect } from 'react-redux';

class Signup extends React.Component {
    state = {
        email : '',
        password : ''
    }

    _handleSignUp = async () => {
        await Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(()=>{
            console.log("User Signed Up!!");
            this.props.saveUser(firebase.auth().currentUser)
            console.log("User saved to local store.");
            this.props.navigation.navigate('AuthLoader');
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputBox}
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={this._handleSignUp}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

export default connect(null, { saveUser })(Signup);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})
