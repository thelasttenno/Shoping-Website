
import React from 'react';
import { useLocation } from 'react-router-dom'
<<<<<<< HEAD:src/components/Admin-Client/Header/Header.js
import Logo from '../../../assets/photos/logos/SkrillaGangWordmarkLogo.png';
=======
import Logo from '../../assets/Logo/InStock-Logo_1x.png';
>>>>>>> parent of 02f8ef3... combibned code bases for front end:client/src/components/Header/Header.js
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
<<<<<<< HEAD:src/components/Admin-Client/Header/Header.js
                        <a href = '/admin/orders' className=
=======
                        <a href = '/warehouses' className=
>>>>>>> parent of 02f8ef3... combibned code bases for front end:client/src/components/Header/Header.js
                                {`link nav-link ${!location.pathname.toLowerCase().includes('inventory')? 'nav-button nav-link--active nav-button--left': ''}`}>
                            Warehouses
                        </a>
                        <a href = '/Inventory' className=
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