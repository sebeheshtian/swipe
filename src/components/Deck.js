import React, { Component } from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

import { Button } from 'react-native-elements';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SWIPE_THRESHOLD = SCREEN_WIDTH / 4;
const FORCE_SWIPE_DURATION = 250;

class Deck extends Component {
  constructor(props) {
    super(props);

    this.state={
      counter: 0,
    }

    this.position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // console.log('gesture: ', gesture);
        this.position.setValue({ x: gesture.dx, y: 0 })
      },
      onPanResponderRelease: (event, gesture) => {
        if ( gesture.dx > SWIPE_THRESHOLD ) {
          this.forceSwipe('right');
        } else if ( gesture.dx < -SWIPE_THRESHOLD ) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      },
    });

    this.panResponder = panResponder;
  }

  forceSwipe = (direction) => {
    Animated.timing(this.position, {
      toValue: { x: (direction === 'right' ? 1.5 : -1.5) * SCREEN_WIDTH, y: 0 },
      duration: FORCE_SWIPE_DURATION,
    }).start(() => {
      this.onSwipeComplete();
    });
  }

  onSwipeComplete = () => {
    this.position.setValue({ x: 0, y: 0 });

    this.setState(oldState => ({
      counter: oldState.counter + 1,
    }));
  }

  resetPosition = () => {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 },
    }).start();

    // this.position.setValue({ x: 0, y: 0 })
  }

  getCardStyle() {
    const { position } = this;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...this.position.getLayout(),
      transform: [{ rotate }],
    };
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index < this.state.counter) {
        return null;
      }

      if (index === this.state.counter) {
        return (
          <Animated.View
            style={this.getCardStyle()}
            key={item.id}
            {...this.panResponder.panHandlers}
            >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return this.props.renderCard(item);
    });
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;
