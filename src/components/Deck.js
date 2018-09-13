import React, { Component } from 'react';
import {
  View,
  Text,
  PanResponder,
  Animated,
} from 'react-native';

import { Button } from 'react-native-elements';

class Deck extends Component {
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        // console.log('gesture: ', gesture);
        this.position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: () => {},
    });

    this.panResponder = panResponder;
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            style={this.position.getLayout()}
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