import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';

const TeacherStatusUpdates = () => {
  useEffect(() => {
    document.title = 'eduNest | Uploaded Courses';
  }, []);

  const [studentStatusUpdateData, setStudentStatusUpdateData] = useState([]);
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    try {
      axios.get(`${baseUrl}/student-status-updates/${studentId}`)
        .then((res) => {
          // Order the data by date in descending order
          const orderedData = res.data.sort((a, b) => new Date(b.time) - new Date(a.time));
          setStudentStatusUpdateData(orderedData);
        });
    } catch (error) {
      console.log(error);
    }
  }, [studentId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <aside className='col-md-3'>
          <Sidebar />
        </aside>
        <section className='col-md-9'>
          <div className='card'>
            <h5 className='card-header'><i className="bi bi-journals"></i>Status Update</h5>
            <div className='card-body table-responsive'>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th className='text-center'>Time</th>
                    <th className='text-center'>Status</th>
                    <th className='text-center'>Text</th>
                  </tr>
                </thead>
                <tbody>
                  {studentStatusUpdateData && studentStatusUpdateData.map((studentStatusUpdate, index) =>
                    <tr key={index}>
                      <td className='text-center'>{new Date(studentStatusUpdate.time).toLocaleString()}</td>
                      <td className='text-center'>{studentStatusUpdate.status}</td>
                      <td className='text-center'>{studentStatusUpdate.text}</td>
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
