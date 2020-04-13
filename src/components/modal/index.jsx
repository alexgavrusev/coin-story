import React from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { motion } from "framer-motion";
import { RemoveScroll } from "react-remove-scroll";

import Box, { MotionBox } from "components/box";
import { Container, Row, Col } from "components/grid";
import { SectionHeading, Text } from "components/typography";
import Button from "components/button";

const MotionContent = motion.custom(DialogContent);

export const ModalBase = ({ onDismiss, children }) => (
  // HACK: DialogOverlay doesn't forward ref properly, so can't use motion.custom on it
  <Box
    as={DialogOverlay}
    position="fixed"
    top={0}
    right={0}
    bottom={0}
    left={0}
    bg="unset"
    zIndex={100}
    onDismiss={onDismiss}
  >
    <MotionBox
      position="fixed"
      top={0}
      right={0}
      bottom={0}
      left={0}
      display="flex"
      alignItems="center"
      variants={{
        enter: { backgroundColor: "rgba(18, 18, 18, 0.75)" },
        exit: { backgroundColor: "rgba(18, 18, 18, 0)" },
      }}
      initial="exit"
      animate="enter"
      exit="exit"
    >
      <Box flex="1 1 0" className={RemoveScroll.classNames.fullWidth}>
        <Container>
          <Row>
            <Col col={[12, 12, 8, 8, 6]} mx="auto">
              <MotionBox
                as={MotionContent}
                variants={{
                  enter: { scale: 1 },
                  exit: { scale: 0 },
                }}
                initial="exit"
                animate="enter"
                exit="exit"
                bg="text.light"
                borderRadius={5}
                p={3}
              >
                {children}
              </MotionBox>
            </Col>
          </Row>
        </Container>
      </Box>
    </MotionBox>
  </Box>
);

export const SuccessModal = ({ onDismiss }) => (
  <ModalBase onDismiss={onDismiss}>
    <SectionHeading>Заявка отправлена</SectionHeading>
    <Text py={3}>В ближайшее время свяжемся с вами для уточнения деталей</Text>
    <Button onClick={onDismiss}>ОК</Button>
  </ModalBase>
);

export const ErrorModal = ({ onDismiss }) => (
  <ModalBase onDismiss={onDismiss}>
    <SectionHeading>Что-то пошло не так</SectionHeading>
    <Text py={3}>Произошла ошибка при отправке заявки, попробуйте позже</Text>
    <Button onClick={onDismiss}>ОК</Button>
  </ModalBase>
);
