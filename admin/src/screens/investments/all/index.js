import React, { useState } from 'react';
import Footer from '../../shared_comps/footer';
import './index.scss';
import SideBar from '../../shared_comps/sidebar';
import InvestmentEditModalDialog from './investment_edit_modal';
import InvestmentDeleteModalDialog from './investment_delete_modal';
import InvestmentItem from './investment_item';
import { NAV_INVEST_ALL } from '../../../store/constants';
function AllInvestments() {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const investmentInfos = [{},{},{}]
    
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

    return (
        <>
        <SideBar activeItem={NAV_INVEST_ALL}/>
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
                                    investmentInfos.map((value, idx) => <InvestmentItem key={idx} account = {value} index = {idx} deleteHandler = {onClickDeleteProfile} editHandler = {onClickEditProfile}/>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        
            <InvestmentDeleteModalDialog defaultVal={showDeleteModal} closeHandler={handleDeleteModalClose}/>
            <InvestmentEditModalDialog defaultVal={showEditModal} closeHandler={handleEditModalClose}/>
            
            <Footer/>
        </div>
        </>
    );
}
export default AllInvestments;