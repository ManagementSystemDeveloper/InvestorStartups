import React, { useState } from "react";
import logo from './../../assets/imgs/logo.png';
import { Link } from "react-router-dom";
import {Container, Form, InputGroup, Button} from 'react-bootstrap';
import './index.scss';
import {BsFillEyeFill, BsFillEyeSlashFill, BsCheck, BsX} from 'react-icons/bs';
import Footer from "../shared_comps/footer";
import DashBoardHeader from "../shared_comps/dashheader";
function ChangePassword() {

    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const onClickShowOldPassword = () => {
        setShowOldPass(!showOldPass);
    }

    const onClickShowNewPassword = () => {
        setShowNewPass(!showNewPass);
    }

    const onClickShowConfirmPassword = () => {
        setShowConfirmPass(!showConfirmPass);
    }

    const onChangeText = (e) => {
        const {name, value} = e.target;
        if(name === 'oldPass')
        {
            setOldPass(value);
        }
        else if(name === 'newPass')
        {
            setNewPass(value);
        }
        else if(name === 'confirmPass')
        {
            setConfirmPass(value);
        }
    }


    return (
    <>
    <DashBoardHeader/>
    <Container>
        <div className="center_part">
            <div className="welcome_text">
                <h1>Change Password</h1>
            </div>
                <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={showOldPass?"password":"text"} name="oldPass" value={oldPass} onChange={(e) => onChangeText(e)} className="txtbox" placeholder="***********" />
                        <Button onClick={onClickShowOldPassword} className="show-password-toggle">{showOldPass ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</Button>
                    </InputGroup>
                </Form.Group>
            
                <Form.Group className="mb-3">
                    <Form.Label>Change Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={showNewPass?"password":"text"} name="newPass" value={newPass} onChange={(e) => onChangeText(e)} className="txtbox" placeholder="***********" />
                        <Button onClick={onClickShowNewPassword} className="show-password-toggle">{showNewPass ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</Button>
                    </InputGroup>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <Form.Control type={showConfirmPass?"password":"text"} name="confirmPass" value={confirmPass} onChange={(e) => onChangeText(e)} className="txtbox" placeholder="***********" />
                        <Button onClick={onClickShowConfirmPassword} className="show-password-toggle">{showConfirmPass ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</Button>
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

export default ChangePassword;