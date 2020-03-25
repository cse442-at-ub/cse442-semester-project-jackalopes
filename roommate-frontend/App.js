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
import { determineURL } from './utils';

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

  const appContext = React.useMemo(
    () =>
      ({
        signin: async data => {
          const {username, password} = data;
          try {
            await fetch(`${determineURL()}/api/v1/login/`, {
              method: 'POST',
              headers: new Headers({
                'Content-Type': 'application/json',
              }),
              body: JSON.stringify({
                login: username,
                password,
              })
            })
              .then(response => response.json())
              .then(loginResponse => {
                if (loginResponse.token != undefined) {
                  console.log(loginResponse.token);
                  setState({token: loginResponse.token});
                  // success
                  console.log('You have logged in successfully!');
                } else {
                  throw "Invalid login";
                }
              })
              .then(() => SecureStore.setItemAsync('token', state.token));
          } catch (e) {
            console.log("Error logging in:", e);
          }
        },
        signup: async data => {
          const { full_name, username, password, email, phone_number } = data;
          console.log(`${determineURL()}/api/v1/register/`);

          try {
            //signup logic
            await fetch(`${determineURL()}/api/v1/register/`, {
              method: 'POST',
              headers: new Headers({
                'Content-Type': 'application/json',
              }),
              body: JSON.stringify({
                first_name: full_name.substr(0, full_name.indexOf(' ')),
                last_name: full_name.substr(full_name.indexOf(' ') + 1),
                username,
                email,
                password,
                password_confirm: password,
              })
            })
              .then(response => response.json())
              .then(json => {
                console.log(json);
                if (json.id) {
                  appContext.signin({username, password});
                }
              });
          } catch (err) {
            console.log('Error signing up: ', err);
          }
        }
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
                state.token == null ?  (
                  <React.Fragment>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Sign Up" component={SignUpPage} />
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
