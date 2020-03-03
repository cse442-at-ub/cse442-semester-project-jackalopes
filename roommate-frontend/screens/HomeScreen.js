import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const demoData = [{
  "id": 1,
  "full_name": "Matthew Hertz",
  "picture": "https://cse.buffalo.edu/~mhertz/MatthewPhoto.jpg"
}, {
  "id": 2,
  "full_name": "Lorin Demsey",
  "picture": "https://cse.buffalo.edu/~mhertz/MatthewPhoto.jpg"
}, {
  "id": 3,
  "full_name": "Naoma Atwood",
  "picture": "https://cse.buffalo.edu/~mhertz/MatthewPhoto.jpg"
}, {
  "id": 4,
  "full_name": "Chrisse Poe",
  "picture": "https://cse.buffalo.edu/~mhertz/MatthewPhoto.jpg"
}, {
  "id": 5,
  "full_name": "Alphard Reape",
  "picture": "https://cse.buffalo.edu/~mhertz/MatthewPhoto.jpg"
}]

const pageBackground = '#4FD0E9'

const CircleButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 50,
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      elevation: 2
    }}
  >
    {children}
  </TouchableOpacity>
)

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: demoData,
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0
    }
  }

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Image style={{ width: '100%', height: '100%' }} source={{ uri: card.picture }}/>
        <View style={styles.cardText}>
          <Text style={styles.text}>{card.full_name}</Text>
          <Text>$500 - 4 bed, 4 bath</Text>
        </View>
      </View>
    )
  };

  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  render() {
    const { cards, cardIndex, swipedAllCards } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Swiper
            ref={swiper => {
              this.swiper = swiper
            }}
            style={styles.swiper}
            onSwiped={() => this.onSwiped('general')}
            onSwipedLeft={() => this.onSwiped('left')}
            onSwipedRight={() => this.onSwiped('right')}
            onSwipedTop={() => this.onSwiped('top')}
            onSwipedBottom={() => this.onSwiped('bottom')}
            onTapCard={this.swipeLeft}
            cards={cards}
            cardIndex={cardIndex}
            cardVerticalMargin={20}
            renderCard={this.renderCard}
            onSwipedAll={this.onSwipedAllCards}
            cardStyle={{
              height: "95%"
            }}
            backgroundColor={pageBackground}
            stackSize={3}
            stackSeparation={15}
            animateCardOpacity
          />
        </View>
        <View style={styles.buttons}>
          <CircleButton onPress={() => !swipedAllCards && this.swiper.swipeLeft()}>
            <Ionicons
              name="md-close"
              size={30}
              style={{ marginBottom: -3 }}
              color="#990000"
            />
          </CircleButton>
          <CircleButton onPress={() => !swipedAllCards && this.swiper.swipeRight()}>
            <Ionicons
              name="md-home"
              size={30}
              style={{ marginBottom: -3 }}
              color="#009900"
            />
          </CircleButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pageBackground
  },
  swiper: {
    marginTop: 32
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 10,
  },
  pickButton: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2
  },
  image: {
    flex: 1
  },
  cardText: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, .80);',
    paddingLeft: 5,
    paddingBottom: 5
  },
  text: {
    textAlign: 'left',
    fontSize: 35,
  }
})
