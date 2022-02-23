import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import StudentHeader from './student/StudentHeader'

export default function Student(props) {
    

    return (
        <Router>
            <div>
                <h2>Student's home</h2>
            </div>
            <StudentHeader/>
            
        </Router>
       
    )
}
