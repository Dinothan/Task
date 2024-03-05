export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  dueDate: string;
  category: string[];
}

export interface TaskListProps {
  TaskList: Task[];
  navigation: any;
  setNewTaskList: () => void;
}
