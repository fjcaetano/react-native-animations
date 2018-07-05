import { Animated, Easing } from 'react-native';
import {
  createStackNavigator,
  createNavigationContainer,
  createNavigator,
  StackRouter
} from 'react-navigation';

import Home from 'src/routes/Home';
import Card from 'src/routes/Card';
import ButtonView from 'src/routes/ButtonView';
import OtherView from 'src/routes/OtherView';

import NavigationTransitioner from './NavigationTransitioner';

const router = StackRouter({
  ButtonView: { screen: ButtonView },
  OtherView: { screen: OtherView },
});

const MyNavigator = createNavigator(NavigationTransitioner, router);

const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Card: { screen: Card },
    ButtonView: { screen: MyNavigator },
  },
  {
    transitionConfig: ({ scenes }) => ({
      transitionSpec: {
        duration: scenes.length < 2 || scenes[1].route.routeName !== 'Card' ? 500 : 1000,
        timing: Animated.timing,
        easing: Easing.in,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene, scenes } = sceneProps;
        if (scenes.length < 2 || scenes[1].route.routeName !== 'Card') {
          return forHorizontal(sceneProps);
        }

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

function forInitial(props: NavigationSceneRendererProps): Object {
  const { navigation, scene } = props;

  const focused = navigation.state.index === scene.index;
  const opacity = focused ? 1 : 0;
  const translate = focused ? 0 : 1000000;
  return {
    opacity,
    transform: [{ translateX: translate }, { translateY: translate }],
  };
}

export function forHorizontal(props: NavigationSceneRendererProps): Object {
  const { layout, position, scene } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];

  const width = layout.initWidth;
  const outputRange = [width, 0, -10];

  const opacity = position.interpolate({
    inputRange: ([
      index - 1,
      index - 0.99,
      index,
      index + 0.99,
      index + 1,
    ]: Array<number>),
    outputRange: ([0, 1, 1, 0.3, 0]: Array<number>),
  });

  const translateY = 0;
  const translateX = position.interpolate({
    inputRange,
    outputRange,
  });

  return {
    opacity,
    transform: [{ translateX }, { translateY }],
  };
}

export default AppNavigator;
