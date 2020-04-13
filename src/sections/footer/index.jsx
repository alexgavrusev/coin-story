import React from "react";

import ColorBackground from "components/color-background";
import { Container, Row, Col } from "components/grid";
import { Text as BaseText } from "components/typography";

import { InternalLink, ExternalLink } from "./links";

const Text = (props) => <BaseText color="text.light" {...props} />;

const Footer = () => (
  <ColorBackground>
    <Container as="footer" py={6}>
      <Row>
        <Col col={[6, 6, 6, 4, 3]}>
          <Text>&copy;CoinStory</Text>
        </Col>
        <Col col={[6, 6, 6, 4, 3]} ml="auto">
          <ExternalLink href="https://goo.gl/maps/PWhhvr6dVd8zN3pTA">
            г. Барнаул, ул. Молодёжная, 40
          </ExternalLink>
        </Col>
      </Row>
      <Row pt={5}>
        <Col col={[6, 6, 6, 4, 3]}>
          <InternalLink to="/policy">Политика конфиденциальности</InternalLink>
        </Col>
        <Col col={[6, 6, 6, 4, 3]} ml="auto">
          <ExternalLink href="tel:8996-000-00-00">8996-000-00-00</ExternalLink>
          <ExternalLink href="mailto:mail@coinstory.pro" mt={3}>
            mail@coinstory.pro
          </ExternalLink>
        </Col>
      </Row>
    </Container>
  </ColorBackground>
);

export default Footer;
