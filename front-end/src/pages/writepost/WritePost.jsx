import React, {useState, useContext} from 'react';
import './WritePost.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import { Context } from "../../context/Context";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


function WritePost() {
    const classes = useStyles();
    const [title, setTitle]=useState("");
    const [desc, setDesc] = useState("");
    const [file,setFile] = useState(null);
    const { user } = useContext(Context);
    
      const [age, setAge] = React.useState('');
      
      const handleChange = (event) => {
        setAge(event.target.value);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
          username: user.username,
          title,
          desc,
        };
        if (file) {
          const data =new FormData();
          const filename = Date.now() + file.name;
          data.append("name", filename);
          data.append("file", file);
          newPost.photo = filename;
          try {
            await axios.post("/upload", data);
          } catch (err) {}
        }
        try {
          const res = await axios.post("/posts", newPost);
          window.location.replace("/post/" + res.data._id);
        } catch (err) {}
      };
    return (
        <div className="writepost">
          {
          file && (
            <img src={URL.createObjectURL(file)} alt=" "/>
            )
          }
        
          
            <form className={classes.root} className="writepost" noValidate autoComplete="off" onSubmit={handleSubmit}>
              <h1 className='writepost-heading'>Write your story</h1>
                <TextField id="title" className="post-title" label="Title" autoFocus={true} onChange={(e)=>setTitle(e.target.value)} />
                <Button
                variant="contained"
                component="label"
                >
                Upload File
                <input
                    type="file"
                    id="inputFile"
                    hidden
                    onChange={(e)=>setFile(e.target.files[0])}
                />
                </Button>

                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                onChange={(e)=>setDesc(e.target.value)}
                />

                <Button type='submit' className='submit-btn' color='primary'>Publish</Button>
             </form>
        </div>
    )
}

export default WritePost;