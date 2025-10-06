import { useUser } from '@clerk/clerk-react'
import {BarLoader} from 'react-spinners'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, NotebookPen  } from 'lucide-react';


function Onboarding() {
    const {user, isLoaded} = useUser();
    const navigate = useNavigate();

    const handleRoleSelection = async(role) =>{
        await user.update({
            unsafeMetadata:{role},
        })
        .then(()=>{
            navigate(role === "recruiter"? "/post-job" : "/job-list");
        })
        .catch((err) => {
            console.error("Error updating role:", err);
        });
    };

    useEffect(() => {
        if(user?.unsafeMetadata.role){
            navigate(
                user?.unsafeMetadata?.role === "recruiter"? "/post-job" : "/job-list"
            );
        }
    }, [user]);

    if(!isLoaded){
        return <BarLoader className="mb-4" width={"100%"} color="#36d6b7" />
    }
    
    return (
        <div className='min-h-screen flex flex-col items-center pt-12 sm:pt-16 md:pt-20 lg:pt-24 px-4 sm:px-6 md:px-10'>
            <h2 className='gradient-title font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tighter text-center mb-8 sm:mb-12 md:mb-16'>
                I am a...
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-2xl px-4 sm:px-6 md:px-8 lg:px-12'>
                <Button 
                    variant='blue' 
                    className="h-24 sm:h-28 md:h-32 lg:h-36 text-lg sm:text-xl md:text-2xl font-semibold"
                    onClick={() => handleRoleSelection("candidate")}
                >
                    Candidate <GraduationCap />
                </Button>
                <Button 
                    // variant="destructive" 
                    className="bg-red-400 text-white hover:bg-red-500 h-24 sm:h-28 md:h-32 lg:h-36 text-lg sm:text-xl md:text-2xl font-semibold"
                    onClick={() => handleRoleSelection("recruiter")}
                >
                    Recruiter <NotebookPen />
                </Button>
            </div>
        </div>
    )
}

export default Onboarding
