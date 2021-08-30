import React, { useState, useEffect } from 'react';
import Footer from '../../shared_comps/footer';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import './index.scss';
import SideBar from '../../shared_comps/sidebar';
import {BsFillEyeFill, BsCheck, BsFillEyeSlashFill, BsX} from 'react-icons/bs';
import { NAV_INVESTOR_ADD, CREATE_DONE_SUCCESS } from '../../../store/constants';
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { investorActions, toastActions } from "../../../store/actions";
import DashBoardHeader from '../../shared_comps/dashheader';
function AddInvestor()
{
    const showLoading = useSelector(state => state.loadingReducer.loading_show);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);
    const token = useSelector(state => state.authReducer.token);
    const needFormClear = useSelector(state => state.createReducer.create_success_clear_form);

    const [showPass, setShowPass] = useState(false);
    const [validEmail, setIsValidEmail] = useState(false);
    const [pass, setPass] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [user_name, setUserName] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if(showToast)
        {
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }

        if(needFormClear)
        {
            setPass('');
            setPhone('');
            setEmail('');
            setUserName('');
            dispatch({type:CREATE_DONE_SUCCESS, payload:false});
        }

    }, [showToast, toastMsg, needFormClear]);

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
            console.log(validEmail);
        }
        else if(name === 'phone')
        {
            setPhone(value);
        }
        else if(name === 'user_name')
        {
            setUserName(value);
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(user_name.length === 0)
        {
            dispatch(toastActions.showToast("User Name is required"));
            return;
        }

        if(!validEmail)
        {
            dispatch(toastActions.showToast("You entered invalid email address"));
            return;
        }

        if(pass.length < 6)
        {
            dispatch(toastActions.showToast("Enter the password at least 6 letters"));
            return;
        }

        if(phone.length === 0)
        {
            dispatch(toastActions.showToast("Enter the phone number"));
            return;
        }

        dispatch(investorActions.createInvestor(user_name, email, pass, phone, token.accessToken));
    }

    return (
        <>
        <SideBar activeItem={NAV_INVESTOR_ADD}/>
        <div className="main_admin_part">
            <DashBoardHeader/>
        
            <section className="main_page">
                <div className="container-fluid">
                    <div className="pg_title">
                        <h3>Create New Investor</h3>
                    </div>
                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name</Form.Label>
                        
                        <InputGroup hasValidation>
                            <Form.Control type="text" className="txtbox"  name="user_name" value={user_name} onChange={(e) => onChangeText(e)} placeholder="joseph smith" />    
                        </InputGroup>
                    </Form.Group>

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
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control type={!showPass?"password":"text"} name="pass" value={pass} onChange={(e) => onChangeText(e)} className="txtbox" placeholder="***********" />
                            {pass.length > 0 && <Button onClick={onClickShowPassword} className="show-password-toggle">{showPass ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</Button>}
                        </InputGroup>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        
                        <InputGroup hasValidation>
                            <Form.Control type="text" className="txtbox"  name="phone" value={phone} onChange={(e) => onChangeText(e)} placeholder="+1 111 111 1111" />    
                        </InputGroup>
                    </Form.Group>

                    <Button className="submit_btn" onClick={onFormSubmit}> Create User</Button>
                    </Form>
                </div>
            </section>
        
            <Footer/>
        </div>
        </>
    );
}

export default AddInvestor;