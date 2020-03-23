import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import KeyboardShift from './components/KeyboardShift';
import ChatScreen from './screens/ChatScreen';
import SignUpPage from './screens/SignUpPage';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import {AppProvider} from './constants/AppContext.js';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const [state, setState] = React.useState({});
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        setState({
          token: null,
        });
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();  }, []);

  // TODO: Fake user info
  const userInfo = {username:'Jackalopes',password:'2020'};

  const appContext = React.useMemo(
    () =>
      ({
        signin: async data => {
          try {
            // TODO: Real validation...
            if (userInfo.username === data.username && userInfo.password === data.password)
            {
              setState({token: "someToken"});
            } else {
              setState({token: null});
            }
            await SecureStore.setItemAsync('token', state.token);
          } catch (e) {
            console.log(e);
            // Restoring token failed
          }
        },
        // TODO: Sign up
      }),
    []
  );

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    console.log(state);
    return (
      <KeyboardShift>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppProvider value={appContext}>
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
            <Stack.Navigator>
              {
                // TODO: Add Signup after Login
                state.token == null ?  (
                  <React.Fragment>
                    <Stack.Screen name="Login" component={Login} />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Stack.Screen name="Root" component={BottomTabNavigator}/>
                    <Stack.Screen name="Chat" component={ChatScreen}/>
                  </React.Fragment>
                )
              }
            </Stack.Navigator>
          </NavigationContainer>
        </AppProvider>
      </View>
      </KeyboardShift>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
