import React from "react";
import {FaRegUserCircle} from 'react-icons/fa';
import {BsFillTrashFill} from 'react-icons/bs';
import {Button} from 'react-bootstrap';
import work180 from '../../../assets/images/work180.png';
function InvestmentItem({account, index, deleteHandler, editHandler})
{
    return (
        <tr>
            <td>{index + 1}</td>
            <td> Feb 14, 2018 </td>
            <td> Johndo smith </td>
            <td> <img src={work180} className="company-logo" alt="logo"/></td>
            <td> Work180 Pty Ltd </td>
            <td> 20,000 B Class Units	</td>
            <td> 5,714 Series Seed Preference Shares </td>
            <td>
                <ul className="actions_part">
                    <li><Button variant="link" size="sm" onClick={() => editHandler(index)}><FaRegUserCircle/></Button></li>
                    <li><Button variant="link" size="sm" onClick={() => deleteHandler(index)}><BsFillTrashFill /></Button></li>
                </ul>
            </td>
        </tr>
    );
}

export default InvestmentItem;