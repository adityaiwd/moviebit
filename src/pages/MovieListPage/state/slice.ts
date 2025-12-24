import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MovieListItem } from "@/pages/MovieListPage/model";

export type MovieListState = {
  query: string;
  page: number;
  items: MovieListItem[];
  totalResults: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: MovieListState = {
  query: "",
  page: 1,
  items: [],
  totalResults: 0,
  isLoading: false,
  error: null,
};

const movieListSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setList(
      state,
      action: PayloadAction<{
        query: string;
        page: number;
        items: MovieListItem[];
        totalResults: number;
      }>
    ) {
      state.query = action.payload.query;
      state.page = action.payload.page;
      state.items = action.payload.items;
      state.totalResults = action.payload.totalResults;
    },
  },
});

export const movieListActions = movieListSlice.actions;
export default movieListSlice.reducer;
