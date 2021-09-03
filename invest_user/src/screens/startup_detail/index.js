import React, { useState, useEffect } from "react";
import DashBoardHeader from "../shared_comps/dashheader";
import Footer from "../shared_comps/footer";
import './index.scss';
import {Row} from 'react-bootstrap';
import StartUpEntryTabItem from './tab_item';
import StartUpEntryTabContent from './tab_content';
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import {FaInternetExplorer} from 'react-icons/fa';
import queryString from 'query-string';
import { investmentActions } from "../../store/actions/index";
import { IMAGE_URL } from '../../store/constants';
import _ from 'lodash';

function StartUpDetails(){

    const company_data = queryString.parse(window.location.href);
    const company_id = company_data[Object.keys(company_data)[0]];
    const userdata = useSelector(state => state.authReducer.user);

    const token = useSelector(state => state.authReducer.token);
    const investmentInfos = useSelector(state => state.investmentReducer.investments);
    const needUpdateDataProvider = useSelector(state => state.investmentReducer.needRefresh);

    const [updateInfos, setUpdateInfos] = useState([]);
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
            dispatch(investmentActions.getInvestmentByUserId(token.accessToken, userdata.id));
            setIsFirstLaunch(false);
        }

        if(needUpdateDataProvider)
        {
            var update_arr = [];
            for (let i = 0; i < investmentInfos.length; i++) {
                const investmentInfo = investmentInfos[i];
                
                if(investmentInfo.company_id === company_id){
                    for (let j = 0; j < investmentInfo.update_detail.length; j++) {
                        investmentInfo.update_detail[j].company_detail = investmentInfo.company_detail;
                        update_arr.push(investmentInfo.update_detail[j]);
                    }
                }
            }
            setUpdateInfos(update_arr);
            setUpdateDataProvider(_.chunk(update_arr, 3));
            dispatch(investmentActions.stopUpdateUI());
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
        const activeIndex = _.findIndex(updateDataProvider[currentPageIndex], ['_id', item._id]);
        setCurrentActiveArticleIndex(activeIndex);
    }

    const onChangePage = (pageIndex) => {
        setCurrentPageIndex(pageIndex.selected);
        setCurrentActiveArticleIndex(0);
    }

    return (
        <>
        <DashBoardHeader/>

        <>
        <section className="main_page">
            <div className="container">
                <Row>
                <div className="col-md-6">
                    <div className="pg_title">
                        <h3>Startup Updates</h3>
                    </div>
                    {
                        updateInfos && updateInfos.length > 0 &&    
                        <div className="startup_info">
                            <div className="updt1_info">
                                <img src={ image_src } alt="logo"/>
                                <div className="link_part"><a target="_blank" rel="noreferrer" href={ site_link }><FaInternetExplorer color="#01bef5"/> <span>{ site_link }</span></a></div>
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
            </div>
        </section>

        </>
        <Footer/>
        </>
    );
}
export default StartUpDetails;