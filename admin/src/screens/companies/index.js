import React, { useState }  from "react";
import SideBar from '../shared_comps/sidebar';
import Footer from '../shared_comps/footer';
import CompanyItem from "./company_item";
import CompanyEditModalDialog from './company_edit_modal';
import CompanyDeleteModalDialog from './company_delete_modal';
import {history} from '../../helpers';

import './index.scss';
import { NAV_STARTUP_ALL } from "../../store/constants";
function CompanyAll()
{
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const companyInfos = [{},{},{}]
    
    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    }

    const handleEditModalClose = () => {
        setShowEditModal(false);
    }

    const onClickEditProfile = (index) => {
        setShowEditModal(true);
    }

    const onClickDeleteProfile = (index) => {
        setShowDeleteModal(true);
    }

    const onClickAddUpdateItem = (index) => {
        history.push({pathname:'/update/edit'});
    }
    
    return (
        <>
        <SideBar activeItem={NAV_STARTUP_ALL}/>
        <div className="main_admin_part">
            <header>
                <div className="admin_header">
                    <div className="container-fluid">
                        <div className="hd_searchbox">
                            <input type="search" className="searchbox" placeholder="Search"/> 
                        </div>
                    </div>
                </div>
            </header>
        
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
        
            <CompanyDeleteModalDialog defaultVal={showDeleteModal} closeHandler={handleDeleteModalClose}/>
            <CompanyEditModalDialog defaultVal={showEditModal} closeHandler={handleEditModalClose}/>
            <Footer/>
        </div>
        </>
    );
}

export default CompanyAll;