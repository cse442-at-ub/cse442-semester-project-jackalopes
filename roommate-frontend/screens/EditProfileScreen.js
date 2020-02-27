import * as React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { Icon } from 'react-native-elements'

import ReactNativeSettingsPage, {
	SectionRow,
	NavigateRow,
	CheckRow,
  SliderRow,
  SwitchRow
} from 'react-native-settings-page';

export default function EditProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ReactNativeSettingsPage>
        <SectionRow text='Press to view or edit any of the following:'>
          <NavigateRow
            text='Age'
            iconName='clock-o'
            //onPressCallback={this._navigateToScreen}
            />
          <NavigateRow
            text='Bio'
            iconName='arrow-right'
            //onPressCallback={this._navigateToScreen}
            />
          <NavigateRow
            text='Photos'
            iconName='image'
            //onPressCallback={this._navigateToScreen}
            />
          <NavigateRow
            text='Gender'
            iconName='gift'
            //onPressCallback={this._navigateToScreen}
            />
          <NavigateRow
            text='School'
            iconName='exclamation-circle'
            //onPressCallback={this._navigateToScreen}
            />
          </SectionRow>
          <SectionRow text='Toggle on for yes, off for no'>
          <SwitchRow
            text='Animal Friendly'
            iconName='paw'
            _color='#000'
            //_value={this.state.check}
            //_onValueChange={() => { this.setState({ check: !this.state.check }) }}
            />
        </SectionRow>
        <SectionRow text='Nearby residents'>
          <SliderRow
	          navigate
	          text='Range of location'
	          iconName='fa'
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
