import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Hero from "sections/hero";
import Process from "sections/process";
import Share from "sections/share";
import Cta from "sections/cta";
import Footer from "sections/footer";

export const imageFragment = graphql`
  fragment Image on File {
    childImageSharp {
      fluid(traceSVG: { color: "#FFAA00" }) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`;

const Index = () => {
  const data = useStaticQuery(graphql`
    query Index {
      horizontalHeroImage: file(relativePath: { eq: "hero.png" }) {
        ...Image
      }

      verticalHeroImage: file(relativePath: { eq: "hero_landscape.png" }) {
        ...Image
      }

      step1: file(relativePath: { eq: "1_step.png" }) {
        ...Image
      }

      step2: file(relativePath: { eq: "2_step.png" }) {
        ...Image
      }

      step3: file(relativePath: { eq: "3_step.png" }) {
        ...Image
      }

      cta: file(relativePath: { eq: "cta.png" }) {
        ...Image
      }
    }
  `);

  return (
    <>
      <Hero
        horizontalImage={data.horizontalHeroImage.childImageSharp.fluid}
        verticalImage={data.verticalHeroImage.childImageSharp.fluid}
      />
      <Process
        step1Image={data.step1.childImageSharp.fluid}
        step2Image={data.step2.childImageSharp.fluid}
        step3Image={data.step3.childImageSharp.fluid}
      />
      <Share />
      <Cta image={data.cta.childImageSharp.fluid} />
      <Footer />
    </>
  );
};

export default Index;
