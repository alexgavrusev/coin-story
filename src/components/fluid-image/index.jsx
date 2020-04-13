import React from "react";
import GatsbyImage from "gatsby-image";

import Box from "components/box";

const FluidImage = (props) => <Box as={GatsbyImage} width="100%" {...props} />;

export default FluidImage;
