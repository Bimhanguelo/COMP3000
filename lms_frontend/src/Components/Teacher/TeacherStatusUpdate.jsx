import React from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './course.css'

const baseUrl='http://localhost:8000/api'

const TeacherStatusUpdates = () => {
    useEffect(()=>{
        document.title='eduNest | Uploaded Courses'
      })

      const [teacherStatusUpdateData, setTeacherStatusUpdateData]=useState([]);
      const teacherId=localStorage.getItem('teacherId');

      useEffect(() => {
        try{
            axios.get(baseUrl+'/teacher/'+teacherId)
            .then((res)=>{
                setTeacherStatusUpdateData(res.data.status_updates_teacher)
            });
        }catch(error){
            console.log(error)
        }
      },[]);

     
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
  return (
    <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <TeacherSidebar />
            </aside>
            <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header'><i className="bi bi-journals"></i>Status Update</h5>
                    <div className="class-body table-responsive">
                        <table className='table table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th className='text-center'>Time</th>
                                    <th className='text-center'>Status</th>
                                    <th className='text-center'>Text</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teacherStatusUpdateData.map((teacherStatusUpdate,index) => 
                                    <tr>
                                  <td className='text-center'>{new Date(teacherStatusUpdate.time).toLocaleString()}</td>
                                   <td>{teacherStatusUpdate.status}</td>
                                   <td>{teacherStatusUpdate.text}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default TeacherStatusUpdates
