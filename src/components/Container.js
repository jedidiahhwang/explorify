import React, {useEffect, useState} from "react";
import axios from "axios";
import routes from "../routes";
import {withRouter} from "react-router-dom";

import Home from "./Home.js";

const Container = (props) => {
    
    return (
        <div className="container">
            {routes}
        </div>   
    )
}

export default Container