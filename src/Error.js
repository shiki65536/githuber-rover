import React from 'react'

function Error({ message }) {
    return (
        <section className="section">
            <div className="section-center">
                <div className='error'>
                    <h2>ooops!</h2>
                    {message}
                </div>
            </div>
        </section>
    )
}

export default Error