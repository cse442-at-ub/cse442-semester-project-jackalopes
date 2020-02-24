import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View } from 'react-native'

// demo purposes only
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

const pageBackground = '#4FD0E9'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [...range(1, 50)],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0
    }
  }

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{card} - {index}</Text>
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
            cards={this.state.cards}
            cardIndex={this.state.cardIndex}
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
          <Button style={styles.pickButton} title="Hi there" />
          <Button style={styles.pickButton} title="Hi there" />
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
    borderRadius: 50/2
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  }
})
