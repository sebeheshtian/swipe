import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
  const { textStyle, buttonContainerStyle } = styles;

  return (
    <TouchableOpacity onPress={props.clicked} style={buttonContainerStyle}>
      <Text style={textStyle}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
  },
  buttonContainerStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
  },
}

export { Button };
