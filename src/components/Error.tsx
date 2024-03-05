import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ErrorProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorProps> = ({message}) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 10,
  },
  message: {
    color: 'white',
  },
});

export default ErrorComponent;
