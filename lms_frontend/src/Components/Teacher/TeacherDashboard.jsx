import React from 'react'
import { Link } from 'react-router-dom'
import TeacherSidebar from './TeacherSidebar'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = 'http://localhost:8000/api'

const TeacherDashboard = () => {
  useEffect(() => {
    document.title = 'eduNest | Teacher DashBoard'
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [dashbarData, setDashbarData] = useState([])
  const teacherId = localStorage.getItem('teacherId')

  useEffect(() => {
    try {
      axios.get(baseUrl + '/teacher/dashboard/' + teacherId)
        .then((res) => {
          setDashbarData(res.data)
        })
    } catch (error) {
      console.log(error)
    }
  }, []);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <aside className='col-md-3'>
          <TeacherSidebar />
        </aside>
        <section className='col-md-9'>
          <div className='row mt-3'>
            <div className='col-12'>
              <h2 className="mb-4 text-center">Dashboard</h2>
            </div>
            <div className='col-md-6 mb-3'>
              <div className='card rounded-3'>
                <h5 className='card-header text-dark text-center'>Total Courses</h5>
                <div className='card-body text-center'>
                  <h3>
                    <Link to="/teacher-my-course" className='text-dark text-decoration-none'>
                      {dashbarData.total_teacher_course} <i className="bi bi-journals text-dark"></i>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className='col-md-6 mb-3'>
              <div className='card rounded-3'>
                <h5 className='card-header text-dark text-center'>Total Students</h5>
                <div className='card-body text-center'>
                  <h3>
                    <Link to="/my-users" className='text-dark text-decoration-none'>
                      {dashbarData.total_teacher_students} <i className="bi bi-people-fill"></i>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className='col-md-6 mb-3'>
              <div className='card rounded-3'>
                <h5 className='card-header text-dark text-center'>Total Chapters</h5>
                <div className='card-body text-center'>
                  <h3>
                    <Link to="/teacher-my-course" className='text-dark text-decoration-none'>
                      {dashbarData.total_teacher_chapters} <i className="bi bi-stickies-fill"></i>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TeacherDashboard
