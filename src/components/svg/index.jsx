import React from "react";

import Box from "components/box";

export const Svg = (props) => (
  <Box
    as="svg"
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  />
);

export const Path = (props) => (
  <Box as="path" fill-rule="evenodd" fill="text.light" {...props} />
);

export const Ellipse = (props) => (
  <Box as="ellipse" fill="text.light" {...props} />
);
