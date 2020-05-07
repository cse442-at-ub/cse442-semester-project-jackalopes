import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ConfirmDialog } from "react-native-simple-dialogs";
import { determineURL } from '../utils'


// UI Elements
export default class ChatListScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      matches: [],
      token: null
    }
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.reloadMessages()
    });

    this.reloadMessages()
  }
  reloadMessages = async () => {
    const token = this.state.token || await SecureStore.getItemAsync('token')
    fetch(`${determineURL()}/api/v1/user/matches/`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      })
    })
      .then(response => response.json())
      .then(json => {
        const myUserId = json.id;
        this.setState({
          matches: json.matches.map(group => {
            if (group.user_one[0].id === myUserId) {
              return group.user_one[0]
            } else if (group.user_two[0].id === myUserId) {
              return group.user_two[0]
            }
          }), token
        })
      })
  }
  onDeleteClick = (clickedMatch) => {
    this.setState({
      confirmVisible: true,
      currentClick: clickedMatch
    })
  }
  unmatchPerson = async () => {
    const { currentClick, token } = this.state
    const sessionToken = token || await SecureStore.getItemAsync('token')
    fetch(`${determineURL()}/api/v1/user/matches/`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionToken}`
      }),
      body: JSON.stringify({
        match_user_id: currentClick
      })
    })
      .then(response => response.json())
      .then(() => {
        this.setState({
          confirmVisible: false,
          currentClick: null
        })
        this.reloadMessages()
      })
  }
  render() {
    const { navigation } = this.props
    const { matches } = this.state

    console.log(matches)

    return (
      <React.Fragment>
        <ConfirmDialog
          title="Confirm Unmatch"
          message="Are you sure you want to unmatch with this potential roommate?"
          visible={this.state.confirmVisible}
          onTouchOutside={() => this.setState({ confirmVisible: false, currentClick: null })}
          positiveButton={{
            title: "YES",
            onPress: () => this.unmatchPerson()
          }}
          negativeButton={{
            title: "NO",
            onPress: () => this.setState({ confirmVisible: false, currentClick: null })
          }}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <ScrollView horizontal={true} style={styles.matchesBarContainer}>
            {/* {matches.map((match) => !match.last_message && Match(match))} */}
            {Match({
              picture_url: require('../assets/images/aaa.gif'),
              name: "New Matches",
              id: -1,
            })}
          </ScrollView>
          {matches.map((match) => ChatButton(match, this.onDeleteClick))}
        </ScrollView>
      </React.Fragment>
    );

    function Match(match) {
      return (
        <RectButton key={match.id} style={styles.matchContainer}
          onPress={() => navigation.navigate('Chat', { match: match })}>
          <View style={styles.matchPhotoContainer}>
            <Image style={styles.matchPhoto}
              source={match.picture_url}
            />
          </View>
          <Text style={styles.matchName}>{match.name}</Text>
        </RectButton>
      );
    }

    function ChatButton(match, onDeleteClick) {
      return (
        <TouchableOpacity key={match.id} onPress={() => navigation.navigate('Chat', { match: match })} onLongPress={() => onDeleteClick(match.id)}>
          <RectButton style={styles.match}
          >
            <View style={styles.matchPhotoContainer}>
              <Image style={styles.matchPhoto}
                source={{ uri: match.picture_url }}
              />
            </View>
            <View style={styles.matchTextContainer}>
              <Text style={styles.matchNameChat}>{`${match.first_name} ${match.last_name}`}</Text>
              <Text numberOfLines={1} style={[styles.messageText, { flexDirection: 'column' }]}>
                Click to view messages with {match.first_name} {match.last_name}!
            </Text>
            </View>
          </RectButton>
        </TouchableOpacity>
      );
    }
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
