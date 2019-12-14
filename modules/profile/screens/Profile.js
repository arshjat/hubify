import React from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';
import { connect } from 'react-redux';
import { removeUser } from '../../../actions';
import Firebase from '../../../config/Firebase';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email : ''
        }
    }

    componentDidMount(){
        // const user = this.props.user;
        const user = Firebase.auth().currentUser;
        if(user){
            this.setState({email : user.email})
            console.log(user.email)
        }
        else{
            console.log("No user Present");
        }
    }

    handleLogout = () => {
        this.props.removeUser();
        Firebase.auth().signOut().then(()=>{
            console.log("Successfully Logged Out from Local Store and Firebase");
            this.props.navigation.navigate('Login');
        })
        
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Profile Screen</Text>
                <Text>Logged in as: {this.state.email} </Text>
                <Button
                    title="Sign Out"
                    onPress={() => this.handleLogout()}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default connect(null,{removeUser})(Profile)