import { Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const NewPost = ({
  title,
  setTitle,
  author,
  setAuthor,
  content,
  setContent,
  handleSubmit,
}) => {
  NewPost.propTypes = {
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    author: PropTypes.string.isRequired,
    setAuthor: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    setContent: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(!(title && author && content));
  }, [title, author, content]);

  return (
    <form
      id="newPost"
      onSubmit={(e) =>
        handleSubmit(e, title, setTitle, author, setAuthor, content, setContent)
      }
    >
      <div className="inputs">
        <TextField
          className="input-field"
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className="input-field"
          id="author"
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          className="input-field"
          id="content"
          label="Content"
          multiline
          sx={{
            "& .MuiInputBase-root": {
              height: "100px",
              alignItems: "flex-start",
            },
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          disabled={isDisabled}
          className="button"
          variant="contained"
          type="submit"
        >
          Post
        </Button>
      </div>
    </form>
  );
};

export default NewPost;
