import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobCard from "@/components/ui/JobCard";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import { useSession, useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

function JobListing() {
  const { session, isLoaded } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const {
    fn: fnCompanies,
    data: companies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && session) {
      fnJobs();
    }
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) {
      setSearchQuery(query);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d6b7" />;
  }

  return (
    <>
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10">
        <h1 className="gradient-title font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center pb-4 sm:pb-6 md:pb-8">
          Latest Jobs
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full gap-2 items-stretch mb-3 sm:mb-4">
          <Input
            type="text"
            name="search-query"
            placeholder="Search Jobs by Title..."
            className="h-10 sm:h-12 md:h-14 flex-1 px-3 sm:px-4 text-sm sm:text-base"
          />
          <Button type="submit" className="h-10 sm:h-12 md:h-14 w-full sm:w-24 md:w-28" variant="blue">
            Search
          </Button>
        </form>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 w-full mb-4">
          <Select value={location} onValueChange={(value) => setLocation(value)}>
            <SelectTrigger className="w-full sm:flex-1 h-10 sm:h-12 text-sm sm:text-base">
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {State.getStatesOfCountry("IN").map(({ name }) => {
                  return (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
            <SelectTrigger className="w-full sm:flex-1 h-10 sm:h-12 text-sm sm:text-base">
              <SelectValue placeholder="Filter by Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {companies?.map(({ name, id }) => {
                  return (
                    <SelectItem key={name} value={id}>
                      {name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            onClick={clearFilters}
            variant="destructive"
            className="w-full sm:w-auto sm:flex-1 md:flex-none md:w-40 h-10 sm:h-12 text-sm sm:text-base"
          >
            Clear Filters
          </Button>
        </div>

        {/* Loading Indicator */}
        {loadingJobs && (
          <BarLoader className="mt-4" width={"100%"} color="#36d6b7" />
        )}

        {/* Job Cards Grid */}
        {loadingJobs === false && (
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {jobs?.length ? (
              jobs.map((job) => {
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    savedInit={job.saved.length > 0}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center text-gray-500 py-8 text-sm sm:text-base">
                No Jobs Found 😢
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default JobListing;
