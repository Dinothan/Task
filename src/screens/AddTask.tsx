import TextInput from '../components/TextInput';
import React, {useEffect, useState} from 'react';
import Button from '../components/Button';
import Background from '../components/Layout';
import Dropdown from '../components/Picker';
import DatePicker from '../components/DatePicker';
import moment from 'moment';
import ErrorComponent from '../components/Error';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import firestore from '@react-native-firebase/firestore';
import {fetchAllCategory} from '../store/slices/categorySlice';
import {Category} from '../types/category';

const AddTaskScreen = ({navigation, route}: any) => {
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

  const userId = useAppSelector(state => state.auth.userId);
  const dispatch = useAppDispatch();

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

  const {categoryList, loading, error} = useAppSelector(
    state => state.category,
  );

  const _onAddTaskPressed = () => {
    if (!title.trim() && !description.trim()) {
      setErrorMessage('Please enter Title and Description');
      return;
    }
    if (!title.trim()) {
      setErrorMessage('Please enter Title');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Please enter Description');
      return;
    }

    const taskObject = {
      userId,
      title,
      description,
      dueDate: moment(date).format('DD-MM-YYYY'),
      category: selectedValue,
    };

    if (route.params?.task?.id) {
      firestore()
        .collection('tasks')
        .doc(route.params?.task?.id)
        .update(taskObject)
        .then(() => {
          navigation.setParams({task: null});
          console.log('Task added with ID: ');
          navigation.navigate('Task List');
        })
        .catch((error: any) => {
          console.error('Error adding task: ', error);
          setErrorMessage('Error adding task');
        });
    } else {
      firestore()
        .collection('tasks')
        .add(taskObject)
        .then((docRef: {id: any}) => {
          console.log('Task added with ID: ', docRef.id);
          navigation.navigate('Task List');
        })
        .catch((error: any) => {
          console.error('Error adding task: ', error);
          setErrorMessage('Error adding task');
        });
    }
  };

  const handleValueChange = (value: string[]) => {
    setSelectedValue(value);
  };

  //   useEffect(() => {
  //     const removeParams = () => {
  //       navigation.setParams({task: null});
  //     };

  //     const unsubscribe = navigation.addListener('beforeRemove', removeParams);

  //     return unsubscribe;
  //   }, [navigation]);

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
      <Button mode="contained" onPress={_onAddTaskPressed}>
        {route.params?.task?.id ? 'Edit Task' : 'Add Task'}
      </Button>
    </Background>
  );
};
export default AddTaskScreen;
