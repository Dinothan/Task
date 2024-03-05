import {StyleSheet, Text, View} from 'react-native';
import ButtonIcon from './ButtonIcon';
import {theme} from '../core/theme';
import {useState} from 'react';
import TextInput from './TextInput';
import AddCategory from './AddCategory';
import {Category} from 'src/types/category';
import firestore from '@react-native-firebase/firestore';

interface ItemProps {
  item: Category;
  setNewCategory: () => void;
}
const CategoryItemRow = ({item, setNewCategory}: ItemProps) => {
  const [edit, setEdit] = useState(false);

  const onhandleDelete = () => {
    firestore()
      .collection('category')
      .doc(item.id.toString())
      .delete()
      .then(() => {
        setNewCategory();
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('Error deleting document: ', error);
      });
  };

  return (
    <View style={styles.itemContainer}>
      {edit ? (
        <AddCategory
          setEdit={() => setEdit(false)}
          categoryObject={item}
          setNewCategory={setNewCategory}
        />
      ) : (
        <>
          <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <ButtonIcon
            handleonPress={() => setEdit(true)}
            icon={'playlist-edit'}
          />
          <ButtonIcon handleonPress={onhandleDelete} icon={'delete'} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.surfaceVariant,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 6,
    borderRadius: 12,
    width: '75%',
  },
  title: {
    fontSize: 20,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryItemRow;
