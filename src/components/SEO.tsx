import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalPath?: string;
    jsonLd?: Record<string, unknown>;
}

export default function SEO({ title, description, keywords, canonicalPath, jsonLd }: SEOProps) {
    useEffect(() => {
        // ... (existing meta tag logic)
        document.title = title;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);

        if (keywords) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.setAttribute('name', 'keywords');
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', keywords);
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', title);

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute('content', description);

        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', title);

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) twitterDescription.setAttribute('content', description);

        if (canonicalPath) {
            const baseUrl = 'https://www.orbitengineerings.com';
            const canonicalUrl = `${baseUrl}${canonicalPath}`;

            let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
            if (!canonicalLink) {
                canonicalLink = document.createElement('link');
                canonicalLink.setAttribute('rel', 'canonical');
                document.head.appendChild(canonicalLink);
            }
            canonicalLink.setAttribute('href', canonicalUrl);

            const ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

            const twitterUrl = document.querySelector('meta[name="twitter:url"]');
            if (twitterUrl) twitterUrl.setAttribute('content', canonicalUrl);
        }

        // --- JSON-LD Support ---
        if (jsonLd) {
            const scriptId = 'ld-json-schema';
            const oldScript = document.getElementById(scriptId);
            if (oldScript) oldScript.remove();

            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            script.text = JSON.stringify(jsonLd);
            document.head.appendChild(script);
        }

        return () => {
            // Cleanup schema on unmount if needed
            // But we mostly want it to persist until next SEO update
        }

    }, [title, description, keywords, canonicalPath, jsonLd]);

    return null;
}
