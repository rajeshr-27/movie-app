import React, {useState, useEffect, useRef} from "react";
// import ReactPlayer from 'react-player';
import Badge from 'react-bootstrap/Badge';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
// import {Media, Video } from '@vidstack/player-react';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faTelegram } from '@fortawesome/free-solid-svg-icons'

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
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
    },[API_URL, id,setMovie ])
    return(
        <div className="container mt-5">
              <Helmet>
                <title>{(movie)?movie.movie_name:''} - HD</title>
                <meta name="description" content="tamillancevideo, tamillancevideo 2024, tamilRockers movies,moviesda hd movies,moviesda 2024 movies, tamillancevideo movies, tamillancevideo tamil movies download, tamillancevideo com 2024, tamillancevideo 2024 movies, tamillancevideo 2023" />
            </Helmet>
            <div className="row">
                <div className="col-sm-12">
                    
                    <div className="movie video_container">
                        <div className="player-wrapper">
                         

                          
                            <MediaPlayer autoplay title={movie.movie_name} src={movie &&  API_URL +"/videos/"+movie.movie_link} >
                                <MediaProvider />
                                <DefaultVideoLayout icons={defaultLayoutIcons} />
                            </MediaPlayer>
                        </div> 
                        <div className="movie-title mt-2"><h5>{movie.movie_name}</h5></div>
                        <div className="imdb"><Badge bg="warning" text="dark">IMDB : {movie.imdb}</Badge></div>  
                        <p> <Link to="https://t.me/tamillancevideo" className="btn btn-sm btn-info mt-3" style={{"color":"white"}}><FontAwesomeIcon icon={faTelegram} /> Join Now Telegram</Link></p>
                        <div className="movie-details mt-1">{movie.movie_details}</div>
                                                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchMovie;