module.exports = {
  siteMetadata: {
    title: `Jamie Pryce`,
    description: `Jamie Pryce's Portfolio Website - Aspiring Cloud Engineer`,
    author: `Jamie B. Pryce`,
    siteUrl: `https://polite-pond-08ff9450f.5.azurestaticapps.net`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-portfolio-minimal`,
      options: {
        siteUrl: `https://polite-pond-08ff9450f.5.azurestaticapps.net`,
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