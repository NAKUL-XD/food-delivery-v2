
import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';


const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, soluta. Aliquam rem, consequuntur minus velit tempore est inventore earum, eius nulla provident, facilis consectetur itaque molestias laboriosam voluptas omnis ipsum nisi eaque vitae blanditiis suscipit officiis recusandae cum ipsam! Vero!</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                        <img className='ins' src={assets.instagram} alt="" />
                    </div>



                </div>
                <div className="footer-content-center">
                <h2>COMPANY</h2>
                    <ul>


                        
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 0123456789</li>
                        <li>work.nakul.08@gmail.com</li>
                    </ul>

                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2025 © Finedine - All Right Reserved </p>

        </div>
    )
}

export default Footer
