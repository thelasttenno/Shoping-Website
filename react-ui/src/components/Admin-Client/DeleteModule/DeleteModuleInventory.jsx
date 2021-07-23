import React from "react";
import "./deleteModule.scss";

function DeleteModuleInventory(props) {
  return (
    <>
      <span className="delete-module--grey-background"></span>
      <div className="delete-module">
        <input
          type="button"
          onClick={props.cancelDeletePrompt}
          className="delete-module__close"
        />
        <div>
          <h1 className="delete-module__header">
            Delete {props.item.itemName} inventory item?
          </h1>
          <p className="delete-module__message">
            Please confirm that you'd like to delete {props.item.itemName} form
            the inventory list. You won't be able to undo this action.
          </p>
        </div>
        <div className="delete-module__btn">
          <button
            onClick={() => {
              props.cancelDeletePrompt();
            }}
            className="delete-module__btn-cancel"
          >
            {" "}
            Cancel
          </button>
          <button
            onClick={() => {
              props.confirmDelete(props.item);
            }}
            className="delete-module__btn-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteModuleInventory;
