import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import  thunkMiddleware  from 'redux-thunk';
import firebase  from './config/Firebase';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from './navigation/AppNavigator';
import reducer  from './reducers';
import { Text, Spinner } from 'native-base';

import GET_ALL_USERS from './modules/database-api/hasuraConstants/Mutations';
import CREATE_USER_MUTATION from './modules/database-api/hasuraConstants/Mutations'; 
import createApolloClient from './modules/database-api/Apollo';

import HomeScreen from './modules/map/screens/homeScreen';

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [loggingUserIn, setLoggingUserIn]       = useState(true);
  const [toggleNavigator, setToggleNavigator]   = useState('Login');

  useEffect(() =>{
    return firebase.auth().onAuthStateChanged(async user => {
      setLoggingUserIn(true);
      if(user){
        console.log(user.email);
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim = idTokenResult.claims['https://hasura.io/jwt/claims'];
        // console.log("idtokenresult :" + idTokenResult.issuedAtTime)
        // console.log("hasuraClaim :" + hasuraClaim);
        setLoggingUserIn(false);
        setToggleNavigator('Profile')
        
        
        if (hasuraClaim) {
					client = createApolloClient(idTokenResult.token);
					client.query({
						query: GET_ALL_USERS
					}).then(data => {
						if (data.data.user.length === 0) {
							client.mutate({
								mutation: CREATE_USER_MUTATION,
								variables: {
                  email: idTokenResult.claims.email,
									firebase_uid : firebase.auth().currentUser.uid,
								}
							}).then(() => {
								setLoadingComplete(true);
								setLoggingUserIn(false);
								setToggleNavigator('Profile');
							}).catch(err => {
								console.log('Error adding user', err);
							});
						}
						else {
							setLoggingUserIn(false);
							setToggleNavigator('Profile');
						}
					}).catch(err => {
						console.log('Error getting document', err);
					});

        }
        else{
          console.log("naahhhh")
        }
        
      }
      else{
        console.log('not user');
				setLoggingUserIn(false);
				setToggleNavigator('Login');
      }
    })
  },[]);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } 
  else {
        return (
          // <View style={styles.container}>
          //   {
          //     (loggingUserIn) ?
          //       <View style={{ backgroundColor: '#006699', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          //         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          //           <Text style={{justifyContent: 'center'}}>ExcuseMe</Text>
          //         </View>
          //         <View style={{ marginTop: 170, marginVertical: 50 }}>
          //           <Spinner />
          //           <Text style={{ color: '#fff' }}>Please wait while we&apos;re logging you in.</Text>
          //         </View>
          //       </View>
          //       :
          //       <Provider store={store}>
          //         {
          //           (toggleNavigator === 'Login') ? <AuthNavigator /> : <AppNavigator />
          //         }
          //       </Provider>
          //   }
          // </View>
          <HomeScreen />
        );
    
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});



