import React, {useState, useEffect} from "react";
import ReactPlayer from 'react-player';
import Badge from 'react-bootstrap/Badge';
import axios from "axios";
import { useParams } from "react-router-dom";

function WatchMovie() {
    
    const {id} = useParams();
    const API_URL = process.env.REACT_APP_API_URL;
    const [movie,setMovie] = useState('')
    useEffect(()=>{
        const fetchMovie = async () => {
            try{
                const response = await axios.get(API_URL+`/movie/movie-details/${id}`)
                setMovie(response.data.movie)
            }catch(error){
                console.log(error)
            }
        }
        fetchMovie();
    },[])
    console.log(movie);
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12">
                    
                    <div className="movie">
                        <div className="player-wrapper">
                            <ReactPlayer controls={true} className="react-player" width='100%'
                            url={ API_URL +"/videos/"+movie.movie_link}
                            />
                        </div> 
                        <div className="movie-title mt-2"><h5>{movie.movie_name} - {(movie.category) ? movie.category.name : ''} HD</h5></div>
                        <div className="imdb"><Badge bg="warning" text="dark">IMDB : {movie.imdb}</Badge></div>  
                        <div className="movie-details mt-1">{movie.movie_details}</div>                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchMovie;