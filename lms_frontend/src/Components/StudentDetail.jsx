import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useEffect } from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import './main.css'

const baseUrl = 'http://localhost:8000/api'

const TeacherDetails = () => {

    let { student_id } = useParams();
    const [studentData, setstudentData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [skillList, setSkillList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        document.title = "eduNest | Student's Details"
    })

    useEffect(() => {
        try {
            axios.get(baseUrl + '/student/' + student_id + "/")
                .then((res) => {
                    console.log(res.data)
                    setstudentData(res.data)
                    setSkillList(res.data.skill_list)
                });
            axios.get(baseUrl + '/fetch-enrolled-courses/' + student_id)
                .then((res) => {
                    setCourseData(res.data)
                    console.log(res.data)
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const icon = {
        'font-size': '25px'
    }

    return (
        <div className="conatiner mt-4 px-4 hod">
            <div className='row'>
                <div className="col-lg-3 col-md-6 wow fadeInUp">
                    <div className="team-item bg-light">
                        <div className=" position-relative overflow-hidden">
                            <img src={studentData.profile_img} className="card-img-top img-fluid img-thumbnail aks" alt={studentData.full_name} />
                        </div>
                    </div>
                </div>
                <div className='col-8'>
                    <h3>{studentData.fullname}</h3>
                    <p>{studentData.email}</p>
                    <p>{studentData.interseted_categories}</p>

                </div>
            </div>
            {/* Course Videos*/}
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Enrolled Courses</h4>
                    <div className='list-group list-group-flush'>
                        {courseData.map((row, index) =>
                            <Link to={`/detail/${row.course.id}`} className="list-group-item">{row.course.title}</Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Status Updates</h4>
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th className='text-center'>Time</th>
                                <th className='text-center'>Status</th>
                                <th className='text-center'>Text</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.status_updates_student && studentData.status_updates_student.map((studentStatusUpdate, index) =>
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

        </div>
    )
}

export default TeacherDetails
