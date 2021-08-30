import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import {BsFillEyeFill, BsFillEyeSlashFill} from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { investorActions, toastActions } from '../../../store/actions';
import { toast } from 'react-toastify';
function AccountPassChangeModalDialog({defaultVal, closeHandler, account = null})
{
    const token = useSelector(state => state.authReducer.token);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);

    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    
    const dispatch = useDispatch();

    useEffect(() => {

        if(showToast)
        {
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }

    }, [account]);

    const handleEditModalClose = () => {
        setPass('');
        setPassConfirm('');
        setShowPass(false);
        closeHandler();
    }

    const handleSubmit = () => {
        if(pass.length === 0)
        {
            dispatch(toastActions.showToast("Password is required"));
            return;
        }

        if(pass.length < 6)
        {
            dispatch(toastActions.showToast("Password should be 6 letters at least"));
            return;
        }

        if(passConfirm.length === 0)
        {
            dispatch(toastActions.showToast("Confirm Password is required"));
            return;
        }
        
        if(pass !== passConfirm)
        {
            dispatch(toastActions.showToast("Password is not matched"));
            return;
        }
        
        handleEditModalClose();
        dispatch(investorActions.updatePassword(token.accessToken, account.id, pass));
    }

    const onClickShowPassword = () => {
        setShowPass(!showPass);
    }

    const onClickShowConfirmPassword = () => {
        setShowConfirm(!showConfirm);
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
        <Modal show={defaultVal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control type={!showPass?"password":"text"} name="pass" value={pass} onChange={(e) => onChangeText(e)} className="txtbox" placeholder="***********" />
                            <Button onClick={onClickShowPassword} className="show-password-toggle">{showPass ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</Button>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control type={!showConfirm?"password":"text"} name="passConfirm" value={passConfirm} onChange={(e) => onChangeText(e)} className="txtbox" placeholder="***********" />
                            <Button onClick={onClickShowConfirmPassword} className="show-password-toggle">{showConfirm ? <BsFillEyeFill/> : <BsFillEyeSlashFill/>}</Button>
                        </InputGroup>
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

export default AccountPassChangeModalDialog;