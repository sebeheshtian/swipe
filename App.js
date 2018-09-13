import React, { Component } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';

import { Ball, Button } from './src';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class App extends Component {
  componentWillMount() {
    this.firstBallStyle = new Animated.ValueXY(0, 0);
    this.seconsBallStyle = new Animated.ValueXY(0, 0);
  }

  onFirstClicked = () => {
    Animated.spring(this.firstBallStyle, {
      toValue: { x: 0, y: SCREEN_HEIGHT * 0.5 }
    }).start();
  }

  onSecondClicked = () => {
    Animated.spring(this.seconsBallStyle, {
      toValue: { x: -60, y: SCREEN_HEIGHT * 0.8 }
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Animated.View style={this.firstBallStyle.getLayout()}>
            <Ball />
          </Animated.View>

          <Animated.View style={this.seconsBallStyle.getLayout()}>
            <Ball />
          </Animated.View>
        </View>

        <Button
          style={{ maxHeight: 60, maxWidth: 200 }}
          clicked={this.onFirstClicked}>First Ball</Button>
        <Button
          style={{ maxHeight: 60, maxWidth: 200 }}
          clicked={this.onSecondClicked}>Second Ball</Button>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
}

export default App;
