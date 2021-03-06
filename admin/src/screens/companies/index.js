import React, { useEffect, useState }  from "react";
import SideBar from '../shared_comps/sidebar';
import Footer from '../shared_comps/footer';
import CompanyItem from "./company_item";
import { useDispatch, useSelector } from "react-redux";
import { companyActions, toastActions } from '../../store/actions';
import CompanyEditModalDialog from './company_edit_modal';
import CompanyDeleteModalDialog from './company_delete_modal';
import {history} from '../../helpers';
import DashBoardHeader from '../shared_comps/dashheader';
import { toast } from 'react-toastify';
import queryString from 'query-string';

import './index.scss';
import { NAV_STARTUP_ALL } from "../../store/constants";
function CompanyAll()
{
    const startup_data = queryString.parse(window.location.href);
    const user_id = startup_data[Object.keys(startup_data)[0]];

    const token = useSelector(state => state.authReducer.token);
    const companyInfos = useSelector(state => state.companyReducer.companies);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [firstLoad, setIsFirstLoad] = useState(true);

    const [currentSelIdx, setCurrentSelIdx] = useState(-1);
    const [bw, setBw] = useState(null);

    useEffect(() => {
        if(firstLoad)
        {
            if(user_id){
                dispatch(companyActions.getCompanyByUserId(token.accessToken, user_id));
                setBw(user_id);
            } else {
                dispatch(companyActions.getAllCompany(token.accessToken));
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

    const onClickAddUpdateItem = (index) => {
        var query = '?startup=' + index;
        history.push({pathname:'/update/edit', search: query});
    }

    const dispatch = useDispatch();
    
    return (
        <>
        <SideBar activeItem={NAV_STARTUP_ALL}/>
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
                        <h3>All Startups</h3>
                    </div>
                    
                    <div className="user_history table-responsive">
                        <table className="table table-striped history_table ">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Comapny Name</th>
                                    <th scope="col">Logo</th>
                                    <th scope="col">WebSite</th>
                                    <th scope="col">Updates</th>
                                    <th scope="col">Actions</th>
                                    <th scope="col">Add Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    companyInfos.map((value, idx) => <CompanyItem key={idx} company = {value} index = {idx} deleteHandler = {onClickDeleteProfile} addHandler={onClickAddUpdateItem} editHandler = {onClickEditProfile}/>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        
            <CompanyDeleteModalDialog beginWhere={ bw } defaultVal={showDeleteModal} startup = {companyInfos.length > 0 ? companyInfos[currentSelIdx] : null} closeHandler={handleDeleteModalClose}/>
            <CompanyEditModalDialog beginWhere={ bw } defaultVal={showEditModal} startup = {companyInfos.length > 0 ? companyInfos[currentSelIdx] : null} closeHandler={handleEditModalClose}/>
            <Footer/>
        </div>
        </>
    );
}

export default CompanyAll;