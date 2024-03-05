import {useEffect, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {fetchAllCategory} from '../store/slices/categorySlice';
import {Category} from '../types/category';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import AddCategory from '../components/AddCategory';
import Header from '../components/Header';
import Background from '../components/Layout';
import CategoryItemRow from '../components/CategoryItemRow';
import Spinner from '../components/Spinner';

const CategoryScreen = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  const getCategoryList = useCallback(async () => {
    const category = await firestore().collection('category').get();
    const categoryData = category.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(fetchAllCategory(categoryData as unknown as Category[]));
  }, [dispatch]);

  useEffect(() => {
    getCategoryList();
  }, [getCategoryList]);

  const {categoryList, loading, error} = useAppSelector(
    state => state.category,
  );

  const refreshCategoryList = useCallback(() => {
    getCategoryList();
  }, [getCategoryList]);

  return (
    <Background>
      <AddCategory refreshCategoryList={refreshCategoryList} />
      <Header>Category List</Header>
      {loading ? (
        <Spinner />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={categoryList}
            renderItem={({item}) => (
              <CategoryItemRow
                item={item}
                refreshCategoryList={refreshCategoryList}
              />
            )}
            keyExtractor={item => `category-${item.id}`}
          />
        </View>
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
