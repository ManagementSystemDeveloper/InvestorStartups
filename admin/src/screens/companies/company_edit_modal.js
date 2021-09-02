import { Modal, Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Files from 'react-files';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { companyActions, toastActions } from '../../store/actions';
import { IMAGE_URL } from '../../store/constants';

function CompanyEditModalDialog({beginWhere, defaultVal, closeHandler, startup = null})
{
    const token = useSelector(state => state.authReducer.token);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);

    const [logoFile, setLogoFile] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [companySite, setCompanySite] = useState('');

    const [isEdited, setIsEdited] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!isEdited && startup)
        {
            setLogoFile({
                preview: {
                    url: IMAGE_URL + startup.logo
                },
                original: 'yes'
            });
            setCompanyName(startup.name);
            setCompanySite(startup.website);
        }

        if(showToast)
        {
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }

    }, [isEdited, startup]);

    const handleEditModalClose = () => {
        setIsEdited(false);
        startup = null;
        closeHandler();
    }

    const onFilesChange = (files) => {
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
        setIsEdited(true);
    }

    const handleSubmit = (e) => {
        if(companyName.length === 0)
        {
            dispatch(toastActions.showToast("Company Name is required"));
            return;
        }

        if(companySite.length === 0)
        {
            dispatch(toastActions.showToast("Website URL is required"));
            return;
        }

        if(!logoFile)
        {
            dispatch(toastActions.showToast("Logo file is required"));
            return;
        }

        if(logoFile.original){
            dispatch(companyActions.updateCompany(token.accessToken, startup.id, companyName, companySite, beginWhere));
        } else {
            const formData = new FormData();
            formData.append("files", logoFile);
            formData.append("name", companyName);
            formData.append("website", companySite);
            formData.append("id", startup.id);
            dispatch(companyActions.updateCompanyWithFile(token.accessToken, formData, beginWhere));
        }
        handleEditModalClose();
    }

    const onChangeText = (e) => {
        const {name, value} = e.target;
        
        if(name === 'companyName')
        {
            setIsEdited(true);
            setCompanyName(value);
        }
        else if(name === 'companySite')
        {
            setIsEdited(true);
            setCompanySite(value);
        }
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
                            <img className="preview-upload-logo" src={ logoFile.preview.url } alt="logo preview"/>
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
                        <Form.Control type="text" name="companyName" value={companyName} onChange={(e) => onChangeText(e)} placeholder="ex: McDonald Company. Ltd" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Company Site</Form.Label>
                        <Form.Control type="text" name="companySite" value={companySite} onChange={(e) => onChangeText(e)} placeholder="ex: https://au.work180.co/" />
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

export default CompanyEditModalDialog;