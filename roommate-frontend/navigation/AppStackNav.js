import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';

const AppStackNav = StackNavigator({
  Home: {
		screen: HomeScreen,
    navigationOptions: {
			header: null,
      tabBarVisible: true
		}
	}
});

export default AppStackNav;
