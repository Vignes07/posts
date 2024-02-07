import React from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import PropTypes from "prop-types";

import moment from "moment";

const Posts = ({ posts, handleReactions, handleRemove }) => {
  const postsList = posts.slice(0).sort((a, b) => b.date.localeCompare(a.date));

  const reactions = { likes: "👍", dislikes: "👎" };

  Posts.propTypes = {
    posts: PropTypes.array.isRequired,
    handleReactions: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
  };

  return (
    <div className="posts">
      {postsList.map((post) => (
        <Card
          className="postCard"
          key={post._id}
          variant="outlined"
          sx={{ backgroundColor: "transparent" }}
        >
          <CardContent>
            <div className="top">
              <div className="content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p className="author">By {post.author}</p>
              </div>
              <button
                className="remove"
                type="button"
                onClick={() => handleRemove(post._id)}
              >
                <h4>X</h4>
              </button>
            </div>
            <div className="info">
              <div className="interactions">
                {Object.entries(reactions).map(([name, emoji]) => {
                  return (
                    <button
                      key={name}
                      type="button"
                      className="reactionButton"
                      onClick={() => handleReactions(post._id, name)}
                    >
                      {emoji} {post.reactions[name]}
                    </button>
                  );
                })}
              </div>
              <div className="user">{moment(post.date).fromNow()}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
