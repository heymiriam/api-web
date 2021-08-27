import React, {useEffect, useState} from 'react';
import './Home.scss';
import Header from '../../components/header/Header';
import Section from '../../components/section/Section';
import Posts from '../../components/posts/Posts';
import axios from "axios";
import {useLocation} from 'react-router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:"black",
      color:"white",
        
    },
  }));
function Home(){
    const [posts, setPosts]=useState([]);
    const {search}=useLocation();
    const classes = useStyles();


    useEffect(() => {
        const fetchPosts= async()=>{
            const res= await axios.get("https://blogapi-web.herokuapp.com/api/posts"+search);
            setPosts(res.data)
            //console.log(res)
        }
        fetchPosts();
    },[search]);

    
    return(
        <div>
            <Header />
            <div className="container">
            <Posts className="posts" posts={posts}/>
            <Section className="section"/>
            </div>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                <Typography variant="body1" align="center">The Coffee Time 2021</Typography>
                </Container>
            </footer>
        </div>
    )
};

export default Home;
