import React, {ReactNode} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {theme} from '../core/theme';

interface HeaderProps {
  children: ReactNode;
  style?: TextStyle;
}

const Header: React.FC<HeaderProps> = ({children, style}) => (
  <Text style={[styles.header, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default Header;
