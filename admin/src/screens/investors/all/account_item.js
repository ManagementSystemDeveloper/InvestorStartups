import React from "react";
import {FaRegUserCircle} from 'react-icons/fa';
import {BsFillTrashFill, BsFillShieldLockFill} from 'react-icons/bs';
import {Button, Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function AccountItem({account, index, deleteHandler, editHandler, passwordHandler})
{
    return (
        <tr>
            <td>{index + 1}</td>
            <td> {account.name} </td>
            <td> {account.email} </td>
            <td> {account.phone} </td>
            <td> <Link to="/"> All Investments <Badge pill bg="primary"> {account.investments} </Badge> </Link></td>
            <td> <Link to="/" className="danger"> All Startups <Badge pill bg="danger"> {account.startups} </Badge> </Link></td>
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