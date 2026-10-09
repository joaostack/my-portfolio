import { useLocation, useEffect } from "react";

type OpenGraph = {
  title?: string;
  description?: string;
  type?: "website" | "article" | "profile";
  url?: string;
  site_name?: string;
  locale?: string;
  images?: string[];
  [key: string]: unknown;
};

type Twitter = {
  card?: "summary" | "summary_large_image" | "product" | "website";
  title?: string;
  description?: string;
  images?: string[];
  site?: string;
  creator?: string;
  [key: string]: unknown;
};

type MetadataProps = {
  title?: string;
  description?: string;
  og?: OpenGraph;
  twitter?: Twitter;
};

export function Metadata({ title, description, og, twitter }: MetadataProps) {
  useEffect(() => {
    // Remove existing meta tags to avoid duplicates
    const existingTags = [
      ...document.querySelectorAll(
        'meta[property^="og:"], meta[property^="twitter:"], meta[name^="twitter:"], meta[name="description"]'
      ),
    ];
    existingTags.forEach((tag) => tag.remove());

    // Set Open Graph tags
    if (og) {
      if (og.title) {
        const ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        ogTitle.setAttribute("content", og.title);
        document.head.appendChild(ogTitle);
      }
      if (og.description) {
        const ogDesc = document.createElement("meta");
        ogDesc.setAttribute("property", "og:description");
        ogDesc.setAttribute("content", og.description);
        document.head.appendChild(ogDesc);
      }
      if (og.type) {
        const ogType = document.createElement("meta");
        ogType.setAttribute("property", "og:type");
        ogType.setAttribute("content", og.type);
        document.head.appendChild(ogType);
      }
      if (og.url) {
        const ogUrl = document.createElement("meta");
        ogUrl.setAttribute("property", "og:url");
        ogUrl.setAttribute("content", og.url);
        document.head.appendChild(ogUrl);
      }
      if (og.site_name) {
        const ogSite = document.createElement("meta");
        ogSite.setAttribute("property", "og:site_name");
        ogSite.setAttribute("content", og.site_name);
        document.head.appendChild(ogSite);
      }
      if (og.locale) {
        const ogLocale = document.createElement("meta");
        ogLocale.setAttribute("property", "og:locale");
        ogLocale.setAttribute("content", og.locale);
        document.head.appendChild(ogLocale);
      }
      if (og.images && og.images.length > 0) {
        og.images.forEach((img, i) => {
          const ogImg = document.createElement("meta");
          ogImg.setAttribute("property", `og:image${i > 0 ? `${i + 1}` : ""}`);
          ogImg.setAttribute("content", img);
          document.head.appendChild(ogImg);
        });
      }
    }

    // Set Twitter card tags
    if (twitter) {
      if (twitter.card) {
        const twitterCard = document.createElement("meta");
        twitterCard.setAttribute("property", "twitter:card");
        twitterCard.setAttribute("content", twitter.card);
        document.head.appendChild(twitterCard);
      }
      if (twitter.title) {
        const twitterTitle = document.createElement("meta");
        twitterTitle.setAttribute("property", "twitter:title");
        twitterTitle.setAttribute("content", twitter.title);
        document.head.appendChild(twitterTitle);
      }
      if (twitter.description) {
        const twitterDesc = document.createElement("meta");
        twitterDesc.setAttribute("property", "twitter:description");
        twitterDesc.setAttribute("content", twitter.description);
        document.head.appendChild(twitterDesc);
      }
      if (twitter.images && twitter.images.length > 0) {
        twitter.images.forEach((img) => {
          const twitterImg = document.createElement("meta");
          twitterImg.setAttribute("property", "twitter:image");
          twitterImg.setAttribute("content", img);
          document.head.appendChild(twitterImg);
        });
      }
      if (twitter.site) {
        const twitterSite = document.createElement("meta");
        twitterSite.setAttribute("property", "twitter:site");
        twitterSite.setAttribute("content", twitter.site);
        document.head.appendChild(twitterSite);
      }
      if (twitter.creator) {
        const twitterCreator = document.createElement("meta");
        twitterCreator.setAttribute("property", "twitter:creator");
        twitterCreator.setAttribute("content", twitter.creator);
        document.head.appendChild(twitterCreator);
      }
    }

    // Set standard meta tags
    if (title) {
      const pageTitle = document.querySelector("title");
      if (pageTitle) {
        pageTitle.setAttribute("content", title);
      }
    }
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", description);
      }
    }
  }, [title, description, og, twitter]);

  return null;
}