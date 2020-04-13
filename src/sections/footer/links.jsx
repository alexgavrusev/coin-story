import React, { forwardRef } from "react";
import { css } from "styled-components";
import { Link } from "gatsby";
import { motion } from "framer-motion";

import { MotionBox } from "components/box";
import { Text } from "components/typography";

const StyledLink = (as) =>
  forwardRef((props, ref) => <Text ref={ref} as={as} {...props} />);

const MotionExternalLink = motion.custom(StyledLink("a"));
const MotionInternalLink = motion.custom(StyledLink(Link));

export const ExternalLink = (props) => (
  <MotionBox
    forwardedAs={MotionExternalLink}
    css={css`
      text-decoration: underline;
    `}
    variants={(theme) => ({
      initial: {
        color: theme.colors.text.light,
      },
      hover: {
        color: "#eee",
      },
    })}
    initial={false}
    animate="initial"
    transition={{ type: "tween" }}
    whileHover="hover"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
);

export const InternalLink = (props) => (
  <ExternalLink forwardedAs={MotionInternalLink} {...props} />
);
