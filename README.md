**EduNest (Learning Management System)**

An advanced Learning Management System (LMS) created using Django REST Framework and React.js. It enables students to enroll in a diverse array of courses across various domains. The system includes dedicated admin panels for students, teachers, and the website, along with features like student testimonials, multiple categories, and other robust functionalities.

**Features Overview:**  
- **Distinct User Roles:** Tailored dashboards for students and instructors.  
- **Course Management:** Provides functionality for creating, editing, and enrolling in courses.  
- **Assignments & Study Resources:** Teachers can upload study materials and assignments seamlessly.  
- **Real-Time Communication:** Integrated one-on-one chat for students and teachers.  
- **Secure User Access:** Ensures safe login and registration with JWT authentication.  
- **Adaptive Design:** Responsive interface crafted using Bootstrap for an optimized user experience.

**Platform Architecture**

**Frontend:**  
- **React.js:** Component-driven user interface for dynamic and efficient web applications.  
- **Bootstrap:** Ensures a responsive and contemporary design for seamless user experiences.  

**Backend:**  
- **Django REST Framework:** Robust API backend for managing application logic.  
- **SQLite3:** Reliable database for storing user and course information.  
- **JWT Authentication:** Provides secure and efficient user login and registration.

**Project Installation Guide**

# Move to the backend directory

# Set up a virtual environment
python -m venv venv
source venv/bin/activate  # For Windows, use: venv\Scripts\activate

# Install required packages
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Launch the Django server
python manage.py runserver

# Switch to the frontend directory

# Install necessary dependencies
npm install

# Start the React development server
npm start
