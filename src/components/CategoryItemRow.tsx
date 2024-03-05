import {StyleSheet, Text, View, Alert} from 'react-native';
import ButtonIcon from './ButtonIcon';
import {theme} from '../core/theme';
import {useState} from 'react';
import AddCategory from './AddCategory';
import {Category} from 'src/types/category';
import firestore from '@react-native-firebase/firestore';

interface ItemProps {
  item: Category;
  refreshCategoryList: () => void;
}

const CategoryItemRow = ({item, refreshCategoryList}: ItemProps) => {
  const [edit, setEdit] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      'Delete Category',
      'Are you sure you want to delete this category?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            firestore()
              .collection('category')
              .doc(item.id.toString())
              .delete()
              .then(() => {
                refreshCategoryList();
                console.log('Document successfully deleted!');
              })
              .catch(error => {
                console.error('Error deleting document: ', error);
                Alert.alert('Error', 'Failed to delete category');
              });
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.itemContainer}>
      {edit ? (
        <AddCategory
          setEdit={() => setEdit(false)}
          categoryObject={item}
          refreshCategoryList={refreshCategoryList}
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
          <ButtonIcon handleonPress={handleDelete} icon={'delete'} />
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
    marginBottom: 10,
  },
});

export default CategoryItemRow;
