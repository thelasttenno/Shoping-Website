
import React from 'react';
import arrow from "../../../assets/Icons/arrow_back-24px.svg";
import errorIcon from"../../../assets/Icons/error-24px.svg"

import './EditOrder.scss';

class Editorder extends React.Component{

    state={

        name: this.props.order.name,
        address: this.props.order.address,
        city: this.props.order.city,
        country: this.props.order.country,
        contactName: this.props.order.contact.name,
        contactPosition: this.props.order.contact.position,
        contactPhone: this.props.order.contact.phone,
        contactEmail: this.props.order.contact.email,
        
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

    editorderHandler = (event, id) =>{
        event.preventDefault();
        
        const neworderData = {...this.state};
        if(this.isFormValid()){
            this.setState({isFormSubmitted: true});
            this.props.handleEditorder(id, neworderData);
        }
    }
        
    render(){
        const order = {...this.props.order}
        
        return(
            <div className='editorder'>
                <header className='editorder__header'>
                    <a href='/orders' className='link link--arrow editorder__arrow'>
                        <img className="" src={arrow} alt="arrow"/>
                    </a>
                    <h1 className="editorder__heading">Edit order</h1>
                </header>
                {this.state.isValid? '':this.AlertFormValid()}
                {this.state.isFormSubmitted? 
                <div className='editorder__formSubmitted'>
                    <h3 className="editorder__subheading"> Wearhouse is edited.</h3>
                    <a href = '/orders' className="link button button--success editorder__btn-cancel ">orders</a>
                </div>:
                <form className='editorder__form' 
                    onSubmit={(event) => {this.editorderHandler(event, order.id)}}>
                    <div className='editorder__order-contact-details'>
                        <div className= 'editorder__order-details'>
                            <h3 className="editorder__subheading">order Details</h3>
                            <label htmlFor='order-name' className='input-label'>
                                Order Date
                            </label>
                            <input type='text' name='name' id='order-name'
                                    className={`input ${this.state.nameError? 'input--error': ''}`} 
                                    defaultValue={order.name}
                                    onChange={this.handleChange} 
                            />
                            {this.state.nameError? this.Alert(): this.AlertInvisible() }
                            <label htmlFor='order-address' className='input-label'>
                                Street Address
                            </label>
                            <input type='text' name='address' id='order-address'
                                    className={`input ${this.state.addressError? 'input--error': ''}`}  
                                    defaultValue={order.address}
                                    onChange={this.handleChange} 
                            />
                            {this.state.addressError? this.Alert(): this.AlertInvisible() }
                            <label htmlFor='order-city' className='input-label'>
                                City
                            </label>
                            <input type='text' name='city' id='order-city'
                                    className={`input ${this.state.cityError? 'input--error': ''}`}  
                                    defaultValue={order.city}
                                    onChange={this.handleChange} 
                            />
                            {this.state.cityError? this.Alert(): this.AlertInvisible() }
                            <label htmlFor='order-country' className='input-label'>
                                Country
                            </label>
                            <input type='text' name='country' id='order-country'
                                    className={`input ${this.state.countryError? 'input--error': ''}`}  
                                    defaultValue={order.country}
                                    onChange={this.handleChange} 
                            />
                            {this.state.countryError? this.Alert(): this.AlertInvisible() }
                        </div>
                        <div className= 'editorder__contact-details'>
                            <h3 className="editorder__subheading">Contact Details</h3>
                            <label htmlFor='order-contactName' className='input-label'>
                                Contact Name
                            </label>
                            <input type='text' name='contactName' id='order-contactName'
                                    className={`input ${this.state.contactNameError? 'input--error': ''}`}  
                                    defaultValue={order.contact.name}
                                    onChange={this.handleChange} 
                            />
                            {this.state.contactNameError? this.Alert(): this.AlertInvisible() }
                            <label htmlFor='order-position' className='input-label'>
                                Position
                            </label>
                            <input type='text' name='contactPosition' id='order-position'
                                    className={`input ${this.state.contactPositionError? 'input--error': ''}`}  
                                    defaultValue={order.contact.position}
                                    onChange={this.handleChange} 
                            />
                            {this.state.contactPositionError? this.Alert(): this.AlertInvisible() }
                            <label htmlFor='order-contactPhone' className='input-label'>
                                Phone Number
                            </label>
                            <input type='text' name='contactPhone' id='order-contactPhone'
                                    className={`input ${this.state.contactPhoneError || !this.state.isValidPhoneNumber? 'input--error': ''}`}  
                                    defaultValue={order.contact.phone}
                                    onChange={this.handleChange} 
                            />
                            {this.state.contactPhoneError? this.Alert(): '' }
                            {this.state.isValidPhoneNumber? this.AlertInvisible(): this.AlertPhoneNumber()}
                            <label htmlFor='order-contactEmail' className='input-label'>
                                Email
                            </label>
                            <input type='text' name='contactEmail' id='order-contactEmail'
                                    className={`input ${this.state.contactEmailError || !this.state.isValidEmail? 'input--error': ''}`}  
                                    defaultValue={order.contact.email}
                                    onChange={this.handleChange} 
                            />
                            {this.state.contactEmailError? this.Alert(): '' }
                            {this.state.isValidEmail? this.AlertInvisible(): this.AlertEmail()}
                        </div>
                    </div>
                    <div className="editorder__btn-container">
                        <a href = '/orders' className="link button button--white editorder__btn-cancel ">Cancel</a>
                        <button type="submit" className="button button--indigo editorder__btn-save">
                            Save
                        </button>
                    </div>
                </form>}
            </div>
        );
    };
};

export default Editorder



