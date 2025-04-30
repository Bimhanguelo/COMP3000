import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')

  const [searchString, setSearchString] = useState({
    'search': '',
  })

  const handleChange = (event) => {
    setSearchString({
      ...searchString,
      [event.target.name]: event.target.value
    });
  }

  return (
    <>
      <nav className="container col-xxl-8 rounded-pill navbar navbar-expand-lg shadow bg-white navbar-light sticky-top p-0">
        <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <h4 className="m-0 text-primary">
            <img src="images/logo.svg" height={"60px"} />
            <Link className='ms-2' to="/">eduNest</Link></h4>
        </Link>
        <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/" className="fw-bold nav-item nav-link" style={{fontWeight: '900'}}>Home</Link>
            <Link to="/category" className="nav-item nav-link" style={{fontWeight: '900'}}>Category</Link>
            <Link to="/all-courses" className="nav-item nav-link" style={{fontWeight: '900'}}>Courses</Link>
            {!studentLoginStatus && (
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Teacher</a>
                <div className="dropdown-menu fade-down m-0">
                  {teacherLoginStatus != 'true' &&
                    <>
                      <li><Link className="dropdown-item" to="/teacher-login">Login</Link></li>
                      <li><Link className="dropdown-item" to="/teacher-register">Register</Link></li>
                    </>
                  }
                  {teacherLoginStatus === 'true' &&
                    <>
                      <li><Link className="dropdown-item" to="/teacher-dashboard">Dashboard</Link></li>
                      <li><Link className="dropdown-item" to="/teacher-logout">Logout</Link></li>
                    </>
                  }
                </div>
              </div>
            )}
            {!teacherLoginStatus && (
              <>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle ps-0 px-5" data-bs-toggle="dropdown">Student</a>
                  <div className="dropdown-menu fade-down m-0">
                    {studentLoginStatus != 'true' &&
                      <>
                        <li><Link className="dropdown-item" to="/user-login">Login</Link></li>
                        <li><Link className="dropdown-item" to="/user-register">Register</Link></li>
                      </>
                    }
                    {studentLoginStatus === 'true' &&
                      <>
                        <li><Link className="dropdown-item" to="/user-dashboard">Dashboard</Link></li>
                        <li><Link className="dropdown-item " to="/user-logout">Logout</Link></li>
                      </>
                    }
                  </div>
                </div>
              </>
            )}

            <a className="nav-link nav-item" target='__blank' href="http://127.0.0.1:8000/admin/login/?next=/admin/">Admin</a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header