import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Movie(){
    const API_URL = process.env.REACT_APP_API_URL;
    const [show, setShow] = useState(false);
    const initialFrmData = {
        movie_name:'',
        movie_details:'',
        category:'',
        imdb:'',
        movie_link:'',
        image:'',
        actor:'',
        music:'',
        genre:'',
        release_date:''
    }
    const [frmData, setFrmData] = useState(initialFrmData)
    const [movieList,  setMovieList] = useState([])
    const [categoryList,  setCategoryList] = useState([])
    const [id,setId] = useState('');

    const fetchMovies = async () => {
        try{
            //fetch movies
            const response = await axios.get(API_URL+"/movie/list");
            setMovieList(response.data.movies);

             //fetch categorys
             const response_1 = await axios.get(API_URL+"/category/list");
             setCategoryList(response_1.data.category);
        }catch(error){
          //  alert(error.response.data.message);
        }
    }

    useEffect(()=>{        
        fetchMovies();
    },[])
    const handleClose = () => setShow(false);
    const handleShow = async (id) => {
        if(id){  
            setId(id);         
            try{
                const response = await axios.get(API_URL+"/movie/movie-details/"+id);
                const movieInfo = response.data.movie;
                setFrmData(movieInfo)
                console.log('test')
                setShow(true)
                
            }catch(error){
                console.log(error);
            }
        }
        setShow(true)
        console.log('test')
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let postData = new FormData();
        postData.append('image', frmData.image);
        delete(frmData.image);
        postData.append('data',JSON.stringify(frmData));

        try{
             //Add the movie
             let responsive;
             if(id){
                responsive = await axios.put(API_URL+`/movie/edit/${id}`,postData);
             }else {
                responsive = await axios.post(API_URL+"/movie/add",postData);
             }
            
            alert(responsive.data.message);
            setShow(false);
            fetchMovies();
            setId('');
            setFrmData(initialFrmData);

        }catch(error){
             alert(error.response.data.message);
        }
        // for(const test of postData.entries()){
        //     console.log(test);
        // }
    }
    const handleChange = (e) => {
        const {name,value,files} = e.target;
        setFrmData({
            ...frmData,
            [name]:(files)?files[0]:value
        })
    }
    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            //Delete
            try{
                const response = await axios.delete(API_URL+`/movie/delete/${id}`);
                alert(response.data.message);
                fetchMovies();
            }catch(error){
                console.log(error);
            }
        }
    }
    return(
        <div className='container'>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='card'>
                        <div className='card-header'>
                            Movie List
                            <Link  onClick={() =>handleShow('')} className='btn btn-success btn-sm float-end'>Add</Link>
                        </div>
                        <div className='card-body'>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>   
                                    <th>Movie Name</th> 
                                    <th>Category</th>
                                    <th>Imdb</th>     
                                    <th>Added On</th> 
                                    <th>Action</th>                     
                                </tr>
                            </thead>
                            <tbody>
                                {movieList && 
                                    movieList.map((movie_data, i)=>(
                                        <tr key={movie_data._id}>
                                            <td>{i+1}</td>
                                            <td>{movie_data.image &&
                                                <img alt={movie_data.image} src={API_URL+"/"+ movie_data.image} className='responsive' style={{"height":"62px   "}} />
                                            }</td>  
                                            <td>{movie_data.movie_name}</td>  
                                            <td>{ movie_data.category.name}</td>    
                                            <th>{movie_data.imdb}</th>  
                                            <th>{movie_data.created_at}</th>  
                                            <th>
                                                <Link onClick={() =>handleShow(movie_data._id)} className='btn btn-sm btn-primary'>Edit</Link> 
                                                |  <Link onClick={() => handleDelete(movie_data._id)}  className='btn btn-sm btn-danger'>Delete</Link>   
                                            </th>                    
                                        </tr>
                                    ))
                                }
                             
                            </tbody>
                            </Table>
                        </div>
                    </div>

                    {/* Add and update Movie form */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Form</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <Form.Group className="mb-3">
                                <Form.Label>Movie Name *</Form.Label>
                                <Form.Control type="text" name="movie_name" value={frmData.movie_name} onChange={handleChange} required placeholder="Enter Movie Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Movie Details</Form.Label>
                                <Form.Control as="textarea" name="movie_details" value={frmData.movie_details} onChange={handleChange} placeholder="Enter Movie Details" rows={3} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Actor *</Form.Label>
                                <Form.Control type="text" name="actor" value={frmData.actor} onChange={handleChange} required placeholder="Enter Actor" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Genre *</Form.Label>
                                <Form.Control type="text" name="genre" value={frmData.genre} onChange={handleChange} required placeholder="Enter Genre" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Music *</Form.Label>
                                <Form.Control type="text" name="music" value={frmData.music} onChange={handleChange} required placeholder="Enter Music" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Release Date*</Form.Label>
                                <Form.Control type="text" name="release_date" value={frmData.release_date} onChange={handleChange} required placeholder="Enter Release date" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Category *</Form.Label>
                                <Form.Select name="category" value={frmData.category} onChange={handleChange} required>
                                    <option value="">---Select Category</option>
                                    {categoryList && 
                                        categoryList.map((category) =>(
                                            <option value={category._id}>{category.name}</option>
                                        )
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>IMDB</Form.Label>
                                <Form.Control type="text" value={frmData.imdb} onChange={handleChange} name="imdb"  placeholder="Enter IMDB" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Movie Link  *</Form.Label>
                                <Form.Control type="text" value={frmData.movie_link} onChange={handleChange} name="movie_link"  placeholder="Enter Movie Link" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" onChange={handleChange} name="image" />
                            </Form.Group>
                            <Button variant="success" className='float-end' type="submit">Submit</Button>
                        </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
export default Movie;