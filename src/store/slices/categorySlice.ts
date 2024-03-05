import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {Category} from '../../types/category';

interface CategoryProps {
  categoryList: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryProps = {
  categoryList: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchAllCategory(state, action: PayloadAction<Category[]>) {
      state.categoryList = action.payload;
    },
  },
});

export const {fetchAllCategory} = categorySlice.actions;

export default categorySlice.reducer;
