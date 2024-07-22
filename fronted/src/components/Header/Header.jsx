import React from 'react';
import './Header.css';

const Header = () => {
    const navigateToMenu = () => {
        window.location.href = '/#explore-menu';
    };

    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order Your Favorite Food Here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Satisfy your cravings and elevate your dining experience.</p>
                <button onClick={navigateToMenu}>View Menu</button>
            </div>
        </div>
    );
};

export default Header;


