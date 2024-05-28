 
import React,{useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, loginUser } from "../redux/features/loginSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {message, error} = useSelector((state) => state.user)
    const [frmData, setFrmData] = useState({
        email:'',
        password:'',
    })

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFrmData({
            ...frmData,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //Login
        dispatch(loginUser(frmData))
    }

    if(message){
        alert(message);
        dispatch(clearMessage());
        navigate('/movies',{replace:true})
    }
    if(error){
        alert(error);
        dispatch(clearError());
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-header">Login Form</div>
                        <div className="card-body">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={frmData.email} onChange={handleChange} placeholder="Enter Email"></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={frmData.password} onChange={handleChange} placeholder="Enter Password"></Form.Control>
                                </Form.Group>
                                <Button type="submit" className="float-end" varient="primary">Login</Button>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    )
}

export default Login;