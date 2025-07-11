module.exports = {
  siteMetadata: {
    title: `Jamie Pryce - Portfolio`,
    description: `Azure Cloud Engineer Portfolio`,
    author: `Jamie Pryce`,
    siteUrl: `https://www.jamiepryce.com`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-portfolio-minimal`,
      options: {
        siteUrl: `https://www.jamiepryce.com`,
        manifestSettings: {
          siteName: `Jamie Pryce - Portfolio`,
          shortName: `Jamie Portfolio`,
          startUrl: `/`,
          backgroundColor: `#FFFFFF`,
          themeColor: `#000000`,
          display: `minimal-ui`,
          favicon: `./content/images/favicon.png`,
        },
        contentDirectory: `./content`,
        blogSettings: {
          path: `/blog`,
          usePathPrefixForArticles: false,
        },
      },
    },
  ],
};