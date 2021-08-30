import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { investorActions, toastActions } from '../../../store/actions';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import validator from 'validator';
import {BsCheck, BsX} from 'react-icons/bs';
function AccountEditModalDialog({defaultVal, closeHandler, account = null})
{
    const token = useSelector(state => state.authReducer.token);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);
    
    const [validEmail, setIsValidEmail] = useState(false);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [user_name, setUserName] = useState('');

    const [isEdited, setIsEdited] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!isEdited && account)
        {
            setPhone(account.phone);
            setEmail(account.email);
            setUserName(account.name);
        }

        if(showToast)
        {
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }

    }, [isEdited, account]);

    const handleEditModalClose = () => {
        setIsEdited(false);
        account = null;
        closeHandler();
    }

    const handleSubmit = () => {
        if(user_name.length === 0)
        {
            dispatch(toastActions.showToast("User Name is required"));
            return;
        }
        if(email.length === 0)
        {
            dispatch(toastActions.showToast("Email is required"));
            return;
        }
        if(!validEmail)
        {
            dispatch(toastActions.showToast("Valid Email is required"));
            return;
        }
        
        dispatch(investorActions.updateInvestor(token.accessToken, account.id, user_name, email, phone));
        handleEditModalClose();
    }

    const onChangeText = (e) => {
        const {name, value} = e.target;
        
        if(name === 'email')
        {
            setIsEdited(true);
            setEmail(value);
            setIsValidEmail(validator.isEmail(value));
        }
        else if(name === 'phone')
        {
            setIsEdited(true);
            setPhone(value);
        }
        else if(name === 'user_name')
        {
            setIsEdited(true);
            setUserName(value);
        }
    }



    return (
        <Modal show={defaultVal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit User Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" placeholder="ex: John Dosep" name="user_name" value={user_name} onChange={e => onChangeText(e)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
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
                        <Form.Label>Mobile</Form.Label>
                        
                        <Form.Control type="text" className="txtbox" name="phone" value={phone} onChange={(e) => onChangeText(e)} placeholder="+1 111 111 1111" />    
                        
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="submit_btn cancel_btn" onClick={handleEditModalClose}>
                    Close
                </Button>
                <Button className="submit_btn" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AccountEditModalDialog;