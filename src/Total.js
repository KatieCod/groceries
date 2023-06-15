import React from "react";
import Button from "./Button";

function Total(props) {
    return (
        <div className="container p-5 mb-2 bg-secondary text-white">
            <div className="row justify-content-center">
                <div className="row">
                    <div className="col">
                        <h3>Total:</h3>
                    </div>
                    <div className="col">
                        <h3>{props.countTotal}$</h3>
                    </div>
                    <div className="col">
                        <Button getReceipt={props.getReceipt} buttonName={props.buttonName}/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Total;