
import React from 'react';
import arrow from "../../assets/Icons/arrow_back-24px.svg";
import errorIcon from"../../assets/Icons/error-24px.svg"

import './EditInventory.scss';

class EditInventory extends React.Component{

    state={
        orderName: this.props.inventory.orderName,
        itemName: this.props.inventory.itemName,
        description: this.props.inventory.description,
        category: this.props.inventory.category,
        status: this.props.inventory.status,
        quantity: this.props.inventory.quantity,

        itemNameError: false,
        descriptionError: false,
        quantityError:false,
        quantityVisible: this.props.inventory.status==='In Stock'? true: false,
        isValidQuantity: true,
        isValid: true,
        isFormSubmitted: false, 
    } 

    // handle change:

    handleChange =(event) =>{
        let x = event.target.name + 'Error'
        if(event.target.value === ''){ this.setState({[x]: true});}
        else { this.setState({[x]: false}); }
        // console.log(event.target.name);
        if(event.target.value==='Out of Stock') {
            this.setState({ quantityVisible: false, quantity: 0 })
        }
        else this.setState({ quantityVisible: true })
        this.setState({
            [event.target.name]: event.target.value
        })
    }

// Alert div after validation:

    Alert = () => <div className='input--errorContainer'>
                        <img src={errorIcon} alt="error" className='input--error-img' />
                        <span className='input--error-msg'>This field is required </span>
                  </div>

// Alert div (invisible)

AlertInvisible = () => <div className='input--errorContainer-invisible'>
                            <img src={errorIcon} alt="error" className='input--error-img' />
                            <span className='input--error-msg'>This field is required </span>
                        </div>

// Alert div for quantity:

AlertQuantity = () => <div className='input--errorContainer'>
                            <img src={errorIcon} alt="error" className='input--error-img'  />
                            <span className='input--error-msg'>Only numbers are required </span>
                        </div>
// Alert form valid:

AlertFormValid = () => <div className='input--formErrorContainer'>
                            <img src={errorIcon} alt="error" className='input--formError-img' />
                            <span className='input--formError-msg'>Form is incomplete. Complete the form!! </span>
                       </div>

// Quantity validation:

checkQuantity = () => {
    let regex = '^\\d+$';
    if(this.state.quantity){
        if(this.state.quantity.match(regex))  return true;
        else{
            this.setState({isValidQuantity: false});
            return false;
        }
    }else return true;
}
// Form validation check:

    isFormValid = () =>{
    if(this.state.itemNameError || this.state.descriptionError || !this.checkQuantity()) {
            this.setState({isValid: false});
            return false;
    }
    else{
        this.setState({isValid: true});
        return true;
    }
}

// Submit handle:

    editorderHandler = (event, id) =>{
        event.preventDefault();
        const newInventory = {...this.state};
        if(this.isFormValid()){
            this.setState({isFormSubmitted: true});
            this.props.handleEditInventory(id, newInventory); // passing data to parent
        }
    }
        
    render(){
            const id = this.props.match.params.inventoryId;
            const inventory = this.props.inventory;
            const categoryList = this.props.categoryList;
            const orderList = this.props.orderList;
            // console.log(inventory);

        return(
           
            <div className='editInventory'>
                <header className='editInventory__header'>
                    <a href='/admin/inventory' className='link link--arrow editInventory__arrow'>
                        <img className="" src={arrow} alt="arrow"/>
                    </a>
                    <h1 className="editInventory__heading">Edit Inventory Item</h1>
                </header>
                {this.state.isValid? '':this.AlertFormValid()}
                {this.state.isFormSubmitted? 
                <div className='editInventory__formSubmitted'>
                    <h3 className="editInventory__subheading"> Inventory is updated.</h3>
                    <a href = '/admin/inventory' className="link button button--success editInventory__btn-cancel ">Inventory</a>
                </div>:
                <form className='editInventory__form' 
                    onSubmit={(event) => {this.editorderHandler(event, id)}}>
                    <div className='editInventory__item-itemAvailablity-details'>
                    <div className= 'editInventory__item-details'>
                        <h3 className="editInventory__subheading">Item Details</h3>
                        <label htmlFor='inventory-itemName' className='input-label'>
                            Item Name
                        </label>
                        <input type='text' name='itemName' id='inventory-itemName'
                                className={`input ${this.state.itemNameError? 'input--error': ''}`}
                                defaultValue={inventory.itemName}
                                onChange={this.handleChange} 
                        />
                        {this.state.itemNameError? this.Alert(): this.AlertInvisible() }
                        <label htmlFor='inventory-desc' className='input-label'>
                            Description
                        </label>
                        <textarea type='text' name='description' id='inventory-desc'
                                className={`input input--desc ${this.state.descriptionError? 'input--error': ''}`}
                                defaultValue={inventory.description}
                                onChange={this.handleChange} 
                        />
                        {this.state.descriptionError? this.Alert(): this.AlertInvisible() }
                        <label htmlFor='inventory-category' className='input-label'>
                            Category
                        </label>
                        <select name='category' id='inventory-category'
                                className='input select' 
                                defaultValue={inventory.category}
                                onChange={this.handleChange} > 
                            {categoryList.map(category =>
                                    <option key={category} name= {category} value={category}>
                                        {category}
                                    </option>
                            )}
                        </select>
                    </div>
                    <div className= 'editInventory__item-availability'>
                        <h3 className="editInventory__subheading">Item Availability</h3>
                        <label className='input-label'>Status</label>
                        <div className='editInventory__radioGroup'>
                            <div className='editInventory__radioButton'>
                                <input type='radio' name='status' id='inventory-status-inStock'
                                        className='input radio' 
                                        value='In Stock'
                                        defaultChecked={inventory.status === 'In Stock'}
                                        onChange={this.handleChange}
                                />
                                <label htmlFor='inventory-status-inStock' className='input-label'>
                                    In Stock
                                </label>
                            </div>
                            <div className='editInventory__radioButton'>
                                <input type='radio' name='status' id='inventory-status-outStock'
                                        className='input radio' 
                                        value='Out of Stock'
                                        defaultChecked={inventory.status === 'Out of Stock'}
                                        onChange={this.handleChange}
                                />
                                <label htmlFor='inventory-status-outStock' className='input-label'>
                                    Out of Stock
                                </label>
                            </div>
                        </div>
                        {this.state.quantityVisible? 
                        <>
                            <label htmlFor='inventory-quantity' className='input-label'>
                                Quantity
                            </label>
                            <input type='text' name='quantity' id='inventory-quantity'
                                    className={`input ${this.state.quantityError? 'input--error': ''}`}
                                    defaultValue={this.state.quantity? inventory.quantity: 0}
                                    onChange={this.handleChange} 
                            />
                            {this.state.quantityError? this.Alert(): '' }
                            {this.state.isValidQuantity? this.AlertInvisible() : this.AlertQuantity()}
                        </>:
                        ''}
    
                        <label htmlFor='inventory-orderName' className='input-label'>
                            order
                        </label>
                        <select name='orderName' id='inventory-orderName'
                                className='input select' 
                                defaultValue={inventory.orderName}
                                onChange={this.handleChange} >
                            {orderList.map(order =>
                                    <option key={order} name= {order} value={order}
                                            defaultValue={inventory.orderName === order}>
                                        {order}
                                    </option>
                            )}
                        </select>
                    </div>
                    </div>
                    <div className="editInventory__btn-container">
                        <a href = '/admin/inventory' className="link button button--white editInventory__btn-cancel ">Cancel</a>
                        <button type="submit" className="button button--indigo editInventory__btn-save">
                            Save
                        </button>
                    </div> 
                </form> }
            </div>
        );
    };
};

export default EditInventory