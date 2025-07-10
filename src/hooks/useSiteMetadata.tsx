import { graphql, useStaticQuery } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface SiteMetadata {
    language: string;
    siteUrl: string;
    thumbnail?: { childImageSharp?: { original?: { src: string } } };
    title: string;
    titleTemplate: string;
    description: string;
    author: string;
    avatar?: { childImageSharp?: { gatsbyImageData?: IGatsbyImageData } };
    bio: string;
    social: {
        github: string;
        linkedin: string;
        mail: string;
        twitter: string;
        instagram: string;
        medium: string;
        behance: string;
        devto: string;
        gitlab: string;
        hashnode: string;
        mastodon: string;
        twitch: string;
        youtube: string;
    };
}

export function useSiteMetadata(): SiteMetadata {
    try {
        const data = useStaticQuery(query);
        
        // Defensive data access with fallbacks
        const settingsNode = data?.allFile?.nodes?.[0]?.childrenSettingsJson?.[0];
        const siteMetadata = settingsNode?.siteMetadata;
        
        if (!siteMetadata) {
            console.warn('Site metadata not found, using defaults');
            return getDefaultSiteMetadata();
        }
        
        return {
            author: siteMetadata.author || 'Jamie Pryce',
            bio: siteMetadata.bio || 'Aspiring Cloud Engineer',
            description: siteMetadata.description || 'Portfolio Website',
            language: siteMetadata.language || 'en',
            siteUrl: siteMetadata.siteUrl || 'https://www.jamiepryce.com',
            title: siteMetadata.title || 'Jamie Pryce - Portfolio',
            titleTemplate: siteMetadata.titleTemplate || '%s · Portfolio',
            avatar: siteMetadata.avatar || undefined,
            thumbnail: siteMetadata.thumbnail || undefined,
            social: {
                github: siteMetadata.social?.github || 'https://github.com/Pusha876',
                linkedin: siteMetadata.social?.linkedin || 'https://linkedin.com/in/jamie-pryce',
                mail: siteMetadata.social?.mail || 'pushtech@push-pi.com',
                twitter: siteMetadata.social?.twitter || 'https://twitter.com/Pushtech876',
                instagram: siteMetadata.social?.instagram || 'https://instagram.com/pryce_law24',
                medium: siteMetadata.social?.medium || '',
                behance: siteMetadata.social?.behance || '',
                devto: siteMetadata.social?.devto || '',
                gitlab: siteMetadata.social?.gitlab || '',
                hashnode: siteMetadata.social?.hashnode || '',
                mastodon: siteMetadata.social?.mastodon || '',
                twitch: siteMetadata.social?.twitch || '',
                youtube: siteMetadata.social?.youtube || ''
            }
        };
    } catch (error) {
        console.warn('Failed to load site metadata, using defaults:', error);
        return getDefaultSiteMetadata();
    }
}

function getDefaultSiteMetadata(): SiteMetadata {
    return {
        author: 'Jamie Pryce',
        bio: 'Aspiring Cloud Engineer',
        description: 'Portfolio Website',
        language: 'en',
        siteUrl: 'https://www.jamiepryce.com',
        title: 'Jamie Pryce - Portfolio',
        titleTemplate: '%s · Portfolio',
        social: {
            github: 'https://github.com/Pusha876',
            linkedin: 'https://linkedin.com/in/jamie-pryce',
            mail: 'pushtech@push-pi.com',
            twitter: 'https://twitter.com/Pushtech876',
            instagram: 'https://instagram.com/pryce_law24',
            medium: '',
            behance: '',
            devto: '',
            gitlab: '',
            hashnode: '',
            mastodon: '',
            twitch: '',
            youtube: ''
        }
    };
}

export const query = graphql`
    query SiteMetadata {
        allFile(filter: { name: { eq: "settings" }, extension: { eq: "json" } }) {
            nodes {
                childrenSettingsJson {
                    siteMetadata {
                        author
                        avatar {
                            childImageSharp {
                                gatsbyImageData(height: 100, width: 100, placeholder: BLURRED)
                            }
                        }
                        bio
                        description
                        language
                        siteUrl
                        title
                        titleTemplate
                        thumbnail {
                            childImageSharp {
                                original {
                                    src
                                }
                            }
                        }
                        social {
                            behance
                            github
                            medium
                            linkedin
                            mail
                            twitter
                            mastodon
                            hashnode
                            devto
                            instagram
                            youtube
                            twitch
                            gitlab
                        }
                    }
                }
            }
        }
    }
`;
