import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton, ButtonProps} from 'react-native-paper';
import {theme} from '../core/theme';

interface CustomButtonProps extends ButtonProps {
  mode?: 'text' | 'outlined' | 'contained'; // Define valid button modes
}

const Button: React.FC<CustomButtonProps> = ({
  mode = 'contained',
  style,
  children,
  disabled,
  ...props
}) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && {backgroundColor: theme.colors.surface},
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    disabled={disabled}
    {...props}>
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default Button;
