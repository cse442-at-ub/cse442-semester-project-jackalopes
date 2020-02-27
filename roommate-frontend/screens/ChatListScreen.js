import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

// UI Elements
export default function ChatListScreen({navigation}) {
  const matches = [
    {
      photo: require('../assets/images/aaa.gif'),
      name: "Peter",
      last_message: "Wow please be my roommate",
      id: 1,
    },
    {
      photo: require('../assets/images/aaa.gif'),
      name: "Tristan",
      last_message: "Stay as far away from me as physically possible",
      id: 2,
    },
    {
      photo: require('../assets/images/aaa.gif'),
      name: "Jess",
      last_message: null,
      id: 3,
    },
    {
      photo: require('../assets/images/aaa.gif'),
      name: "Hasan",
      last_message: "You are such an amazing person",
      id: 4,
    },
    {
      photo: require('../assets/images/aaa.gif'),
      name: "Judy",
      last_message: "The aliens are talking to me please don't let them take me",
      id: 5,
    }];
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ScrollView horizontal={true} style={styles.matchesBarContainer}>
        {matches.map( (match) => !match.last_message &&  Match(match))}
      </ScrollView>
      {matches.map( (match) => match.last_message &&  ChatButton(match))}
    </ScrollView>
  );

  function Match(match) {
    return (
      <RectButton key={match.id} style={styles.matchContainer}
            onPress={() => navigation.navigate('Chat', {match: match})}>
        <View style={styles.matchPhotoContainer}>
          <Image style = {styles.matchPhoto}
                 source={match.photo}
          />
        </View>
        <Text style={styles.matchName}>{match.name}</Text>
      </RectButton>
    );
  }

  function ChatButton(match) {
    return (
      <RectButton key={match.id} style={styles.match}
                  onPress={() => navigation.navigate('Chat', {match: match})}>
        <View style={styles.matchPhotoContainer}>
          <Image style = {styles.matchPhoto}
                 source={match.photo}
          />
        </View>
        <View style={styles.matchTextContainer}>
          <Text style={styles.matchNameChat}>{match.name}</Text>
          <Text numberOfLines={1} style={[styles.messageText, {flexDirection: 'column'}]}>
            {match.last_message}
          </Text>
        </View>
      </RectButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  matchPhoto: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  match: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  matchTextContainer: {
    flex: 1,
  },
  lastMatch: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  matchContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
  matchPhotoContainer: {
    width: 48,
    height: 48,
    borderRadius: 50,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  matchName: {
    fontSize: 15,
    marginTop: 1,
  },
  matchNameChat: {
    fontSize: 17,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  messageText: {
    fontSize: 12,
    color: '#8a8a8a',
    marginTop: 1,
  },
  matchesBarContainer: {
    backgroundColor: '#fefefe',
    flexDirection: 'row',
    borderColor: '#fafafa',
    borderBottomWidth: 2,
    padding: 3,
  },
});
