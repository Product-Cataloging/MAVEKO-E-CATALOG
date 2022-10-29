import React from 'react'
import './navbar.css'
import smsIcon from '../../assets/icons/sms.svg'
import callIcon from '../../assets/icons/call.svg'
import whatsappIcon from '../../assets/icons/whatsapp.svg'
import cartIcon from '../../assets/icons/cart.svg'
import userIcon from '../../assets/icons/user.svg'

export default function Navbar() {
  return (
    <div className='navbars'>
        <section className='info d-flex gap-3 py-3'> 
            <a href="#"><img src={callIcon}/>+49 (0)4103 1899880</a>
            <a href="#"><img src={smsIcon}/>info@maveko.com</a>
            <a href="#"><img src={whatsappIcon}/>WhatsApp</a>
        </section>
        <section className='main-nav d-flex justify-content-between py-4 align-items-center'>
            <nav>
              <a href="" className='pe-3'>Products</a>
              <a href="" className='pe-3'>About us</a>
              <a href="" className='pe-3'>Contact us</a>
            </nav>
            
            <h1 className='logo'>MAVEKO</h1>
  
            <nav>
              <a href="" className='blank-element'></a>
              <a href=""><img src={cartIcon} className='pe-3'/></a> 
              <a href=""><img src={userIcon} className='pe-3'/></a> 
            </nav>
        </section>
        <section className='category d-flex justify-content-center align-items-center text-center'>
            <a href="">Tabletop & <br/>Dinnerware</a><span>|</span>
            <a href="">Restaurant <br/>Equipment</a><span>|</span>
            <a href="">Commercial <br/>Refrigeration</a><span>|</span>
            <a href="">Smallwares</a><span>|</span>
            <a href="">Storage & <br/>Transport</a><span>|</span>
            <a href="">Disposables</a>
        </section>
    </div>
  )
}
