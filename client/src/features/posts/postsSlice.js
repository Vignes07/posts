import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://posts-4dtq.onrender.com/getPost");
  return response.data;
});

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // addPost: {
    //   reducer: (state, action) => {
    //     state.posts.push(action.payload);
    //   },
    //   prepare: (value) => {
    //     return {
    //       payload: {
    //         ...value,
    //       },
    //     };
    //   },
    // },
    // updatePost: (state, action) => {
    //   const { id, reaction } = action.payload;
    //   const existingPost = state.posts.find((post) => post.id === id);
    //   existingPost.reactions[reaction]++;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addPost, updatePost } = postsSlice.actions;

export default postsSlice.reducer;
