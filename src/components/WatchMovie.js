import React, {useState, useEffect, useRef} from "react";
// import ReactPlayer from 'react-player';
import Badge from 'react-bootstrap/Badge';
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
// import {Media, Video } from '@vidstack/player-react';
import { MediaPlayer, MediaProvider, MediaPlayerInstance } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
function WatchMovie() {
    const containerRef = useRef(null);
    const [currentTime, setCurrentTime] = useState('')
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
        console.log(containerRef);

        const fetchCurrentTime = () => {
           // console.log(containerRef)
            if(containerRef.current){
                const currentTimeElement = containerRef.current.querySelector('[data-type="current"]');
                if (currentTimeElement) {
                setCurrentTime(currentTimeElement.textContent);
                }
            }
        }
        fetchCurrentTime();
        const intervalId = setInterval(fetchCurrentTime, 1000); // Fetch every secon
        return () => clearInterval(intervalId);
       
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
                         

                            {/* <ReactPlayer controls className="react-player" width='100%' url={ API_URL +"/videos/"+movie.movie_link}
                            /> */}
                             {/* <Media>
                                <Video loading="visible" poster="https://media-files.vidstack.io/poster.png" controls preload="true">
                                    <video loading="visible" poster="https://media-files.vidstack.io/poster-seo.png" src={ API_URL +"/videos/"+movie.movie_link} preload="none" data-video="0" controls />
                                </Video>
                            </Media> */}
                            <MediaPlayer title="Sprite Fight" src={movie &&  API_URL +"/videos/"+movie.movie_link} >
                                <MediaProvider />
                                <DefaultVideoLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" icons={defaultLayoutIcons} />
                            </MediaPlayer>
                        </div> 
                        <div className="movie-title mt-2"><h5>{movie.movie_name} - {(movie.category) ? movie.category.name : ''} HD</h5></div>
                        <div className="imdb"><Badge bg="warning" text="dark">IMDB : {movie.imdb}</Badge></div>  
                        <div className="movie-details mt-1">{movie.movie_details}</div>    
                        <div>
                            Current Time: {currentTime}
                        </div>
                                 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchMovie;