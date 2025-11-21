// src/features/data/dataSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../api/axiosInstance';
// // import api from '../../api/axiosInstance';

// export const fetchData = createAsyncThunk('data/fetchData', async (_, { rejectWithValue }) => {
//   try {
//     const response = await api.get(); // URL is set by interceptor
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error);
//   }
// });

// const dataSlice = createSlice({
//   name: 'data',
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default dataSlice.reducer;
