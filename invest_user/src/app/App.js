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
function App() {
  toast.configure();
  
  return (
          <Router history={history}>
            <Switch>
              <Route exact path='/login' component={LogIn}/>
              <Route exact path='/forgotpass_req' component={RequestForgotPassword}/>
              <Route exact path='/forgotpass_change' component={ChangeForgetPassword}/>
              <Route exact path='/dashboard' component={UserDashBoard}/>
              <Route exact path='/change_password' component={ChangePassword}/>
              <Route exact path='/startup_update' component={StartUpDetails}/>
              <Redirect from="*" to="/login" />
            </Switch>
          </Router> 
  );
}

export default App;