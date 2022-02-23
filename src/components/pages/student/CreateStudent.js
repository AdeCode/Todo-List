import React, { useState } from 'react'
import StudentService from './StudentService'
import Swal from 'sweetalert2'

export default function CreateStudent() {
    const initialStudentState = {
        name: '',
        email: '',
        phone: '',
        course: '',
    };

    const [student, setStudent] = useState(initialStudentState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name,value} = event.target;
        setStudent({...student, [name]:value});
    };

    const saveStudent = (e) => {
        e.preventDefault();
        var data = {
            name: student.name,
            email: student.email,
            phone: student.phone,
            course: student.course
        }

        StudentService.create(data)
            .then(response => {
                setStudent({
                    name:response.data.name,
                    email:response.data.email,
                    phone:response.data.phone,
                    course:response.data.course
                });
                setSubmitted(true);                
                console.log(response.data);
                Swal.fire(
                    'Student added Successfully',
                    'success'
                )

            })
            .catch( e => {
                console.log(e)
            });

    };

    const newStudent = () => {
        setStudent(initialStudentState);
        setSubmitted(false);
    }

    return (
        <div className="submit-form">
            {
                submitted ? 
                (
                    <div>
                        <h4>Form submitted successfully!</h4>
                        <button className="btn btn-success" onClick={newStudent}>Add</button>
                    </div>
                )
                :
                (
                    <div>
                        <h2>Create Student</h2>
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={student.name}
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
                                value={student.email}
                                onChange={handleInputChange}
                                name="email"
                            />
                        </div>

                        <div className="form-group">
                            <label for="email">Phone</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="phone"
                                required
                                value={student.phone}
                                onChange={handleInputChange}
                                name="phone"
                            />
                        </div>

                        <div className="form-group">
                            <label for="course">Course</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="course"
                                required
                                value={student.course}
                                onChange={handleInputChange}
                                name="course"
                            />
                        </div>

                        <button onClick={saveStudent} className="btn btn-success mt-3">Submit</button>
                    </div>
                )
            }
        </div>
    );
}
