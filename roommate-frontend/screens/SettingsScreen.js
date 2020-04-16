
import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput,  Alert, AppRegistry, Button, Image, TouchableOpacity} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import ReactNativeSettingsPage, {
  NavigateRow,
  SectionRow,
  SwitchRow,
  CheckRow,
  SliderRow
} from 'react-native-settings-page';
import { RectButton, ScrollView, Dialog, ProgressDialog, ConfirmDialog} from 'react-native-gesture-handler';
//import { Dialog, ProgressDialog, ConfirmDialog } from "react-native-simple-dialogs";
import * as WebBrowser from 'expo-web-browser';


export default class SettingsScreen extends Component {

constructor(props){
    super(props);
    this.state = {
      DialogVisible :false,
    }
  }
   showDialog = () => {
        this.setState({ DialogVisible :true});
    }
    closeDialog(){
      this.setState({  DialogVisible:false });
    }
    submitInput()	{
            this.setState({ DialogVisible:false});

    }
  sendInput(inputText){
    if (inputText == null){
      this.closeDialog()}
    console.log("sendInput (EC): "+inputText);
  }
//


  /*state = {
      check: false,
      switch: false,
      value: 40
    };
    _navigateToScreen = () => {
      const { navigation } = this.props;
      //navigation.navigate('Your-Screen-Name');
    };*/

    render(){
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <View style={styles.container}>

      </View>

 <ReactNativeSettingsPage>

 <View style={styles.container}>
      </View>

<DialogInput DialogVisible={this.state.DialogVisible}
            title={"Email Change"}
            message={"Enter New Email"}
            submitInput={ (inputText) => {this.sendInput(inputText)} }
            closeDialog={ () => {this.closeDialog()}}>
<DialogInput.Button label="Cancel" onPress={this.closeDialog} />
          <DialogInput.Button label="Delete" onPress={this.closeDialog} />

</DialogInput>

        <SectionRow text='Account Settings'>
          <NavigateRow
            text='Phone Number'
            iconName='phone'
            /*onPressCallback={this._navigateToScreen}*/
          />
          <NavigateRow
            text='Email'
            iconName='envelope'
            /*onPressCallback={this._navigateToScreen}*/
          />

          <Button
              text='Email'
            iconName='envelope'
                  onPress={ () =>this.showDialog()}
                   title="Change EMail"
               />


        </SectionRow>

        <SectionRow text='Discovery'>
          <NavigateRow
            text='Location'
            iconName='map-marker'
            /*onPressCallback={this._navigateToScreen}*/
          />
          <SliderRow
            text="Maximum Distance"
            iconName="location-arrow"
            _color="#dc143c"
            _min={0}
            _max={100}
            /*_value={this.state.value}
            _onValueChange={value => {
              this.setState({ value });
            }} */
          />
          <NavigateRow
              text='Show Me'
            iconName='users'
            /*onPressCallback={this._navigateToScreen}*/
          />
          <SliderRow
            text="Age Range"
            iconName="hashtag"
            _color="#dc143c"
            _min={18}
            _max={100}
            /*_value={this.state.value}
            _onValueChange={value => {
              this.setState({ value });
            }}*/
          />

        </SectionRow>

        <SectionRow text="Usage">
          <SwitchRow
             text="Show Me on Finder"
             /* Change Finder to App Name*/
             iconName="user-secret"
           /*_value={this.state.switch}
           _onValueChange={() => {
             this.setState({ switch: !this.state.switch });
           }}*/
          />
        </SectionRow>

        <SectionRow text="Notifications">
          <SwitchRow
             text="Push Notifications"
             /* Change Finder to App Name*/
             iconName="user-secret"
           /*_value={this.state.switch}
           _onValueChange={() => {
             this.setState({ switch: !this.state.switch });
           }}*/
          />
        </SectionRow>
      </ReactNativeSettingsPage>
    </ScrollView>
  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Fafafa',
  },
  contentContainer: {
    paddingTop: 15,
    fontSize: 16,

  },

});
