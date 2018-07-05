import React from 'React';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MyButton = ({ onPress, title, style }) => (
  <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

MyButton.defaultProps = {
  style: undefined,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    minWidth: 70,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyButton;
