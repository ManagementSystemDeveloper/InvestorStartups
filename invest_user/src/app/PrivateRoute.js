import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, roles, ...rest }) {
    const user = useSelector(state => state.authReducer.user);
    const token = useSelector(state => state.authReducer.token);

    return (
        <Route {...rest} render={props => {
            if (!user || !token) {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
            return <Component {...props} />
        }} />
    );
}

export { PrivateRoute };