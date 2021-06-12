import React from 'react';
import './AddressCard.scss';

const AddressCard = (props) => {
    const singleorder = props.orderData.data
    return (
        <div className='address'>
            <div className='address__box--indent'>
                <h3 className='address__title'>order ADDRESS:</h3>
                <p className='address__info'>{singleorder.address}</p>
                <p className='address__info address__info--slant'>{singleorder.city},{singleorder.country}</p>
            </div>
            <div className='address__box--contact'>
            <div className='address__contact--border'>
                <h3 className='address__title'>CONTACT NAME:</h3>
                <p className='address__info'>{singleorder.contact.name}</p>
                <p className='address__info address__info--slant'>{singleorder.contact.position}</p>
            </div>
            <div className='address__contact'>
                <h3 className='address__title'>CONTACT INFORMATION:</h3>
                <p className='address__info'>{singleorder.contact.phone}</p>
                <p className='address__info address__info--slant'>{singleorder.contact.email}</p>
            </div>
            </div>
        </div>
        )
    }

export default AddressCard;