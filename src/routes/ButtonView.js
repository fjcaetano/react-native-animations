import React from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import MyButton from 'src/components/MyButton';

const ButtonView = ({ navigation, showButton }) => (
  <View style={styles.container}>
    {showButton && (
      <MyButton
        title='Custom Transition'
        onPress={() => navigation.navigate('OtherView')}
        style={styles.button}
      />
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    marginTop: 100,
  }
});

export default ButtonView;
