import tasksReducer, {fetchAllTask} from '../src/store/slices/tasksSlice';

describe('tasksSlice', () => {
  const initialState = {
    taskList: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(tasksReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchAllTask', () => {
    const tasks = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        dueDate: '2024-03-05',
      },
    ];
    const newState = tasksReducer(initialState, fetchAllTask(tasks));

    expect(newState.taskList).toEqual(tasks);
    expect(newState.loading).toEqual(false);
    expect(newState.error).toBeNull();
  });
});
