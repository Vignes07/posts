import NewPost from "./Components/NewPost";
import "./App.css";
import Posts from "./Components/Posts";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPost,
  getPostsStatus,
  getPostsError,
} from "./features/posts/selector";
import {
  fetchPosts,
  addPost,
  updatePost,
  removePost,
} from "./features/posts/postsSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPost);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://posts-4dtq.onrender.com/addPost", {
        title,
        author,
        content,
        reactions: { likes: 0, dislikes: 0 },
        date: new Date().toUTCString(),
      })
      .then(() => {
        dispatch(addPost(title, author, content));
      });
    setTitle("");
    setAuthor("");
    setContent("");
  };

  const handleReactions = async (id, name) => {
    await axios
      .put(`https://posts-4dtq.onrender.com/update/${id}/${name}`)
      .then(() => {
        dispatch(updatePost({ id: id, reaction: name }));
      });
  };

  const handleRemove = async (id) => {
    await axios
      .delete(`https://posts-4dtq.onrender.com/remove/${id}`)
      .then(() => {
        dispatch(removePost({ id: id }));
      });
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, status]);

  return (
    <div className="container">
      <h1>New Post</h1>
      <NewPost
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
      />
      <h1>Posts</h1>

      {posts.length > 0 ? (
        <div className="posts-container">
          <Posts
            posts={posts}
            handleReactions={handleReactions}
            handleRemove={handleRemove}
          />{" "}
        </div>
      ) : (
        <h3 className="no-posts-found">No Posts Found.</h3>
      )}
    </div>
  );
}

export default App;
