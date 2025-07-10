import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface SiteConfiguration {
    featureToggles: {
        useCookieBar: boolean;
        useDarkModeAsDefault: boolean;
        useDarkModeBasedOnUsersPreference: boolean;
    };
    logo: {
        text: string;
        image?: {
            extension?: string;
            publicURL?: string;
            svg?: { originalContent?: string };
            childImageSharp?: { gatsbyImageData?: IGatsbyImageData };
        };
        imageDark?: {
            extension?: string;
            publicURL?: string;
            svg?: { originalContent?: string };
            childImageSharp?: { gatsbyImageData?: IGatsbyImageData };
        };
    };
    navigation: {
        ctaButton: {
            label: string;
            openNewTab: boolean;
            url: string;
        };
        footer: {
            label: string;
            url: string;
        }[];
        header: {
            label: string;
            url: string;
        }[];
    };
}

export function useSiteConfiguration(): SiteConfiguration {
    // Return static configuration for now to get the build working
    return {
        featureToggles: {
            useCookieBar: false,
            useDarkModeAsDefault: false,
            useDarkModeBasedOnUsersPreference: true
        },
        logo: {
            text: 'Jamie Pryce'
        },
        navigation: {
            ctaButton: {
                label: 'Blog coming soon',
                openNewTab: true,
                url: 'https://blog.jamiepryce.com'
            },
            footer: [
                { label: 'Privacy', url: '/privacy' },
                { label: 'Imprint', url: '/imprint' }
            ],
            header: [
                { label: 'About', url: '/#about' },
                { label: 'Projects', url: '/#Projects' },
                { label: 'Resume', url: 'https://www.pushtech.one' },
                { label: 'Contact', url: '/#contact' }
            ]
        }
    };
}

export const query = graphql`
    query SiteConfiguration {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
