import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Background from '../components/Layout';
import TaskListComponent from '../components/TaskList';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import Spinner from '../components/Spinner';
import ErrorComponent from '../components/Error';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {fetchAllTask} from '../store/slices/tasksSlice';
import {Task} from '../types/task';
import Header from '../components/Header';
import {fetchAllCategory} from '../store/slices/categorySlice';
import {Category} from '../types/category';

const HomeScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.userId);

  const getTaskList = async () => {
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
  };
  useEffect(() => {
    getTaskList();
    // console.log('taskArray: ', JSON.stringify(taskArray));
    // const tasks = await firestore().collection('tasks');

    // console.log('tasks: ', tasks);

    //   .then(doc => {
    //     if (doc.exists) {
    //       console.log('User data:', doc.data());
    //     } else {
    //       console.log('No such document!');
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error getting user data: ', error);
    //   });
  }, []);

  const getCategoryist = async () => {
    const category = await firestore().collection('category').get();

    const taskArray = category.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(fetchAllCategory(taskArray as unknown as Category[]));
  };

  useEffect(() => {
    getCategoryist();
  }, []);

  const {taskList, error} = useAppSelector(state => state.tasks);

  const {categoryList} = useAppSelector(state => state.category);

  const filteredTasks = categoryList
    .map(item => item.name)
    .map(cat => ({
      title: cat,
      data: taskList.filter(
        task =>
          Array.isArray(task.category) &&
          task.category.some(c => c.toLowerCase() === cat.toLowerCase()),
      ),
    }));

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
                  setNewTaskList={() => getTaskList()}
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
