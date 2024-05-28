import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


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
  const API_URL = process.env.REACT_APP_API_URL;
  const NetflixSlider = ({ cat_id, movies }) => {
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {movies.map((movie, index) => (
            (movie.category_id === cat_id) 
            ?
            <div key={index} className="slider-item">
            <Link to={`/watch-movie/${movie.id}`} >
              <img src={API_URL+"/"+ movie.image} alt={movie.movie_name} />
              <div className="slider-item-info">
                <h3>{movie.movie_name}</h3>
              </div>
            </Link>
            </div>
            :''
          ))}
        </Slider>
      </div>
    );
  };
  
  export default NetflixSlider;
    