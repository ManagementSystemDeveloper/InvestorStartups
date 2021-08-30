import { Modal, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import Files from 'react-files';

function CompanyEditModalDialog({defaultVal, closeHandler})
{

    const [logoFile, setLogoFile] = useState(null);

    const handleEditModalClose = () => {
        closeHandler();
    }

    const onFilesChange = (files) => {
        console.log('file changes');
        console.log(files);
        if(files.length > 0) {
            setLogoFile(files[0]);
        }
        else {
            setLogoFile(null);
        }
    }

    const onFilesError = (err, file) => {
        console.log('file errr');
        console.log(err);
    }

    const clickImageHandler = () => {
        setLogoFile(null);
    }
    return (
        <Modal show={defaultVal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Company Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                   
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Logo</Form.Label>

                        {
                        logoFile &&
                        <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <img className="preview-upload-logo" src={logoFile.preview.url} alt="logo preview"/>
                        </Form.Group>
                        <Button className="btn-danger" size="sm" onClick={clickImageHandler}>Remove Image</Button>
                        </>
                        }

                        {
                        !logoFile &&
                        <Files
                            className='files-dropzone mt-4'
                            onChange={onFilesChange}
                            onError={onFilesError}
                            accepts={['image/*']}
                            multiple
                            maxFiles={1}
                            maxFileSize={100000000}
                            minFileSize={0}
                            clickable
                        >
                            Click Here or Drop Files Here
                        </Files>
                        }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" placeholder="ex: McDonald Company. Ltd" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Company Site</Form.Label>
                        <Form.Control type="text" placeholder="ex: https://au.work180.co/" />
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

export default CompanyEditModalDialog;