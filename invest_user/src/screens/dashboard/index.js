import React from "react";
import Footer from "../shared_comps/footer";
import DashBoardHeader from "../shared_comps/dashheader";

import { Container } from "react-bootstrap";
import './index.scss';

import InvestHistoryTable from "./invest_history_table";
import UpdateHistoryView from "./update_history_view";
function UserDashBoard()
{
    return (<>    
    <DashBoardHeader/>
    
    <section className="history_section main_page">
		<Container>
            <div className="pg_title">
                <h3>Joseph Smith</h3>
            </div>
            <InvestHistoryTable/>
		</Container>
	</section>
    
    <section className="updates_section">
        <Container>
            <div className="pg_title">
                <h3>Updates</h3>
            </div>
            <UpdateHistoryView/>
        </Container>
    </section>
    
    <Footer/>
    </>)
}

export default UserDashBoard;