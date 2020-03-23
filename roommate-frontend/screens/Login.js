import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, Alert, Keyboard,TouchableWithoutFeedback} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import AppContext from '../constants/AppContext.js';

import HomeScreen from '../screens/HomeScreen';

//const Stack = createStackNavigator();
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Login extends React.Component {
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {username:'',password:''}
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <Text style={styles.welcome}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(username)=>this.setState({username})}
            value={this.state.username}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(password)=>this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={styles.btnEnter}
            onPress={() => this.context.signin(this.state)}
          >
            <Text style={styles.btnEnterText}>ENTER</Text>
          </TouchableOpacity>
        </View>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Fafafa',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    margin:15,
    height:40,
    padding:5,
    fontSize:16,
    borderBottomWidth:1,
    borderBottomColor: '#428AF8',
  },
  btnEnter: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#428AF8',
    alignItems: 'center',
    marginLeft:15,
    marginRight:15,
    padding:10,
  },
  btnEnterText: {
    color:'#ffffff',
    fontWeight: '700',
  },
});
