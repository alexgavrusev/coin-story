import React from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./global-style";
import Seo from "./seo";

import theme from "theme";

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Seo />
    {children}
  </ThemeProvider>
);

export default Layout;
