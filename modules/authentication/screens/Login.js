import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import { saveUser } from '../../../actions';
import Firebase from '../../../config/Firebase';

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        };
    }

    _handleLogin = async () => {
        await Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(res => {
            // this.props.saveUser(res.user)
            // console.log("User saved in Local Store!");
            this.props.navigation.navigate('AuthLoader');
        })
    }

    render() {
        return (
            <Swiper showsButtons={false} loop={false} activeDotStyle={{ width: 20 }}>
                <View style={styles.imageContainer}>
						<Text style={styles.infoText}>
							Grow your business with effective communication with your audience.
						</Text>
				</View>
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
                <TouchableOpacity style={styles.button} onPress={this._handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Button
                    title="Don't have an account yet? Sign up"
                    onPress={() => this.props.navigation.navigate('Signup')}
                />
            </View>
            </Swiper>
        )
    }
}

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
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
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

export default connect(null,{ saveUser })(Login)