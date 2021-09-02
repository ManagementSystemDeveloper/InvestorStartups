import React, { useEffect, useState } from 'react';
import Footer from '../../shared_comps/footer';
import './index.scss';
import SideBar from '../../shared_comps/sidebar';
import {Form, InputGroup, Button} from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import Files from 'react-files';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {FaFilePdf} from 'react-icons/fa';
import { NAV_STARTUP_ALL } from '../../../store/constants';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { updateAction, toastActions } from "../../../store/actions";
import DashBoardHeader from '../../shared_comps/dashheader';
import { NAV_INVESTOR_ADD, CREATE_DONE_SUCCESS, IMAGE_URL } from '../../../store/constants';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import { set, update } from 'lodash';

function EditStartUpdate() {
    const location = useLocation();

    const [update_id, setUpdateId] = useState('');
    const [startup, setStartup] = useState('');

    const [date, setDate] = useState(new Date());

    const [attachFile, setAttachFile] = useState(null);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const [title, setTitle] = useState('');
    const [firstUpdate, setFirstUpdate] = useState(true);

    
    const updateInfo = useSelector(state => state.updateReducer.update);
    const showLoading = useSelector(state => state.loadingReducer.loading_show);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);
    const token = useSelector(state => state.authReducer.token);
    const needFormClear = useSelector(state => state.createReducer.create_success_clear_form);

    const dispatch = useDispatch();

    useEffect(() => {
        const startup_query = queryString.parse(location.search);

        if(firstUpdate){
            if(startup_query.isEdit){
                setUpdateId(startup_query.update);
                setStartup(startup_query.startup);
            } else {
                setStartup(startup_query.startup);
            }
        }
        
        if(showToast)
        {
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }

        if(needFormClear)
        {
            setTitle('');
            setEditorState(EditorState.createEmpty());
            setDate(new Date());
            setAttachFile(null);
            dispatch({type:CREATE_DONE_SUCCESS, payload:false});
        }

        if(update_id && firstUpdate)
        {
            dispatch(updateAction.getUpdateById(token.accessToken, update_id));
        }

        if(updateInfo && firstUpdate){
            setTitle(updateInfo.title);
            setDate(new Date(updateInfo.date));

            const blocks = convertFromRaw(JSON.parse(updateInfo.content));
            setEditorState(EditorState.createWithContent(blocks));

            if(updateInfo.attachment){
                setAttachFile({original: 'yes'})
            }
            
            setFirstUpdate(false);
        }
    });

    const onChangeText = (e) => {
        const {name, value} = e.target;
        if(name === 'title')
        {
            setTitle(value);
        }
        else if(name === 'date')
        {
            setDate(new Date(date));
        }
    }

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if(title.length === 0)
        {
            dispatch(toastActions.showToast("Title is required"));
            return;
        }

        if(date.length === 0)
        {
            dispatch(toastActions.showToast("Date is required"));
            return;
        }

        const blocks = convertToRaw(editorState.getCurrentContent());
        const blocks_html = stateToHTML(editorState.getCurrentContent());
        
        if(blocks.length === 1 && blocks[0].text === ""){
            dispatch(toastActions.showToast("Content is required"));
            return;
        }

        const formData = new FormData();

        if(update_id){
            formData.append("id", update_id);
        }

        if(attachFile && !attachFile.original){
            formData.append("attachment", attachFile);
        }

        if(!attachFile){
            formData.append("attachment", "empty");
        }

        var date_info = new Date(date);
        var ap = '';
        var d = Number(date_info.getDate());
        var m = Number(date_info.getMonth()) + 1;
        var y = Number(date_info.getFullYear());
        var hour = Number(date_info.getHours());
        if(hour > 11) {
            hour = hour - 12;
            ap = 'PM';
        } else {
            ap = 'AM';
        }
        if(hour < 10) {
            hour = '0' + hour;
        }
        var min = Number(date_info.getMinutes());
        if(min < 10) {
            min = '0' + min; 
        }
        var full_date = m + '/' + d + '/' + y + ' ' + hour + ':' + min + ' ' + ap;
        
        formData.append("title", title);
        formData.append("content", JSON.stringify(blocks));
        formData.append("content_html", blocks_html);
        formData.append("date", full_date);
        formData.append("company_id", startup);

        dispatch(updateAction.addUpdate(formData, token.accessToken));
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

    const clickRemoveAttachHandler = () => {
        setAttachFile(null);
    }

    return (
        <>
        <SideBar activeItem={NAV_STARTUP_ALL}/>
        <div className="main_admin_part">
            <DashBoardHeader/>
            {/* <header>
                <div className="admin_header">
                    <div className="container-fluid">
                        <div className="hd_searchbox">
                            <input type="search" className="searchbox" placeholder="Search"/> 
                        </div>
                    </div>
                </div>
            </header> */}
        
            <section className="history_section main_page">
                <div className="container-fluid">
                    <div className="pg_title">
                        <h3>Create/Edit Update</h3>
                    </div>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            
                            <InputGroup hasValidation>
                                <Form.Control type="text" className="txtbox"  name="title" placeholder="enter the title of update" value={title} onChange={(e) => onChangeText(e)}/>    
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Publish Date </Form.Label>
                            <DateTimePicker
                                onChange={setDate}
                                value={date}
                                calendarIcon='Open'
                                clearIcon='Clear'
                                name="date"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Content </Form.Label>
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={onEditorStateChange}
                                name="content"
                                />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Attach Document</Form.Label>

                            {
                            attachFile && attachFile.original &&
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
                        <Button className="submit_btn" onClick={onFormSubmit}>
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