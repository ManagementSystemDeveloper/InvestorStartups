import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import {BsCalendarFill} from 'react-icons/bs';

function InvestmentEditModalDialog({defaultVal, closeHandler})
{
    const [date, setDate] = useState(new Date());

    const handleEditModalClose = () => {
        closeHandler();
    }

    return (
        <Modal show={defaultVal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Investment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label> Issue Date </Form.Label>
                        <DatePicker
                            onChange={setDate}
                            value={date}
                            calendarIcon='Open'
                            clearIcon='Clear'
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label> Unit Holder </Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>StartUp</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Units</Form.Label>
                        <Form.Control type="text" className="txtbox" placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Class of Unit</Form.Label>
                        <Form.Control type="text" className="txtbox"  placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label> Shares </Form.Label>
                        <Form.Control type="text" className="txtbox" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Underlying Share Class </Form.Label>
                        <Form.Control type="text" className="txtbox" />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="submit_btn cancel_btn" onClick={handleEditModalClose}>
                    Close
                </Button>
                <Button className="submit_btn" onClick={handleEditModalClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InvestmentEditModalDialog;