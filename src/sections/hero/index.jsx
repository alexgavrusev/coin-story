import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import FormData from "form-data";

import Box from "components/box";
import { Svg, Ellipse, Path } from "components/svg";
import { Container, Row, Col } from "components/grid";
import { HeroHeading, SectionHeading } from "components/typography";
import Button from "components/button";
import { ModalBase, SuccessModal, ErrorModal } from "components/modal";
import Input from "components/input";

import CoinsBackground from "./coins-background";
import { HorizontalHeroImage, VerticalHeroImage } from "./hero-image";

const Camera = () => (
  <Svg>
    <Ellipse cx="12" cy="12" fill="text.light" rx="3.2" ry="3.2" />
    <Path d="M7.16999817 4L9 2h6l1.83000183 2H20c1.09999847 0 2 .89999962 2 2v12c0 1.09999847-.90000153 2-2 2H4c-1.09999847 0-2-.90000153-2-2V6c0-1.10000038.90000153-2 2-2h3.16999817zM7 12c0 2.76000023 2.24000168 5 5 5 2.76000214 0 5-2.23999977 5-5s-2.23999786-5-5-5c-2.75999832 0-5 2.23999977-5 5z" />
    <Path fill="none" d="M0 0h24v24H0V0z" />
  </Svg>
);

const Hero = ({ horizontalImage, verticalImage }) => {
  const fileInputRef = useRef();
  const [formData] = useState(() => new FormData());
  const [stage, setStage] = useState("file");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(process.env.GATSBY_SUBMIT_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStage("submitted");
    } catch {
      setStage("error");
    }
  };

  const onFileChange = (e) => {
    const { files } = e.target;

    formData.set("file", files[0]);

    setStage("contact");
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    formData.set(name, value);
  };

  const onDismiss = () => {
    if (stage === "contact") {
      setStage("file");
      // Force onChange even if the same file will be selected
      fileInputRef.current.value = null;
    } else {
      setStage("dismissed");
    }
  };

  let modal = null;
  if (stage === "contact") {
    modal = (
      <ModalBase onDismiss={onDismiss}>
        <Box as="form" onSubmit={onSubmit}>
          <SectionHeading pb={2}>Введите ваши контактные данные</SectionHeading>
          <Input
            placeholder="Имя"
            name="name"
            onChange={onChange}
            value={formData.get("name")}
          />
          <Input
            placeholder="Телефон"
            name="tel"
            onInput={onChange}
            value={formData.get("tel")}
            ml={3}
          />
          <Button mt={3}>Оставить заявку</Button>
        </Box>
      </ModalBase>
    );
  } else if (stage === "submitted") {
    modal = <SuccessModal onDismiss={onDismiss} />;
  } else if (stage === "error") {
    modal = <ErrorModal onDismiss={onDismiss} />;
  }

  const disableFileInput = stage === "dismissed";

  return (
    <CoinsBackground>
      <Container pb={6} minHeight="100vh">
        <Row>
          <Col display={["flex", "none"]} col={12} pt={6}>
            <HorizontalHeroImage image={horizontalImage} />
          </Col>

          <Col col={[12, 9, 9, 8]} pt={[5, 6]} mr="auto">
            <HeroHeading>
              Оценка и покупка монет, антиквариата и старых вещей в Барнауле и
              Алтайском крае
            </HeroHeading>
            <Box pt={5} />

            <Box
              ref={fileInputRef}
              as="input"
              type="file"
              accept="image/*"
              id="file"
              display="none"
              onChange={onFileChange}
              disabled={disableFileInput}
            />

            <Button
              alignSelf={["stretch", "flex-start"]}
              forwardedAs={motion.label}
              htmlFor="file"
              icon={<Camera />}
              disabled={disableFileInput}
            >
              Загрузить фото для оценки
            </Button>
          </Col>

          <Col col={[3, 3, 3, 2]} display={["none", "flex"]}>
            <VerticalHeroImage image={verticalImage} />
          </Col>
        </Row>
      </Container>
      <AnimatePresence>{modal}</AnimatePresence>
    </CoinsBackground>
  );
};

export default Hero;
