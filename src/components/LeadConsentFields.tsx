import { useId } from 'react';
import { useHref } from 'react-router-dom';
import { business } from '../data/legalContent.mjs';
import { LEAD_PURPOSES, type LeadFormType } from '../lib/leadSubmission';

export default function LeadConsentFields({ formType, disabled = false }: { formType: LeadFormType; disabled?: boolean }) {
  const id = useId();
  const privacyHref = useHref('/privacy-policy');
  return (
    <fieldset disabled={disabled} className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
      <legend className="px-1 font-semibold text-gray-900">Your privacy choices</legend>
      <p id={`${id}-notice`} className="text-xs leading-relaxed text-gray-600">
        Your details are sent through Formspree to {business.tradeName} for this request. Formspree processes data in the US and other locations. Please use business contact details and avoid sensitive personal information.{' '}
        <a href={privacyHref} target="_blank" rel="noopener noreferrer" className="font-medium text-[#0073bc] underline underline-offset-2">Read our Privacy Notice (opens in a new tab)</a>.
      </p>
      <label className="flex items-start gap-3 leading-relaxed">
        <input type="checkbox" name="serviceConsent" value="true" required aria-describedby={`${id}-notice`} className="mt-1 h-4 w-4 shrink-0 accent-[#0073bc]" />
        <span>I am 18 or older and consent to OES using my details to {LEAD_PURPOSES[formType].consent}. <span className="font-medium">Required</span>.</span>
      </label>
      <label className="flex items-start gap-3 leading-relaxed">
        <input type="checkbox" name="marketingEmailOptIn" value="true" className="mt-1 h-4 w-4 shrink-0 accent-[#0073bc]" />
        <span>Email me occasional updates about OES products and services. <span className="font-medium">Optional</span>; my request does not depend on this choice. I can withdraw by emailing{' '}
          <a href={`mailto:${business.grievanceEmail}`} className="text-[#0073bc] underline break-all">{business.grievanceEmail}</a>.
        </span>
      </label>
    </fieldset>
  );
}
