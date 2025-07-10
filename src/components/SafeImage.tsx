import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface SafeImageProps {
    image?: {
        childImageSharp?: {
            gatsbyImageData?: IGatsbyImageData;
        };
        extension?: string;
        publicURL?: string;
        svg?: {
            originalContent?: string;
        };
    };
    alt: string;
    className?: string;
    imgClassName?: string;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    fallback?: React.ReactNode;
}

export function SafeImage({
    image,
    alt,
    className,
    imgClassName,
    objectFit = 'cover',
    fallback = null
}: SafeImageProps): React.ReactElement | null {
    // Return fallback if no image data
    if (!image) {
        return fallback as React.ReactElement | null;
    }

    // Handle SVG images
    if (image.extension === 'svg' && image.publicURL) {
        if (image.svg?.originalContent) {
            return (
                <div
                    className={className}
                    dangerouslySetInnerHTML={{ __html: image.svg.originalContent }}
                />
            );
        }
        return (
            <img
                src={image.publicURL}
                alt={alt}
                className={imgClassName}
                style={{ objectFit }}
            />
        );
    }

    // Handle processed images with gatsbyImageData
    if (image.childImageSharp?.gatsbyImageData) {
        return (
            <GatsbyImage
                image={image.childImageSharp.gatsbyImageData}
                alt={alt}
                className={className}
                imgClassName={imgClassName}
                objectFit={objectFit}
            />
        );
    }

    // Handle regular images with publicURL
    if (image.publicURL) {
        return (
            <img
                src={image.publicURL}
                alt={alt}
                className={imgClassName}
                style={{ objectFit }}
            />
        );
    }

    // Return fallback if no usable image data
    return fallback as React.ReactElement | null;
}
