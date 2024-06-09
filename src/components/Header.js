import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Link, Outlet, useNavigate } from 'react-router-dom';
//import { useSelector,useDispatch } from 'react-redux';
//import { logOut } from '../redux/features/loginSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
function Header() {
  //const {isAuth, user} = useSelector((state)=> state.user);
  const [search, setSearch] = useState('');
  const [showSearch,setShowSearch] = useState(false)
  const [site, setSite] = useState('TamillanceVideo')
  
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  
//   const handlelogOut = () => {
//     dispatch(logOut());
//   }

  const handleChange = (e) => {
	setSearch(e.target.value);
		navigate(`/search?q=${e.target.value}`,{replace:true})
	
  }

  const handleSearchClick = () => {
   
    if(showSearch){
        setShowSearch(false);
        setSite('TamillanceVideo')
        setSearch('');
    }else {
        setShowSearch(true);
        setSite('TV')
    }
  }
  return (
    <>
    <Navbar expand="lg" className="header bg">
      <Container fluid>
        <Navbar.Brand  > <Link to="/" className='nav-link'>{site}</Link></Navbar.Brand>
		{/* <Link to="/" className='nav-link'>Home</Link>     */}
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav">
        <Link to="/" className='nav-link'>Home</Link>          
          <Nav className="me-auto"> 
          {
            !isAuth &&
              (
                <>
                <Link to="/register" className='nav-link'>Register</Link>
                <Link to="/login" className='nav-link'>Login</Link>
                </>
              )
          }
          {
            isAuth &&
            <>
              <Link to="/movies" className='nav-link'>Movies</Link>
              <Link  className='nav-link' style={{"color":"red"}}>{user.name}</Link>
              <Link onClick={handlelogOut} className='nav-link'>Logout</Link>
            </>
          }
          </Nav>
        </Navbar.Collapse> */}
         <div className="search-container">	
         {showSearch &&   <Form.Control autoFocus type="text" onChange={handleChange} value={search} placeholder="Search" className="me-2 search-input" aria-label="Search"
			  name="search"
            /> }	  
           
            <FontAwesomeIcon  onClick={handleSearchClick} className="search-button" icon={faSearch} />
        </div>         
      </Container>
    </Navbar>
    <Outlet />
    </>
  );
}

export default Header;