import React from "react";
import {Navbar,Button, Container, Nav} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/actions";

function DashBoardHeader() {

    const dispatch = useDispatch();
    const logoutUser = () => {
        dispatch(loginActions.logout());
    }
    return (
    <Navbar>
        <Container>
            <Nav className="me-auto">
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Button variant="link" onClick={ logoutUser }>Log Out</Button>
                </Navbar.Text>
            </Navbar.Collapse>
            </Nav>
        </Container>
    </Navbar>
    );
    }

export default DashBoardHeader;
