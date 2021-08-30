import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';

function InvestmentDeleteModalDialog({defaultVal, closeHandler})
{
    const handleModalClose = () => {
        closeHandler();
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
                <Button className="submit_btn" onClick={handleModalClose}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InvestmentDeleteModalDialog;