import React, { Component } from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
  LayoutAnimation,
  Dimensions,
} from 'react-native';

import { Button } from 'react-native-elements';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SWIPE_THRESHOLD = SCREEN_WIDTH / 4;
const FORCE_SWIPE_DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
  }

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
          if (this.state.counter === 0) {
            this.resetPosition();
          } else {
            this.props.onSwipeRight();
            this.forceSwipe('right');
          }
        } else if ( gesture.dx < -SWIPE_THRESHOLD ) {
          this.forceSwipe('left');
          this.props.onSwipeLeft();
        } else {
          this.resetPosition();
        }
      },
    });

    this.panResponder = panResponder;
  }

  componentWillUpdate() {
    LayoutAnimation.linear();
  }

  forceSwipe = (direction) => {
    Animated.timing(this.position, {
      toValue: { x: (direction === 'right' ? 1.5 : -1.5) * SCREEN_WIDTH, y: 0 },
      duration: FORCE_SWIPE_DURATION,
    }).start(() => {
      this.onSwipeComplete(direction);
    });
  }

  onSwipeComplete = (direction) => {
    this.position.setValue({ x: 0, y: 0 });

    // this.setState({ counter: this.state.counter + 1 }) DO NOT TRY THIS AT HOME!
    this.setState(snapShot => ({
      counter: (direction === 'right' ? -1 : 1) + snapShot.counter,
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
      } else {
        return null;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ counter: 0 });
    }
  }

  render() {
    return (
      <View>
        {this.state.counter === this.props.data.length
          ?
            this.props.renderNoMore()
          :
            this.renderCards()
        }
      </View>
    );
  }
}

export default Deck;
