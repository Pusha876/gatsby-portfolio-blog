exports.createPages = require('gatsby-theme-portfolio-minimal/src/gatsby/node/createPages');
exports.createResolvers = require('gatsby-theme-portfolio-minimal/src/gatsby/node/createResolvers');
exports.onCreateNode = require('gatsby-theme-portfolio-minimal/src/gatsby/node/onCreateNode');
exports.onPreBootstrap = require('gatsby-theme-portfolio-minimal/src/gatsby/node/onPreBootstrap');

// Custom schema customization to handle our settings.json
const themeCreateSchemaCustomization = require('gatsby-theme-portfolio-minimal/src/gatsby/node/createSchemaCustomization');

exports.createSchemaCustomization = ({ actions, schema }) => {
    // First, call the theme's schema customization
    themeCreateSchemaCustomization({ actions, schema });

    // Add our custom types to ensure the settings.json is properly typed
    actions.createTypes(`
        type SettingsJson implements Node @dontInfer {
            siteMetadata: SiteMetadata
            siteConfiguration: SiteConfiguration
        }
    `);
};
