import React, { Component } from 'react';
import { View, Text } from 'react-native';

const Ball = (props) => {
  console.log(props);
  return (
    <View style={[styles.ball, props.style]} />
  );
}

const styles = {
  ball: {
    borderRadius: 30,
    height: 60,
    width: 60,
    borderColor: 'rgb(85, 20, 224)',
    backgroundColor: 'rgb(85, 20, 224)',
  }
}

export { Ball };
