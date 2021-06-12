
import React from 'react';
import arrow from "../../assets/Icons/arrow_back-24px.svg";
import errorIcon from"../../assets/Icons/error-24px.svg"

import './EditWarehouse.scss';

class EditWarehouse extends React.Component{

    state={

        name: this.props.warehouse.name,
        address: this.props.warehouse.address,
        city: this.props.warehouse.city,
        country: this.props.warehouse.country,
        contactName: this.props.warehouse.contact.name,
        contactPosition: this.props.warehouse.contact.position,
        contactPhone: this.props.warehouse.contact.phone,
        contactEmail: this.props.warehouse.contact.email,
        
        nameError: false,
        addressError: false,
        cityError: false,
        countryError: false,
        contactNameError: false,
        contactPositionError: false,
        contactPhoneError: false,
        contactEmailError: false,
        isValid: true,
        isValidPhoneNumber: true,
        isValidEmail: true,
        isFormSubmitted: false,  

    } 

// handle change:

    handleChange =(event) =>{
        let x = event.target.name + 'Error'
        if(event.target.value === ''){
            this.setState({[x]: true});
        }
        else {
            this.setState({[x]: false});
        }
        this.setState({[event.target.name]: event.target.value })
    }

// Alert div after validation:

    Alert = () => <div className='input--errorContainer'>
                    <img src={errorIcon} alt="error" className='input--error-img' />
                    <span className='input--error-msg'>This field is required </span>
                 </div>

// Alert div for email:

    AlertEmail = () => <div className='input--errorContainer'>
                            <img src={errorIcon} alt="error" className='input--error-img' />
                            <span className='input--error-msg'>Enter a valid email </span>
                        </div>

// Alert div for phonenumber:

    AlertPhoneNumber = () => <div className='input--errorContainer'>
                        <img src={errorIcon} alt="error" className='input--error-img'  />
                        <span className='input--error-msg'>Required format +1 (123) 123-1234 </span>
                    </div>

// Alert div (invisible)

    AlertInvisible = () => <div className='input--errorContainer-invisible'>
                    <img src={errorIcon} alt="error" className='input--error-img' />
                    <span className='input--error-msg'>This field is required </span>
                </div>

// Alert form valid:

    AlertFormValid = () => <div className='input--formErrorContainer'>
                            <img src={errorIcon} alt="error" className='input--formError-img' />
                            <span className='input--formError-msg'>Form is incomplete. Complete the form!! </span>
                        </div>

// Email validation:

    checkValidEmail = () => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            .test(this.state.contactEmail)) {
                return true;
            }
        else{
            this.setState({isValidEmail: false});
            return false;
        }
    } 

// Phone number validation:

    checkPhoneNumber = () => {
        let phoneRegex = /^\+1?\s\(\d{3}\)\s\d{3}-\d{4}$/;
        if(this.state.contactPhone.match(phoneRegex)){
            return true;
        }
        else{
            this.setState({isValidPhoneNumber: false});
            return false;
        }
    }
// Form validation:

    isFormValid = () => {
        if(this.state.nameError || this.state.addressError ||
            this.state.cityError || this.state.countryError ||
            this.state.contactNameError || this.state.contactPositionError ||
            this.state.contactPhoneError || this.state.contactEmailError || !this.checkValidEmail() ||
            !this.checkPhoneNumber()) {
                this.setState({isValid: false});
                return false;
        }
        else{
            this.setState({isValid: true});
            return true;
        }
    }


// Submit handle:

    editWareHouseHandler = (event, id) =>{
        event.preventDefault();
        
        const newWarehouseData = {...this.state};
        if(this.isFormValid()){
            this.setState({isFormSubmitted: true});
            this.props.handleEditWareHouse(id, newWarehouseData);
        }
    }
        
    render(){
        const warehouse = {...this.props.warehouse}
        
        return(
            <div className='editWareHouse'>
                <header className='editWareHouse__header'>
                    <a href='/warehouses' className='link link--arrow editWareHouse__arrow'>
                        <img className="" src={arrow} alt="arrow"/>
                    </a>
                    <h1 className="editWareHouse__heading">Edit Warehouse</h1>
                </header>
                {this.state.isValid? '':this.AlertFormValid()}
                {this.state.isFormSubmitted? 
                <div className='editWareHouse__formSubmitted'>
                    <h3 className="editWareHouse__subheading"> Wearhouse is edited.</h3>
                    <a href = '/warehouses' className="link button button--success editWareHouse__btn-cancel ">Warehouses</a>
                </div>:
                <form className='editWareHouse__form' 
                    onSubmit={(event) => {this.editWareHouseHandler(event, warehouse.id)}}>
                    <div className='editWareHouse__warehouse-contact-details'>
                        <div className= 'editWareHouse__warehouse-details'>
                            <h3 className="editWareHouse__subheading">Warehouse Details</h3>
                            <label htmlFor='warehouse-name' className='input-label'>
                                Warehouse Name
                            </label>
                            <input type='text' name='name' id='warehouse-name'
                                    className={`input ${this.state.nameError? 'input--error': ''}`} 
                                    defaultValue={warehouse.name}
                                    onChange={this.handleChange} 
                            />
                            {this.state.nameError? this.Alert(): this.AlertInvisible() }
                            <label htmlFor='warehouse-address' className='input-label'>
                                Street Address
                            </label>
                            <input type='text' name='address' id='warehouse-address'
                                    className={`input ${this.state.addressError? 'input--error': ''}`}  
                                    defaultValue={warehouse.address}
                                    onChange={this.handleChange} 
                            />
                            {this.state.addressError? this.Alert(): this.AlertInvisible() }
                            <label htmlFor='warehouse-city' className='input-label'>
                                City
                            </label>
                            <input type='text' name='city' id='warehouse-city'
                                    className={`input ${this.state.cityError? 'input--error': ''}`}  
                                    defaultValue={warehouse.city}
                                    onChange={this.handleChange} 
                            />
                            {this.state.cityError? this.Alert(): this.AlertInvisible() }
                            <label htmlFor='warehouse-country' className='input-label'>
                                Country
                            </label>
                            <input type='text' name='country' id='warehouse-country'
                                    className={`input ${this.state.countryError? 'input--error': ''}`}  
                                    defaultValue={warehouse.country}
                                    onChange={this.handleChange} 
                            />
                            {this.state.countryError? this.Alert(): this.AlertInvisible() }
                        </div>
                        <div className= 'editWareHouse__contact-details'>
                            <h3 className="editWareHouse__subheading">Contact Details</h3>
                            <label htmlFor='warehouse-contactName' className='input-label'>
                                Contact Name
                            </label>
                            <input type='text' name='contactName' id='warehouse-contactName'
                                    className={`input ${this.state.contactNameError? 'input--error': ''}`}  
                                    defaultValue={warehouse.contact.name}
                                    onChange={this.handleChange} 
                            />
                            {this.state.contactNameError? this.Alert(): this.AlertInvisible() }
                            <label htmlFor='warehouse-position' className='input-label'>
                                Position
                            </label>
                            <input type='text' name='contactPosition' id='warehouse-position'
                                    className={`input ${this.state.contactPositionError? 'input--error': ''}`}  
                                    defaultValue={warehouse.contact.position}
                                    onChange={this.handleChange} 
                            />
                            {this.state.contactPositionError? this.Alert(): this.AlertInvisible() }
                            <label htmlFor='warehouse-contactPhone' className='input-label'>
                                Phone Number
                            </label>
                            <input type='text' name='contactPhone' id='warehouse-contactPhone'
                                    className={`input ${this.state.contactPhoneError || !this.state.isValidPhoneNumber? 'input--error': ''}`}  
                                    defaultValue={warehouse.contact.phone}
                                    onChange={this.handleChange} 
                            />
                            {this.state.contactPhoneError? this.Alert(): '' }
                            {this.state.isValidPhoneNumber? this.AlertInvisible(): this.AlertPhoneNumber()}
                            <label htmlFor='warehouse-contactEmail' className='input-label'>
                                Email
                            </label>
                            <input type='text' name='contactEmail' id='warehouse-contactEmail'
                                    className={`input ${this.state.contactEmailError || !this.state.isValidEmail? 'input--error': ''}`}  
                                    defaultValue={warehouse.contact.email}
                                    onChange={this.handleChange} 
                            />
                            {this.state.contactEmailError? this.Alert(): '' }
                            {this.state.isValidEmail? this.AlertInvisible(): this.AlertEmail()}
                        </div>
                    </div>
                    <div className="editWareHouse__btn-container">
                        <a href = '/warehouses' className="link button button--white editWareHouse__btn-cancel ">Cancel</a>
                        <button type="submit" className="button button--indigo editWareHouse__btn-save">
                            Save
                        </button>
                    </div>
                </form>}
            </div>
        );
    };
};

export default EditWarehouse



