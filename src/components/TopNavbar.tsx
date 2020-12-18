import React from 'react';
import logo from '../logo.svg';
import Filter, { FilterConfig } from './Filter';

const TopNavbar = ({ value, handleChange }: FilterConfig): JSX.Element => {

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} height="50" width="50"></img>
                </a>
                <Filter value={value} handleChange={(e: any) => handleChange(e.target.value)}></Filter>
            </div>
        </nav>
    )
};

export default TopNavbar;