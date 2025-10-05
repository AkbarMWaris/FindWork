import CreatedApplications from "@/components/CreatedApplications";
import CreatedJobs from "@/components/CreatedJobs";
import { useUser } from "@clerk/clerk-react"
import { BarLoader } from "react-spinners";

const Myjobs = () => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d6b7" />;
  }

  return (
    <div className="px-25">
      <h1 className='gradient-title font-extrabold pb-8 text-6xl sm:text-7xl text-center '>
            {user?.unsafeMetadata?.role === "candidate"
            ? "My Applications"
            : "My Jobs"}
      </h1>

                  {user?.unsafeMetadata?.role === "candidate" ? (
                      <CreatedApplications />
                  ) : (
                      <CreatedJobs />
                  )}
    </div>
  )
}

export default Myjobs
