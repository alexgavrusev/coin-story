import React, { forwardRef } from "react";

import Box from "components/box";

export const Text = forwardRef(({ fontSize = 1, ...props }, ref) => (
  <Box
    as="p"
    ref={ref}
    fontFamily="Roboto"
    fontSize={fontSize}
    lineHeight={fontSize}
    color="text.dark"
    letterSpacing={0.3}
    {...props}
  />
));

export const SmallText = (props) => <Text fontSize={0} {...props} />;

export const SectionHeading = (props) => (
  <Text as="h2" fontSize={[2, 2, 2, 4]} letterSpacing={0.15} {...props} />
);

export const HeroHeading = (props) => (
  <SectionHeading
    as="h1"
    fontSize={[3, 3, 3, 5]}
    letterSpacing={0.25}
    {...props}
  />
);
