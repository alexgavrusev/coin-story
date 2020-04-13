import React from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";

import {
  space,
  color,
  typography,
  layout,
  flexbox,
  background,
  border,
  position,
  shadow,
  system,
} from "styled-system";

const Box = styled.div`
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${flexbox}
  ${background}
  ${border}
  ${position}
  ${shadow}
  ${system({ fill: { property: "fill", scale: "colors" } })}
`;

export const MotionBox = React.forwardRef(
  ({ variants, as = motion.div, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Box
        as={as}
        ref={ref}
        variants={typeof variants === "function" ? variants(theme) : variants}
        {...props}
      />
    );
  }
);

export default Box;
