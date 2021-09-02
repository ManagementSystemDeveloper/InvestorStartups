import { Modal, Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { useDispatch, useSelector } from "react-redux";
import {BsCalendarFill} from 'react-icons/bs';
import { companyActions, investorActions, toastActions, investmentActions } from "../../../store/actions";
import { toast } from 'react-toastify';

function InvestmentEditModalDialog({beginWhere, defaultVal, closeHandler, investment = null})
{
    const token = useSelector(state => state.authReducer.token);
    const showToast = useSelector(state => state.toastReducer.toast_show);
    const toastMsg = useSelector(state => state.toastReducer.toast_msg);

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

    const [isEdited, setIsEdited] = useState(false);

    const dispatch = useDispatch();

    const handleEditModalClose = () => {
        setIsEdited(false);
        investment = null;
        closeHandler();
    }

    useEffect(() => {
        if(!isEdited && investment)
        {
            setDate(new Date(investment.issue_date));
            setUnits(investment.units);
            setClassOfUnits(investment.class_of_unit);
            setShares(investment.shares);
            setUnderlyingShareClass(investment.underlying_share_class);
            setUnitHolder(investment.unit_holder_id);
            setStartUp(investment.company_id);
        }

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

    }, [isEdited, investment]);

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

    const handleSubmit = (e) => {
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

        dispatch(investmentActions.updateInvestment(token.accessToken, investment.id, date, units, class_of_unit, shares, underlying_share_class, startUp, unit_holder, beginWhere));
        handleEditModalClose();
    }

    return (
        <Modal show={defaultVal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit Investment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                            <option value="">Choose...</option>
                            {
                                users.map((user, idx) => <option value={user.id} key={idx}> {user.name} </option>)
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>StartUp</Form.Label>
                        <Form.Select value={startUp} name="startUp" onChange={(e) => onChangeText(e)}>
                            <option value="">Choose...</option>
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

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="submit_btn cancel_btn" onClick={handleEditModalClose}>
                    Close
                </Button>
                <Button className="submit_btn" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InvestmentEditModalDialog;