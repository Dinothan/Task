import categoryReducer, {
  fetchAllCategory,
} from '../src/store/slices/categorySlice';

describe('categorySlice', () => {
  const initialState = {
    categoryList: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(categoryReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle fetchAllCategory', () => {
    const categories = [
      {id: 1, name: 'Team'},
      {id: 2, name: 'School'},
    ];
    const newState = categoryReducer(
      initialState,
      fetchAllCategory(categories),
    );

    expect(newState.categoryList).toEqual(categories);
    expect(newState.loading).toEqual(false);
    expect(newState.error).toBeNull();
  });
});
