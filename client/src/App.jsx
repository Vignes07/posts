import NewPost from "./Components/NewPost";
import "./App.css";
import Posts from "./Components/Posts";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import selectAllPost from "./features/posts/selector";
import { fetchPosts, addPost } from "./features/posts/postsSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPost);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://vmc8j7-3000.csb.app", {
        title,
        author,
        content,
        reactions: { likes: 0, dislikes: 0 },
        date: new Date().toUTCString(),
      })
      .then((res) => {
        dispatch(addPost(res.data));
      });
    setTitle("");
    setAuthor("");
    setContent("");
  };

  const handleReactions = async (id, name) => {
    await axios.put(`https://vmc8j7-3000.csb.app/${id}/${name}`);
  };

  const handleRemove = async (id) => {
    await axios.delete(`https://vmc8j7-3000.csb.app/${id}`);
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [posts]);

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
