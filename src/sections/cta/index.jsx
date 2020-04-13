import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "styled-components";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

import Box from "components/box";
import { Container, Row, Col } from "components/grid";
import FluidImage from "components/fluid-image";
import { SectionHeading, Text } from "components/typography";
import Button from "components/button";
import { SuccessModal, ErrorModal } from "components/modal";
import Input from "components/input";

const Heading = (props) => {
  const { colors } = useTheme();
  const [left, setLeft] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleResize = () => {
      const rect = ref.current.getBoundingClientRect();
      setLeft((prev) => prev + rect.left);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      ref={ref}
      position="absolute"
      top={96}
      left={-left}
      background={`linear-gradient(to left, ${colors.primary.main}, ${colors.primary.dark})`}
      py={3}
      pl={3}
      pr={5}
      borderTopRightRadius={99}
      borderBottomRightRadius={99}
      zIndex={1}
    >
      <SectionHeading color="text.light" ml={`${left}px`}>
        Оцените вашу вещь
      </SectionHeading>
    </Box>
  );
};

const Form = (props) => <Row as="form" {...props} />;

const Cta = ({ image }) => {
  const [formValues, setFormValues] = useState({ name: "", tel: "" });
  const [formState, setFormState] = useState("initial");
  const [showModal, setShowModal] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormState("submitting");

      await axios.post(process.env.GATSBY_SUBMIT_URL, formValues);

      setFormState("submitted");
    } catch {
      setFormState("error");
    }
    setShowModal(true);
  };

  const onModalDissmiss = () => setShowModal(false);

  let modal = null;
  if (showModal) {
    if (formState === "error") {
      modal = <ErrorModal onDismiss={onModalDissmiss} />;
    } else {
      modal = <SuccessModal onDismiss={onModalDissmiss} />;
    }
  }

  return (
    <Container position="relative" pb={6} pt={5}>
      <Heading />
      <Row>
        <Col col={[12, 6, 6, 4]} mr="auto">
          <FluidImage fluid={image} />
        </Col>
        <Col col={[12, 12, 6, 6, 7]} pt={[5, 5, 6]}>
          <Text>Оставьте заявку и мы ответим на все ваши вопросы</Text>
          <Form onSubmit={onSubmit}>
            <Col col={[12, 6, 12, 6]} mt={4}>
              <Input
                type="text"
                name="name"
                placeholder="Имя"
                value={formValues.name}
                onChange={onChange}
              />
            </Col>

            <Col col={[12, 6, 12, 6]} mt={4}>
              <Input
                type="text"
                name="tel"
                placeholder="Телефон"
                value={formValues.tel}
                onChange={onChange}
              />
            </Col>

            <Col col="auto" mt={4}>
              <Button disabled={formState !== "initial"}>
                Перезвоните мне
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
      <AnimatePresence>{modal}</AnimatePresence>
    </Container>
  );
};
export default Cta;
