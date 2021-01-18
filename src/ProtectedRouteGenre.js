import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const ProtectedRouteGenre = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest} 
            render={(props) => {
                if(rest.isLoggedIn && rest.genre !== null) {
                    return <Component {...props}/>;
                } else {
                    return <Redirect to={
                        {
                            pathname: "/genres",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                } 
            }}
        />
    )
}

function mapStateToProps(reduxState) {
    return reduxState.user;
}

export default connect(mapStateToProps)(ProtectedRouteGenre)