import React from "react";
import { css } from "styled-components";
import { motion } from "framer-motion";

import { MotionBox } from "components/box";
import { Text } from "components/typography";

const ButtonText = (props) => (
  <Text as="span" fontWeight={500} color="text.light" {...props} />
);

const Button = ({ disabled, icon, children, ...props }) => (
  <MotionBox
    forwardedAs={motion.button}
    css={css`
      cursor: pointer;
      outline: none;
    `}
    variants={(theme) => ({
      initial: {
        backgroundColor: theme.colors.primary.main,
      },
      hover: { backgroundColor: theme.colors.primary.dark },
      disabled: {
        backgroundColor: "#ccc",
        borderColor: "#ccc",
        cursor: "not-allowed",
      },
    })}
    initial={false}
    animate={disabled ? "disabled" : "initial"}
    whileHover={disabled ? "disabled" : "hover"}
    disabled={disabled}
    display="flex"
    alignItems="center"
    justifyContent="center"
    px={5}
    py={3}
    // Maximal border radius
    borderRadius="999px"
    border={0}
    {...props}
  >
    {icon}
    <ButtonText ml={icon ? 2 : 0}>{children}</ButtonText>
  </MotionBox>
);

export default Button;
