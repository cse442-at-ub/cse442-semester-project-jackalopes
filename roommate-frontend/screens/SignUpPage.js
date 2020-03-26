import React from 'react';
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppContext from '../constants/AppContext.js';

export default class SignUp extends React.Component {
  static contextType = AppContext;

  state = {
    full_name: '', username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  static navigationOptions = {
    header: null
  };
  render() {
    //const { navigate } = this.props.navigation;
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
        <TextInput
          style={styles.input}
          placeholder='Full Name'
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('full_name', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Phone Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <TouchableOpacity onPress={() => this.context.signup(this.state)}>
          <Text style={styles.button}> Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#87cefa',
    margin: 10,
    padding: 15,
    color: 'white',
    borderRadius: 30,
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    width: 350,
    height: 55,
    backgroundColor: '#ff00ff',
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: '#fff',
    color: 'white',
    //borderRadius: 50,
    fontSize: 18,
    fontWeight: '500',
    overflow: 'hidden',
    padding: 15,
    textAlign: 'center'
  }
})
