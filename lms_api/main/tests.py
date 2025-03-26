import os
from django.test import TestCase
from .models import Teacher, Course, Chapter, Student, StudentCourseEnrollment, StudentFavoriteCourse, StudentAssignment, Quiz,CourseCategory,  CourseRating
from django.core.files.uploadedfile import SimpleUploadedFile


class TeacherModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Set up data for the whole TestCase
        Teacher.objects.create(
            full_name='John Doe',
            email='john.doe@example.com',
            password='securepassword',
            qualification='Masters in Education',
            mobile_no='1234567890',
            skills='Math,Science',
            face_url='https://www.facebook.com/johndoe',
            insta_url='https://www.instagram.com/johndoe',
            twit_url='https://twitter.com/johndoe',
            web_url='https://www.johndoe.com',
            you_url='https://www.youtube.com/johndoe'
        )

    def test_skill_list(self):
        teacher = Teacher.objects.get(full_name='John Doe')
        skill_list = teacher.skill_list()
        self.assertEqual(skill_list, ['Math', 'Science'])

    def test_total_teacher_course(self):
        teacher = Teacher.objects.get(full_name='John Doe')
        total_course = teacher.total_teacher_course()
        self.assertEqual(total_course, 0)  # Update this based on your actual data

    def test_total_teacher_chapters(self):
        teacher = Teacher.objects.get(full_name='John Doe')
        total_chapters = teacher.total_teacher_chapters()
        self.assertEqual(total_chapters, 0)  # Update this based on your actual data

    def test_total_teacher_students(self):
        teacher = Teacher.objects.get(full_name='John Doe')
        total_students = teacher.total_teacher_students()
        self.assertEqual(total_students, 0)  # Update this based on your actual data

class CourseCategoryModelTest(TestCase):

    def test_total_courses(self):
        category = CourseCategory.objects.create(title='Programming', description='Learn programming')
        self.assertEqual(category.total_courses(), 0)  # Update this based on your actual data

    def test_course_category_str(self):
        category = CourseCategory.objects.create(title='Programming', description='Learn programming')
        self.assertEqual(str(category), 'Programming')


class CourseModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        teacher = Teacher.objects.create(
            full_name='John Doe',
            email='john.doe@example.com',
            password='securepassword',
            mobile_no='1234567890'
        )
        category = CourseCategory.objects.create(title='Programming', description='Learn programming')
        Course.objects.create(
            category=category,
            teacher=teacher,
            title='Python Basics',
            description='Learn the basics of Python programming',
            techs='Python,Programming',
            course_views=100
        )

    def test_related_videos(self):
        course = Course.objects.get(title='Python Basics')
        related_videos = course.related_videos()
        self.assertEqual(related_videos, '[]')  # Update this based on your actual data

    def test_teach_list(self):
        course = Course.objects.get(title='Python Basics')
        teach_list = course.teach_list()
        self.assertEqual(teach_list, ['Python', 'Programming'])

    def test_total_enrolled_students(self):
        course = Course.objects.get(title='Python Basics')
        total_enrolled_students = course.total_enrolled_students()
        self.assertEqual(total_enrolled_students, 0)  # Update this based on your actual data

    def test_course_rating(self):
        course = Course.objects.get(title='Python Basics')
        course_rating = course.course_rating()
        self.assertIsNone(course_rating)  # Update this based on your actual data

    def test_course_str(self):
        course = Course.objects.get(title='Python Basics')
        self.assertEqual(str(course), 'Python Basics')


class ChapterModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Create a sample Teacher
        teacher = Teacher.objects.create(
            full_name='Sample Teacher',
            email='sample.teacher@example.com',
            password='securepassword',
            mobile_no='1234567890'
        )
        # Create a sample CourseCategory
        category = CourseCategory.objects.create(
            title='Sample Category',
            description='This is a sample category for testing purposes.'
        )

        # Create a sample Course associated with the sample category
        course = Course.objects.create(
            category=category,
            teacher=teacher,
            title='Test Course',
            description='This is a test course',
            techs='Testing',
            course_views=0
        )

        # For simplicity, we're providing a simple text file as a placeholder for the video
        video_file = SimpleUploadedFile("Introduction.mp4", b"file_content")

        Chapter.objects.create(
            course=course,
            title='Introduction',
            video = video_file,
            description='Chapter introduction',
            remarks='Test remarks'
        )

    def test_chapter_str(self):
        chapter = Chapter.objects.get(title='Introduction')
        self.assertEqual(str(chapter), 'Introduction')

    def test_chapter_course_relation(self):
        chapter = Chapter.objects.get(title='Introduction')
        course = chapter.course
        self.assertIsNotNone(course)
        self.assertEqual(course.title, 'Test Course')

    def test_chapter_description(self):
        chapter = Chapter.objects.get(title='Introduction')
        self.assertEqual(chapter.description, 'Chapter introduction')

    def test_chapter_remarks(self):
        chapter = Chapter.objects.get(title='Introduction')
        self.assertEqual(chapter.remarks, 'Test remarks')

    def test_chapter_video_upload_path(self):
        chapter = Chapter.objects.get(title='Introduction')
        expected_filename = 'Introduction.mp4'  # Include the file extension

        # Use os.path.basename to get the filename from the full path
        actual_filename = os.path.basename(chapter.video.path)

        # Split the filename by '_' and take the first part
        actual_base_filename = actual_filename.split('_')[0]
        expected_base_filename = expected_filename.split('.')[0]

        self.assertEqual(actual_base_filename, expected_base_filename)

class StudentModelTest(TestCase):

    def setUp(self):
        self.student = Student.objects.create(
            fullname='John Doe',
            email='john.doe@example.com',
            password='securepassword',
            username='john_doe',
            interseted_categories='Programming, Math',
            profile_img=None  # You can replace this with an actual image for testing
        )

         # Create a sample Teacher
        teacher = Teacher.objects.create(
            full_name='Sample Teacher',
            email='sample.teacher@example.com',
            password='securepassword',
            mobile_no='1234567890'
        )
        # Create a sample CourseCategory
        category = CourseCategory.objects.create(
            title='Sample Category',
            description='This is a sample category for testing purposes.'
        )

        # Create a sample Course associated with the sample category
        self.course = Course.objects.create(
            category=category,
            teacher=teacher,
            title='Test Course',
            description='This is a test course',
            techs='Testing',
            course_views=0
        )


        self.enrollment = StudentCourseEnrollment.objects.create(
            course=self.course,
            student=self.student
        )

        self.course_rating = CourseRating.objects.create(
            course=self.course,
            student=self.student,
            rating=4,
            reviews='Great course content'
        )

    def test_student_str(self):
        self.assertEqual(str(self.student), 'John Doe')

    def test_student_enrolled_courses(self):
        self.assertEqual(self.student.enrolled_courses(), 1)

    def test_student_favorite_courses(self):
        # Assuming the student does not have any favorite courses initially
        self.assertEqual(self.student.favorite_courses(), 0)

    def test_student_complete_assignments(self):
        # Assuming the student does not have any completed assignments initially
        self.assertEqual(self.student.complete_assignments(), 0)

    def test_student_pending_assignments(self):
        # Assuming the student does not have any pending assignments initially
        self.assertEqual(self.student.pending_assignments(), 0)

    def test_student_course_enrollment_str(self):
        self.assertEqual(str(self.enrollment), 'Test Course-John Doe')

    def test_course_rating_str(self):
        self.assertEqual(str(self.course_rating), 'Test Course-John Doe-4')

