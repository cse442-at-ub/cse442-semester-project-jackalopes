import * as React from 'react';
import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { GiftedChat } from 'react-native-gifted-chat';

class ChatModule extends React.Component {
  state = {
    messages: [
      {
        _id: 2,
        text: 'Sample message',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Person',
          avatar: require('../assets/images/aaa.gif'),
        }
      },
    ]
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return(
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{_id: 1,}}
        />
    );
  }
}

// UI Elements
export default function ChatScreen({navigation, route}) {
  return (
    <ChatModule/>
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
