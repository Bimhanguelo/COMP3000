import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:8000/api/popular-teachers/?popular=10'

const AllCourses = () => {

  const [courseData, setCourseData] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeacherData, setFilteredTeacherData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.title = 'eduNest | All Teachers'
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    fetchData(baseUrl)
  }, []);

  const paginationHandler = (url) => {
    fetchData(url)
  }

  function fetchData(url) {
    try {
      axios.get(url)
        .then((res) => {
          setCourseData(res.data)
        });
    } catch (error) {
      console.log(error)
    }
  }

  const SocialButton = ({ link, iconClass }) => (
    <a className="btn btn-sm-square btn-primary mx-1" href={link}>
      <i className={iconClass}></i>
    </a>
  );


  useEffect(() => {
    // Update filtered student data based on the search query
    const updatedFilteredData = courseData.filter((row) =>
      row.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeacherData(updatedFilteredData);
  }, [courseData, searchQuery]);



  return (
    <div className='container mt-4'>
      <div className="text-center wow fadeInUp">
        <p className="section-header display-6 text-center text-primary font-weight-bold">TEACHERS</p>
      </div>
      <input
        type="text"
        className="form-control mb-2 mt-2"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className='row mb-4'>
        {filteredTeacherData && filteredTeacherData.map((teacher, index) =>
          <div className="col-lg-4 col-md-6 wow fadeInUp">
            <div className="card bg-light">
              <div className="overflow-hidden">
                <Link className="front" to={`/teacher-detail/${teacher.id}`}>
                  <img src={teacher.profile_img} height={330} className="card-img-top" alt={teacher.full_name} />
                </Link>
              </div>
              <div className="position-relative d-flex justify-content-center">
                <div className="bg-light d-flex justify-content-center pt-2 px-1 mt-1">
                  {teacher.insta_url && <SocialButton link={teacher.insta_url} iconClass="fab fa-instagram" />}
                  {teacher.twit_url && <SocialButton link={teacher.twit_url} iconClass="fab fa-twitter" />}
                  {teacher.face_url && <SocialButton link={teacher.face_url} iconClass="fab fa-facebook" />}
                </div>
              </div>
              <div className="card-body text-center p-4">
                <h4 className="card-title mb-0">
                  <Link to={`/teacher-detail/${teacher.id}`}>{teacher.full_name}</Link>
                </h4>
                <p className="mb-0">{teacher.qualification}</p>
              </div>
            </div>

          </div>
        )}
      </div>

      <nav aria-label="Page navigation example mt-3">
        <ul className="pagination justify-content-center">
          {previousUrl &&
            <li className='page-item '><button className='page-link ms-2 rounded-pill' onClick={() => paginationHandler(previousUrl)}><i className='bi bi-arrow-left'></i>Previous</button></li>
          }
          {nextUrl &&
            <li className='page-item'><button className='page-link ms-2 rounded-pill' onClick={() => paginationHandler(nextUrl)}>Next<i className='bi bi-arrow-right'></i></button></li>
          }
        </ul>
      </nav>
    </div>
  )
}

export default AllCourses
