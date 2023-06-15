import React from "react";

function Button(props) {
    return(
        <button type="button" class="btn btn-outline-warning btn-lg" onClick={props.getReceipt}>{props.buttonName}</button>
    )
}

export default Button;