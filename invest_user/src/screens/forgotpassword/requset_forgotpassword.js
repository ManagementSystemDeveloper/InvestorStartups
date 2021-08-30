import React, { useState } from "react";
import logo from './../../assets/imgs/logo.png';
import { Link } from "react-router-dom";
import {Container, Form, InputGroup, Button} from 'react-bootstrap';
import './index.scss';
import {BsCheck, BsX} from 'react-icons/bs';
import Footer from "../shared_comps/footer";
function RequestForgotPassword() {

    const [showPass, setShowPass] = useState(false);
    const [validEmail, setIsValidEmail] = useState(false);
    const [email, setEmail] = useState('');
    const onChangeText = (e) => {
        const {name, value} = e.target;
        console.log(name);
        if(name === 'email')
        {
            setEmail(value);
            setIsValidEmail(email.length > 3);
        }
    }
    return (
    <>
    <Container>
        <div className="center_part">
            <div className="logo_part">
                <img src={logo} alt="logo"/>
            </div>
            <div className="welcome_text">
                <h1>Forgot Password</h1>
            </div>
            <div class="pwdchangeinfo">
                <h3>Info</h3>
                <p>Enter your valid email before proceed to password reset.</p>
            </div>
                <Form>

                <Form.Group className="mb-3">
                {validEmail ? 
                    <InputGroup hasValidation>
                        <Form.Control type="email" className="txtbox" name="email" value={email} onChange={(e) => onChangeText(e)} placeholder="joseph.smith@email.com" />    
                        <InputGroup.Text className="show-password-toggle">{validEmail ? <BsCheck style={{color:'#00ff00'}}></BsCheck> : <BsX style={{color:'#ff0000'}}></BsX>}</InputGroup.Text>
                    </InputGroup>
                    :
                    <Form.Control type="email" className="txtbox" name="email" value={email} onChange={(e) => onChangeText(e)} placeholder="joseph.smith@email.com" />    
                }
                </Form.Group>

                <Button className="submit_btn login_btn"> <span className="spinner-border spinner-border-sm mr-2"></span> Submit </Button>
                    
                <Link to="/login" className="forgotpwd"> Back </Link>

                </Form>
        </div>
    </Container>
    <Footer/>
    </>)
}

export default RequestForgotPassword;