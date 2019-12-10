import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Profile from '../screens/Profile'
import Login from '../screens/Login';

const AppNavigator = createSwitchNavigator(
    {
        Profile: {
            screen: Profile
        },
        Login : {
            screen : Login
        }
    },
    {
        initialRouteName: 'Profile'
    }
)

export default createAppContainer(AppNavigator)