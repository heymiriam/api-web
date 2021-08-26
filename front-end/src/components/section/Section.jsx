import React, {useEffect, useState} from 'react';
import './Section.scss';
import axios from 'axios';
import {Link} from "react-router-dom";


function Section(){
    const [category, setCategory]=useState([]);

    useEffect(()=>{
        const fetchCats=async()=>{
            
            const res = await axios.get(" https://blogapi-web.herokuapp.com/api/categories")
            setCategory(res.data)
        }
        fetchCats();
    },[])
    return(
        <div className="section">
            <div className="section-item">
                <p className="section-heading">About Me</p>
                <img className="section-img" src="https://images.unsplash.com/photo-1518057111178-44a106bad636?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80">
                </img>
                <p>dummy text</p>
            </div> 
            <div className="section-item">
                <p className="section-heading">Categories</p>
                <ul className="category-list">
                   
                    {category.map(c=>(
                         <Link to={`/?=category=${c.name}`}>
                        <li className="category-item">{c.name}</li>
                        </Link>
                    ))}
                   

                </ul>
            </div>
           
        </div>    
    )
};

export default Section;