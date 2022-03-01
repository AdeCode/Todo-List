import React, { useEffect, useState } from 'react'
import StudentService from './StudentService';
import Swal from 'sweetalert2'


export default function Studentdata(props) {
    const initialStudentState = {
        id: null,
        name: '',
        email: '',
        phone: '',
        course: ''
    };

    const [currentStudent, setCurrentStudent] = useState(initialStudentState);
    const [message, setMessage] = useState("");

    const getStudent = (id) => {
        StudentService.get(id)
            .then(response => {
                setCurrentStudent(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e)
            });
    };

    useEffect(() => {
        getStudent(props.match.params.id);
       
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentStudent({...currentStudent, [name]:value});
    };

    const updateStudent = (e) => {
        e.preventDefault();
        StudentService.update(currentStudent.id, currentStudent)
        .then(response => {
            console.log(response.data);
            setMessage("Student data updated successfully");
        })
        .catch(e => {
            console.log(e);
        });
    };

    const deleteStudent = () => {
        StudentService.remove(currentStudent.id)
            .then(response => {
                console.log(response.data);
                Swal.fire(
                    'Student deleted Successfully',                    
                )
                props.history.push('/students');
                
            })
            .catch(e => {
                console.log(e);
            });
    };

    

    return (       
            <div>
                {currentStudent ? 
                    (
                        <div className="edit-form">
                            <h4>Student</h4>
                            <form method>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={currentStudent.name}
                                        onChange={handleInputChange}
                                        name="name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        required
                                        value={currentStudent.email}
                                        onChange={handleInputChange}
                                        name="email"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Phone</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        required
                                        value={currentStudent.phone}
                                        onChange={handleInputChange}
                                        name="phone"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="course">Course</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="course"
                                        required
                                        value={currentStudent.course}
                                        onChange={handleInputChange}
                                        name="course"
                                    />
                                </div>
                            </form>
                            <button className="badge badge-danger mr-2" onClick={deleteStudent}>
                                Delete
                            </button>

                            <button
                                type="submit"
                                className="badge badge-success"
                                onClick={updateStudent}
                            >
                                Update
                            </button>
                            <p>{message}</p>
                        </div>
                    )    
                    :
                    (
                        <div>
                            <br />
                            <p>Please click on a student</p>
                        </div>
                    )
                }
            </div>
       
    )
}
