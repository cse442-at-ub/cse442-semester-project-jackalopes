import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactNativeSettingsPage, {
  NavigateRow,
  SectionRow,
  SwitchRow,
  CheckRow,
  SliderRow
} from 'react-native-settings-page';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function SettingsScreen() {
  /*state = {
      check: false,
      switch: false,
      value: 40
    };
    _navigateToScreen = () => {
      const { navigation } = this.props;
      //navigation.navigate('Your-Screen-Name');
    };*/
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ReactNativeSettingsPage>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
});
