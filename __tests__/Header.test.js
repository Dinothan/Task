import React from 'react';
import {render} from '@testing-library/react-native';
import Header from '../src/components/Header';

describe('Header', () => {
  it('renders correctly with children', () => {
    const {getByText} = render(<Header>Task Management</Header>);
    const headerText = getByText('Hello World');
    expect(headerText).toBeDefined();
  });

  it('renders correctly with custom style', () => {
    const customStyle = {
      fontSize: 30,
      color: 'blue',
      fontWeight: 'normal',
      paddingVertical: 10,
    };
    const {getByText} = render(
      <Header style={customStyle}>Custom Header</Header>,
    );
    const headerText = getByText('Custom Header');
    expect(headerText).toBeDefined();
  });
});
