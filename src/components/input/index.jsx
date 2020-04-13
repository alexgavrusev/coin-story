import React from "react";
import { css } from "styled-components";

import Box from "components/box";
import { Text } from "components/typography";

const Input = ({ placeholder, ...props }) => (
  <Text
    forwardedAs="input"
    css={css`
      outline: none;
    `}
    p={3}
    bg="text.light"
    borderRadius={99}
    border="1px solid #ccc"
    placeholder={placeholder}
    aria-label={placeholder}
    {...props}
  />
);

export default Input;

export const FileInput = (props) => (
  <Box as="input" type="file" display="none" {...props} />
);
