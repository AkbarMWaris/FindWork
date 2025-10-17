import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import AutoScroll from "embla-carousel-auto-scroll";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SplitText from "@/components/SplitText";
import { UserSearch, Briefcase } from 'lucide-react';
import { useUser } from "@clerk/clerk-react";

function LandingPage() {

  const {user} = useUser();
  return (
    <>
      <main className="flex flex-col gap-6 sm:gap-10 md:gap-16 lg:gap-20 py-6 px-4 sm:py-10 sm:px-8 md:py-16 md:px-12 lg:py-20 lg:px-16">
        {/* Hero Section */}
        <section className="text-center px-2 sm:px-4">
          <h1 className="flex flex-col items-center justify-center gradient-title text-3xl font-extrabold sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl leading-tight">
            <span className="mb-2 sm:mb-3">Find Your Dream Job</span>
            <span className="text-gray-50 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-6">
              <span>and get Hired with</span>
              {/* <SplitText
                text="Hired"
                delay={300}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              /> */}
            </span>
            <span className="mt-2 sm:mt-3">
              <img
                src="./logo.png"
                alt="logo"
                className="h-10 sm:h-14 md:h-20 lg:h-24 xl:h-32"
              />
            </span>
          </h1>
        </section>

        {/* CTA Buttons - Column on mobile, Row on larger screens */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-4">
           {/* {user?.unsafeMetadata?.role !== "recruiter" && (
            
           )} */}
           <Link to="/job-list">
            <Button variant="blue" size="xl">
              Find Jobs <UserSearch />
            </Button>
          </Link>

         {user?.unsafeMetadata?.role !== "candidate" && (
  <Link to="/post-job">
    <Button className={'bg-red-400 text-white hover:bg-red-500'} size="xl">
      Post a Job <Briefcase />
    </Button>
  </Link>
)}
        </div>

        {/* Carousel */}
        <Carousel
          opts={{ loop: true, dragFree: true }}
          plugins={[
            AutoScroll({
              playOnInit: true,
              speed: 2.5,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          className="w-full py-6 sm:py-8 md:py-10"
        >
          <CarouselContent className="flex gap-3 sm:gap-10 md:gap-16 lg:gap-20 items-center">
            {companies.map(({ name, id, path }) => {
              return (
                <CarouselItem key={id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <img
                    src={path}
                    alt={name}
                    className="h-6 sm:h-9 md:h-12 lg:h-14 object-contain"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Banner */}
        <img 
          src="./banner.jpg" 
          className="w-full rounded-lg sm:rounded-xl" 
          alt="Banner" 
        />

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl md:text-2xl">
                For Job Seekers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base">
              Search and apply for jobs, track applications, and more.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl md:text-2xl">
                For Employers
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base">
              Post jobs, manage applications, and find the best candidates.
            </CardContent>
          </Card>
        </section>

        {/* FAQ Accordion */}
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-left text-sm sm:text-base md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-white">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </main>
    </>
  );
}

export default LandingPage;
