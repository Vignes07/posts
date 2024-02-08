import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("https://posts-4dtq.onrender.com/");
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
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, author, content) => {
        return {
          payload: {
            title,
            author,
            content,
            reactions: { likes: 0, dislikes: 0 },
            date: new Date().toUTCString(),
          },
        };
      },
    },
    updatePost: (state, action) => {
      const { id, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post._id === id);
      existingPost.reactions[reaction]++;
    },
    removePost: (state, action) => {
      const id = action.payload;
      console.log(id);
      state.posts = state.posts.filter((post) => post.id !== id);
    },
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

export const { addPost, updatePost, removePost } = postsSlice.actions;

export default postsSlice.reducer;
