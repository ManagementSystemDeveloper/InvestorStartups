import React from "react";
import work_logo from '../../assets/imgs/work_logo.png';
import www from '../../assets/imgs/www.png';
function UpdateHistoryView()
{
    const array1 = [0,1,2,3,4];
    const getUpdateItem = (index) => {
        
        return (
            <div key={index} className="col-md-4">
                <div className="updt_inn">
                    <div className="updt_head">
                        <span><img src={work_logo} alt="company logo" /> </span>
                        <span className="updt_dt">14 FEBRUARY, 4:23 PM</span>
                    </div>
                    <div className="updt_cont">
                        <h3>Work180 Pty Ltd</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla, leo at posuere fringilla, nisl nisl dapibus ligula, sit amet euismod urna quam ut lacus. </p>
                        <div className="updt_link">
                            <a href="./">
                                <span><img src={www} alt="network"/>
                                </span>
                                <span>www.au.work180.co</span>
                            </a>
                        </div>
                        <div className="more_link">
                            <a href="./">More...</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
    return (
    <div className="updates_blocks">
        <div className="row">
            {array1.map((idx, value) => getUpdateItem(idx))}
        </div>
    </div>);
}

export default UpdateHistoryView;