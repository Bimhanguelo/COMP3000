import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'eduNest | Teacher Dashboard';
  }, []);

  const [dashbarData, setDashbarData] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/student/dashboard/${studentId}`)
        .then((res) => {
          setDashbarData(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <aside className='col-md-3'>
          <Sidebar />
        </aside>
        <section className='col-md-9'>
          <div className='row mt-3'>
            <div className='col-12'>
              <h2 className="mb-4 text-center">Dashboard</h2>
            </div>
            <div className='col-md-6 mb-3'>
              <div className='card rounded-3'>
                <h5 className='card-header text-dark text-center'>Enrolled Courses</h5>
                <div className='card-body text-center'>
                  <h3>
                    <Link to="/my-courses" className='text-dark text-decoration-none'>
                      {dashbarData.enrolled_courses} <i className="bi bi-cart-check-fill"></i>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className='col-md-6 mb-3'>
              <div className='card rounded-3'>
                <h5 className='card-header text-dark text-center'>Favorite Courses</h5>
                <div className='card-body text-center'>
                  <h3>
                    <Link to="/favorite-courses" className='text-dark text-decoration-none'>
                      {dashbarData.favorite_courses} <i className="bi bi-heart-fill text-dark"></i>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className='col-md-6 mb-3'>
              <div className='card rounded-3'>
                <h5 className='card-header text-dark text-center'>Completed Assignments</h5>
                <div className='card-body text-center'>
                  <h3>
                    <Link to="/my-assignments" className='text-dark text-decoration-none'>
                      {dashbarData.complete_assignments} <i className="bi bi-journal-check"></i>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
            <div className='col-md-6 mb-3'>
              <div className='card rounded-3'>
                <h5 className='card-header text-dark text-center'>Pending Assignments</h5>
                <div className='card-body text-center'>
                  <h3>
                    <Link to="/my-assignments" className='text-dark text-decoration-none'>
                      {dashbarData.pending_assignments} <i className="bi bi-journal-x"></i>
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
