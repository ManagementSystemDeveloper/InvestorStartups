import React, {useState} from 'react';
import Footer from '../../shared_comps/footer';
import {BsTextLeft, BsArrowLeft, BsChevronDown, BsGear, BsFillTrashFill} from 'react-icons/bs';
import './index.scss';
import SideBar from '../../shared_comps/sidebar';
import {Form, Button} from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { NAV_INVEST_ADD } from '../../../store/constants';

function AllInvestment() {
    const [date, setDate] = useState(new Date());

    return (
        <>
        <div className="side_mobile_btn">
            <BsTextLeft className="dflt_img"/>
            <BsArrowLeft className="cancel_img"/>
        </div>
        <SideBar activeItem={NAV_INVEST_ADD}/>
        
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
                        <h3>Add Investment</h3>
                    </div>
                    
                    <div className="user_history table-responsive">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label> Issue Date </Form.Label>
                                <DatePicker
                                    onChange={setDate}
                                    value={date}
                                    calendarIcon='Open'
                                    clearIcon='Clear'
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label> Unit Holder </Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>StartUp</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Units</Form.Label>
                                <Form.Control type="text" className="txtbox" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Class of Unit</Form.Label>
                                <Form.Control type="text" className="txtbox"  placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label> Shares </Form.Label>
                                <Form.Control type="text" className="txtbox" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label> Underlying Share Class </Form.Label>
                                <Form.Control type="text" className="txtbox" />
                            </Form.Group>

                        </Form>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
        </>
    );
}
export default AllInvestment;