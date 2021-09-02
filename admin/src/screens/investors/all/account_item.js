import React from "react";
import {FaRegUserCircle} from 'react-icons/fa';
import {BsFillTrashFill, BsFillShieldLockFill} from 'react-icons/bs';
import {Button, Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function AccountItem({account, index, deleteHandler, editHandler, passwordHandler})
{
    const investment_url = "/invest/all/?user=" + account.id;
    const startup_url = "/startup/all/?user=" + account.id;
    return (
        <tr>
            <td>{index + 1}</td>
            <td> {account.name} </td>
            <td> {account.email} </td>
            {
                account.investments.length > 0 &&
                <td> <Link to={investment_url}> All Investments <Badge pill bg="primary"> { account.investments.length } </Badge> </Link></td>
            }
            {
                account.investments.length <= 0 &&
                <td> <Link to="/investor/all"> All Investments <Badge pill bg="primary"> { account.investments.length } </Badge> </Link></td>
            }
            {
                account.startups > 0 &&
                <td> <Link to={startup_url} className="danger"> All Startups <Badge pill bg="danger"> {account.startups} </Badge> </Link></td>
            }
            {
                account.startups <= 0 &&
                <td> <Link to="/investor/all" className="danger"> All Startups <Badge pill bg="danger"> {account.startups} </Badge> </Link></td>
            }
            <td>
                <ul className="actions_part">
                    <li><Button variant="link" size="sm" onClick={() => editHandler(index)}><FaRegUserCircle/></Button></li>
                    <li><Button variant="link" size="sm" onClick={() => deleteHandler(index)}><BsFillTrashFill /></Button></li>
                    <li><Button variant="link" size="sm" onClick={() => passwordHandler(index)}><BsFillShieldLockFill /></Button></li>
                </ul>
            </td>
        </tr>
    );
}

export default AccountItem;