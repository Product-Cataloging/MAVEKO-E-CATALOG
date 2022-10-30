import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import './home.css'

export default function Home() {
  return (
    <div>
        <Navbar/>
        <div className='hero text-center mt-5'>
            <h5>Reliability and passion for warmhearted engagement made us what we are today</h5>
            <h1>One of the leading suppliers <br/> in the cruiseline industry</h1>
        </div>
    </div>
  )
}
