import React, { useRef, useEffect, forwardRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { css, useTheme } from "styled-components";

import Box, { MotionBox } from "components/box";
import { Container, Row, Col } from "components/grid";
import { SectionHeading, Text } from "components/typography";
import FluidImage from "components/fluid-image";

const MotionText = motion.custom(Text);

const ItemNumber = ({ color, ...props }) => (
  <MotionBox
    as={MotionText}
    style={{ color }}
    animate
    transition={{ type: "tween" }}
    pr={2}
    fontSize={40}
    lineHeight="40px"
    fontWeight={900}
    {...props}
  />
);

const StepImage = ({ fluid, ...props }) => (
  <Col col={[4, 12, 12, 4]} {...props}>
    <Box width={[1, 1, 1, 1 / 2]}>
      <FluidImage
        fluid={fluid}
        borderRadius="50%"
        boxShadow="0px 0px 8px 0px rgba(0, 0, 0, 0.25)"
      />
    </Box>
  </Col>
);

const Line = ({ percentVisible, variant = "horizontal" }) => {
  const value = useTransform(percentVisible, (p) => `-${(1 - p) * 100}%`);

  let containerProps = {};
  let lineProps = {};
  if (variant === "horizontal") {
    lineProps = { style: { x: value }, height: 16 };
  } else if (variant === "vertical") {
    containerProps = { width: 16, height: "100%" };
    lineProps = { style: { y: value }, height: "100%" };
  }

  return (
    // Using translate instead of scale to preserve border radius
    <Box
      css={css`
        /* Safari border-radius overflow fix */
        transform: translateZ(0);
      `}
      borderRadius={99}
      overflow="hidden"
      {...containerProps}
    >
      <MotionBox
        css={css`
          transform-origin: left;
        `}
        bg="primary.main"
        width={1}
        transition={{ type: "tween" }}
        borderRadius={99}
        {...lineProps}
      />
    </Box>
  );
};

const OrderedList = forwardRef((props, ref) => (
  <Row ref={ref} as="ol" alignContent="stretch" flex={1} {...props} />
));

const ListItem = (props) => (
  <Col
    as="li"
    col={[12, 12, 12, 4]}
    pt={[5, 0, 0, 5]}
    flexDirection="row"
    {...props}
  />
);

const Process = ({ step1Image, step2Image, step3Image }) => {
  const ref = useRef();

  const theme = useTheme();
  const primary = theme.colors.primary.main;
  const dark = theme.colors.text.dark;

  const springConfig = { mass: 0.1, damping: 200, stiffness: 100 };

  const firstColor = useSpring(dark, springConfig);
  const secondColor = useSpring(dark, springConfig);
  const thirdColor = useSpring(dark, springConfig);

  const intersectionRatio = useMotionValue(0);

  useEffect(() => {
    const handleScroll = (e) => {
      const rect = ref.current.getBoundingClientRect();

      let percentVisible = (window.innerHeight - rect.top) / rect.height;
      if (percentVisible < 0) {
        percentVisible = 0;
      } else if (percentVisible > 1) {
        percentVisible = 1;
      }

      intersectionRatio.set(percentVisible);
    };

    const unsub = intersectionRatio.onChange((i) => {
      firstColor.set(i >= 0.33 ? primary : dark);
      secondColor.set(i >= 0.66 ? primary : dark);
      thirdColor.set(i >= 0.99 ? primary : dark);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsub();
    };
  }, [intersectionRatio, firstColor, secondColor, thirdColor, primary, dark]);

  return (
    <Container pt={6} pb={[6, 6, 6, 0]}>
      <Row>
        <Col col={12} pb={5}>
          <SectionHeading>Как мы работаем</SectionHeading>
        </Col>
      </Row>

      <Row>
        <Col
          col={[12, 3, 3, 12]}
          flexDirection={["column", "row", "row", "column"]}
        >
          <Box display={["none", "block", "block", "none"]} pr={3}>
            <Line variant="vertical" percentVisible={intersectionRatio} />
          </Box>

          <Row>
            <StepImage fluid={step1Image} />
            <StepImage fluid={step2Image} py={[0, 5, 6, 0]} />
            <StepImage fluid={step3Image} />
          </Row>

          <Box display={["block", "none", "none", "block"]} pt={3}>
            <Line percentVisible={intersectionRatio} />
          </Box>
        </Col>

        <Col col={[12, 9, 9, 12]}>
          <OrderedList ref={ref} pb={[0, 0, 0, 6]}>
            <ListItem>
              <ItemNumber color={firstColor}>1</ItemNumber>
              <Text>
                Вы загружаете фото вещи, либо встречаетесь лично с оценщиком
              </Text>
            </ListItem>

            <ListItem pt={[5, 5, 6, 5]} pb={[0, 5, 6, 0]}>
              <ItemNumber color={secondColor}>2</ItemNumber>
              <Text>Оперативно проводим оценку вашей вещи</Text>
            </ListItem>

            <ListItem>
              <ItemNumber color={thirdColor}>3</ItemNumber>
              <Text>
                Приобретаем вещь по выгодной цене, либо даём рекомендации по её
                реализации
              </Text>
            </ListItem>
          </OrderedList>
        </Col>
      </Row>
    </Container>
  );
};

export default Process;
