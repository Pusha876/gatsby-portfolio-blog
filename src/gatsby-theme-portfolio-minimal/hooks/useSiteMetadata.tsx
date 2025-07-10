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

export function useSiteMetadata(): SiteMetadata {
    // Return static data for now to get the build working
    return {
        author: 'Jamie B. Pryce',
        bio: 'Aspiring Cloud Engineer who is fascinated with everything cloud related.',
        description: "Jamie Pryce's Portfolio Website.",
        language: 'en',
        siteUrl: 'https://polite-pond-08ff9450f.5.azurestaticapps.net',
        title: 'Jamie Pryce',
        social: {
            github: 'https://github.com/Pusha876/azure-resume',
            linkedin: 'https://linkedin.com/in/jamie-pryce',
            mail: 'pushtech@push-pi.com',
            twitter: 'https://twitter.com/Pushtech876',
            instagram: 'https://instagram.com/pryce_law24'
        }
    };
}

// Empty query for now
export const query = graphql`
    query SiteMetadata {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
