const sharedFontOpts = {
  subsets: ["cyrillic"],
  fontDisplay: "block",
  strategy: "selfHosted",
};

module.exports = {
  siteMetadata: {
    title: "CoinStory",
    lang: "ru",
    // HACK: using arrays so that graphql doesn't add absent fields to items
    meta: [
      [
        ["name", "viewport"],
        ["content", "width=device-width, initial-scale=1, shrink-to-fit=no"],
      ],
      [
        ["name", "author"],
        ["content", "lighty.agency"],
      ],
      [
        ["name", "description"],
        [
          "content",
          "Оценка и покупка монет, антиквариата и старых вещей в Барнауле и Алтайском крае",
        ],
      ],
    ],
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "CoinStory",
        short_name: "CoinStory",
        start_url: "/",
        background_color: "#FFAA00",
        theme_color: "#FFAA00",
        display: "minimal-ui",
        icon: "src/images/favicon.png",
      },
    },
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/layout/index.jsx"),
      },
    },
    "gatsby-plugin-styled-components",
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Roboto",
              variants: ["400", "500", "600", "900"],
              ...sharedFontOpts,
            },
          ],
        },
      },
    },
    "gatsby-plugin-preact",
  ],
};
