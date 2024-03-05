import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {fetchAllCategory} from '../store/slices/categorySlice';
import {Category} from '../types/category';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {FlatList} from 'react-native-gesture-handler';
import {ScrollView, StyleSheet} from 'react-native';
import AddCategory from '../components/AddCategory';
import Header from '../components/Header';
import Background from '../components/Layout';
import CategoryItemRow from '../components/CategoryItemRow';
import Spinner from '../components/Spinner';

const CategoryScreen = ({navigation}: any) => {
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

  const setNewCategory = () => {
    getCategoryist();
  };

  return (
    <Background>
      <AddCategory setNewCategory={setNewCategory} />
      <Header>Category List</Header>
      {loading ? (
        <Spinner />
      ) : (
        <ScrollView style={styles.listContainer}>
          <FlatList
            data={categoryList}
            renderItem={({item}) => (
              <CategoryItemRow item={item} setNewCategory={setNewCategory} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </ScrollView>
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
});

export default CategoryScreen;
