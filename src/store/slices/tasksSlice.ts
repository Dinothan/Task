import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task} from '../../types/task';

export interface TasksProps {
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
    updateTask(state, action: PayloadAction<Task[]>) {
      state.taskList = action.payload;
    },
  },
});

export const {fetchAllTask, updateTask} = tasksSlice.actions;

export default tasksSlice.reducer;
