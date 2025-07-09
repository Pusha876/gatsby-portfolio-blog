import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface ImageObject {
    src?: {
        childImageSharp?: {
            gatsbyImageData?: IGatsbyImageData;
        };
        extension?: string;
        publicURL?: string;
        svg?: {
            originalContent?: string;
        };
    };
    alt?: string;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export interface AllSettingsQueryResult<T> {
    allSettingsJson: {
        settings: T[];
    };
}