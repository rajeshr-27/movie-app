import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { authUser } from "../redux/features/loginSlice";
import axios from 'axios';
import NetflixSlider from "./NetflixSlider";
import ListGroup from 'react-bootstrap/ListGroup';

function Home(){
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.user)
    const API_URL = process.env.REACT_APP_API_URL;
    const [movies,setMovies] = useState([]);
    const [categoryList,  setCategoryList] = useState([])
    const fetchMovies = async () => {
        const response = await axios.get(API_URL+"/movie/list");
        setMovies(response.data.movies);

         //fetch categorys
         const response_1 = await axios.get(API_URL+"/category/list");
         setCategoryList(response_1.data.category);
    }
    useEffect(()=> {
        if(token){
            dispatch(authUser(token));
        }
        fetchMovies();
    },[])
    
    
    return (
        <div className="container-fluid home">
            <div className="row mt-1">
                <div className="col-sm-12"> 
                <div className="card mb-3 latest_update">
                    <div className="card-header">Latest Updates</div>
                    <div className="card-body">                  
                    <ListGroup>
                        { movies && 
                            movies.map((movie_data) =>(                               
                                <ListGroup.Item><b>{movie_data.movie_name} ({ movie_data.release_date.split('-')[0] }) {movie_data.category_name} HDRip </b> <a href="" className="btn watch-btn btn-sm btn-warning">Watch</a></ListGroup.Item>
                            ))
                        }
                   </ListGroup>
                    </div>
                </div>
                    
                        {categoryList && 
                        categoryList.map((category) => (
                            <>
                            <div className="card mb-3">
                                <div className="card-header">{category.name}</div>
                                <div className="card-body">
                                    <NetflixSlider cat_id={category.id} movies={movies} />                               
                                </div>
                            </div>
                            </>
                        ))
                        }                        
                    
                </div>
            </div>
        </div>
    )
}

export default Home;