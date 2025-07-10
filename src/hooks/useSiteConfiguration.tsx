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
    try {
        const data = useStaticQuery(query);
        
        // Defensive data access with fallbacks
        const settingsNode = data?.allFile?.nodes?.[0]?.childrenSettingsJson?.[0];
        const siteConfiguration = settingsNode?.siteConfiguration;
        
        if (!siteConfiguration) {
            console.warn('Site configuration not found, using defaults');
            return getDefaultSiteConfiguration();
        }
        
        return {
            featureToggles: {
                useCookieBar: siteConfiguration.featureToggles?.useCookieBar ?? false,
                useDarkModeAsDefault: siteConfiguration.featureToggles?.useDarkModeAsDefault ?? false,
                useDarkModeBasedOnUsersPreference: siteConfiguration.featureToggles?.useDarkModeBasedOnUsersPreference ?? true
            },
            logo: {
                text: siteConfiguration.logo?.text || 'Portfolio',
                image: siteConfiguration.logo?.image || undefined,
                imageDark: siteConfiguration.logo?.imageDark || undefined
            },
            navigation: {
                ctaButton: siteConfiguration.navigation?.ctaButton || {
                    label: 'Contact',
                    openNewTab: false,
                    url: '/#contact'
                },
                footer: siteConfiguration.navigation?.footer || [],
                header: siteConfiguration.navigation?.header || []
            }
        };
    } catch (error) {
        console.warn('Failed to load site configuration, using defaults:', error);
        return getDefaultSiteConfiguration();
    }
}

function getDefaultSiteConfiguration(): SiteConfiguration {
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
                label: 'Contact',
                openNewTab: false,
                url: '/#contact'
            },
            footer: [],
            header: [
                { label: 'About', url: '/#about' },
                { label: 'Projects', url: '/#projects' },
                { label: 'Contact', url: '/#contact' }
            ]
        }
    };
}

export const query = graphql`
    query SiteConfiguration {
        allFile(filter: { name: { eq: "settings" }, extension: { eq: "json" } }) {
            nodes {
                childrenSettingsJson {
                    siteConfiguration {
                        featureToggles {
                            useCookieBar
                            useDarkModeAsDefault
                            useDarkModeBasedOnUsersPreference
                        }
                        logo {
                            text
                            image {
                                extension
                        publicURL
                        svg {
                            originalContent
                        }
                        childImageSharp {
                            gatsbyImageData(width: 320, placeholder: BLURRED)
                        }
                    }
                    imageDark {
                        extension
                        publicURL
                        svg {
                            originalContent
                        }
                        childImageSharp {
                            gatsbyImageData(width: 320, placeholder: BLURRED)
                        }
                    }
                }
                navigation {
                    ctaButton {
                        label
                        openNewTab
                        url
                    }
                    footer {
                        label
                        url
                    }
                    header {
                        label
                        url
                    }
                }
            }
        }
    }
`;
