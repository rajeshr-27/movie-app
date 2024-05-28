import React,{useState} from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [frmData,setFrmData] = useState({
        name:'',
        email:'',
        password:'',
        mobile_number:'',
    });

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFrmData({
            ...frmData,
            [name]:value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //Register
            const response = await axios.post(API_URL+"/user/add",frmData);
            alert(response.data.message);
            navigate('/login', {replace:true})
        }catch(err){
            alert(err.response.data.message);
        }
     
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-header">
                            Register Form
                        </div>
                        <div className="card-body">  
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name *</Form.Label>
                                    <Form.Control required type="text" value={frmData.name} onChange={handleChange} name="name" placeholder="Enter Name"></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control required type="email" value={frmData.email} onChange={handleChange} name="email" placeholder="Enter Email"></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password *</Form.Label>
                                    <Form.Control required type="password" value={frmData.password} onChange={handleChange} name="password" placeholder="Enter Password"></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile Number *</Form.Label>
                                    <Form.Control required type="text" value={frmData.mobile_number} onChange={handleChange} name="mobile_number" placeholder="Enter Mobile Number"></Form.Control>
                                </Form.Group>
                                <Button variant="success" className='float-end' type="submit">Submit</Button>
                            </Form>                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
