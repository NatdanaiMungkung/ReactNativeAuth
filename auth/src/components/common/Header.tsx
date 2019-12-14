import React from 'react';
import { Text,View } from 'react-native';

 const Header = (props) => {
  const {textStyle,viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
      </View>
  ); 
}

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingTop: 25,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height:200},
    shadowOpacity: 1,
    elevation: 18,
  },
  textStyle: {
    fontSize: 20
  }
};

export {Header}