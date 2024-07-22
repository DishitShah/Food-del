import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const d = new Date();
let year = d.getFullYear();

const Footer = () => {
    return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro eaque accusantium deserunt dolorem veritatis modi, odio, dolorum hic quidem sed quisquam doloremque ratione consectetur dolor temporibus cumque? At suscipit natus quam placeat! Quasi sed adipisci atque natus. Eius recusandae sit deserunt expedita id labore, debitis, tempore est, nostrum dignissimos sunt.</p>
                <div className="footer-social-icon">
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>8082803807</li>
                    <li>contact@me.gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright {year}© - All Right Reserved.  </p>
        
    </div>
    
)
}

export default Footer
