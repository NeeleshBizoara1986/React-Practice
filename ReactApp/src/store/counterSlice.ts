import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRandomNumber = createAsyncThunk("counter/fetchRandomNumber", async () => {
    
 try {
    // const response = await fetch("https://www.randomnumberapi.com/api/v1.0/random?min=1&max=100");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // ✅ Goes through Vite proxy
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }

})
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0, loading: false },
    reducers: {
        increment: state => { state.value = state.value + 1 },
        decrement: state => { state.value = state.value - 1 }
    },
    extraReducers: builder => {
        builder.addCase(fetchRandomNumber.pending, state => { state.loading = true; })
            .addCase(fetchRandomNumber.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(fetchRandomNumber.rejected, state => { state.loading = false; })
    }
})

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
