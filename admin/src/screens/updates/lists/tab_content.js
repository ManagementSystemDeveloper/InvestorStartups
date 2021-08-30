import React from "react";
import email_template from "../../../assets/images/email_template.png";
import {BsCloudDownload, BsPencil} from 'react-icons/bs';
import {Button} from 'react-bootstrap';

function StartUpEntryTabContent({item}) {
   
    const onClickAttachDownloadHandler = () => {
        alert('haha');
    }

    return (
        <>
        {item?
        <div className="tab_changed_cont updt1 active">
            <div className="tab_cont_head">{item.name}</div>
            <div className="tab_cont_dt">14 FEBRUARY, 4:23 PM</div>
            <div className="email_tmplt">
        
                <img src={email_template} alt="email"/>
        
            </div>
            <div className="attachments">
                <Button className="submit_btn"><BsCloudDownload/> Download Attach Document</Button> 
                <Button className="submit_btn cancel_btn mt-4 "><BsPencil/> Edit Startup Update</Button> 
            </div>
        </div>
        :<div className="tab_changed_cont updt1 active"></div>}
        </>
    );
}

export default StartUpEntryTabContent;