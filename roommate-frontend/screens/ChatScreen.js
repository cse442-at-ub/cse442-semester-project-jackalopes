import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet  } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

import { determineURL } from '../utils'

export default class ChatScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      matchID: props.route.params.match.id,
      currentID: null
    };
  }

  componentDidMount = () => {
    this.reloadMessages()
  }

  reloadMessages = async () => {

    const { matchID } = this.state
    const sessionToken = await SecureStore.getItemAsync('token')

    fetch(`${determineURL()}/api/v1/messages?match_id=${matchID}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionToken}`
      })
    })
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        const { messages } = json

        this.setState({
          currentID: json.id,
          messages: messages.map(m => ({
            _id: m.id,
            text: m.msg_content,
            user: {
              _id: m.sender.id,
              name: m.sender.first_name,
              avatar: m.sender.picture_url
            },
          }))
        })
      })
  }

  onSend = async (messages = []) => {
    const { matchID } = this.state
    const sessionToken = await SecureStore.getItemAsync('token')

    fetch(`${determineURL()}/api/v1/messages/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionToken}`
      }),
      body: JSON.stringify({
        match_id: matchID,
        content: messages[0].text
      })
    })
      .then(response => response.json())
      .then(() => {
        this.reloadMessages()
      })
    }
  
  render() {
    const { currentID, messages } = this.state
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => this.onSend(messages)}
        user={{ _id: currentID, }}
        inverted={false}
      />
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
