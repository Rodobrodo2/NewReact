import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Main Page</Link>
                </li>
                <li>
                    <Link to="home">Home </Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;