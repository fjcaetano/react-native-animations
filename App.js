import React from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animatedPosition: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.sequence([
      Animated.timing(this.state.animatedPosition, {
        toValue: 1,
        duration: 500,
        delay: 500,
        easing: Easing.bounce,
      }),
      Animated.delay(3000),
      Animated.timing(this.state.animatedPosition, {
        toValue: 0,
        duration: 500,
        easing: Easing.in,
      }),
    ]).start()
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.box,
          {
            transform: [{
              translateY: this.state.animatedPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [-77, 0],
              })
            }],
          },
        ]}>
          <Text>Some Error Message</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
