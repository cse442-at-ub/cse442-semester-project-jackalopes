import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View, Alert, Keyboard,TouchableWithoutFeedback} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import HomeScreen from '../screens/HomeScreen';


const userInfo = {username:'Jackalopes',password:'2020'};
//const Stack = createStackNavigator();
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {username:'',password:''}
  }
  static navigationOptions = {
    header:null
  };
  resetToDashboard() {
		this.props.navigation.dispatch(
			NavigationActions.reset({
				index: 0,
				actions: [NavigationActions.navigate({ routeName: "Dashboard" })]
			})
		);
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
            onPress={this._signin}
          >
            <Text style={styles.btnEnterText}>ENTER</Text>
          </TouchableOpacity>
        </View>
      </DismissKeyboard>
    );
  }

  _signin = async () => {
    if(userInfo.username===this.state.username && userInfo.password===this.state.password){
      this.props.navigation.navigate("Home");
    }
    else{
      alert('Username or Password is Incorrect');
    }
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
