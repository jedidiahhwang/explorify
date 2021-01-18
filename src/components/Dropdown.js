import React from "react";
import {useState} from "react";
import axios from "axios";
import {addGenre} from "../dux/genreReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const Dropdown = ((props) => {

    const [selectedValue, setSelectedValue] = useState("");

    const addGenre = ((e) => {
        e.preventDefault();

        axios
            .post("/api/addGenre", {selectedValue})
            .then((res) => {
                props.addGenre(res.data);
                props.history.push("/artists")
            })
    })

    return (
        <div>
            <select className="dropdown" value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                <option>Select a genre</option>
                {props.options.map((element, id) => 
                    <option 
                        key={id} 
                        value={element}
                    >
                        {element}
                    </option>
                )}
            </select>
            <p>{selectedValue}</p>
            <button 
                className="genre-button"
                onClick={addGenre}
            > 
                Let's Go 
            </button>
        </div>
    )
})

function mapStateToProps(reduxState) {
    return {...reduxState.user, ...reduxState.genre};
}

export default withRouter(connect(mapStateToProps, {addGenre})(Dropdown))