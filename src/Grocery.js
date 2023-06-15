import React from "react";

function Grocery(props) {
    return (
        <div className="container">
            <div className="card mb-3" style={{ maxWidth: "400px" }} onClick={() => {
                props.handleClick(props.groceryName, props.price, props.image)}}>
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={props.image} className="card-img" alt=""/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.groceryName}</h5>
                            <h5 className="card-title">Price: {props.price}$</h5>
                            <h5 className="card-title"><small className="text-muted">{props.stock} pieces left</small></h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Grocery;