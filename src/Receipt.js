import React from "react";
import Button from "./Button";

function Receipt(props) {
    return (
        <div className="container p-2 bg-warning text-dark">
            <div className="container p-4 bg-light text-dark ">
                <div class="p-3 mb-2 bg-warning text-dark">
                    <h3 className="text-center">Thank you for your order!</h3>
                    <div className="container p-4 bg-light text-dark ">
                        <h5 className="text-center">Here are your order details:</h5>
                    </div>
                </div>
                <div className="container p-4 bg-light text-dark "></div>
                <div className="row">

                    <div className="col">
                        <h4>Items ordered: {props.itemBought} pieces</h4>
                    </div>
                    <div className="col">
                        <h4>Total price: {props.totalSum}$</h4>
                    </div>
                </div>
                <div className="container p-4 bg-light text-dark "></div>
                <div className="text-center">
                    <Button getReceipt={props.getShop} buttonName={props.buttonName} />
                </div>
            </div>
        </div>
    )
}

export default Receipt;