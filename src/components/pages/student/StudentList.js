import React, { useEffect, useState } from 'react'
import StudentService from './StudentService'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'



export default function StudentList() {
    const [student, setStudent] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setsearchName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // axios.get('http://127.0.0.1:8000/api/students')
        // .then(res => {
        //     console.log(res.data);
        // })
        // .catch(e => {
        //     console.log(e)
        // });
        retrieveStudents();
        setLoading(false);
        // return () => {
        //     cleanup
        // }
    }, []);

    const onChangeSearchValue = e => {
        const searcName = e.target.value;
        setsearchName(searcName);
    };

    const retrieveStudents = () => {
        StudentService.getAll()
            .then(response => {
                setStudent(response.data);
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
    };

    const refreshList = () => {
        retrieveStudents();
        setCurrentStudent(null);
        setCurrentIndex(-1)
    };

    const setActiveStudent= (student, index) => {
        setCurrentStudent(student);
        setCurrentIndex(index);
    };

    const removeAllStudents = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete all!'
          }).then((result) => {
            if (result.isConfirmed) {
                StudentService.removeAll()
                .then(response => {
                    refreshList();                    
                    console.log(response.data);
                })
                .then(
                    Swal.fire(
                        'Deleted!',
                        'All students record has been deleted.',                        
                    )
                )
                .catch(e => {
                    console.log(e);
                });
              
            }
          })
        
    };

    const findByName = () => {
        StudentService.findByName(searchName)
            .then(response => {
                setStudent(response.data);
                console.log("response from find by name"+response.data);
            })
            .catch(e => {
                console.log(e)
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
                        value={searchName}
                        onChange={onChangeSearchValue}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
            <h4>Students List</h4>
                {
                    loading ? 
                    <h3>Loading...</h3>
                    :
                    <ul className="list-group">
                        {
                            student &&
                            student.map((currStudent, index) => (
                                
                                <li                                
                                    className={
                                        "list-group-item " + (index === currentIndex ? "active" : "")
                                    }
                                    onClick={()=>setActiveStudent(currStudent, index)}
                                    key={index}
                                >
                                    {currStudent.name}
                                </li>
                            ))
                        }
                    </ul>
                }
                
                <button
                    className="m-3 btn btn-sm btn-danger" 
                    onClick={removeAllStudents}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentStudent ? 
                    (
                        <div>
                            <h4>Student</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentStudent.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Email:</strong>
                                </label>{" "}
                                {currentStudent.email}
                            </div>
                            <div>
                                <label>
                                    <strong>Phone Number:</strong>
                                </label>{" "}
                                {currentStudent.phone}
                            </div>
                            <div>
                                <label>
                                    <strong>Course:</strong>
                                </label>{" "}
                                {currentStudent.course}
                            </div>

                            <Link to={"/student/"+currentStudent.id}
                                className="badge badge-success"
                            >
                                Edit
                            </Link>
                        </div>
                    )    
                    :
                    (
                        <div>
                            <br/>
                            <p>Please click on a student</p>
                        </div>
                    )
            }
            </div>
        </div>
    );
};
