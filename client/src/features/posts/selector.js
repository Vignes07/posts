const selectAllPost = (state) => state.posts.posts;
const getPostsStatus = (state) => state.posts.loading;
const getPostsError = (state) => state.posts.error;

export { selectAllPost, getPostsStatus, getPostsError };
