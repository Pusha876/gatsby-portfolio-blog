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