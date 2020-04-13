import React from "react";
import { useTheme } from "styled-components";

import Box from "components/box";

const ColorBackground = (props) => {
  const theme = useTheme();
  const { primary } = theme.colors;

  return (
    <Box
      background={`linear-gradient(to left, ${primary.main}, ${primary.dark})`}
      {...props}
    />
  );
};

export default ColorBackground;
