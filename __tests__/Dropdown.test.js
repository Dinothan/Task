import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Dropdown from '../src/components/Picker';

describe('Dropdown', () => {
  const categories = ['School', 'Work', 'Team'];
  const selectedValues = [];

  it('renders correctly with provided categories', () => {
    const {getByText} = render(
      <Dropdown
        category={categories}
        value={selectedValues}
        onValueChange={() => {}}
      />,
    );
    categories.forEach(category => {
      const categoryText = getByText(category);
      expect(categoryText).toBeDefined();
    });
  });

  it('updates selected values correctly on press', () => {
    const mockOnValueChange = jest.fn();
    const {getByText} = render(
      <Dropdown
        category={categories}
        value={selectedValues}
        onValueChange={mockOnValueChange}
      />,
    );

    const categoryToSelect = categories[0];
    const categoryText = getByText(categoryToSelect);
    fireEvent.press(categoryText);

    expect(mockOnValueChange).toHaveBeenCalledWith([categoryToSelect]);
  });

  it('deselects category if already selected', () => {
    const initialValue = ['School'];
    const mockOnValueChange = jest.fn();
    const {getByText} = render(
      <Dropdown
        category={categories}
        value={initialValue}
        onValueChange={mockOnValueChange}
      />,
    );

    const categoryToDeselect = categories[0];
    const categoryText = getByText(categoryToDeselect);
    fireEvent.press(categoryText);

    expect(mockOnValueChange).toHaveBeenCalledWith([]);
  });
});
