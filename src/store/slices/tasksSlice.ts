import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Task} from '../../types/task';

interface TasksProps {
  taskList: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksProps = {
  taskList: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchAllTask(state, action: PayloadAction<Task[]>) {
      state.taskList = action.payload;
    },
  },
});

export const {fetchAllTask} = tasksSlice.actions;

export default tasksSlice.reducer;
