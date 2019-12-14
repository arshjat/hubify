import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Profile from '../modules/profile/screens/Profile'
import Login from '../modules/authentication/screens/Login';
import Signup from '../modules/authentication/screens/Signup';
import AuthLoader from '../AuthLoader';

const AppNavigator = createSwitchNavigator(
    {
        Profile: {
            screen: Profile
        },
        Login : {
            screen : Login
        },
        Signup : {
            screen : Signup
        },
        AuthLoader : {
            screen : AuthLoader
        }
    },
    {
        initialRouteName: 'AuthLoader'
    }
)

export default createAppContainer(AppNavigator)