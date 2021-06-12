import React from 'react';
import "./deleteModule.scss"


function DeleteModule(props) {
    
    return (
        <>
            <span className="delete-module--grey-background"></span>
            <div className="delete-module">
                <input type="button" onClick={props.cancelDeleteModule} className="delete-module__close"/>
                <div>
                    <h1 className="delete-module__header" >Delete {props.order.name} order?</h1>
                    <p className="delete-module__message" >Please confirm that you'd like to delete the {props.order.name} form the list of orders. You won't be able to undo this action.</p>
                </div>
                <div className="delete-module__btn">
                    <button onClick={props.cancelDeleteModule} className="delete-module__btn-cancel"> Cancel</button>
                    <button onClick={props.removeDeleteModule} className="delete-module__btn-delete">Delete</button>
                </div>
            </div>
        </>
    );
}

export default DeleteModule;