import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:8000/api'

const TeacherLogin = () => {

  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');

  const [teacherLoginData, setTeacherLoginData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [errorMsg,] = useState('')

  const handleChange = (event) => {
    setTeacherLoginData({
      ...teacherLoginData,
      [event.target.name]: event.target.value
    });
  }

  const submitForm = () => {
    const teacherFormData = new FormData;
    teacherFormData.append('email', teacherLoginData.email)
    teacherFormData.append('password', teacherLoginData.password)
    try {
      axios.post(baseUrl + '/teacher-login', teacherFormData)
        .then((res) => {
          if (res.data.bool == true) {
            localStorage.setItem('teacherLoginStatus', true);
            localStorage.setItem('teacherId', res.data.teacher_id);
            window.location.href = '/teacher-dashboard';
          } else {
            if (res.status == 200 || res.status == 201) {
              Swal.fire({
                title: 'Please Enter all details correctly!',
                icon: 'error',
                toast: true,
                timer: 2000,
                position: 'top',
                timerProgressBar: true,
                showConfirmButton: false
              });
            }
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  if (teacherLoginStatus == 'true') {
    window.location.href = '/teacher-dashboard';
  }

  useEffect(() => {
    document.title = 'eduNest | Teacher Login'
  })


  return (
    <>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-sm-8 col-md-6 col-lg-4">
            <div class="card form-card border-0 shadow rounded-3 my-5">
              <div class="card-body form-card-body p-4 p-sm-5">
                <div class="text-center wow fadeInUp">
                  <h5 class="card-title text-center mb-4 text-primary fw-bold fs-5 text-dark">TEACHER LOGIN</h5>
                </div>
                {errorMsg && <p class='text-danger'>{errorMsg}</p>}
                <form>
                  <div class="form-floating mb-4">
                    <input type="email" value={teacherLoginData.email} onChange={handleChange} name='email' class="form-control form-card-input" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div class="form-floating mb-4">
                    <input value={teacherLoginData.password} name='password' type="password" onChange={handleChange} class="form-control form-card-input" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                  </div>

                  <div class="d-grid gap-2 mb-4">
                    <button onClick={submitForm} class="btn btn-primary rounded-pill" type="button">Log in</button>
                  </div>
                </form>

                <div class="text-center">
                  <p class="mb-0">Don't have an account?</p>
                  <Link to='/teacher-register' class="">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default TeacherLogin
