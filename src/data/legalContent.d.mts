export const PRIVACY_NOTICE_VERSION: string;
export const MARKETING_NOTICE_VERSION: string;
export const AI_NOTICE_VERSION: string;
export const AI_PROVIDER_REVIEWED: boolean;
export const AI_PROVIDER_DISCLOSURE: string;
export const business: {
  tradeName: string;
  operator: string;
  entityType: string;
  address: string;
  grievanceName: string;
  grievanceEmail: string;
  grievancePhone: string;
  grievancePhoneHref: string;
  phone: string;
};
export interface LegalSection {
  heading: string;
  paragraphs: string[];
  items?: string[];
}
export interface LegalPageContent {
  path: string;
  title: string;
  description: string;
  sections: LegalSection[];
}
export const legalPages: LegalPageContent[];
