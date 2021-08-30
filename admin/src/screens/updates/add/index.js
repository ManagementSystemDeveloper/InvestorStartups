import React, { useState } from 'react';
import Footer from '../../shared_comps/footer';
import './index.scss';
import SideBar from '../../shared_comps/sidebar';
import {Form, InputGroup, Button} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import Files from 'react-files';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {FaFilePdf} from 'react-icons/fa';
import { NAV_STARTUP_ALL } from '../../../store/constants';
function EditStartUpdate() {
    const [date, setDate] = useState(new Date());
    const [logoFile, setLogoFile] = useState(null);
    const [attachFile, setAttachFile] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const onFilesChange = (files) => {
        if(files.length > 0) {
            setLogoFile(files[0]);
        }
        else {
            setLogoFile(null);
        }
    }
    const onAttachFilesChange = (files) => {
        if(files.length > 0) {
            setAttachFile(files[0]);
        }
        else {
            setAttachFile(null);
        }
    }

    const onFilesError = (err, file) => {
        console.log('file errr');
        console.log(err);
    }
    const onAttachFilesError = (err, file) => {
        console.log('file errr');
        console.log(err);
    }

    const clickImageHandler = () => {
        setLogoFile(null);
    }

    const clickRemoveAttachHandler = () => {
        setAttachFile(null);
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }
    return (
        <>
        <SideBar activeItem={NAV_STARTUP_ALL}/>
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
        
            <section className="history_section main_page">
                <div className="container-fluid">
                    <div className="pg_title">
                        <h3>Create/Edit Update</h3>
                    </div>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            
                            <InputGroup hasValidation>
                                <Form.Control type="text" className="txtbox"  name="title" placeholder="enter the title of update" />    
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Publish Date </Form.Label>
                            <DateTimePicker
                                onChange={setDate}
                                value={date}
                                calendarIcon='Open'
                                clearIcon='Clear'
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Feature Image(This image will be placed in the end of Update Content)</Form.Label>

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
                            <Form.Label> Content </Form.Label>
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={onEditorStateChange}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Attach Document</Form.Label>

                            {
                            attachFile &&
                            <>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <FaFilePdf style={{width:48, height:48, color:'#ff0000', margin:8}}/>
                            </Form.Group>
                            <Button className="btn-danger" size="sm" onClick={clickRemoveAttachHandler}>Remove File</Button>
                            </>
                            }

                            {
                            !attachFile &&
                            <Files
                                className='files-dropzone mt-4'
                                onChange={onAttachFilesChange}
                                onError={onAttachFilesError}
                                accepts={['image/*', '.pdf']}
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
                        <Button className="submit_btn">
                            Create / Update
                        </Button>
                    </Form>
                </div>
            </section>
        
            <Footer/>
        </div>
        </>
    );
}
export default EditStartUpdate;