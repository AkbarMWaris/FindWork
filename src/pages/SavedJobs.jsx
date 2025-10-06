import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/ui/JobCard";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJobs = () => {
    const {isLoaded} = useUser();

    const {
        loading: loadingSavedJobs,
        data: savedJobs,
        fn: fnSavedJobs,
    } = useFetch(getSavedJobs);

    useEffect(() => {
        if(isLoaded) fnSavedJobs();
    }, [isLoaded]);

    if (!isLoaded || loadingSavedJobs) {
        return <BarLoader className="mb-4" width={"100%"} color="#36d6b7" />;
    }

    return (
        <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10">
            <h1 className='gradient-title font-extrabold pb-4 sm:pb-6 md:pb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center'>
                Saved Jobs
            </h1>

            {loadingSavedJobs === false && (
                <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                    {savedJobs?.length ? (
                        savedJobs.map((saved) => {
                            return (
                                <JobCard
                                    key={saved.id}
                                    job={saved?.job} 
                                    savedInit={true}
                                    onJobSaved={fnSavedJobs}
                                />
                            );
                        })
                    ) : ( 
                        <div className="col-span-full text-center py-12 sm:py-16">
                            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-500">
                                No Saved Jobs Found 😶‍🌫️
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SavedJobs;
