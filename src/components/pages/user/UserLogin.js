import React, { useState } from 'react'
import StudentService from '../student/StudentService'


export default function () {
    const [userdata, setUserdata] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUserdata({...userdata, [name]: value})
    }

    const handleLogin = (e) => {
        e.preventDefault()
        StudentService.userLogin(userdata)
        .then( response => {
                console.log(response.data)
            }
        )
        .catch(e => {
            console.log(e)
        })
        console.log(userdata)

    }
    return (
        <div>
            <div>
                Login
            </div>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6'>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            value={userdata.email}
                            onChange={handleInputChange}
                            name="email"
                        />
                    </div>

                    <div className="form-group">
                        <label for="email">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={userdata.password}
                            onChange={handleInputChange}
                            name="password"
                        />
                    </div>
                    <button onClick={handleLogin} className="btn btn-success mt-3">Login</button>
                </div>
                <div className='col-md-3'></div>
            </div>
        </div>
    )
}
