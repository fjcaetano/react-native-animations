import React from 'react';
import { Animated, Button, Easing, StyleSheet, Text, View } from 'react-native';

import MyButton from 'src/components/MyButton';

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

        <MyButton
          title='Card Transition'
          onPress={() => this.props.navigation.navigate('Card')}
          style={styles.button}
        />
        <MyButton
          title='Contextual Transition'
          onPress={() => this.props.navigation.navigate('ButtonView')}
          style={styles.myButton}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
    marginTop: 100,
    width: 200,
  },
  myButton: {
    marginTop: 50,
    width: 200,
  }
});

export default Home;
