import React from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';
import { connect } from 'react-redux';
import { removeUser } from '../../../actions';
import Firebase from '../../../config/Firebase';
import { GET_ALL_USERS } from '../../database-api/hasuraConstants/Queries';

class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email : ''
        }
    }

    componentDidMount(){
        const user = this.props.user;
        // const user = Firebase.auth().currentUser;
        if(user){
            this.setState({email : user.email})
            const client = this.props.apolloClient;
            if(client){
                console.log("Apollo Client found !")
                client.query({
                    query : GET_ALL_USERS
                }).then(data => {
                    console.log(data);
                })
            }
        }
        else{
            console.log("No user Present");
            this._handleLogout()
        }
    }

    _handleLogout = () => {
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
                    onPress={() => this._handleLogout()}
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

const mapStateToProps = state => {
    return {
        user: state.user,
        apolloClient : state.apolloClient
    }
}

export default connect(mapStateToProps,{removeUser})(Profile)