import React, { Component } from "react";
import {
    Alert,
    AppRegistry,
    Button,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Dialog, ProgressDialog, ConfirmDialog } from "react-native-simple-dialogs";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        flex: 1,
        justifyContent: "center",
    },
    welcomeText: {
        fontSize: 20,
        margin: 10,
        textAlign: "center",
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 25,
        textAlign: "center",
    },
    instructionsText: {
        color: "#333333",
        fontSize: 16,
        marginBottom: 40,
        textAlign: "center",
    },
});

export default class App extends Component {
    state = {}

    openDialog = (show) => {
        this.setState({ showDialog: show });
    }

    openConfirm = (show) => {
        this.setState({ showConfirm: show });
    }


    optionYes = () => {
        this.openConfirm(false);
        // Yes, this is a workaround :(
        // Why? See this https://github.com/facebook/react-native/issues/10471
        setTimeout(
            () => {
                Alert.alert("Confirming: You do not mind rooming with someone that has pets.");
            },
            300,
        );
    }

    optionNo = () => {
        this.openConfirm(false);
        // Yes, this is a workaround :(
        // Why? See this https://github.com/facebook/react-native/issues/10471
        setTimeout(
            () => {
                Alert.alert("Confirming: You are not interested in rooming with someone that has pets.");
            },
            300,
        );
    }

    render() {
        return (
            <View style={ styles.container }>

                <Text style={ styles.exampleText }>
                    Options for editing profile:
                </Text>
                <Button
                    onPress={ () => this.openConfirm(true) }
                    title="Animal Friendly"
                />

                <View style={ { height: 30 } } />

               <Button
                   onPress={ () => this.openDialog(true) }
                    title="Age"
                />
                <View style={ { height: 30 } } />

                <Button
                    onPress={ () => this.openDialog(true) }
                     title="Bio"
                 />
                 <View style={ { height: 30 } } />

                 <Button
                   onPress={ () => this.openDialog(true) }
                    title="Photos"
                 />

                  <View style={ { height: 30 } } />

               <Button
                    onPress={ () => this.openDialog(true) }
                    title="Gender"
                 />

                <View style={ { height: 30 } } />

              <Button
                  onPress={ () => this.openDialog(true) }
                   title="School"
               />
               <View style={ { height: 30 } } />


                <Dialog
                    title="In progress"
                    animationType="fade"
                    contentStyle={
                        {
                            alignItems: "center",
                            justifyContent: "center",
                        }
                    }
                    onTouchOutside={ () => this.openDialog(false) }
                    visible={ this.state.showDialog }
                >

                    <Text style={ { marginVertical: 30 } }>
                        Welcome to this dialog box. Functionality curated to the specific edit profile option coming soon in sprint 3. :-)
                    </Text>
                    <Button
                        onPress={ () => this.openDialog(false) }
                        style={ { marginTop: 10 } }
                        title="CLOSE"
                    />
                </Dialog>

                <ConfirmDialog
                    title="Animal Friendly"
                    message="Are you animal friendly?"
                    onTouchOutside={ () => this.openConfirm(false) }
                    visible={ this.state.showConfirm }
                    negativeButton={
                        {
                            title: "NO",
                            onPress: this.optionNo,
                            // disabled: true,
                            titleStyle: {
                                color: "blue",
                                colorDisabled: "aqua",
                            },
                            style: {
                                backgroundColor: "transparent",
                                backgroundColorDisabled: "transparent",
                            },
                        }
                    }
                    positiveButton={
                        {
                            title: "YES",
                            onPress: this.optionYes,
                        }
                    }
                />

                <ProgressDialog
                    title="Progress Dialog"
                    activityIndicatorColor="blue"
                    activityIndicatorSize="large"
                    animationType="slide"
                    message="Please, wait..."
                    visible={ this.state.showProgress }
                />
            </View>
        );
    }
}

AppRegistry.registerComponent('Sample', () => App);

//__________________________________________________________________________________________________________________________________________________________________________________________________

/*
//before the imports: to add a photo to the custom sialog but this about the text:
 <Image
    source={
        {
            uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fphotos-images%2Ffunny.html&psig=AOvVaw14iIahh7tbekMEgDbOojYR&ust=1585173614950000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKi88v2NtOgCFQAAAAAdAAAAABAD",
        }
    }
    style={
        {
            width: 99,
            height: 87,
            backgroundColor: "black",
            marginTop: 10,
            resizeMode: "contain",
        }
    }
/>



import * as React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import DialogBox from 'react-native-dialogbox';
import ReactNativeSettingsPage, {
	SectionRow,
	NavigateRow,
	CheckRow,
  SliderRow,
  SwitchRow
} from 'react-native-settings-page';
handleOnPress = () => {
        // alert
        this.dialogbox.alert(1);
},
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
*/
