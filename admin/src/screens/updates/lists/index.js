import React, { useState } from "react";
import Footer from "../../shared_comps/footer";
import work180 from "../../../assets/images/work180.png";

import {FaInternetExplorer} from 'react-icons/fa';
import './index.scss';
import {Row} from 'react-bootstrap';
import StartUpEntryTabItem from './tab_item';
import StartUpEntryTabContent from './tab_content';
import ReactPaginate from 'react-paginate';
import SideBar from '../../shared_comps/sidebar';
import { NAV_STARTUP_ALL } from '../../../store/constants';
function StartUpLists(){
    const [currentActiveArticle, setCurrentActiveArticle] = useState(null);

    const startUpHistoryEntries = [
        {
            id:'1',
            name:'WORK180 December 2018 Report',
            date:'14 APRIL, 4:23 PM',
            short_desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla, leo at posuere fringilla, nisl nisl dapibus ligula, sit amet euismod urna quam ut lacus.'
        },
        {
            id:'2',
            name:'WORK180 December 2018 Report',
            date:'14 APRIL, 4:23 PM',
            short_desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla, leo at posuere fringilla, nisl nisl dapibus ligula, sit amet euismod urna quam ut lacus.'
        },
        {
            id:'3',
            name:'WORK180 December 2018 Report',
            date:'14 APRIL, 4:23 PM',
            short_desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla, leo at posuere fringilla, nisl nisl dapibus ligula, sit amet euismod urna quam ut lacus.'
        },
        {
            id:'4',
            name:'WORK180 December 2018 Report',
            date:'14 APRIL, 4:23 PM',
            short_desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla, leo at posuere fringilla, nisl nisl dapibus ligula, sit amet euismod urna quam ut lacus.'
        }

    ];


    const startUpHistoryDetails = [
        {
            id:'1',
            name:'WORK180 December 2018 Report',
            date:'14 APRIL, 4:23 PM',
            short_desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla, leo at posuere fringilla, nisl nisl dapibus ligula, sit amet euismod urna quam ut lacus.'
        },
        {
            id:'2',
            name:'Unique Experience',
            date:'14 APRIL, 4:23 PM',
            short_desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla, leo at posuere fringilla, nisl nisl dapibus ligula, sit amet euismod urna quam ut lacus.'
        },
        {
            id:'3',
            name:'Crafting Virtual World',
            date:'14 APRIL, 4:23 PM',
            short_desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla, leo at posuere fringilla, nisl nisl dapibus ligula, sit amet euismod urna quam ut lacus.'
        },
        {
            id:'4',
            name:'WORK180 December 2018 Report',
            date:'14 APRIL, 4:23 PM',
            short_desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla, leo at posuere fringilla, nisl nisl dapibus ligula, sit amet euismod urna quam ut lacus.'
        }

    ];

    const onClickEntryHandler = (item) => {
        setCurrentActiveArticle(item);
    }


    const onChangePage = (pageIndex) => {
        
    }

    return (
        <>
        <SideBar activeItem={NAV_STARTUP_ALL}/>

        <>
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
            <section className="main_page update-list-content">
                <Row>
                    <div className="pg_title">
                        <h3>Startup Updates</h3>
                    </div>
                    <div className="col-md-6">
                        
                        <div className="startup_info">
                            <div className="updt1_info">
                                <img src={work180} alt="logo"/>
                                <div className="link_part"><a href="/"><FaInternetExplorer color="#01bef5"/> <span>www.au.work180.co</span></a></div>
                            </div>
                        </div>

                        <div className="updt_tabs">
                            {
                                startUpHistoryEntries.map((val, idx) => <StartUpEntryTabItem key={idx} item={val} isActive={currentActiveArticle && currentActiveArticle.id === val.id} onItemClickHandler = {onClickEntryHandler}/>)
                            }
                        </div>
                        
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
                            pageCount={3}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={onChangePage}
                            containerClassName={'pagination'}
                            initialPage = {0}
                            // forcePage={currentPageIndex}
                        />
                    </div>
                    <div className="col-md-6">
                    <div className="tab_content_main">
                        <div className="tab_inn_cont">
                            {
                                <StartUpEntryTabContent item={currentActiveArticle && startUpHistoryDetails[currentActiveArticle.id - 1]}/>
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