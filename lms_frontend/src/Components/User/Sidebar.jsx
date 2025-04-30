import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Sidebar = () => {
  useEffect(() => {
    document.title = 'eduNest | MainMenu'
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='card border-0 rounded-3'>
      <div className='list-group list-group-flush'>
        <Link to='/user-dashboard' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-house-door me-2"></i> Dashboard
        </Link>
        <Link to='/student-notifications' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-bell me-2"></i> Notifications
        </Link>
        <Link to='/student-status-update' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-file-earmark-text me-2"></i> Status Updates
        </Link>
        <Link to='/add-student-status-update' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-plus-circle me-2"></i> Add Status
        </Link>
        <Link to='/my-courses' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-book me-2"></i> My Courses
        </Link>
        <Link to='/favorite-courses' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-heart me-2"></i> Favorite Courses
        </Link>
        <Link to='/my-teachers' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-person me-2"></i> My Teachers
        </Link>
        <Link to='/recommended-courses' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-lightbulb me-2"></i> Recommended Courses
        </Link>
        <Link to='/my-assignments' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-journal-text me-2"></i> Assignments
        </Link>
        <Link to='/profile-setting' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-gear me-2"></i> Profile Settings
        </Link>
        <Link to='/change-password' className='list-group-item list-group-item-action py-3'>
          <i className="bi bi-key me-2"></i> Change Password
        </Link>
        <Link to='/user-logout' className='list-group-item list-group-item-action py-3 text-danger'>
          <i className="bi bi-box-arrow-left me-2"></i> Logout
        </Link>
      </div>
    </div>


  )
}

export default Sidebar
