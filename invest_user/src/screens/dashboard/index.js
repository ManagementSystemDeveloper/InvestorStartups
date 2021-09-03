import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../shared_comps/footer";
import DashBoardHeader from "../shared_comps/dashheader";
import { toast } from 'react-toastify';
import { Container } from "react-bootstrap";
import './index.scss';
import InvestHistoryTable from "./invest_history_table";
import UpdateHistoryView from "./update_history_view";
import { investmentActions, toastActions } from '../../store/actions';

function UserDashBoard()
{
    const userdata = useSelector(state => state.authReducer.user);
    const token = useSelector(state => state.authReducer.token);

    const investmentInfos = useSelector(state => state.investmentReducer.investments);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);

    const [firstLoad, setIsFirstLoad] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if(firstLoad)
        {
            dispatch(investmentActions.getInvestmentByUserId(token.accessToken, userdata.id));
            setIsFirstLoad(false);
        }

        if(showToast)
        {
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }


    }, [firstLoad, token, showToast]);

    return (<>    
    <DashBoardHeader/>
    
    <section className="history_section main_page">
		<Container>
            <div className="pg_title">
                <h3>{ userdata.name }</h3>
            </div>
            {
                investmentInfos && investmentInfos.length > 0 &&
                <InvestHistoryTable investments={investmentInfos} />
            }
            {   !investmentInfos &&
                <h6 className="no-investment">No investment</h6>
            }
		</Container>
	</section>
    
    <section className="updates_section">
        <Container>
            <div className="pg_title">
                <h3>Updates</h3>
            </div>
            {
                investmentInfos && investmentInfos.length > 0 &&
            <UpdateHistoryView investments={investmentInfos} user={userdata.id} />
            }
            {   !investmentInfos &&
                <h6 className="no-investment">No investment</h6>
            }
        </Container>
    </section>
    
    <Footer/>
    </>)
}

export default UserDashBoard;