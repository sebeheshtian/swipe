import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Ball, Button } from './src';

class App extends Component {
  state = {
    liked: false,
  }

  onChangeBallStyleClicked = () => {
    this.setState({
      liked: !this.state.liked,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Ball style={this.state.liked ? styles.style1 : styles.style2}/>

        <View style={{ maxHeight: 60 }}>
          <Button clicked={this.onChangeBallStyleClicked}>Change Ball Style</Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  style1: {
    backgroundColor: 'red',
  },
  style2: {
    backgroundColor: 'gray',
  },
}

export default App;
