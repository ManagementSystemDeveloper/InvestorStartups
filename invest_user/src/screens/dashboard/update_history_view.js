import React from "react";
import { Link } from "react-router-dom";
import www from '../../assets/images/www.png';
import { IMAGE_URL } from '../../store/constants';

function UpdateHistoryView({ investments, user })
{
    const getUpdateItem = (investment, index) => {
        if(investment.unit_holder_id === user){
            const updates = investment.update_detail;
            for (let i = 0; i < updates.length; i++) {
                const update = updates[i];
                const url = '/startup_update?startup=' + investment.company_id;
                
                return (
                    <div key={index} className="col-md-4">
                        <div className="updt_inn">
                            <div className="updt_head">
                                <span><img width="150" height="100" src={ IMAGE_URL + investment.company_detail.logo } alt="company logo" /> </span>
                                <span className="updt_dt">{ update.date }</span>
                            </div>
                            <div className="updt_cont">
                                <h3>{ investment.company_detail.name }</h3>
                                <div dangerouslySetInnerHTML={{ __html: update.content_html }}></div>
                                <div className="updt_link">
                                    <a href={ investment.company_detail.website } target="_blank" rel="noreferrer">
                                        <span><img src={ www } alt="network"/>
                                        </span>
                                        <span>{ investment.company_detail.website }</span>
                                    </a>
                                </div>
                                <div className="more_link">
                                    <Link to={ url }>More...</Link>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                );
            }
        }
    }
    return (
    <div className="updates_blocks">
        <div className="row">
            { investments.map((investment, idx) => getUpdateItem(investment, idx)) }
        </div>
    </div>);
}

export default UpdateHistoryView;