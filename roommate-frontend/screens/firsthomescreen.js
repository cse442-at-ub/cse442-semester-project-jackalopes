import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

export default class App extends React.Component{
  render(){
    return (
      <View style={styles.container}>

        <View style={styles.container}>
        <TouchableOpacity onPress={this.handlPress}>
          <Text style={styles.button}>Login!</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.container}>
        <TouchableOpacity onPress={this.handlPress}>
          <Text style={styles.button2}>signup!</Text>
        </TouchableOpacity>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({



      button: {

    marginTop: '110%',
    padding: 12,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
     alignItems: 'center',

    textAlign:'center',
  },
  button2: {

    marginTop: '2%',
    padding: 12,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
     alignItems: 'center',

    textAlign:'center',
  },

  });
