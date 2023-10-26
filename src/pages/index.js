import React from "react";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  InterestsSection,
  Page,
  ProjectsSection,
  Seo,
} from "gatsby-theme-portfolio-minimal";

export default function IndexPage() {
  return (
    <>
      <Seo title="Jamie Pryce" />
      <Page useSplashScreenAnimation>
        <HeroSection sectionId="hero" />
        <AboutSection sectionId="about" heading="Why I started this Tech Journey" />
        <InterestsSection sectionId="Interests" heading="Interests" />
        <ProjectsSection sectionId="Projects" heading="Projects" />
        <ContactSection sectionId="Contact me" heading="Contact Me" />
      </Page>
    </>
  );
}
