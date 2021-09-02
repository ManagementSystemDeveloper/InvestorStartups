import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Footer from '../../shared_comps/footer';
import './index.scss';
import SideBar from '../../shared_comps/sidebar';
import InvestmentEditModalDialog from './investment_edit_modal';
import InvestmentDeleteModalDialog from './investment_delete_modal';
import InvestmentItem from './investment_item';
import { investmentActions, toastActions } from '../../../store/actions';
import { NAV_INVEST_ALL } from '../../../store/constants';
import { toast } from 'react-toastify';
import DashBoardHeader from '../../shared_comps/dashheader';
import queryString from 'query-string';

function AllInvestments() {

    const investment_data = queryString.parse(window.location.href);
    const user_id = investment_data[Object.keys(investment_data)[0]];

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const token = useSelector(state => state.authReducer.token);
    const investmentInfos = useSelector(state => state.investmentReducer.investments);

    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);

    const [firstLoad, setIsFirstLoad] = useState(true);
    const [currentSelIdx, setCurrentSelIdx] = useState(-1);
    const [bw, setBw] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if(firstLoad)
        {
            if(user_id){
                dispatch(investmentActions.getInvestmentByUserId(token.accessToken, user_id));
                setBw(user_id);
            } else {
                dispatch(investmentActions.getAllInvestment(token.accessToken));
            }
            setIsFirstLoad(false);
        }

        if(showToast)
        {
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }


    }, [firstLoad, token, showToast]);
    
    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    }

    const handleEditModalClose = () => {
        setShowEditModal(false);
    }

    const onClickEditProfile = (index) => {
        setCurrentSelIdx(index);
        setShowEditModal(true);
    }

    const onClickDeleteProfile = (index) => {
        setCurrentSelIdx(index);
        setShowDeleteModal(true);
    }

    return (
        <>
        <SideBar activeItem={NAV_INVEST_ALL}/>
        <div className="main_admin_part">
            <DashBoardHeader/>
            {/* <header>
                <div className="admin_header">
                    <div className="container-fluid">
                        <div className="hd_searchbox">
                            <input type="search" className="searchbox" placeholder="Search"/> 
                        </div>
                    </div>
                </div>
            </header> */}
        
            <section className="history_section main_page">
                <div className="container-fluid">
                    <div className="pg_title">
                        <h3>All Investments</h3>
                    </div>
                    
                    <div className="user_history table-responsive">
                        <table className="table table-striped history_table ">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Unit Holder</th>
                                    <th scope="col">Logo</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Ashpeak Units</th>
                                    <th scope="col">Startup Shares</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    investmentInfos.map((value, idx) => <InvestmentItem key={idx} investment = {value} index = {idx} deleteHandler = {onClickDeleteProfile} editHandler = {onClickEditProfile}/>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        
            <InvestmentDeleteModalDialog beginWhere={ bw } defaultVal={showDeleteModal} investment = {investmentInfos.length > 0 ? investmentInfos[currentSelIdx] : null} closeHandler={handleDeleteModalClose}/>
            <InvestmentEditModalDialog beginWhere={ bw } defaultVal={showEditModal} investment = {investmentInfos.length > 0 ? investmentInfos[currentSelIdx] : null} closeHandler={handleEditModalClose}/>
            
            <Footer/>
        </div>
        </>
    );
}
export default AllInvestments;