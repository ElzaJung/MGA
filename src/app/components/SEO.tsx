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
  title = "MyungGa Korean Catering - Authentic Asian Cuisine for Weddings, Parties & Corporate Events",
  description = "Premium Korean and Asian catering services with 20+ years experience. Specializing in authentic Korean, Vietnamese, Chinese fusion, and Thai cuisine for weddings, parties, and corporate events in Ontario.",
  keywords = "Korean catering, Asian catering, wedding catering, corporate catering, party catering, authentic Korean food, Vietnamese catering, Chinese fusion catering, Thai catering, galbi-jjim, japchae, pho, jjajangmyeon, Ontario catering, event catering, MyungGa restaurant",
  canonical,
  ogType = "website",
  ogImage = "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1200",
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
    updateMetaTag('meta[property="og:image"]', 'property', ogImage);
    if (canonical) {
      updateMetaTag('meta[property="og:url"]', 'property', canonical);
    }

    // Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', description);
    updateMetaTag('meta[name="twitter:image"]', 'name', ogImage);

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
  }, [title, description, keywords, canonical, ogType, ogImage, structuredData]);

  return null;
}

// Predefined structured data for local business
export const myungGaStructuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://myungga-catering.com",
  "name": "MyungGa Korean Restaurant & Catering",
  "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=1200",
  "description": "Premium Korean and Asian catering services with 20+ years experience. Specializing in authentic Korean, Vietnamese, Chinese fusion, and Thai cuisine.",
  "servesCuisine": ["Korean", "Vietnamese", "Chinese", "Thai", "Asian Fusion"],
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ontario",
    "addressRegion": "ON",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 43.4643,
    "longitude": -80.5204
  },
  "url": "https://myungga-catering.com",
  "telephone": "+1-XXX-XXX-XXXX",
  "email": "buza0605@gmail.com",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "21:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150"
  },
  "menu": "https://myungga-catering.com/#menu",
  "acceptsReservations": "True",
  "paymentAccepted": "Cash, Credit Card, Debit Card",
  "currenciesAccepted": "CAD"
};
