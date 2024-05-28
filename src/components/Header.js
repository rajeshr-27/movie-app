import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link, Outlet } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { logOut } from '../redux/features/loginSlice';


function Header() {
  const {isAuth, user} = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  
  const handlelogOut = () => {
    dispatch(logOut());
  }
  return (
    <>
    <Navbar expand="lg" className="header bg">
      <Container fluid>
        <Navbar.Brand href="#home">TamillanceVideo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
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
        </Navbar.Collapse>

      </Container>
    </Navbar>
    <Outlet />
    </>
  );
}

export default Header;