import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Profile from '../screens/Profile'

const AppNavigator = createSwitchNavigator(
    {
        Profile: {
            screen: Profile
        }
    },
    {
        initialRouteName: 'Profile'
    }
)

export default createAppContainer(AppNavigator)