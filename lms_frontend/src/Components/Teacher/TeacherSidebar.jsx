import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const TeacherSidebar = () => {
  useEffect(() => {
    document.title = 'eduNest | Menu'
  })

  return (
    <div className='card border-0 rounded-3'>
      <div className='list-group list-group-flush'>
        <Link to='/teacher-dashboard' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-house-door me-2"></i> Dashboard
        </Link>
        <Link to='/teacher-notifications' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-bell me-2"></i> Notifications
        </Link>
        <Link to='/teacher-status-update' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-journals me-2"></i> Status Updates
        </Link>
        <Link to='/add-teacher-status-update' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-journal-plus me-2"></i> Add Status
        </Link>
        <Link to='/teacher-my-course' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-journal-bookmark me-2"></i> My Courses
        </Link>
        <Link to='/add-course' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-plus me-2"></i> Add Course
        </Link>
        <Link to='/my-users' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-people me-2"></i> My Users
        </Link>
        <Link to='/teacher-profile-setting' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-gear me-2"></i> Profile Settings
        </Link>
        <Link to='/teacher-change-password' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-key me-2"></i> Change Password
        </Link>
        <Link to='/teacher-logout' className='list-group-item list-group-item-action text-danger'>
          <i className="bi bi-box-arrow-left me-2"></i> Logout
        </Link>
      </div>
    </div>
  )
}

export default TeacherSidebar
