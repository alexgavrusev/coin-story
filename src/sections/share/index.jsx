import React from "react";

import ColorBackground from "components/color-background";
import { Container, Row, Col } from "components/grid";
import { SectionHeading } from "components/typography";

import ShareButton from "./share-button";

const Share = () => {
  return (
    <ColorBackground>
      <Container py={5}>
        <Row>
          <Col col={[12, 12, "auto"]}>
            <SectionHeading color="text.light">Расскажите о нас</SectionHeading>
          </Col>
          <Col col={[12, 12, "auto"]} flexDirection="row" flexWrap="wrap">
            <ShareButton network="vk" />
            <ShareButton network="fb" mx={5} />
            <ShareButton network="ok" />
          </Col>
        </Row>
      </Container>
    </ColorBackground>
  );
};

export default Share;
