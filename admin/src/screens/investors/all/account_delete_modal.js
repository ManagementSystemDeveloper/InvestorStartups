import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { investorActions, toastActions } from '../../../store/actions';
function AccountDeleteModalDialog({defaultVal, closeHandler, account = null})
{
    const token = useSelector(state => state.authReducer.token);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);
    const dispatch = useDispatch();
    const handleModalClose = () => {
        closeHandler();
    }

    useEffect(() => {
        
        if(showToast)
        {
            console.log(showToast);
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }

    }, []);

    const handleSubmit = () => {
        dispatch(investorActions.deleteInvestor(token.accessToken, account.id));
        handleModalClose();
    }

    return (
        <Modal show={defaultVal} onHide={handleModalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you really want to remove {account && account.name} profile?
            </Modal.Body>
            <Modal.Footer>
                <Button className="submit_btn cancel_btn" onClick={handleModalClose}>
                    Cancel
                </Button>
                <Button className="submit_btn" onClick={handleSubmit}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AccountDeleteModalDialog;