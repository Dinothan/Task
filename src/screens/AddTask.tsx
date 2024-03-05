import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {fetchAllCategory} from '../store/slices/categorySlice';
import {Category} from '../types/category';
import Background from '../components/Layout';
import Button from '../components/Button';
import DatePicker from '../components/DatePicker';
import Dropdown from '../components/Picker';
import ErrorComponent from '../components/Error';
import TextInput from '../components/TextInput';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const AddTaskScreen = ({navigation, route}: any) => {
  // State variables
  const [title, setTitle] = useState(route.params?.task?.title ?? '');
  const [description, setDescription] = useState(
    route.params?.task?.description ?? '',
  );
  const [date, setDate] = useState(
    route.params?.task?.dueDate
      ? moment(route.params?.task?.dueDate, 'DD-MM-YYYY').toDate()
      : new Date(),
  );
  const [selectedValue, setSelectedValue] = useState<string[]>(
    route.params?.task?.category ?? [],
  );
  const [errorMessage, setErrorMessage] = useState('');

  // Redux hooks
  const userId = useAppSelector(state => state.auth.userId);
  const dispatch = useAppDispatch();
  const {categoryList} = useAppSelector(state => state.category);

  // Fetch categories
  useEffect(() => {
    const getCategoryList = async () => {
      const categorySnapshot = await firestore().collection('category').get();
      const categoryData = categorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(fetchAllCategory(categoryData as unknown as Category[]));
    };
    getCategoryList();
  }, []);

  // Function to handle task addition or update
  const handleTaskAction = () => {
    // Validations
    if (!title.trim() || !description.trim()) {
      setErrorMessage('Please enter Title and Description');
      return;
    }

    const taskObject = {
      userId,
      title,
      description,
      dueDate: moment(date).format('DD-MM-YYYY'),
      category: selectedValue,
    };

    // Add or update task
    const tasksCollection = firestore().collection('tasks');
    if (route.params?.task?.id) {
      tasksCollection
        .doc(route.params?.task?.id)
        .update(taskObject)
        .then(() => {
          navigation.setParams({task: null});
          navigation.navigate('Task List');
        })
        .catch(error => {
          console.error('Error updating task: ', error);
          setErrorMessage('Error updating task');
        });
    } else {
      tasksCollection
        .add(taskObject)
        .then(() => {
          navigation.navigate('Task List');
        })
        .catch(error => {
          console.error('Error adding task: ', error);
          setErrorMessage('Error adding task');
        });
    }
  };

  // Handler for category selection change
  const handleValueChange = (value: string[]) => {
    setSelectedValue(value);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      navigation.setParams({task: null});
    };
  }, []);

  return (
    <Background>
      {errorMessage && <ErrorComponent message={errorMessage} />}
      <TextInput
        label="Title"
        returnKeyType="next"
        value={title}
        onChangeText={setTitle}
        error={!!errorMessage}
      />
      <TextInput
        label="Description"
        returnKeyType="next"
        value={description}
        onChangeText={setDescription}
        error={!!errorMessage}
      />
      <DatePicker date={date} setDate={setDate} />
      <Dropdown
        category={categoryList.map(item => item.name)}
        value={selectedValue}
        onValueChange={handleValueChange}
      />
      <Button mode="contained" onPress={handleTaskAction}>
        {route.params?.task?.id ? 'Edit Task' : 'Add Task'}
      </Button>
    </Background>
  );
};

export default AddTaskScreen;
