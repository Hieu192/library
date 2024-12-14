import React from 'react'
import './Footer.css'

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
    return (
        <div className='footer'>
            <div>
                <div className='footer-data'>
                    <div className="contact-details">
                        <h1>Liên hệ với chúng tôi </h1>
                        <p>Thủ thư </p>
                        <p>UIT-ĐHQG</p>
                        <p>Phạm Quang Hiếu </p>
                        <p>Việt Nam </p>
                        <p><b>Email:</b>21520235@gm.uit.edu.vn</p>
                    </div>
                    {/* <div className='usefull-links'>
                        <h1>Usefull Links</h1>
                        <a href='#home'>Link-1</a>
                        <a href='#home'>Link-1</a>
                        <a href='#home'>Link-1</a>
                        <a href='#home'>Link-1</a>
                    </div> */}
                    <div className='librarian-details'>
                        <h1>Thủ thư </h1>
                        <p>Phạm Quang Hiếu </p>
                        <p>Giáo dục </p>
                        <p>Liên hệ: 0828190223 </p>
                    </div>
                </div>
                <div className="contact-social" >
                    <a href='#home' className='social-icon'><TwitterIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='#home' className='social-icon'><LinkedInIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='#home' className='social-icon'><TelegramIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='#home' className='social-icon'><InstagramIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                </div>
            </div>
            <div className='copyright-details'>
                {/* <p className='footer-copyright'>&#169; 2020 copyright all right reserved<br /><span>Designed with ❤️ by Pranavdhar Reddy</span></p> */}
            </div>
        </div>
    )
}

export default Footer