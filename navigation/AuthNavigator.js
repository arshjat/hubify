import {createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from '../modules/authentication/screens/Login';
import Signup from '../modules/authentication/screens/Signup'


const AuthNavigator = createSwitchNavigator(
    {
        Login : {
            screen : Login,
        },
        Signup : {
            screen : Signup,
        }
    },
    {
        initialRouteName: 'Login'
    }
);

AuthNavigator.path = '';

export default createAppContainer(AuthNavigator);