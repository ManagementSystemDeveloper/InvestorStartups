import React from "react";
import {FaRegUserCircle} from 'react-icons/fa';
import {BsFillTrashFill, BsPencil, BsPlus} from 'react-icons/bs';
import {Badge, Button} from 'react-bootstrap';
import { IMAGE_URL } from '../../store/constants/index';
import { Link } from "react-router-dom";
function CompanyItem({company, index, deleteHandler, editHandler, addHandler})
{
    const url = "/update/list/?startup=" + company.id;
    const self_url = "/startup/all";
    return (
        <tr>
            <td> {index + 1} </td>
            <td> {company.name} </td>
            <td> <img src={ IMAGE_URL + company.logo} className = "preview-logo" alt="logo"/> </td>
            <td> <a href={company.website} target="_blank" rel="noreferrer"> {company.website} </a> </td>
            {
            company.updates.length > 0 &&
            <td> <Link to={url}> Updates </Link><Badge pill bg="danger"> { company.updates.length } </Badge></td>
            }
            {
            company.updates.length <= 0 &&
            <td> <Link to={self_url}> Updates </Link><Badge pill bg="danger"> { 0 } </Badge></td>
            }
            <td>
                <ul className="actions_part">
                    <li><Button variant="link" size="sm" onClick={() => editHandler(index)}><BsPencil/></Button></li>
                    <li><Button variant="link" size="sm" onClick={() => deleteHandler(index)}><BsFillTrashFill /></Button></li>
                </ul>
            </td>

            <td>
                <ul className="actions_part">
                    <li><Button variant="link" size="sm" onClick={() => addHandler(company.id)}><BsPlus /></Button></li>
                </ul>
            </td>

        </tr>
    );
}

export default CompanyItem;