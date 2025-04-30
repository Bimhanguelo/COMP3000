import React from 'react'
import TeacherSidebar from './TeacherSidebar'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:8000/api'

const AddCourses = () => {
    useEffect(() => {
        document.title = 'eduNest | Add Course'
    })

    const [cats, setCats] = useState([])

    const [statusUpdateData, setStatusUpdateData] = useState({
        status: '',
        teacher: '',
        text: ''
       
    });

    useEffect(() => {
        try {
            axios.get(baseUrl + '/category/')
                .then((res) => {
                    setCats(res.data)
                });
        } catch (error) {
            console.log(error)
        }
    }, []);

    const handleChange = (event) => {
        setStatusUpdateData({
            ...statusUpdateData,
            [event.target.name]: event.target.value
        });
    }


    const formSubmit = () => {
        const teacherId = localStorage.getItem('teacherId')
        const _formData = new FormData();
        _formData.append('status', statusUpdateData.status);
        _formData.append('teacher', teacherId);
        _formData.append('text', statusUpdateData.text);

        try {
            axios.post(baseUrl + '/teacher-status-updates/', _formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    window.location.href = '/teacher-status-update';
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h3 className='card-header'><i className="bi bi-plus-square"></i> Add Status Update</h3>
                        <div className='card-body'>
                            <div className="mb-3">
                                <label for="title" className="form-label">Status</label>
                                <select name='status' onChange={handleChange} className="form-control">
                                    <option value={''}>Select Status Update</option>
                                    <option value={'PENDING'}>Pending</option>
                                    <option value={'COMPLETED'}>Completed</option>
                                    <option value={'IN_PROGRESS'}>In Progress</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Text</label>
                                <textarea onChange={handleChange} name='text' className='form-control' placeholder=''></textarea>
                            </div>
                            <button type="submit" onClick={formSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AddCourses
