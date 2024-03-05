import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../core/theme';

interface LinkTextProps {
  text: string;
}

const LinkText = ({text}: LinkTextProps) => {
  return (
    <View style={styles.forgotPassword}>
      <TouchableOpacity>
        <Text style={styles.label}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  label: {
    color: theme.colors.secondary,
  },
});

export default LinkText;
