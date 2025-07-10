import { graphql, useStaticQuery } from 'gatsby';

export interface SiteMetadata {
    language: string;
    siteUrl: string;
    title: string;
    description: string;
    author: string;
    bio: string;
    social: {
        github?: string;
        linkedin?: string;
        mail?: string;
        twitter?: string;
        instagram?: string;
    };
}

interface SettingsQueryResult {
    allSettingsJson: {
        nodes: Array<{
            siteMetadata: SiteMetadata;
        }>;
    };
}

export function useLocalSiteMetadata(): SiteMetadata {
    try {
        const data: SettingsQueryResult = useStaticQuery(graphql`
            query LocalSiteMetadata {
                allSettingsJson {
                    nodes {
                        siteMetadata {
                            author
                            bio
                            description
                            language
                            siteUrl
                            title
                            social {
                                github
                                linkedin
                                mail
                                twitter
                                instagram
                            }
                        }
                    }
                }
            }
        `);
        
        if (!data?.allSettingsJson?.nodes?.[0]?.siteMetadata) {
            console.warn('Site metadata not found, using defaults');
            return getDefaultSiteMetadata();
        }
        
        return data.allSettingsJson.nodes[0].siteMetadata;
    } catch (error) {
        console.warn('Failed to load site metadata, using defaults:', error);
        return getDefaultSiteMetadata();
    }
}

function getDefaultSiteMetadata(): SiteMetadata {
    return {
        author: 'Jamie Pryce',
        bio: 'Full-Stack Developer',
        description: 'Portfolio of Jamie Pryce - Full-Stack Developer',
        language: 'en',
        siteUrl: 'https://polite-pond-08ff9450f.5.azurestaticapps.net',
        title: 'Jamie Pryce - Portfolio',
        social: {
            github: 'https://github.com/jamiepryce',
            linkedin: 'https://linkedin.com/in/jamiepryce',
            mail: 'mailto:jamie@example.com'
        }
    };
}
