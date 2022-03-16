import './Detail.css';
import React from 'react'

function Detail({label, value, icon, color}) {
    return (
        <div className='detail'>
            <div className={color}>{icon}</div>
            <h3>{value}</h3>
            <div><p>{label}</p></div>
        </div>
    )
}

export default Detail