import React from "react";
import {Container} from "react-bootstrap";

function Footer() {
    return (
    <footer>
        <Container>
            <div className="ft_cont">
                <ul>
                    <li>Copyright © 2021 Ashpeak Investments. All Rights Reserved </li>
                    <li><a href="/">Privacy Policy</a></li>
                </ul>
            </div>
        </Container>
    </footer>);
}

export default Footer;