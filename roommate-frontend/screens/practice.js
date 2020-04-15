/* THIS IS RANDOM, ME TRYING TO GET USER INPUT TEXT:
<View style={{padding: 10}}>
  <TextInput
    style={{height: 40}}
    placeholder="Type here to translate!"
    onChangeText={(text) => this.setState({text})}
    value={this.state.text}
    />
  <Text style={{padding: 10, fontSize: 42}}>
    {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
  </Text>
</View>
*/
/* THIS IS ONE TRY, THAT WILL GET 3 BARS TO POP UP ON THE SCREEN WTIH DIFFERENT FEATURES
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import ReactNativeSettingsPage, {
	SectionRow,
	NavigateRow,
	CheckRow,
  SliderRow
} from 'react-native-settings-page';

export default function EditProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ReactNativeSettingsPage>
        <SectionRow text='Usage'>
          <NavigateRow
            text='Age'
            iconName='your-icon-name'
            onPressCallback={this._navigateToScreen}
            />
          <CheckRow
            text='Animal Friendly'
            iconName='your-icon-name'
            _color='#000'
            //_value={this.state.check}
            //_onValueChange={() => { this.setState({ check: !this.state.check }) }}
            />
          <SliderRow
	          navigate
	          text='Range of location'
	          iconName='your-icon-name'
	           onPressCallback={() => { console.log('on Body Press (optional)') }}
	           _color='#000'
	           _value={70}
	           _min={0}
	           _max={100}
	           _onValueChange={value => { console.log('value: ' + value) }}
             // TODO: Get it to display the number that it's currently set at
             />
        </SectionRow>
      </ReactNativeSettingsPage>
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
*/
/*THIS WILL PRINT HELLO WORLD TO ME EDIT RPOFILE TabBarIconimport * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function EditProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Hello World!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
*/

/*The place holder page that I want the page underneath what's currently there to look like
and some how save the text from this and update their bio
import * as React from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function UselessTextInput() {
  const [value, onChangeText] = React.useState('Useless Placeholder');

  return (
    <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

*/
