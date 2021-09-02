import React, { Component, useEffect, useState } from "react";
import Footer from "../../shared_comps/footer";
import { IMAGE_URL } from '../../../store/constants';

import {FaInternetExplorer} from 'react-icons/fa';
import './index.scss';
import {Row} from 'react-bootstrap';
import StartUpEntryTabItem from './tab_item';
import StartUpEntryTabContent from './tab_content';
import ReactPaginate from 'react-paginate';
import SideBar from '../../shared_comps/sidebar';
import { NAV_STARTUP_ALL } from '../../../store/constants';
import queryString from 'query-string';
import { useDispatch, useSelector } from "react-redux";
import { updateAction } from "../../../store/actions/index";
import _ from 'lodash';
import DashBoardHeader from '../../shared_comps/dashheader';

function StartUpLists() {
   
    const company_data = queryString.parse(window.location.href);
    const company_id = company_data[Object.keys(company_data)[0]];

    const token = useSelector(state => state.authReducer.token);
    const updateInfos = useSelector(state => state.updateReducer.updates);
    const needUpdateDataProvider = useSelector(state => state.updateReducer.needRefresh);

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [currentActiveArticleIndex, setCurrentActiveArticleIndex] = useState(0);
    const [isFirstLaunch, setIsFirstLaunch] = useState(true);
    const [updateDataProvider, setUpdateDataProvider] = useState([]);
    const [image_src, setImageSrc] = useState('');
    const [site_link, setSiteLink] = useState('');

    const dispatch = useDispatch();


    useEffect(() => {

        if(isFirstLaunch)
        {
            dispatch(updateAction.getUpdatesByStartUpId(token.accessToken, company_id));
            setIsFirstLaunch(false);
        }

        if(needUpdateDataProvider)
        {
            setUpdateDataProvider(_.chunk(updateInfos, 3));
            dispatch(updateAction.stopUpdateUI());
            setCurrentPageIndex(0);
        }

        if(updateInfos && updateInfos.length > 0 && updateDataProvider && updateDataProvider.length > 0) {
            const image_url = IMAGE_URL + updateDataProvider[currentPageIndex][currentActiveArticleIndex].company_detail.logo;
            const link_address = updateDataProvider[currentPageIndex][currentActiveArticleIndex].company_detail.website;
            setImageSrc(image_url);
            setSiteLink(link_address);
        }
    });
    
    const onClickEntryHandler = (item) => {
        const activeIndex = _.findIndex(updateDataProvider[currentPageIndex], ['id', item.id]);
        setCurrentActiveArticleIndex(activeIndex);
    }


    const onChangePage = (pageIndex) => {
        setCurrentPageIndex(pageIndex.selected);
        setCurrentActiveArticleIndex(0);
    }

    return (
        <>
        <SideBar activeItem={NAV_STARTUP_ALL}/>

        <>
        <div className="main_admin_part">
            {/* <header>
                <div className="admin_header">
                    <div className="container-fluid">
                        <div className="hd_searchbox">
                            <input type="search" className="searchbox" placeholder="Search"/> 
                        </div>
                    </div>
                </div>
            </header> */}
            <DashBoardHeader/>
            <section className="main_page update-list-content">
                <Row>
                    <div className="pg_title">
                        <h3>Startup Updates</h3>
                    </div>
                    <div className="col-md-6">
                        {
                            updateInfos && updateInfos.length > 0 &&
                        
                        <div className="startup_info">
                            <div className="updt1_info">
                                <img src={ image_src } alt="logo"/>
                                <div className="link_part"><a href={ site_link } target="_blank" rel="noreferrer"><FaInternetExplorer color="#01bef5"/> <span>{ site_link }</span></a></div>
                            </div>
                        </div>
                        }
                        <div className="updt_tabs">
                        {
                            updateDataProvider && updateDataProvider[currentPageIndex] && updateDataProvider[currentPageIndex].map((val, idx) => <StartUpEntryTabItem key={idx} item={val} isActive={idx === currentActiveArticleIndex} onItemClickHandler = {onClickEntryHandler}/>)
                        }
                        </div>
                        {updateInfos && 
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            activeClassName={'active'}
                            pageCount={updateDataProvider.length}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={onChangePage}
                            containerClassName={'pagination'}
                            initialPage = {currentPageIndex}
                            forcePage={currentPageIndex}
                        />
                        }
                    </div>
                    <div className="col-md-6">
                    <div className="tab_content_main">
                        <div className="tab_inn_cont">
                            {
                                updateDataProvider && updateDataProvider[currentPageIndex] && updateDataProvider[currentPageIndex].map((val, idx) => {
                                    if(idx === currentActiveArticleIndex){
                                        return <StartUpEntryTabContent key={idx} item={val}/>
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                </Row>
                <div className="clearfix"></div>
            </section>
        </div>

        </>
        <Footer/>
        </>
    );
}
export default StartUpLists;