import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <header style={headerStyle}>
            <h1>Todo List</h1>
            <Link style={linkStyle} to="/">Home</Link> | 
            <Link style={linkStyle} to="/about">About</Link> |
            <Link style={linkStyle} to="/api">API</Link> |
            <Link style={linkStyle} to="/student-resource">Student Resource</Link> 

        </header>
    )
}
const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle ={
    color: '#fff',
    textDecoration: 'none'
}
