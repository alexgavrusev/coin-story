import React, { forwardRef } from "react";

import Box from "components/box";

export const Container = forwardRef(({ fluid = false, ...props }, ref) => (
  <Box
    as="section"
    maxWidth={fluid ? "none" : ["none", "36rem", "48rem", "60rem", "72rem"]}
    mx="auto"
    px={3}
    ref={ref}
    {...props}
  />
));

export const Row = forwardRef((props, ref) => (
  <Box ref={ref} display="flex" flexWrap="wrap" mx={-3} {...props} />
));

const getColFlex = (colValue) => {
  switch (colValue) {
    case true:
      return "0 1 1";

    case "auto":
      return "0 0 auto";

    default:
      return `0 0 ${(100 / 12) * colValue}%`;
  }
};

export const Col = forwardRef(({ col = true, ...props }, ref) => {
  let flex;
  if (!Array.isArray(col)) {
    flex = getColFlex(col);
  } else {
    flex = col.map(getColFlex);
  }

  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      px={3}
      ref={ref}
      flex={flex}
      maxWidth="100%"
      {...props}
    />
  );
});
