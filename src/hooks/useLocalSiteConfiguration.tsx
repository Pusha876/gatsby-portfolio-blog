import { graphql, useStaticQuery } from 'gatsby';

export interface LocalSiteConfiguration {
    featureToggles: {
        useCookieBar: boolean;
        useDarkModeAsDefault: boolean;
        useDarkModeBasedOnUsersPreference: boolean;
    };
    logo: {
        text: string;
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

interface SettingsQueryResult {
    allSettingsJson: {
        nodes: Array<{
            siteConfiguration: LocalSiteConfiguration;
        }>;
    };
}

export function useLocalSiteConfiguration(): LocalSiteConfiguration {
    try {
        const data: SettingsQueryResult = useStaticQuery(graphql`
            query LocalSiteConfiguration {
                allSettingsJson {
                    nodes {
                        siteConfiguration {
                            featureToggles {
                                useCookieBar
                                useDarkModeAsDefault
                                useDarkModeBasedOnUsersPreference
                            }
                            logo {
                                text
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
            }
        `);
        
        if (!data?.allSettingsJson?.nodes?.[0]?.siteConfiguration) {
            console.warn('Site configuration not found, using defaults');
            return getDefaultSiteConfiguration();
        }
        
        return data.allSettingsJson.nodes[0].siteConfiguration;
    } catch (error) {
        console.warn('Failed to load site configuration, using defaults:', error);
        return getDefaultSiteConfiguration();
    }
}

function getDefaultSiteConfiguration(): LocalSiteConfiguration {
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
