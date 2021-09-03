import React, { useState, useEffect } from "react";
import {BsCloudDownload} from 'react-icons/bs';
import {Button} from 'react-bootstrap';
import { investmentActions } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

function StartUpEntryTabContent({item}) {
    
    const token = useSelector(state => state.authReducer.token);
    var filename = item.attachment.split('/');
    filename = filename[filename.length - 1];
   
    const [download_button, setDownloadButton] = useState(false);
    const [buttonName, setButtonName] = useState('Download Attach Document');

    const dispatch = useDispatch();

    useEffect(() => {

        if(download_button)
        {
            dispatch(investmentActions.download_file(token.accessToken, item._id, filename));
            setDownloadButton(false);
        }

    });

    const onClickAttachDownloadHandler = () => {
        setDownloadButton(true);
    }

    const changeName = () => {
        setButtonName(filename);
    }

    const changeToOrigin = () => {
        setButtonName('Download Attach Document');
    }

    return (
        <>
        {item?
        <div className="tab_changed_cont updt1 active">
            <div className="tab_cont_head">{ item.title }</div>
            <div className="tab_cont_dt">{ item.date }</div>
            <div className="email_tmplt" dangerouslySetInnerHTML={{__html: item.content_html}}>
            </div>
            <div className="attachments">
                { item.attachment &&
                    <Button className="submit_btn" onClick={ onClickAttachDownloadHandler } onMouseOver={ changeName } onMouseOut = { changeToOrigin }><BsCloudDownload/> { buttonName } </Button> 
                }
                { !item.attachment &&
                    <Button className="submit_btn" disabled><BsCloudDownload/> No Attach Document </Button> 
                }
            </div>
        </div>
        :<div className="tab_changed_cont updt1 active"></div>}
        </>
    );
}

export default StartUpEntryTabContent;