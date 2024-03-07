import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Background from '../components/Layout';
import TaskListComponent from '../components/TaskList';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import Spinner from '../components/Spinner';
import ErrorComponent from '../components/Error';
import {fetchAllTask, updateTask} from '../store/slices/tasksSlice';
import {Task} from '../types/task';
import Header from '../components/Header';
import {fetchAllCategory} from '../store/slices/categorySlice';
import {Category} from '../types/category';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.userId);

  const getTaskList = useCallback(async () => {
    setLoading(true);
    const tasks = await firestore().collection('tasks').get();
    const taskArray = tasks.docs
      .filter(res => userId === res.data().userId)
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    setLoading(false);
    dispatch(fetchAllTask(taskArray as unknown as Task[]));
  }, [dispatch, userId]);

  const getCategoryList = useCallback(async () => {
    const category = await firestore().collection('category').get();
    const categoryArray = category.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(fetchAllCategory(categoryArray as unknown as Category[]));
  }, [dispatch]);

  useEffect(() => {
    getTaskList();
    getCategoryList();
  }, [getTaskList, getCategoryList]);

  const {taskList, error} = useAppSelector(state => state.tasks);
  const {categoryList} = useAppSelector(state => state.category);

  const filteredTasks = useMemo(() => {
    return categoryList
      .map(item => item.name)
      .map(cat => ({
        title: cat,
        data: taskList.filter(
          task =>
            Array.isArray(task?.category) &&
            task.category.some(c => c.toLowerCase() === cat.toLowerCase()),
        ),
      }));
  }, [categoryList, taskList]);

  const handleTaskCompletion = useCallback(
    (id: string) => {
      const task = taskList.find(task => task.id.toString() === id);

      if (task) {
        const updatedTask = {
          ...task,
          status: !task?.status,
        };
        dispatch(
          updateTask([
            ...taskList.filter(task => task.id.toString() !== id),
            updatedTask,
          ]),
        );
      }
    },
    [dispatch, taskList],
  );

  return (
    <ScrollView>
      {loading ? (
        <Spinner />
      ) : (
        <Background>
          {error && <ErrorComponent message={error} />}
          {filteredTasks.map(res => (
            <View key={res.title} style={styles.listContainer}>
              <Header children={res.title} />
              {res.data.length > 0 && (
                <TaskListComponent
                  TaskList={res.data}
                  navigation={navigation}
                  setNewTaskList={getTaskList}
                  handleTaskCompletion={handleTaskCompletion}
                />
              )}
            </View>
          ))}
        </Background>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    flex: 1,
  },
});

export default HomeScreen;
