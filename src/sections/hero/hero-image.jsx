import React, { useState } from "react";

import { MotionBox } from "components/box";
import FluidImage from "components/fluid-image";

export const HorizontalHeroImage = ({ image, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <MotionBox
      variants={{ initial: { x: "100%" }, animate: { x: 0 } }}
      initial="initial"
      animate={loaded ? "animate" : "initial"}
      transition={{ type: "tween" }}
      pt={2}
      px={2}
      pb={2}
      mr={-3}
      borderTopLeftRadius="999px"
      borderTopRightRadius={0}
      borderBottomRightRadius={0}
      borderBottomLeftRadius="999px"
      bg="primary.main"
      {...props}
    >
      <FluidImage onLoad={() => setLoaded(true)} fluid={image} />
    </MotionBox>
  );
};

export const VerticalHeroImage = ({ image }) => (
  <HorizontalHeroImage
    variants={{ initial: { y: "-100%" }, animate: { y: 0 } }}
    image={image}
    pt={5}
    mr={0}
    borderTopLeftRadius={0}
    borderTopRightRadius={0}
    borderBottomRightRadius="999px"
    borderBottomLeftRadius="999px"
  />
);
