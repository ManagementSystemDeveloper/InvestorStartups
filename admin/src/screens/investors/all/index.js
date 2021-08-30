import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../shared_comps/footer';
import { Modal, Button, Form } from 'react-bootstrap';
import './index.scss';
import AccountItem from './account_item';
import SideBar from '../../shared_comps/sidebar';
import AccountEditModalDialog from './account_edit_modal';
import AccountDeleteModalDialog from './account_delete_modal';
import AccountPassChangeModalDialog from './account_change_pass_modal';
import { NAV_INVESTOR_ALL } from '../../../store/constants';
import DashBoardHeader from '../../shared_comps/dashheader';
import { useDispatch, useSelector } from "react-redux";
import { investorActions, toastActions } from '../../../store/actions';
import { toast } from 'react-toastify';

function AllInvestors() {
    const token = useSelector(state => state.authReducer.token);
    const accountInfos = useSelector(state => state.investorsReducer.investors);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);
    const [firstLoad, setIsFirstLoad] = useState(true);
    const [currentSelIdx, setCurrentSelIdx] = useState(-1);
    
    const dispatch = useDispatch();
    

    useEffect(() => {
        if(firstLoad)
        {
            dispatch(investorActions.getAllInvestor(token.accessToken));
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

    const handlePassModalClose = () => {
        setShowPassModal(false);
    }

    const onClickEditProfile = (index) => {
        setCurrentSelIdx(index);
        setShowEditModal(true);
    }

    const onClickDeleteProfile = (index) => {
        setCurrentSelIdx(index);
        setShowDeleteModal(true);
    }

    const onClickChangePassword = (index) => {
        setCurrentSelIdx(index);
        setShowPassModal(true);
    }

    return (
        <>
        <SideBar activeItem={NAV_INVESTOR_ALL}/>
        <div className="main_admin_part">
            <DashBoardHeader/>
        
            <section className="history_section main_page">
                <div className="container-fluid">
                    <div className="pg_title">
                        <h3>All Investors</h3>
                    </div>
                    
                    <div className="user_history table-responsive">
                        <table className="table table-striped history_table ">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col"> Investments </th>
                                    <th scope="col"> Startups </th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    accountInfos.map((value, idx) => <AccountItem key={idx} account = {value} index = {idx} deleteHandler = {onClickDeleteProfile} passwordHandler={onClickChangePassword} editHandler = {onClickEditProfile}/>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        
            <AccountDeleteModalDialog defaultVal={showDeleteModal} account = {accountInfos.length > 0 ? accountInfos[currentSelIdx] : null} closeHandler={handleDeleteModalClose}/>
            <AccountEditModalDialog defaultVal={showEditModal} account = {accountInfos.length > 0 ? accountInfos[currentSelIdx] : null} closeHandler={handleEditModalClose}/>
            <AccountPassChangeModalDialog defaultVal={showPassModal}  account = {accountInfos.length > 0 ? accountInfos[currentSelIdx] : null} closeHandler={handlePassModalClose}/>
            <Footer/>
        </div>
        </>
    );
}
export default AllInvestors;