import React, { useState } from 'react'
import Swal from 'sweetalert2';
import StudentService from '../student/StudentService'

export default function CreateUser() {
    const [userdata, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userdata, [name]: value });
    }

    const registerUser = (e) => {
        e.preventDefault()
        StudentService.createUser(userdata)
        .then(response => {
            console.log(response.data)
            setSubmitted(true)
            Swal.fire(
                'Registration Successfull',
                'success'
            )
        })
        .catch(e => {
            console.log(e)
        });
    }

  return (
    <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6'>
                <div className="submit-form">
                    {
                        submitted ?
                            (
                                <div>
                                    <h4>User registered successfully!</h4>
                                    {/* <button className="btn btn-success" onClick={newStudent}>Add</button> */}
                                </div>
                            )
                            :
                            (
                                <div>
                                    <h2>Register</h2>
                                    <div className="form-group">
                                        <label for="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            required
                                            value={userdata.name}
                                            onChange={handleInputChange}
                                            name="name"
                                        />
                                    </div>

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
                                   
                                    <button onClick={registerUser} className="btn btn-success mt-3">Register</button>
                                </div>
                            )
                    }
                </div>
            </div>
            <div className='col-md-3'></div>


        </div>
  )
}
