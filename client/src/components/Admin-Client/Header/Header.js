
import React from 'react';
import { useLocation } from 'react-router-dom'
import Logo from '../../../assets/photos/logos/SkrillaGangWordmarkLogo.png';
import './Header.scss';

const Navbar= () => {
    const location = useLocation();
    // console.log(location.pathname);
    return(
        <header>
            <nav className='nav'>
                <div className='nav--content'>
                    <a className='link' href='/'>
                        <img className='nav-logo' src={Logo} alt='InStock logo'/>
                    </a>
                    <div className='nav-menu'>
                        <a href = '/admin/orders' className=
                                {`link nav-link ${!location.pathname.toLowerCase().includes('inventory')? 'nav-button nav-link--active nav-button--left': ''}`}>
                            Orders
                        </a>
                        <a href = '/admin/Inventory' className=
                            {`link nav-link ${location.pathname.toLowerCase().includes('inventory')? 'nav-button nav-link--active nav-button--right': ''}`}>
                            Inventory
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar