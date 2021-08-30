import React from 'react';
import {BsTextLeft, BsArrowLeft, BsChevronDown} from 'react-icons/bs';
import side_logo from '../../assets/images/side_logo.png';
import user from '../../assets/images/user.png';
import {NAV_INVESTOR_ALL, NAV_INVESTOR_ADD, NAV_STARTUP_ALL, NAV_STARTUP_ADD, NAV_INVEST_ALL, NAV_INVEST_ADD} from '../../store/constants';

function SideBar({activeItem})
{
    return (
        <>
        <div className="side_mobile_btn">
            <BsTextLeft className="dflt_img"/>
            <BsArrowLeft className="cancel_img"/>
        </div>
        <aside className="sidebar">
            <div className="sidebar_inn">
                <div className="side_logo">
                    <img src={side_logo} alt="" />
                </div>
                <div className="admin_title">
                    <span><img src={user} alt="user"/></span>
                    <span>Admin <BsChevronDown/> </span>
                </div>
                <div className="investors_links ">
                    <div className="inv_title">Investors</div>
                    <ul>
                        <li className={activeItem === NAV_INVESTOR_ALL ? "active":""}><a href="/investor/all">All Investors</a></li>
                        <li className={activeItem === NAV_INVESTOR_ADD ? "active":""}><a href="/investor/add">Add Investor</a></li>
                       
                    </ul>
                </div>

                <div className="investors_links startup_links">
                    <div className="inv_title">Startups</div>
                    <ul>
                        <li className={activeItem === NAV_STARTUP_ALL ? "active":""}><a href="/startup/all">All StartUps</a></li>
                        <li className={activeItem === NAV_STARTUP_ADD ? "active":""}><a href="/startup/add">Add StartUp</a></li>
                    </ul>
                </div>

                <div className="investors_links startup_links">
                    <div className="inv_title">Investments</div>
                    <ul>
                        <li className={activeItem === NAV_INVEST_ALL ? "active":""}><a href="/invest/all">All Investments</a></li>
                        <li className={activeItem === NAV_INVEST_ADD ? "active":""}><a href="/invest/add">Add Investment</a></li>
                    </ul>
                </div>
            </div>
        </aside>
        </>
    );
}

export default SideBar;