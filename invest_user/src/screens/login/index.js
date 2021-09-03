import React, { useState, useEffect } from "react";
import logo from './../../assets/images/logo.png';
import { Link } from "react-router-dom";
import {Container, Form, InputGroup, Button} from 'react-bootstrap';
import './index.scss';
import {BsFillEyeFill, BsFillEyeSlashFill, BsCheck, BsX} from 'react-icons/bs';
import Footer from "./../shared_comps/footer";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';
import { loginActions, toastActions } from "../../store/actions";
import { toast } from 'react-toastify';

function LogIn() {
    const showLoading = useSelector(state => state.loadingReducer.loading_show);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);

    const [showPass, setShowPass] = useState(false);
    const [validEmail, setIsValidEmail] = useState(false);
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if(showToast)
        {
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }
    }, [showToast, toastMsg]);
    const onClickShowPassword = () => {
        setShowPass(!showPass);
    }

    const onChangeText = (e) => {
        const {name, value} = e.target;
        console.log(name);
        if(name === 'pass')
        {
            setPass(value);
        }
        else if(name === 'email')
        {
            setEmail(value);
            setIsValidEmail(validator.isEmail(value));
        }
    }

    const onLoginFormSubmit = (e) => {
        e.preventDefault();
        if(!validEmail)
        {
            dispatch(toastActions.showToast("You entered invalid email address"));
            return;
        }

        if(pass.length === 0)
        {
            dispatch(toastActions.showToast("Enter the password"));
            return;
        }

        dispatch(loginActions.login(email, pass));
    }

    return (
    <>
    <Container>
        <div className="center_part">
            <div className="logo_part">
                <img src={logo} alt="logo"/>
            </div>
            <div className="welcome_text">
                <h1>Welcome Back!</h1>
            </div>
            
                <Form>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    {email.length > 0 ? 
                    <InputGroup hasValidation>
                        <Form.Control type="email" className="txtbox"  name="email" value={email} onChange={(e) => onChangeText(e)} placeholder="joseph.smith@email.com" />    
                        <InputGroup.Text className="show-password-toggle">{validEmail ? <BsCheck style={{color:'#00ff00'}}></BsCheck> : <BsX style={{color:'#ff0000'}}></BsX>}</InputGroup.Text>
                    </InputGroup>
                    :
                    <Form.Control type="email" className="txtbox" name="email" value={email} onChange={(e) => onChangeText(e)} placeholder="joseph.smith@email.com" />    
                    }
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control type={showPass?"text":"password"} name="pass" value={pass} onChange={(e) => onChangeText(e)} className="txtbox" placeholder="***********" />
                        {pass.length > 0 && <Button onClick={onClickShowPassword} className="show-password-toggle">{showPass ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</Button>}
                    </InputGroup>
                </Form.Group>
    
                <Button onClick={onLoginFormSubmit} className="submit_btn login_btn" disabled = {showLoading}> {showLoading && <span className="spinner-border spinner-border-sm mr-2"></span>} Log In </Button>
                    

                <Link to="/forgotpass_req" className="forgotpwd"> Forget My Password </Link>

                </Form>
            
        </div>
    </Container>

    <Footer/>
    </>)
}

export default LogIn;