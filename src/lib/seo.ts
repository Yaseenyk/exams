import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, PORTFOLIO_URL } from "./site";

const PERSON_ID = `${PORTFOLIO_URL}/#person`;

/** Sitewide entity graph. The author is referenced by @id, never redeclared (the portfolio owns the Person). */
export const siteGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": PERSON_ID },
    },
  ],
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function webPageJsonLd(o: { title: string; description: string; path: string; modified: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: o.title,
    description: o.description,
    url: `${SITE_URL}${o.path}`,
    inLanguage: "en-IN",
    dateModified: o.modified,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    author: { "@id": PERSON_ID },
  };
}
