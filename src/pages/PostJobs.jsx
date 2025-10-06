import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { State } from "country-state-city";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { getCompanies } from "@/api/apiCompanies";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/AddCompanyDrawer";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJobs = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/job-list");
  }, [loadingCreateJob]);

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/job-list" />;
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 sm:py-8 md:py-10">
      <h1 className="gradient-title font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center pb-4 sm:pb-6 md:pb-8">
        Post a Job
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-6 pb-0 max-w-4xl mx-auto"
      >
        <Input
          placeholder="Job Title"
          {...register("title")}
          className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
        />
        {errors.title && (
          <p className="text-red-500 text-xs sm:text-sm">{errors.title.message}</p>
        )}

        <Textarea
          placeholder="Job Description"
          {...register("description")}
          className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
        />
        {errors.description && (
          <p className="text-red-500 text-xs sm:text-sm">{errors.description.message}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-stretch">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full sm:flex-1 h-10 sm:h-11 md:h-12 text-sm sm:text-base">
                  <SelectValue placeholder="Location" />
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
            )}
          />

          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full sm:flex-1 h-10 sm:h-11 md:h-12 text-sm sm:text-base">
                  <SelectValue placeholder="Company">
                    {field.value
                      ? companies?.find((com) => com.id === Number(field.value))
                          ?.name
                      : "Company"}
                  </SelectValue>
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
            )}
          />
          <AddCompanyDrawer fetchCompanies={fnCompanies} />
        </div>
        {errors.location && (
          <p className="text-red-500 text-xs sm:text-sm">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500 text-xs sm:text-sm">{errors.company_id.message}</p>
        )}

        <Controller
          name="requirements"
          control={control}
          render={({ field }) => (
            <div className="w-full">
              <MDEditor value={field.value} onChange={field.onChange} />
            </div>
          )}
        />
        {errors.requirements && (
          <p className="text-red-500 text-xs sm:text-sm">{errors.requirements.message}</p>
        )}
        {errorCreateJob?.message && (
          <p className="text-red-500 text-xs sm:text-sm">{errorCreateJob?.message}</p>
        )}

        {loadingCreateJob && <BarLoader width={"100%"} color="#36d7b7" />}
        <Button
          type="submit"
          variant={"blue"}
          size={"lg"}
          className="mt-2 h-10 sm:h-11 md:h-12 text-sm sm:text-base md:text-lg"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostJobs;
