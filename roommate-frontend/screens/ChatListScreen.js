import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        photo="md-school"
        name="Peter Gottesman"
        last_message="Hey! Wanna live on my couch and pay half my rent?"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />
    </ScrollView>
  );
}

function OptionButton({ photo, name, last_message, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionPhotoContainer}>
          <Image style = {styles.optionPhoto}
            source={require('../assets/images/robot-prod.png')}
          />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{name}</Text>
          <Text style={styles.messageText}>{last_message}</Text>
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
  optionPhotoContainer: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  optionPhoto: {
    width: null,
    height: null,
    flex: 1,
    resizeMode: 'contain',
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
  messageText: {
    fontSize: 11,
    color: '#aaaaaa',
    marginTop: 1,
  },

});
