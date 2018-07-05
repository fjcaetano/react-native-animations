import React from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import MyButton from 'src/components/MyButton';

const OtherView = ({ navigation, showButton }) => (
  <View style={styles.container}>
    {showButton && (
      <MyButton
        title='Custom Transition'
        onPress={() => navigation.goBack(null)}
        style={styles.button}
      />
    )}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  button: {
    marginTop: 300,
  }
});

export default OtherView;
