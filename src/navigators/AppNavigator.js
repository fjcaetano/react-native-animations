import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Home from 'src/routes/Home';
import Card from 'src/routes/Card';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Card: { screen: Card },
  },
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 1000,
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const rotateY = position.interpolate({
          inputRange: [index - 0.5, index, index + 0.5],
          outputRange: ['90deg', '0deg', '-90deg'],
          extrapolate: 'clamp',
        });

        return { transform: [{ rotateY }] };
      },
    }),
  }
);

export default AppNavigator;
