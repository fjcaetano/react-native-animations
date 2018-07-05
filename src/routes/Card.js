import React from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

class Card extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.box,
        ]}>
          <Text>Hello, World!</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 30,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Card;
