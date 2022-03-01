import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from "react-router-dom";
import StudentList from "./StudentList";
import CreateStudent from "./CreateStudent";
import Student from "../Student";
import Studentdata from "./Studentdata";
import CreateUser from "../user/CreateUser";
import UserLogin from "../user/UserLogin";

const StudentHeader = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/student-resource" className="navbar-brand">
                MyStudent
                </a>
                <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/studentlist"} className="nav-link">
                    Students
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/add"} className="nav-link">
                    Add
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                    Register User
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                    Login
                    </Link>
                </li>
                {/* <li className="nav-item">
                    <Link to={"/student-data"} className="nav-link">
                    Data
                    </Link>
                </li> */}
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/students"]} component={Student} />
                    <Route exact path={["/studentlist"]} component={StudentList} />
                    <Route exact path="/add" component={CreateStudent} />
                    {/* <Route path="/student/:id" component={Student} /> */}
                    <Route exact path={"/student/:id"} component={Studentdata} />
                    <Route exact path={["/register"]} component={CreateUser} />
                    <Route exact path={["/login"]} component={UserLogin} />

                </Switch>
            </div>
        </div>
    )
}

export default StudentHeader