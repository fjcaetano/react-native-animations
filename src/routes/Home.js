import React from 'react';
import {
  Animated,
  Button,
  Easing,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import MyButton from 'src/components/MyButton';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toastPosition: new Animated.Value(0),
      buttonPosition: new Animated.Value(0),
      buttonOpacity: new Animated.Value(1),
    };
  }
  
  startToast = () => {
    Animated.sequence([
      Animated.timing(this.state.toastPosition, {
        toValue: 1,
        duration: 500,
        delay: 500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(this.state.toastPosition, {
        toValue: 0,
        duration: 500,
        easing: Easing.in,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  startSimpleAnimation = () => {
    Animated.timing(this.state.buttonPosition, {
      duration: 1000,
      fromValue: 0.01,
      toValue: 1,
      useNativeDriver: true,
    }).start((() => this.state.buttonPosition.setValue(0)));
  };

  startButtonFadeOut = () =>
    Animated.sequence([
      Animated.timing(this.state.buttonOpacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true
      }),
      Animated.timing(this.state.buttonOpacity, {
        delay: 500,
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start()

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[
          styles.toast,
          {
            transform: [{
              translateY: this.state.toastPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [-37, 0],
              })
            }],
          },
        ]}>
          <Text>I'm a toast! 🍞</Text>
        </Animated.View>

        <Animated.View style={{ opacity: this.state.buttonOpacity }}>
          <MyButton
            title='Fade In'
            onPress={this.startButtonFadeOut}
            style={styles.button}
          />
        </Animated.View>

        <MyButton
          title='Card Transition'
          onPress={() => this.props.navigation.navigate('Card')}
          style={styles.myButton}
        />
        <MyButton
          title='Contextual Transition'
          onPress={() => this.props.navigation.navigate('ButtonView')}
          style={styles.myButton}
        />
        <MyButton
          title="Show Toast"
          onPress={this.startToast}
          style={styles.myButton}
        />
        <Animated.View style={{
          transform: [{
            translateY: this.state.buttonPosition.interpolate({
              inputRange: [0, 0.75, 1],
              outputRange: [0, 100, 0],
            })
          }],
        }}>
          <MyButton
            title="I'll move out of the way"
            onPress={this.startSimpleAnimation}
            style={styles.simple}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toast: {
    paddingVertical: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  button: {
    width: 200,
  },
  myButton: {
    marginTop: 50,
    width: 200,
  },
  simple: {
    marginTop: 50,
    width: 200,
  }
});

export default Home;
