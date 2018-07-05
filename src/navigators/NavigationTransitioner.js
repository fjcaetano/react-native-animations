import React from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { Transitioner } from 'react-navigation';

import MyButton from 'src/components/MyButton';

const indexOfScreenWithButton = 0;

class NavigationTransitioner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: true,
    };
  }

  configureTransition = () => ({
    duration: 500,
  });
  
  renderTransition = (transitionProps) => {  
    const buttonYPosition = transitionProps.position.interpolate({
      inputRange: [indexOfScreenWithButton, indexOfScreenWithButton+1],
      outputRange: [100, 300],
      extrapolate: 'clamp',
    });
    const buttonLeft = transitionProps.progress.interpolate({
        inputRange: [0, 0.999999, 1],
        outputRange: [0, 0, 100000],
    });
  
    return (
      <View style={styles.container}>
        {
          transitionProps.scenes.map(
            this.renderScene(transitionProps)
          )
        }
        <Animated.View
          style={{
            transform: [{ translateY: buttonYPosition }],
            left: buttonLeft,
          }}
        >
          <MyButton
            title='Custom Transition'
            style={styles.button}
            onPress={() => console.log('ops')}
          />
        </Animated.View>
      </View>
    );
  }
    
  renderScene = ({ position }) => ({ index, route }) => {
    const { navigation } = this.props;
    const opacity = position.interpolate({
      inputRange: [index-1, index, index+1],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });
  
    const Scene = navigation.router.getComponentForRouteName(route.routeName);
    return (
      <Animated.View style={[styles.sceneContainer, { opacity }]} key={route.key}>
        <Scene navigation={navigation} showButton={this.state.showButton} />
      </Animated.View>
    );
  };

  render() {
    return (
      <Transitioner
        configureTransition={this.configureTransition}
        navigation={this.props.navigation}
        render={this.renderTransition}
        onTransitionStart={() => this.setState({ showButton: false })}
        onTransitionEnd={() => this.setState({ showButton: true })}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  sceneContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    // backgroundColor: 'red',
  },
});

export default NavigationTransitioner;
