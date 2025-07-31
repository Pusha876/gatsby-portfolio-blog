import { useStaticQuery, graphql } from 'gatsby';

export interface SiteMetadata {
    language: string;
    siteUrl: string;
    title: string;
    titleTemplate?: string;
    description: string;
    author: string;
    bio: string;
    thumbnail?: {
        childImageSharp: {
            original: {
                src: string;
            };
        };
    };
    avatar?: {
        childImageSharp?: {
            gatsbyImageData?: any;
        };
    };
    social: {
        github?: string;
        linkedin?: string;
        mail?: string;
        twitter?: string;
        instagram?: string;
        behance?: string;
        medium?: string;
        mastodon?: string;
        hashnode?: string;
        devto?: string;
        youtube?: string;
        twitch?: string;
        dribble?: string;
        gitlab?: string;
        stackoverflow?: string;
        goodreads?: string;
        reddit?: string;
        discord?: string;
        patreon?: string;
        buymeacoffee?: string;
        untappd?: string;
        facebook?: string;
    };
}

export function useSiteMetadata(): SiteMetadata {
    // Try to use GraphQL first, fallback to hardcoded values
    try {
        const data = useStaticQuery(graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        siteUrl
                    }
                }
            }
        `);
        
        // Return GraphQL data with fallbacks
        return {
            author: data?.site?.siteMetadata?.author || 'Jamie B. Pryce',
            bio: 'Aspiring Cloud Engineer who is fascinated with everything cloud related.',
            description: data?.site?.siteMetadata?.description || "Jamie Pryce's Portfolio Website.",
            language: 'en',
            siteUrl: data?.site?.siteMetadata?.siteUrl || 'https://polite-pond-08ff9450f.5.azurestaticapps.net',
            title: data?.site?.siteMetadata?.title || 'Jamie Pryce',
            titleTemplate: '%s · Portfolio Minimal',
            thumbnail: undefined,
            avatar: undefined,
            social: {
                github: 'https://github.com/Pusha876/azure-resume',
                linkedin: 'https://linkedin.com/in/jamie-pryce',
                mail: 'pushtech@push-pi.com',
                twitter: 'https://twitter.com/Pushtech876',
                instagram: 'https://instagram.com/pryce_law24'
            }
        };
    } catch (error) {
        // Fallback to hardcoded values if GraphQL fails
        return {
            author: 'Jamie B. Pryce',
            bio: 'Aspiring Cloud Engineer who is fascinated with everything cloud related.',
            description: "Jamie Pryce's Portfolio Website.",
            language: 'en',
            siteUrl: 'https://polite-pond-08ff9450f.5.azurestaticapps.net',
            title: 'Jamie Pryce',
            titleTemplate: '%s · Portfolio Minimal',
            thumbnail: undefined,
            avatar: undefined,
            social: {
                github: 'https://github.com/Pusha876/azure-resume',
                linkedin: 'https://linkedin.com/in/jamie-pryce',
                mail: 'pushtech@push-pi.com',
                twitter: 'https://twitter.com/Pushtech876',
                instagram: 'https://instagram.com/pryce_law24'
            }
        };
    }
}

// Default export for compatibility
export default useSiteMetadata;