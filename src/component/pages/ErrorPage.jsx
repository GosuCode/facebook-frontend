import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className='text-center mt-24 text-7xl'>
            <p>
                <em> Where YOU tryna go boy!!</em>
                <br />
                <strong>Go Home :</strong>  <u><Link to='/'>HomePage</Link></u>
            </p>
        </div>
    )
}

export default ErrorPage
