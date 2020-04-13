import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import FluidImage from "components/fluid-image";

import Box from "components/box";

const CoinsBackground = ({ children }) => {
  const data = useStaticQuery(graphql`
    query CoinsBackground {
      file(relativePath: { eq: "bg_coins.png" }) {
        childImageSharp {
          fluid(maxWidth: 1600) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <Box position="relative">
      <FluidImage
        fluid={data.file.childImageSharp.fluid}
        position="absolute !important"
        top={0}
        right={0}
        bottom={0}
        left={0}
      />

      {children}
    </Box>
  );
};

export default CoinsBackground;
