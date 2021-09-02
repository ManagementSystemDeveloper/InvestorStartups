import React, {useState, useEffect} from 'react';
import Footer from '../../shared_comps/footer';
import {BsTextLeft, BsArrowLeft, BsChevronDown, BsGear, BsFillTrashFill} from 'react-icons/bs';
import './index.scss';
import SideBar from '../../shared_comps/sidebar';
import {Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import DatePicker from 'react-date-picker';
import { NAV_INVEST_ADD } from '../../../store/constants';
import { toast } from 'react-toastify';
import { companyActions, investorActions, toastActions, investmentActions } from "../../../store/actions";
import { NAV_INVESTOR_ADD, CREATE_DONE_SUCCESS, GET_ALL_COMPANY_URL } from '../../../store/constants';
import DashBoardHeader from '../../shared_comps/dashheader';
import axios from "axios";
import getDefaultBearerConfig from "../../../helpers/axios_config";

function AddInvestment() {
    const showLoading = useSelector(state => state.loadingReducer.loading_show);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);
    const token = useSelector(state => state.authReducer.token);
    const needFormClear = useSelector(state => state.createReducer.create_success_clear_form);
    const compaines = useSelector(state => state.companyReducer.companies);
    const users = useSelector(state => state.investorsReducer.investors);

    const [unit_holder, setUnitHolder] = useState('');
    const [startUp, setStartUp] = useState('');

    const [date, setDate] = useState(new Date());
    const [units, setUnits] = useState('');
    const [class_of_unit, setClassOfUnits] = useState('');
    const [shares, setShares] = useState('');
    const [underlying_share_class, setUnderlyingShareClass] = useState('');

    const [alreadyFetchCompany, setAlreadyFetchCompany] = useState(false);
    const [alreadyFetchUser, setAlreadyFetchUser] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {

        if(showToast)
        {
            toast.error(toastMsg);
            dispatch(toastActions.hideToast());
        }

        if(compaines.length === 0 && !alreadyFetchCompany)
        {
            dispatch(companyActions.getAllCompany(token.accessToken));
            setAlreadyFetchCompany(true);
        }

        if(users.length === 0 && !alreadyFetchUser)
        {
            dispatch(investorActions.getAllInvestor(token.accessToken));
            
            setAlreadyFetchUser(true);
        }

        if(needFormClear)
        {
            setDate(new Date());
            setStartUp('def');
            setUnitHolder('def');
            setUnits('');
            setClassOfUnits('');
            setShares('');
            setUnderlyingShareClass('');
            dispatch({type:CREATE_DONE_SUCCESS, payload:false});
        }

    }, [showToast, toastMsg, needFormClear]);

    const onChangeText = (e) => {
        const {name, value} = e.target;

        if(name === 'date')
        {
            setDate(new Date(value));
        }
        else if(name === 'units')
        {
            setUnits(value);
        }
        else if(name === 'class_of_unit')
        {
            setClassOfUnits(value);
        }
        else if(name === 'shares')
        {
            setShares(value);
        }
        else if(name === 'underlying_share_class')
        {
            setUnderlyingShareClass(value);
        }
        else if(name === 'startUp')
        {
            setStartUp(value);
        }
        else if(name === 'unit_holder')
        {
            setUnitHolder(value);
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        if(date.length === 0)
        {
            dispatch(toastActions.showToast("Date is required"));
            return;
        }

        if(units.length === 0)
        {
            dispatch(toastActions.showToast("Units is required"));
            return;
        }

        if(class_of_unit.length === 0)
        {
            dispatch(toastActions.showToast("Class of unit is required"));
            return;
        }

        if(shares.length === 0)
        {
            dispatch(toastActions.showToast("Shares is required"));
            return;
        }

        if(underlying_share_class.length === 0)
        {
            dispatch(toastActions.showToast("Underlying Share Class is required"));
            return;
        }

        if(unit_holder.length === 0)
        {
            dispatch(toastActions.showToast("Please select Unit Holder"));
            return;
        }

        if(startUp.length === 0)
        {
            dispatch(toastActions.showToast("Please select Startup"));
            return;
        }

        dispatch(investmentActions.createInvestment(date, units, class_of_unit, shares, underlying_share_class, startUp, unit_holder, token.accessToken));
    }

    return (
        <>
        <div className="side_mobile_btn">
            <BsTextLeft className="dflt_img"/>
            <BsArrowLeft className="cancel_img"/>
        </div>
        <SideBar activeItem={NAV_INVEST_ADD}/>
        
        <div className="main_admin_part">
            <DashBoardHeader/>
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
                                    name='date'
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label> Unit Holder </Form.Label>
                                <Form.Select value={unit_holder} name="unit_holder" onChange={(e) => onChangeText(e)}>
                                    <option value="def">Choose...</option>
                                    {
                                        users.map((user, idx) => <option value={user.id} key={idx}> {user.name} </option>)
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>StartUp</Form.Label>
                                <Form.Select value={startUp} name="startUp" onChange={(e) => onChangeText(e)}>
                                    <option value="def">Choose...</option>
                                    {
                                        compaines.map((company, idx) => <option value={company.id} key={idx}> {company.name} </option>)
                                    }
                                    
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Units</Form.Label>
                                <Form.Control type="text" className="txtbox" placeholder="" name="units" value={units} onChange={(e) => onChangeText(e)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Class of Unit</Form.Label>
                                <Form.Control type="text" className="txtbox"  placeholder="" name="class_of_unit" value={class_of_unit} onChange={(e) => onChangeText(e)} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label> Shares </Form.Label>
                                <Form.Control type="text" className="txtbox" name="shares" value={shares} onChange={(e) => onChangeText(e)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label> Underlying Share Class </Form.Label>
                                <Form.Control type="text" className="txtbox" name="underlying_share_class" value={underlying_share_class} onChange={(e) => onChangeText(e)} />
                            </Form.Group>

                            <Button className="submit_btn" onClick={onFormSubmit}> Create Investment</Button>
                        </Form>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
        </>
    );
}
export default AddInvestment;