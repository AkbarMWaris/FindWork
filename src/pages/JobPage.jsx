import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import ApplicationCard from '@/components/ApplicationCard';
import ApplyJobDrawer from '@/components/ApplyJobDrawer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react'
import { Value } from '@radix-ui/react-select';
import MDEditor from '@uiw/react-md-editor';
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

const JobPage = () => {
    const {isLoaded, user} = useUser();
    const {id} = useParams();

    const {
      loading: loadingJob,
      data: job,
      fn: fnJob,
    } = useFetch(getSingleJob,{
      job_id: id,
    });

    const {
      loading: loadingHiringStatus,
      fn: fnHiringStatus,
    } = useFetch(updateHiringStatus,{
      job_id: id,
    });

    const handleStatusChange = (value) => {
        const isOpen = value === 'open';
        fnHiringStatus(isOpen).then(()=> fnJob());
    };

    useEffect(() => {
      if(isLoaded) fnJob();
    },[isLoaded]);

    if(!isLoaded || loadingJob){
      return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
    }

  return (
    <div className='flex flex-col gap-5 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-8'>
       {/* Header Section */}
       <div className='flex flex-col-reverse gap-4 sm:gap-6 md:flex-row justify-between items-center'>
        <h1 className='gradient-title font-extrabold text-center md:text-left pb-2 sm:pb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>
          {job?.title}
        </h1>
        <img 
          src={job?.company?.logo_url} 
          className='h-10 sm:h-12 md:h-14 lg:h-16' 
          alt={job?.title} 
        />
       </div>

       {/* Job Info Section */}
<div className='flex flex-row justify-between items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base'>
    <div className='flex gap-1 sm:gap-2 items-center'>
      <MapPinIcon className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5' />
      <span className='truncate'>{job?.location}</span>
    </div>
    <div className='flex gap-1 sm:gap-2 items-center'>
      <Briefcase className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5' /> 
      <span className='whitespace-nowrap'>{job?.applications?.length} Applicants</span>
    </div>
    <div className='flex gap-1 sm:gap-2 items-center'>
      {job?.isOpen ? (
        <>
          <DoorOpen className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5' /> 
          <span>Open</span>
        </>
      ) : (
        <>
          <DoorClosed className='w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5' /> 
          <span>Closed</span>
        </>
      )}
    </div>
</div>

        {/* Hiring Status */}
        {loadingHiringStatus && <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />}
        {job?.recruiter_id === user?.id && (
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger
              className={`w-full h-10 sm:h-12 text-sm sm:text-base ${job?.isOpen ? "bg-green-300" : "bg-red-950"}`}>
              <SelectValue 
                placeholder={
                  "Hiring Status" + (job?.isOpen ? " (Open)" : " (Closed)")
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='open'>Open</SelectItem>
              <SelectItem value='closed'>Closed</SelectItem>
            </SelectContent>
          </Select>
        )}

        {/* Job Description */}
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>About the job</h2>
        <p className='text-sm sm:text-base md:text-lg text-white'>{job?.description}</p>

        {/* Requirements */}
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>
          What we are looking for
        </h2>
        <MDEditor.Markdown 
          source={job?.requirements}
          className='bg-transparent text-sm sm:text-base md:text-lg'
        />

        {/* Apply Job Drawer */}
        {job?.recruiter_id !== user?.id && (
          <ApplyJobDrawer 
            job={job}
            user={user}
            fetchJob={fnJob}
            applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
          />
        )}

        {/* Applications Section */}
        {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
          <div className='flex flex-col gap-3 sm:gap-4'>
            <h2 className='text-xl sm:text-2xl md:text-3xl font-bold'>
              Applications
            </h2>
            {job?.applications.map((application) => {
              return (
                <ApplicationCard key={application.id} application={application} />
              );
            })}
          </div>
        )}
    </div>
  )
}

export default JobPage
