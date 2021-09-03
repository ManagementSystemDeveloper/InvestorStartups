import React from "react";
function StartUpEntryTabItem({isActive, item, onItemClickHandler})
{
    const generateArrowClassName = () => {
        return isActive ? "updt_tab updt_tab1 updt_arrow" : "updt_tab updt_tab1"
    }

    return (
        <div className={generateArrowClassName()} onClick = {() => onItemClickHandler(item)}>
            <div className="updt_content_part">
                <div className="updt_content_head"><span className="ct_hd_lft">{ item.title }</span><span className="ct_hd_rght">{ item.date }</span></div>
                <div className="updt_content_body" dangerouslySetInnerHTML={{ __html: item.content_html }}>
                </div>
            </div>
        </div>
    );
}

export default StartUpEntryTabItem;