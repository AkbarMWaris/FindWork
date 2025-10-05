import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './components/ui/theme-provider'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import Onboarding from './pages/Onboarding';
import JobListing from './pages/JobListing';
import JobPage from './pages/JobPage';
import Myjobs from './pages/Myjobs';
import PostJobs from './pages/PostJobs';
import SavedJobs from './pages/SavedJobs';
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter([
  {
    
    element: <AppLayout />,
    children: [
      {
        path:'/',
        element: <LandingPage />
      },
      {
        path:'/onboarding',
        element: (
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
        ),
      },
      {
        path:'/job-list',
        element: (<ProtectedRoute>
          <JobListing />
        </ProtectedRoute>),
      },
      {
        path:'/job/:id',
        element:
                        (<ProtectedRoute>
          
                          <JobPage />
        </ProtectedRoute>),
      },
      {
        path:'/my-jobs', 
        element: 
                        (<ProtectedRoute>
          
                          <Myjobs />
        </ProtectedRoute>),
      },
      {
        path:'/post-job',
        element: 
                        (<ProtectedRoute>
          
                          <PostJobs />
        </ProtectedRoute>),
      },
      {
        path:'/saved-job',
        element: 
                        (<ProtectedRoute>
          
                          <SavedJobs />
        </ProtectedRoute>),
      },
    ],
  },
]);

function App() {


  return (
   <>
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <RouterProvider router={router} />
    </ThemeProvider>
   </>
  )
}

export default App
