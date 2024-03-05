import {useState} from 'react';
import Button from './Button';
import TextInput from './TextInput';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet, View} from 'react-native';
import {Category} from '../types/category';

interface AddCategoryProps {
  setNewCategory: () => void;
  categoryObject?: Category;
  setEdit?: () => void;
}

const AddCategory = ({
  setNewCategory,
  categoryObject,
  setEdit,
}: AddCategoryProps) => {
  const [category, setCategory] = useState(categoryObject?.name ?? '');
  const [errorMessage, setErrorMessage] = useState('');

  const onSaveCategory = () => {
    if (!category.trim()) {
      setErrorMessage('Please enter Category');
      return;
    }

    if (categoryObject?.name) {
      firestore()
        .collection('category')
        .doc(categoryObject.id.toString())
        .update({name: category})
        .then(() => {
          setNewCategory();
          setEdit && setEdit();
        })
        .catch((error: any) => {
          console.error('Error adding category: ', error);
          setErrorMessage('Error adding category');
        });
    } else {
      firestore()
        .collection('category')
        .add({name: category})
        .then((docRef: {id: any}) => {
          setNewCategory();
          setCategory('');
        })
        .catch((error: any) => {
          console.error('Error adding category: ', error);
          setErrorMessage('Error adding category');
        });
    }
  };

  return (
    <View style={styles.addContainer}>
      <View style={styles.input}>
        <TextInput
          label="Category"
          value={category}
          onChangeText={setCategory}
          error={!!errorMessage}
          errorText={errorMessage}
        />
      </View>
      <View style={styles.button}>
        <Button onPress={onSaveCategory}>
          {categoryObject?.name ? 'Edit' : 'Add'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '50%',
    marginRight: 5,
  },
  button: {
    width: '35%',
  },
});

export default AddCategory;
