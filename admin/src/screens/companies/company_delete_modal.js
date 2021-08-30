import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';

function CompanyDeleteModalDialog({defaultVal, closeHandler})
{
    const handleModalClose = () => {
        closeHandler();
    }

    return (
        <Modal show={defaultVal} onHide={handleModalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Do you really want to remove this company?
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

export default CompanyDeleteModalDialog;