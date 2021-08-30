import React, { useState } from 'react';
import Footer from '../shared_comps/footer';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import './index.scss';
import SideBar from '../shared_comps/sidebar';
import Files from 'react-files';
import { NAV_STARTUP_ADD } from '../../store/constants';
function AddCompany()
{

    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companySite, setCompanySite] = useState('');
    const [logoFile, setLogoFile] = useState(null);

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
    }
    

    const onChangeText = (e) => {
        const {name, value} = e.target;
        if(name === 'company_name')
        {
            setCompanyName(value);
        }
        else if(name === 'company_site')
        {
            setCompanySite(value);
        }
    }

    return (
        <>
        <SideBar activeItem={NAV_STARTUP_ADD}/>
        <div className="main_admin_part">
            <header>
                <div className="admin_header">
                    <div className="container-fluid">
                        <div className="hd_searchbox">
                            <input type="search" className="searchbox" placeholder="Search"/> 
                        </div>
                    </div>
                </div>
            </header>
        
            <section className="main_page">
                <div className="container-fluid">
                    <div className="pg_title">
                        <h3>Create New Company</h3>
                    </div>
                    <Form className="center-form">

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
                        
                        <InputGroup>
                            <Form.Control type="text" className="txtbox"  name="company_name" value={companyName} onChange={(e) => onChangeText(e)} placeholder="ex: McDonald Company Ltd" />    
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Website</Form.Label>
                        
                        <InputGroup>
                            <Form.Control type="text" className="txtbox"  name="company_site" value={companySite} onChange={(e) => onChangeText(e)} placeholder="ex: https://au.work180.co/" />    
                        </InputGroup>
                    </Form.Group>


                    <Button className="submit_btn"> Create </Button>
                    </Form>
                </div>
            </section>
        
            <Footer/>
        </div>
        </>
    );
}

export default AddCompany;