import {createSwitchNavigator, createAppContainer } from 'react-navigation';

import Login from '../screens/Login';
import Signup from '../screens/Signup'


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