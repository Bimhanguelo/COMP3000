import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './Header.css'
import './main.css'
import ab from './about.jpg'
import './search.css'

const baseUrl = 'http://localhost:8000/api'

const Home = () => {
  useEffect(() => {
    document.title = 'EduNest'
  })

  const icon = {
    'font-size': '20px'
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [courseData, setCourseData] = useState([]);
  const [popularcourseData, setPopularcourseData] = useState([]);
  const [popularteacherData, setPopularteacherData] = useState([]);
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    try {
      axios.get(baseUrl + '/course/?result=3')
        .then((res) => {
          setCourseData(res.data.results)
        });
    } catch (error) {
      console.log(error)
    }

    try {
      axios.get(baseUrl + '/popular-teachers/?popular=1')
        .then((res) => {
          setPopularteacherData(res.data)
        });
    } catch (error) {
      console.log(error)
    }

    try {
      axios.get(baseUrl + '/popular-courses/?popular=1')
        .then((res) => {
          setPopularcourseData(res.data.results)
        });
    } catch (error) {
      console.log(error)
    }

    try {
      axios.get(baseUrl + '/student-test/')
        .then((res) => {
          setTestData(res.data.results)
        });
    } catch (error) {
      console.log(error)
    }

  }, []);

  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
  const studentLoginStatus = localStorage.getItem('studentLoginStatus')

  const [searchString, setSearchString] = useState({
    'search': '',
  })

  const SocialButton = ({ link, iconClass }) => (
    <a className="btn btn-sm-square btn-primary mx-1" href={link}>
      <i className={iconClass}></i>
    </a>
  );

  const handleChange = (event) => {
    setSearchString({
      ...searchString,
      [event.target.name]: event.target.value
    });
  }

  return (
    <>
      <div className='home-wrapper'>


        {/* Start Background video player*/}
        <section className='home-section'>
          <div class="container col-xxl-8 px-4 my-auto py-5" style={{ height: '60vh' }}>
            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div class="col-10 col-sm-8 col-lg-6">
                <img height="80vh" src="images/cover.jpeg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" loading="lazy" />
              </div>
              <div class="col-lg-6">
                <h1 class="display-5 fw-bold lh-2 mb-3">Learn  with <span className='text-primary'>edunest</span></h1>
                <p class="lead">Where Knowledge Meets Innovation!</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                  <Link to="/user-register" className="btn btn-primary btn-lg px-4 mt-2 me-md-2">Start Learning</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  End Background video player*/}
        {/*  Start Features*/}
        <section className='home-section'>
          <div className="container mt-4">
            <div className="container">
              <p className="section-header display-6 text-center text-primary font-weight-bold">OUR DISTINCTIVE FEATURES</p>
              <div className="row g-4 py-4">
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="service-item rounded-corners text-center pt-3">
                    <div className="p-4">
                      <i className="fa fa-3x fa-graduation-cap text-primary mb-4"></i>
                      <h5 className="mb-3">Expert Instructors</h5>
                      <p>Our expert instructors believe in the power of education. As the saying goes, "If you are planning for a year, sow rice; if you are planning for a decade, plant trees; if you are planning for a lifetime, educate people."</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                  <div className="service-item text-center pt-3">
                    <div className="p-4">
                      <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                      <h5 className="mb-3">Learning Platform</h5>
                      <p>Engagement is key in online learning. The most profound words will remain unread unless you can keep the learner engaged. Our approach: say it, show it, write it, demo it, and link it to an activity.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                  <div className="service-item text-center pt-3">
                    <div className="p-4">
                      <i className="fa fa-3x fa-home text-primary mb-4"></i>
                      <h5 className="mb-3">Home Assignments</h5>
                      <p>To equip our students for the future, our instructors provide high-quality home assignments. These assignments cover questions from all chapters, ensuring a comprehensive understanding of the entire course.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                  <div className="service-item text-center pt-3">
                    <div className="p-4">
                      <i className="fa fa-3x fa-book-open text-primary mb-4"></i>
                      <h5 className="mb-3">Study Material</h5>
                      <p>Success is achievable with our premium study material and top-notch instructors. During exams, students can confidently refer to the study material, ensuring success in any exam or interview.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/*  End Features*/}
        {/*  About Us card */}
        <section className='home-section'>
          <div className="container-xxl py-5 mt-4">
            <div className="container">
              <p className="section-header display-6 text-center text-primary font-weight-bold">ABOUT US</p>
              <div className="row g-5">
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" >
                  <div className="position-relative h-100">
                    <img className="img-fluid position-absolute w-100 h-100" style={{ borderRadius: "20px" }} src={ab} />
                  </div>
                </div>
                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                  <h1 className="mb-4">Welcome to EduNest</h1>
                  <p className="mb-4">At EduNest, we believe that true learning goes beyond traditional classroom settings. Students thrive when they actively engage with their learning materials, discuss concepts, reflect on their experiences, and integrate knowledge into their daily lives.</p>
                  <p className="mb-4">It's time to elevate your learning experience. We are committed to creating eLearning courses that not only captivate but also inspire and motivate. Whether you're acquiring new skills, changing behaviors, or enhancing your performance, our courses are designed to make your learning journey engaging and impactful.</p>
                  <div className="row gy-2 gx-4 mb-4">
                    <div className="col-sm-6">
                      <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Expert Instructors</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Online Learning</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Interactive Discussions</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Comprehensive Study Materials</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Weekly Assignments</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Self-Paced Learning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/*  About Us card */}
        {/* <div className="input-box container">
        <i className="bi bi-search text-info"></i>
        <input name='search' type="search" onChange={handleChange} placeholder="Search here..." aria-label="Search" />
        <Link className='button' to={'/search/' + searchString.search} type="button">Search</Link>
      </div> */}

        <div className='container mt-4'>
          {/* Start Latest Courses*/}
          <div className="container-xxl py-5">
            <div className="container">
              <p className="section-header display-6 text-center text-primary font-weight-bold">LATEST COURSES</p>
              <div className="row g-4 justify-content-center">
                {courseData && courseData.map((course, index) =>
                  <div className="col-lg-4 col-md-6 wow fadeInUp">
                    <div className="course-item bg-light">
                      <div className="position-relative overflow-hidden">
                        <Link to={`/detail/${course.id}`}><img src={course.featured_img} height={250} className="course-item-img" alt={course.title} /></Link>                        </div>
                      <div className="text-center p-4 pb-0">
                        <h5 className="mb-4"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2"><i className="fa fa-user-tie text-primary me-2"></i>{course.teacher.full_name}</small>                            <small className="flex-fill text-center py-2"><i className="fa fa-user text-primary me-2"></i>{course.total_enrolled_students}</small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-primary border border-primary"><Link to='/all-courses' className='text-white' >View More</Link></button>
          </div>
          {/* ENd Latest Courses*/}

          {/* Popular Teacher */}
          <div className="container-xxl py-5">
            <div className="container">
              <p className="display-6 text-center text-primary font-weight-bold">POPULAR TEACHERS</p>
              <div className="row g-4 justify-content-center">
                {popularteacherData && popularteacherData.map((teacher, index) => (
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
                ))}

                <div className="text-center">
                  <button type="button" className="btn btn-primary border border-primary"><Link to='/all-teachers' className='text-white' >View More</Link></button>
                </div>

              </div>
            </div>
          </div>
          {/* ENd Popular Teacher Courses*/}
          {/* Student Testimonial */}
          <div className="text-center wow fadeInUp">
            <p className="display-6 text-center text-primary font-weight-bold">STUDENT TESTIMONIAL</p>
          </div>
          <div>
            <Carousel
              showArrows={true}
              infiniteLoop={true}
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              interval={5500}
              showIndicators={false}
            >
              {testData && testData.map((row, i) =>
                <div>
                  <img src={row.student.profile_img} />
                  <>
                    <div className="myCarousel carousel-card">
                      <names>{row.course.fullname}</names>
                      <titles>{row.course.title}</titles>
                      <p>{row.reviews}</p>
                      <a>--{row.student.fullname}</a>
                    </div>
                  </>
                </div>
              )}
            </Carousel>
          </div>
          {/* ENd Student Testimonial*/}
        </div>
      </div>
    </>
  )
}

export default Home