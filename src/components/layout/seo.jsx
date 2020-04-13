import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query Seo {
      site {
        siteMetadata {
          lang
          title
          meta
        }
      }
    }
  `);

  return (
    <Helmet>
      <html lang={siteMetadata.lang} />
      <title>{siteMetadata.title}</title>

      {/* Social share buttons */}
      <link rel="preconnect" href="http://vk.com" />
      <link rel="preconnect" href="https://connect.ok.ru" />
      <link rel="preconnect" href="https://www.facebook.com/" />

      {siteMetadata.meta.map((values, i) => (
        <meta key={i} {...Object.fromEntries(values)} />
      ))}
    </Helmet>
  );
};

export default Seo;
