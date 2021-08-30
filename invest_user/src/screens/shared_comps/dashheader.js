import React from "react";
import hd_logo from './../../assets/imgs/hd_logo.png';
import user from './../../assets/imgs/user.png';
import investment_icon from './../../assets/imgs/investment_icon.png';
import {Container, Nav, Dropdown, Navbar} from 'react-bootstrap';
import {BsTextLeft} from 'react-icons/bs';
function DashBoardHeader() {
return (<Navbar expand="lg">
      <Container >
        <Navbar.Brand
          href="#home"
          onClick={(e) => e.preventDefault()}
          className="mr-2">
          <img src={hd_logo} alt='logo'></img>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
        <BsTextLeft style={{color:'#fff'}}/>
          
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav mr-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="nav-active-link"
                href="/dashboard"
              >
                <span><img src={investment_icon} alt="investment"></img></span>
                Investment
              </Nav.Link>
            </Nav.Item>
            
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
              className="nav-active-link user_left"
                as={Nav.Link}
                data-toggle="dropdown"
                variant="default"
              >
                <i className="nc-icon nc-planet"></i>
                <span className="ml-1"> Welcome, <br/> <span>Josheph Smith </span></span>
              </Dropdown.Toggle>
              <div className="user_right"><img src={user} alt="logo"></img></div>
               <Dropdown.Menu>
                <Dropdown.Item
                  href="/change_password" >
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>);
}

export default DashBoardHeader;
