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
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10">
      <h1 className='gradient-title font-extrabold pb-4 sm:pb-6 md:pb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center'>
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
