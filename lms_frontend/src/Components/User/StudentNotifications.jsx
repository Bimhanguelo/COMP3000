import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';

const TeacherStatusUpdates = () => {
  useEffect(() => {
    document.title = 'eduNest | Uploaded Courses';
  }, []);

  const [studentNotifications, setStudentNotifications] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState()
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(baseUrl + '/fetch-enrolled-courses/' + studentId)
        .then((res) => {
          setEnrolledCourses(res.data)
        });

    } catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (enrolledCourses)
      enrolledCourses.map((row) => {
        axios.get(baseUrl + '/study-material/' + row.course.id).then((res) => {
          setStudentNotifications(res.data)
        })
      })
  }, [enrolledCourses]);

  console.log(studentNotifications)
  return (
    <div className='container mt-4'>
      <div className='row'>
        <aside className='col-md-3'>
          <Sidebar />
        </aside>
        <section className='col-md-9'>
          <div className='card'>
            <h5 className='card-header'><i className="bi bi-bell"></i>Notifications</h5>
            <div className='card-body table-responsive'>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th className='text-center'>Text</th>
                  </tr>
                </thead>
                <tbody>
                  {studentNotifications && studentNotifications.map((notification, index) =>
                    <tr key={index}>
                      <td className='text-center'>{notification.title} has been added to {notification.course.title} Course</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherStatusUpdates;
