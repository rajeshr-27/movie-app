import React,{useState,useEffect} from "react";
//import { useDispatch,useSelector } from "react-redux";
//import { authUser } from "../redux/features/loginSlice";
import axios from 'axios';
import NetflixSlider from "./NetflixSlider";
import { Helmet } from "react-helmet";
// import ListGroup from 'react-bootstrap/ListGroup';

function Home(){
    //const dispatch = useDispatch();
   // const {token} = useSelector((state)=>state.user)
    const API_URL = process.env.REACT_APP_API_URL;    
    const [categoryList,  setCategoryList] = useState([])
     //fetch categorys
    
    useEffect(()=> {
        // if(token){
        //     dispatch(authUser(token));
        // }  
        const fetchCategory =  async () => {
        const response_1 = await axios.get(API_URL+"/category/list");
            setCategoryList(response_1.data.category);
        }     
        fetchCategory();   
    },[API_URL])
    
    
    return (
        <div className="container-fluid home">
             <Helmet>
                <title>tamillancevideo 2024 | tamillancevideo | Tamil Full Movies Watch |  Tamil New Full Movies | Tamil Mp4 Movies</title>
                <meta name="description" content="tamillancevideo, tamillancevideo 2024, tamilRockers movies,moviesda hd movies,moviesda 2024 movies, tamillancevideo movies, tamillancevideo tamil movies download, tamillancevideo com 2024, tamillancevideo 2024 movies, tamillancevideo 2023" />
            </Helmet>
            <div className="row mt-1">
                <div className="col-sm-12"> 
                {/* <div className="card mb-3 latest_update" key="1">
                    <div className="card-header">Latest Updates</div>
                    <div className="card-body">                  
                    <ListGroup>
                        { movies && 
                            movies.map((movie_data) =>(                               
                                <ListGroup.Item ><b>{movie_data.movie_name} ({ movie_data.release_date.split('-')[0] }) {movie_data.category_name} HDRip </b> <a href="" className="btn watch-btn btn-sm btn-warning">Watch</a></ListGroup.Item>
                            ))
                        }
                   </ListGroup>
                    </div>
                </div> */}
                    
                        {categoryList && 
                        categoryList.map((category) => ( 
                            <div className="card mb-3" key={category._id}>
                                <div className="card-header">{category.name}</div>
                                <div className="card-body">
                                    <NetflixSlider cat_id={category._id} />                               
                                </div>
                            </div> 
                        ))
                        }  
                </div>
            </div>
        </div>
    )
}

export default Home;