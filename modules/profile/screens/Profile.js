import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import {connect} from 'react-redux';
import firebase from '../../../config/Firebase';

class Profile extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile Screen</Text>
                {console.log(firebase.auth().currentUser.email)}
                <Text>Logged in as: {firebase.auth().currentUser.email} </Text>
                <Button
                    title="Sign Out"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
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
        user: state.user
    }
}

export default connect(
    mapStateToProps,
    null
)(Profile)