import { SanityDocument } from 'next-sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityFetch } from './client';

export type Home = SanityDocument<{
  header: {
    button: I18nString;
    description: I18nString;
    title: string;
    heroSlider: SanityImage[];
  };
  latestWork: {
    title: I18nString;
    description: I18nString;
  };
}>;

export const fetchHome = async () => {
  const QUERY = `*[_type == "home"][0]{_id, header, latestWork}`;
  return await sanityFetch<SanityDocument<Home>>({ query: QUERY });
};

export type CommisionsSection = SanityDocument<{
  title: I18nString;
  stateTexts: {
    open: I18nString;
    close: I18nString;
  };
  form: {
    name: {
      label: I18nString;
      placeholder: I18nString;
    };
    email: {
      label: I18nString;
      placeholder: I18nString;
    };
    artType: {
      label: I18nString;
      placeholder: I18nString;
    };
    attachments: {
      label: I18nString;
      placeholder: I18nString;
    };
    description: {
      label: I18nString;
      placeholder: I18nString;
    };
    send: I18nString;
    sendSuccess: I18nString;
    sendError: I18nString;
  };
}>;

export const fetchCommissionSection = async () => {
  const QUERY = `*[_type == "commissionSection"][0]{_id, title, stateTexts, form}`;
  return await sanityFetch<SanityDocument<CommisionsSection>>({ query: QUERY });
};

export type Footer = SanityDocument<{
  copyright: I18nString;
  madeby: I18nString;
}>;

export const fetchFooter = async () => {
  const QUERY = `*[_type == "footer"][0]{_id, copyright, madeby}`;
  return await sanityFetch<SanityDocument<Footer>>({ query: QUERY });
};

export type Nav = SanityDocument<{
  home: I18nString;
  portfolio: I18nString;
  commissions: I18nString;
  about: I18nString;
  contact: I18nString;
  tos: I18nString;
}>;

export const fetchNav = async () => {
  const QUERY = `*[_type == "nav"][0]{_id, home, portfolio, commissions, about, contact, tos}`;
  return await sanityFetch<SanityDocument<Nav>>({ query: QUERY });
};

export type Work = SanityDocument<{
  title: string;
  slug: string;
  type: I18nString;
  image: SanityImage;
}>;

export const fetchWorks = async (count?: number) => {
  const countStr = count ? `[0..${count - 1}]` : '';

  const QUERY = `*[_type == "work"]{_id, _createdAt, title, slug, type, image}${countStr}|order(_createdAt desc)`;
  return await sanityFetch<SanityDocument<Work>[]>({ query: QUERY });
};

export type Commission = {
  name: string;
  accepted: boolean;
  email: string;
  artType: string;
  description: string;
  attachments: SanityImageSource[];
};

export const fetchCommission = async () => {
  const QUERY = `*[_type == "commissions"]{_id, name, accepted, email, artType, description, attachments}`;
  return await sanityFetch<SanityDocument<Commission>[]>({ query: QUERY });
};

export type Tos = {
  tosPl?: any;
  tosEn?: any;
};

export const fetchTos = async () => {
  const QUERY = `*[_type == "tos"][0]{_id, tosPl, tosEn}`;
  return await sanityFetch<SanityDocument<Tos>>({ query: QUERY });
};

export type Contact = SanityDocument<{
  title: I18nString;
  description: I18nString;
  form: {
    name: {
      label: I18nString;
      placeholder: I18nString;
    };
    email: {
      label: I18nString;
      placeholder: I18nString;
    };
    description: {
      label: I18nString;
      placeholder: I18nString;
    };
    send: I18nString;
  };
}>;

export const fetchContact = async () => {
  const QUERY = `*[_type == "contact"][0]{_id, title, description, form}`;
  return await sanityFetch<SanityDocument<Contact>>({ query: QUERY });
};

export type I18nString = {
  pl: string;
  en: string;
};

export type SanityImage = SanityImageSource & {
  alt: string;
};
