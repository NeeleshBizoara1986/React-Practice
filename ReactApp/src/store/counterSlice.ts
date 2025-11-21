import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axiosInstance";

export const fetchRandomNumber = createAsyncThunk("counter/fetchRandomNumber", async (_, { signal, rejectWithValue }) => {
    const controller = new AbortController();
    signal.addEventListener("abort", () => controller.abort()); // Link Redux signal to Axios abort
    try {
        // const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // ✅ Goes through Vite proxy
        // if (!response.ok) throw new Error("Network response was not ok");
        // const data = await response.json();
        // return data[0].id;
        const response = await api.get("/posts", {signal: controller.signal});
        return response.data[0].id
    } catch (error: any) {
        // console.error("Fetch error:", error);
        // throw error;
        return rejectWithValue(error.response?.data || "Something went wrong")
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
            .addCase(fetchRandomNumber.rejected, (state, action) => {
                state.loading = false;
                console.log("Error : ", action.payload)
            })
    }
})

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
