import React, { useEffect, useState, useContext } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import { Context } from "../../context/Context";

function PostDetail() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const publicFolder = "localhost:5000/assets/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fecthPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    fecthPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}` + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      //window.location.reload();
      setUpdate(false);
    } catch (err) {}
  };
  return (
    <div className="postdetail">
      {post.photo && <img src={publicFolder + post.photo} alt="" />}
      {update ? (
        <TextField
          className="post-title"
          value={title}
          type="text"
          label="Title"
          autoFocus={true}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <h1 className="postdetail-heading">
          {title}
          {post.username === user?.username && (
            <>
              <EditIcon onClick={() => setUpdate(true)} />
              <DeleteIcon onClick={handleDelete} />
            </>
          )}
        </h1>
      )}

      <Chip></Chip>
      <div className="post-content">
        <div className="author">
          <Link to={`/?user=${post.username}`}>{post.username}</Link>
        </div>
        <div className="postedtime">
          <p>{new Date(post.createdAt).toDateString()}</p>
        </div>
        {update ? (
          <TextField
            label="Multiline"
            multiline
            rows={4}
            value={desc}
            variant="outlined"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <div className="post-text">{desc}</div>
        )}
        {update && (
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>
        )}
      </div>
    </div>
  );
}

export default PostDetail;
