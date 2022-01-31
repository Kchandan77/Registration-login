import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import ProductList from './ProductList'


export const Home = () => {
    
    const onLogout = () => {
        window.location.href = '/';
        alert('You have successfully logged out!')
        localStorage.removeItem('loginUsers');
        // localStorage.removeItem('users');
    }

    return (
        <div className=' container p-3 my-3'>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/about-us">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contact-us" tabindex="-1" >Contact Us</a>
                            </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/product-list" tabindex="-1" >Add Product</a>
                                </li>
                        </ul>
                        <Button className='btn btn-primary' onClick={onLogout}>Logout</Button>
                    </div>
                </div>

            </nav>

            <div>
                <ProductList />
            </div>
        </div>
    )
}
