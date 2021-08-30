import {Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { history } from './../helpers';
import { toast } from "react-toastify";
import LogIn from '../screens/login';
import AllInvestors from '../screens/investors/all';
import AddInvestor from '../screens/investors/add';
import AllInvestments from '../screens/investments/all';
import AddInvestment from '../screens/investments/add';
import CompanyAll from '../screens/companies';
import AddCompany from '../screens/companies/company_add';
import StartUpLists from '../screens/updates/lists';
import EditStartUpdate from '../screens/updates/add';
import { PrivateRoute } from './PrivateRoute';
import axios from 'axios';
import { Service } from 'axios-middleware';

function App() {
  toast.configure();  
  const service = new Service(axios);
  service.register({
    onRequest(config) {
      console.log('onRequest');
      return config;
    },
    onSync(promise) {
      console.log('onSync');
      return promise;
    },
    onResponse(response) {
      console.log('onResponse');
      return response;
    }
  });

  return (
          <Router history={history}>
            <Switch>
              <Route exact path='/login' component={LogIn}/>
              <PrivateRoute exact path='/investor/all' component={AllInvestors}/>
              <PrivateRoute exact path='/investor/add' component={AddInvestor}/>
              <PrivateRoute exact path='/startup/all' component={CompanyAll}/>
              <PrivateRoute exact path='/startup/add' component={AddCompany}/>
              <PrivateRoute exact path='/update/list' component={StartUpLists}/>
              <PrivateRoute exact path='/update/edit' component={EditStartUpdate}/>
              <PrivateRoute exact path='/invest/all' component={AllInvestments}/>
              <PrivateRoute exact path='/invest/add' component={AddInvestment}/>

              <Redirect from="*" to="/login" />
            </Switch>
          </Router> 
  );
}

export default App;