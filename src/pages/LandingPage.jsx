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

function LandingPage() {
  return (
    <>
      <main className="flex flex-col gap-10 sm:gap-20 py-10 px-25 sm:py-20">
        <section className="text-center">
          <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl">
            Find Your Dream Job{" "}
            <span className="text-gray-50 flex items-center gap-2 sm:gap-6">
              and get Hired with{" "}
              {/* <SplitText
                text="Hired"
                // className="text-2xl font-semibold text-center"
                delay={300}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                // onLetterAnimationComplete={handleAnimationComplete}
              /> */}
            
            </span>
            <span>
              {" "}
              <img
                src="./logo.png"
                alt="logo"
                className="h-14 sm:h-24 lg:h-32 "
              />
            </span>
          </h1>
        </section>
        <div className="flex gap-6 justify-center">
          <Link to="/job-list">
            <Button variant="blue" size="xl">
              Find Jobs
            </Button>
          </Link>
          <Link to="/post-job">
            <Button variant="destructive" size="xl">
              Post a Job
            </Button>
          </Link>
        </div>
        {/* carousel */}
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
          className="w-full py-10 "
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => {
              return (
                <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                  <img
                    src={path}
                    alt={name}
                    className="h-9 sm:h-14 object-contain"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        {/* banner */}
        <img src="./banner.jpg" className="w-full " alt="" />
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* cards */}
          <Card>
            <CardHeader>
              <CardTitle>For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent>
              Search and apply for jobs, track applications, and more.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Employers</CardTitle>
            </CardHeader>
            <CardContent>
              Post jobs, manage applications, and find the best candidates.
            </CardContent>
          </Card>
        </section>
        {/* accordians */}

        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => {
            return (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </main>
    </>
  );
}

export default LandingPage;
