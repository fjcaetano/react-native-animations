import React from 'react';
import { Animated, Button, Easing, StyleSheet, Text, View } from 'react-native';

class Home extends React.Component {
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
    ])
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.toast,
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

        <Button
          onPress={() => this.props.navigation.navigate('Card')}
          title="PRESS ME"
          style={styles.button}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toast: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 30,
    marginTop: 300,
  },
});

export default Home;
