import './Footer.css';
import { SiProbot } from "react-icons/si";
import React from 'react';

function Footer() {
    const time = new Date().getFullYear();
  return (
    <div className='footer'>
        <section className="section">
            <div className="section-center">
            <SiProbot /> SHIKI65536 &copy; {time}
            </div>
        </section>
    </div>
  )
}

export default Footer