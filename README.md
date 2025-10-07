# 🚀 FindWork - Job Portal Application

<div align="center">
  <img src="./public/logo.png" alt="FindWork Logo" width="200"/>
  
  ### Your Gateway to Dream Career Opportunities
  
  [![React](https://img.shields.io/badge/React-19.1-blue?logo=react)](https://reactjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-6c47ff?logo=clerk)](https://clerk.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?logo=supabase)](https://supabase.com/)
  [![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?logo=netlify)](https://netlify.com/)
  
  [Live Demo](https://findwork-new.netlify.app/) · [Report Bug](https://github.com/AkbarMWaris/FindWork/issues) · [Request Feature](https://github.com/AkbarMWaris/FindWork/issues)
</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

**FindWork** is a modern, full-stack job portal application that connects job seekers with employers. Built with cutting-edge technologies, it provides a seamless experience for both candidates searching for opportunities and recruiters posting job listings.

**🌐 Live Site:** [https://findwork-new.netlify.app/](https://findwork-new.netlify.app/)

### Why FindWork?

- 🎨 **Modern UI/UX** - Beautiful, responsive interface built with Tailwind CSS and Shadcn UI
- 🔐 **Secure Authentication** - Powered by Clerk for seamless user management
- ⚡ **Real-time Updates** - Fast and efficient data handling with Supabase
- 📱 **Fully Responsive** - Works perfectly on all devices from mobile to desktop
- 🎭 **Role-Based Access** - Separate experiences for candidates and recruiters

---

## ✨ Features

### For Job Seekers (Candidates)
- ✅ Browse and search job listings
- ✅ Filter jobs by location, company, and keywords
- ✅ Save favorite jobs for later
- ✅ Apply to jobs with resume upload
- ✅ Track application status
- ✅ View application history

### For Employers (Recruiters)
- ✅ Post new job listings
- ✅ Manage job postings (open/close positions)
- ✅ View applications for posted jobs
- ✅ Add and manage company information
- ✅ Track applicant details and resumes

### General Features
- ✅ User authentication (Sign up/Sign in)
- ✅ Role selection during onboarding (Candidate/Recruiter)
- ✅ Responsive design for all screen sizes
- ✅ Real-time data synchronization
- ✅ Markdown support for job requirements

---

## 🛠️ Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) **React.js** - UI library for building user interfaces
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) **React Router DOM** - Client-side routing
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) **Tailwind CSS** - Utility-first CSS framework
- ![Shadcn UI](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white) **Shadcn UI** - Re-usable component library
- ![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat-square&logo=lucide&logoColor=white) **Lucide React** - Beautiful icon library
- ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white) **React Hook Form** - Form state management
- ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white) **Zod** - Schema validation

### Backend & Database
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white) **Supabase** - PostgreSQL database and authentication backend
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white) **PostgreSQL** - Relational database
- ![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white) **Clerk** - User authentication and management

### Deployment & Hosting
- ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white) **Netlify** - Continuous deployment and hosting
- ![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white) **GitHub** - Version control and repository hosting

### Additional Libraries
- ![Markdown](https://img.shields.io/badge/Markdown-000000?style=flat-square&logo=markdown&logoColor=white) **@uiw/react-md-editor** - Markdown editor for job requirements
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) **country-state-city** - Location data for job filtering
- ![Embla](https://img.shields.io/badge/Embla-6366F1?style=flat-square) **embla-carousel** - Smooth carousel for company logos
- ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) **react-spinners** - Loading indicators

### Development Tools
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) **Vite** - Build tool and dev server
- ![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat-square&logo=postcss&logoColor=white) **PostCSS** - CSS processing
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) **ESLint** - Code linting
- ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) **npm** - Package manager

---


## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
git clone https://github.com/AkbarMWaris/FindWork.git

     cd FindWork

  
2. **Install dependencies**

    npm install


3. **Set up environment variables** (see [Environment Variables](#environment-variables) section)

    🔐 Environment Variables

    Create a `.env` file in the root directory and add the following variables:

4. **Run the development server**

     Clerk Authentication

   
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

     Supabase Configuration

   
      VITE_SUPABASE_URL=your_supabase_project_url


      VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   
### How to Get API Keys:

**Clerk Setup:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy the publishable key from API Keys section

**Supabase Setup:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to Settings → API
4. Copy the project URL and anon/public key

---

## 🌐 Deployment

This project is deployed on **Netlify** with automatic deployments from GitHub.

### Deploy Your Own

#### Option 1: Deploy to Netlify (Recommended)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/AkbarMWaris/FindWork)

1. Click the "Deploy to Netlify" button above
2. Connect your GitHub account
3. Configure environment variables in Netlify dashboard:
   - Go to Site Settings → Environment Variables
   - Add `VITE_CLERK_PUBLISHABLE_KEY`
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`
4. Deploy!



