# SkillOrbit

SkillOrbit is a fully functional ed-tech platform that enables users to create, consume, and rate educational content. The platform aims to provide a seamless and interactive learning experience for students while offering a platform for instructors to showcase their expertise and connect with learners across the globe.

## Features

- **Student Features:**

  - Homepage: Brief introduction to the platform, course list, and user details.
  - Course List: List of available courses with descriptions and ratings.
  - Wishlist: Display of courses added to the wishlist.
  - Cart Checkout: Course purchase completion.
  - Course Content: Content pages for individual courses.
  - User Details: Account details page for students.
  - User Edit Details: Account details editing page.
- **Instructor Features:**

  - Dashboard: Overview of courses, ratings, and feedback.
  - Insights: Detailed metrics for courses.
  - Course Management: Create, update, and delete courses, manage content and pricing.
  - View and Edit Profile Details.

## Architecture

SkillOrbit follows a client-server architecture:

- **Front-end:** ReactJS, communicates with the back end using RESTful API calls.
- **Back-end:** NodeJS, ExpressJS, provides APIs for user authentication, course management, etc.
- **Database:** MongoDB, stores course content, user data, and other relevant information.

  ![1707574164930](image/README/1707574164930.png)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/swapavan11/SkillOrbit.git
   ```
2. Install dependencies:
   ```sh
   cd SkillOrbit
   npm install
   cd server
   npm install
   ```
3. Run the application:
   ```sh
   npm run dev
   ```

## Technologies Used

- **Front end:** ReactJs, Tailwind, Shadcn/UI, Redux-toolkit
- **Back end:** NodeJs, ExpressJs
- **Database :** MongoDB
- **Authentication :** JWT
- **Password Hashing :** Bcrypt
- **Media Management :** Cloudinary
- **Payment Integration :** Razorpay API (for making secure payments)

## **Features and Functionalities of the Back-end**

1. User authentication and authorization: Students and instructors can sign up and log in to the platform using their email addresses and password. The platform also supports OTP (One-Time Password) verification and forgot password functionality for added security.
2. Course management: Instructors can create, read, update, and delete courses, as well as manage course content and media. Students can view and rate courses.
3. Payment Integration: Students will purchase and enrol on courses by completing the checkout flow that is followed by Razorpay integration for payment handling.
4. Cloud-based media management: SkillO uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.
