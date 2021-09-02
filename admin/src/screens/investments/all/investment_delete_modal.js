import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { investmentActions, toastActions } from '../../../store/actions';
import { toast } from 'react-toastify';

function InvestmentDeleteModalDialog({beginWhere, defaultVal, closeHandler, investment = null})
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
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }

    }, []);

    const handleSubmit = () => {
        dispatch(investmentActions.deleteInvestment(token.accessToken, investment.id, beginWhere));
        handleModalClose();
    }

    return (
        <Modal show={defaultVal} onHide={handleModalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Confirm dialog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you really want to remove this investment?
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

export default InvestmentDeleteModalDialog;