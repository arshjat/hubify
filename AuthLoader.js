import React from 'react';
import { View } from 'react-native';
import firebase from './config/Firebase';
import { connect } from 'react-redux';
import { Text, Spinner } from 'native-base';
import { saveUser } from './actions';
import { bindActionCreators } from 'redux'

class AuthLoader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            apolloClient : {}
        };
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        firebase.auth().onAuthStateChanged(async user => {
            if(user){
                this.props.saveUser(user)
                const idTokenResult = await user.getIdTokenResult();
                const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];
                if(hasuraClaim){
                    console.log(hasuraClaim);
                    
                }
                else{
                    console.log("hasuraClaim is undefined");
                }
                this.props.navigation.navigate('Profile');
            }
            else{
                this.props.navigation.navigate('Login');
            }
        })
    }
    render(){
        return(
            <View style={{ backgroundColor: '#006699', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{justifyContent: 'center'}}>ExcuseMe</Text>
                  </View>
                  <View style={{ marginTop: 170, marginVertical: 50 }}>
                    <Spinner />
                    <Text style={{ color: '#fff' }}>Please wait while we&apos;re logging you in.</Text>
                  </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        apolloClient: state.apolloClient
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ saveUser }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthLoader);
