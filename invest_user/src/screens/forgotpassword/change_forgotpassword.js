import React, { useState } from "react";
import logo from './../../assets/imgs/logo.png';
import { Link } from "react-router-dom";
import {Container, Form, InputGroup, Button} from 'react-bootstrap';
import './index.scss';
import {BsFillEyeFill, BsFillEyeSlashFill, BsCheck, BsX} from 'react-icons/bs';
import Footer from "./../shared_comps/footer";

function ChangeForgetPassword() {

    const [showPass, setShowPass] = useState(false);
    const [showPassConfirm, setShowPassConfirm] = useState(false);

    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    const onClickShowPassword = () => {
        setShowPass(!showPass);
    }

    const onClickShowConfirmPassword = () => {
        setShowPassConfirm(!showPassConfirm);
    }

    const onChangeText = (e) => {
        const {name, value} = e.target;
        if(name === 'pass')
        {
            setPass(value);
        }
        else if(name === 'passConfirm')
        {
            setPassConfirm(value);
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
                <h1>Change Password</h1>
            </div>
            <div class="pwdchangeinfo">
                <h3>Info</h3>
                <p>You Entered Email address was JohnDoe@example.com</p>
            </div>
                <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Change Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={showPass?"password":"text"} name="pass" value={pass} onChange={(e) => onChangeText(e)} className="txtbox" placeholder="***********" />
                        <Button onClick={onClickShowPassword} className="show-password-toggle">{showPass ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</Button>
                    </InputGroup>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={showPassConfirm?"password":"text"} name="passConfirm" value={passConfirm} onChange={(e) => onChangeText(e)} className="txtbox" placeholder="***********" />
                        <Button onClick={onClickShowConfirmPassword} className="show-password-toggle">{showPassConfirm ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</Button>
                    </InputGroup>
                </Form.Group>
    
                <Button className="submit_btn login_btn"> <span className="spinner-border spinner-border-sm mr-2"></span> Change Password </Button>
                    

                <Link to="/login" className="forgotpwd"> Back to log in </Link>

                </Form>
            
        </div>
    </Container>
    <Footer/>
    
    </>)
}

export default ChangeForgetPassword;