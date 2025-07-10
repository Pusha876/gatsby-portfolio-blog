const { createSchemaCustomization } = require('gatsby-theme-portfolio-minimal/src/gatsby/node/createSchemaCustomization');

exports.createSchemaCustomization = ({ actions, schema }) => {
    // First, call the theme's schema customization
    createSchemaCustomization({ actions, schema });

    // Add our custom types to ensure the settings.json is properly typed
    actions.createTypes(`
        type SettingsJson implements Node @dontInfer {
            siteMetadata: SiteMetadata
            siteConfiguration: SiteConfiguration
        }
    `);
};
