import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import TaskListComponent from '../src/components/TaskList';

const mockTaskList = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    dueDate: '2024-03-05',
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Description 2',
    dueDate: '2024-03-06',
  },
];

const mockNavigation = {
  navigate: jest.fn(),
};

const mockSetNewTaskList = jest.fn();

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: () => ({
    doc: () => ({
      delete: jest.fn(() => Promise.resolve()),
    }),
  }),
}));

describe('TaskListComponent', () => {
  it('renders task list correctly', () => {
    const {getByText} = render(
      <TaskListComponent
        TaskList={mockTaskList}
        navigation={mockNavigation}
        setNewTaskList={mockSetNewTaskList}
      />,
    );
    mockTaskList.forEach(task => {
      expect(getByText(task.title)).toBeDefined();
      expect(getByText(`Description: ${task.description}`)).toBeDefined();
      expect(getByText(`Due Date: ${task.dueDate}`)).toBeDefined();
    });
  });

  it('navigates to Add Task screen when edit button is pressed', () => {
    const {getByLabelText} = render(
      <TaskListComponent
        TaskList={mockTaskList}
        navigation={mockNavigation}
        setNewTaskList={mockSetNewTaskList}
      />,
    );
    fireEvent.press(getByLabelText('Edit Task Task 1'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home', {
      screen: 'Add Task',
      params: {task: mockTaskList[0]},
    });
  });

  it('deletes task when delete button is pressed', async () => {
    const {getByLabelText} = render(
      <TaskListComponent
        TaskList={mockTaskList}
        navigation={mockNavigation}
        setNewTaskList={mockSetNewTaskList}
      />,
    );
    fireEvent.press(getByLabelText('Delete Task Task 1'));
    // Wait for Firestore deletion to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(mockSetNewTaskList).toHaveBeenCalled();
  });
});
