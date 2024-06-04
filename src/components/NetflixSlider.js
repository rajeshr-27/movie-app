import React,{useState,useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from 'axios';
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
            slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      }
    ]
  };

  	const NetflixSlider = ({ cat_id }) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [movies,setMovies] = useState([]);

    useEffect(() => {
      	const fetchMovies = async () => {
          	const response = await axios.get(API_URL+`/movie/list?category=${cat_id}`);
        	setMovies(response.data.movies);         
      	}
      	fetchMovies();
    }, []) 
    return (
      <div className="slider-container">     
        <Slider {...settings}>
          {movies.map((movie, index) => (            
            <div key={index+1} index={index+1} className="slider-item">
            <Link to={`/watch-movie/${movie._id}`} >
              <img src={API_URL+"/"+ movie.image} alt={movie.movie_name} />
              <div className="slider-item-info">
                <div>{movie.movie_name}</div>
              </div>
            </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  };
  
  export default NetflixSlider;
    