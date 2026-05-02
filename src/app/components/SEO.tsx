import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
}

export function SEO({
  title = "MyungGA Korean Restaurant & Catering - Authentic Asian Cuisine for School, Corporate, and Special Events",
  description = "Premium Korean catering services with 20+ years experience.",
  keywords = "Korean catering, Asian catering, Waterloo ontario catering, authentic Korean food",
  canonical,
  ogType = "website",
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (attribute === 'name') {
          element.setAttribute('name', selector.replace('meta[name="', '').replace('"]', ''));
        } else if (attribute === 'property') {
          element.setAttribute('property', selector.replace('meta[property="', '').replace('"]', ''));
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('meta[name="description"]', 'name', description);
    updateMetaTag('meta[name="keywords"]', 'name', keywords);

    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'property', title);
    updateMetaTag('meta[property="og:description"]', 'property', description);
    updateMetaTag('meta[property="og:type"]', 'property', ogType);
    if (canonical) {
      updateMetaTag('meta[property="og:url"]', 'property', canonical);
    }

    // Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', 'name', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', description);

    // Canonical URL
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute('href', canonical);
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, canonical, ogType, structuredData]);

  return null;
}

// Predefined structured data for local business
export const myungGaStructuredData = {
  "@type": "Restaurant",
  "@id": "https://myungga.ca",
  "name": "MyungGA Korean Restaurant & Catering",
  "description": "Premium Korean catering and bao services with 20+ years experience. Specializing in authentic Korean cuisine and signature bao boxes.",
  "servesCuisine": ["Korean", "Bao", "Chicken", "Asian Fusion"],
  "priceRange": "$$",
  "address": {
    "@type": "256 Phillip St. Waterloo, ON",
    "addressLocality": "Ontario",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.4643,
    "longitude": -80.5204
  },
  "url": "https://myungga.ca",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "11:00",
      "closes": "22:00"
    }
  ]
};
