import React from "react";
import {FaRegUserCircle} from 'react-icons/fa';
import {BsFillTrashFill} from 'react-icons/bs';
import {Button} from 'react-bootstrap';
import { IMAGE_URL } from '../../../store/constants/index';

function InvestmentItem({investment, index, deleteHandler, editHandler})
{
    var str = investment.issue_date;
    var date = new Date(str);
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var issue_date = m + '/' + d + '/' + y;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{ issue_date }</td>
            <td>{ investment.user_detail.name }</td>
            <td> <img src={ IMAGE_URL + investment.company_detail.logo } className="company-logo" alt="logo"/></td>
            <td>{ investment.company_detail.name }</td>
            <td>{ investment.units }</td>
            <td>{ investment.shares }</td>
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