import {Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
import { history } from './../helpers';
import { toast } from "react-toastify";
import LogIn from '../screens/login';
import RequestForgotPassword from '../screens/forgotpassword/requset_forgotpassword';
import ChangeForgetPassword from '../screens/forgotpassword/change_forgotpassword';
import UserDashBoard from '../screens/dashboard';
import ChangePassword from '../screens/changepassword/change_password';
import StartUpDetails from '../screens/startup_detail';
import { PrivateRoute } from './PrivateRoute';
import axios from 'axios';
import { Service } from 'axios-middleware';

function App() {
  toast.configure();  
  const service = new Service(axios);
  service.register({
    onRequest(config) {
      return config;
    },
    onSync(promise) {
      return promise;
    },
    onResponse(response) {
      return response;
    }
  });
  
  return (
          <Router history={history}>
            <Switch>
              <Route exact path='/login' component={LogIn}/>
              <PrivateRoute exact path='/forgotpass_req' component={RequestForgotPassword}/>
              <PrivateRoute exact path='/forgotpass_change' component={ChangeForgetPassword}/>
              <PrivateRoute exact path='/dashboard' component={UserDashBoard}/>
              <PrivateRoute exact path='/change_password' component={ChangePassword}/>
              <PrivateRoute exact path='/startup_update' component={StartUpDetails}/>
              <Redirect from="*" to="/login" />
            </Switch>
          </Router> 
  );
}

export default App;