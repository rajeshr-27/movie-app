import React,{useState,useEffect}  from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useSearchParams} from "react-router-dom"

function Search(){
    const [searchParams, setSearchParams] = useSearchParams();

    const API_URL = process.env.REACT_APP_API_URL;
    const [movies,setMovies] = useState([]);
    useEffect(() => {
            const q = searchParams.get('q');
            const fetchMovies = async () => {
                const response = await axios.get(API_URL+`/movie/list?q=${q}`);
            setMovies(response.data.movies);         
            }
            fetchMovies();
    },[searchParams]) 
    return (
        <div className="container">
            <div className="row search mt-3"> 
                <div className="col-sm-12">Search Result:  <span style={{"color":"red"}}>{searchParams.get('q')}</span></div>
                {movies && (
                        movies.map((movie, index) => (            
                            <div className="col-lg-2 col-md-3 col-sm-4 col-6"key={index+1}>
                            <Link to={`/watch-movie/${movie._id}`} >
                            <img src={API_URL+"/"+ movie.image} alt={movie.movie_name} />                    
                            </Link>
                            </div>
                        ))
                    ) 
                } 
                { movies.length === 0 && (
                     <div>
                        <div className="card">
                            <div className="card-body text-center">
                                Search Result Not Found!
                            </div>
                        </div>
                     </div>
                    )
                }
            </div>
        </div>
    )
}

export default Search;