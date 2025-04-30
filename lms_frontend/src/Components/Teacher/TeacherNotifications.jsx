import React, { useEffect, useState } from 'react';
import Sidebar from './TeacherSidebar';
import axios from 'axios';

const baseUrl = 'http://localhost:8000/api';

const TeacherStatusUpdates = () => {
    useEffect(() => {
        document.title = 'eduNest | Notifications';
    }, []);

    const [studentNotifications, setStudentNotifications] = useState([]);
    const [studentData, setStudentData] = useState()
    const teacherId = localStorage.getItem('studentId');

    useEffect(() => {
        try {
            axios.get(baseUrl + '/fetch-all-enrolled-students/' + teacherId)
                .then((res) => {
                    console.log(res.data)
                    setStudentData(res.data)
                });
        } catch (error) {
            console.log(error)
        }
    }, []);

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
                        <h5 className='card-header'><i className="bi bi-bell"></i>Notifications</h5>
                        <div className='card-body table-responsive'>
                            <table className='table table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th className='text-center'>Updates</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentData && studentData.map((row, index) =>
                                        <tr key={index}>
                                            <td className='text-center'>{row.student.fullname} has registered in {row.course.title}</td>
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
