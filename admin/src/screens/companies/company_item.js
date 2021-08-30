import React from "react";
import {FaRegUserCircle} from 'react-icons/fa';
import {BsFillTrashFill, BsPencil, BsPlus} from 'react-icons/bs';
import {Badge, Button} from 'react-bootstrap';
// import work180 from '../../assets/images/work180.png';
import { Link } from "react-router-dom";
function CompanyItem({company, index, deleteHandler, editHandler, addHandler})
{
    return (
        <tr>
            <td>{index + 1}</td>
            <td> {company.name} </td>
            <td> <img src={company.logo} className = "preview-logo" alt="logo"/> </td>
            <td> <Link to=""> {company.website} </Link> </td>
            <td> <Link to="/update/list"> Updates </Link><Badge pill bg="danger"> 3 </Badge></td>
            <td>
                <ul className="actions_part">
                    <li><Button variant="link" size="sm" onClick={() => editHandler(index)}><BsPencil/></Button></li>
                    <li><Button variant="link" size="sm" onClick={() => deleteHandler(index)}><BsFillTrashFill /></Button></li>
                </ul>
            </td>

            <td>
                <ul className="actions_part">
                    <li><Button variant="link" size="sm" onClick={() => addHandler(index)}><BsPlus /></Button></li>
                </ul>
            </td>

        </tr>
    );
}

export default CompanyItem;