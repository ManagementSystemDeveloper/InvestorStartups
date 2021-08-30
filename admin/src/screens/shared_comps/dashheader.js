import React from "react";
import {Navbar,Button, Container, Nav} from 'react-bootstrap';
function DashBoardHeader() {
return (
<Navbar>
    <Container>
        <Nav className="me-auto">
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                <Button variant="link">Log Out</Button>
            </Navbar.Text>
        </Navbar.Collapse>
        </Nav>
    </Container>
</Navbar>
);
}

export default DashBoardHeader;
