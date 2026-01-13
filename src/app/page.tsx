"use client"

import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { ProductWork } from "@/components/ProductWork";
import { Process } from "@/components/Process";
import { TechStack } from "@/components/TechStack";
import { Freelance } from "@/components/Freelance";
import { Contact } from "@/components/Contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <main className="flex flex-col gap-10 overflow-hidden">
      <Hero />
      <About />
      <Services />
      <ProductWork />
      <Process />
      <TechStack />
      <Freelance />
      <Contact />
    </main>
  );
}
