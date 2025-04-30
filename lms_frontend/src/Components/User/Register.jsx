import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:8000/api/student/'

const Register = () => {
  useEffect(() => {
    document.title = 'eduNest | Student Register'
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [studentData, setStudentData] = useState({
    'fullname': '',
    'email': '',
    'password': '',
    'username': '',
    'interseted_categories': '',
    'status': ''
  });

  const handleChange = (event) => {
    setStudentData({
      ...studentData,
      [event.target.name]: event.target.value
    });
  }

  const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append("fullname", studentData.fullname)
    studentFormData.append("email", studentData.email)
    studentFormData.append("password", studentData.password)
    studentFormData.append("username", studentData.username)
    studentFormData.append("interseted_categories", studentData.interseted_categories)

    try {
      axios.post(baseUrl, studentFormData)
        .then((response) => {
          setStudentData({
            'fullname': '',
            'email': '',
            'password': '',
            'username': '',
            'interseted_categories': '',
            'status': 'success'
          });
          if (response.status == 200 || response.status == 201) {
            Swal.fire({
              title: 'Register Successfully!',
              icon: 'success',
              toast: true,
              timer: 2000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false
            });
          }
          let tID = setTimeout(function () {
            window.location.href = '/user-login';
            window.clearTimeout(tID);
          }, 2500);
        })
    } catch (error) {
      console.log(error);
      setStudentData({ 'status': 'error' })
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <div className="text-center wow fadeInUp">
                  <h5 className="card-title text-center mb-4 fw-light fs-5 text-dark ">Student Register</h5>
                </div>
                {studentData.status === 'success' && <h3 className='text-center text-success mb-3'>Registered Successfully</h3>}
                {studentData.status === 'error' && <h3 className='text-center text-danger mb-3'>Something went wrong</h3>}
                <div className="form-floating mb-4">
                  <input type="text" onChange={handleChange} name='fullname' className="form-control " id="floatingInput" placeholder="Full Name" />
                  <label for="floatingInput">Full Name</label>
                </div>
                <div className="form-floating mb-4">
                  <input type="email" onChange={handleChange} name='email' className="form-control " id="floatingInput" placeholder="name@example.com" />
                  <label for="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-4">
                  <input type="text" onChange={handleChange} name='username' className="form-control " id="floatingInput" placeholder="Username" />
                  <label for="floatingInput">User Name</label>
                </div>
                <div className="form-floating mb-4">
                  <input name='password' type="password" onChange={handleChange} className="form-control " id="floatingPassword" placeholder="Password" />
                  <label for="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-4">
                  <textarea type="text" onChange={handleChange} name='interseted_categories' className="form-control " id="floatingInput" placeholder="Interests"></textarea>
                  <label for="floatingInput">Interests</label>
                  <div id="emailHelp" className="form-text">Eg: Python, Java, C, C++, Web Development, etc...</div>
                </div>
                <div className="d-grid gap-2 my-4">
                  <button onClick={submitForm} class="btn btn-primary rounded-pill"  type="submit">SIGN UP</button>
                  <hr className='' />
                  <div class="text-center">
                  <p class="mb-0">Don't have an account?</p>
                  <Link to='/user-login' className="">Sign in</Link>
                </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Register
