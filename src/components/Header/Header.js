import React from 'react';
import './Header.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Header() {

    return ( 
        <div className='header'>
            <Button variant="text">Total expences</Button>
            <Link to="/NewSplit"><Button variant="text">New split</Button></Link>
            <Link to="/AddUser"><Button variant="text">Add new user</Button></Link>
        </div>
     );
}

export default Header;