import { useState } from 'react';
import { MapPin } from 'lucide-react';

type Props = { title: string; embedUrl: string; mapUrl: string };

export default function ClickToLoadMap({ title, embedUrl, mapUrl }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative flex h-[400px] items-center justify-center overflow-hidden rounded-b-2xl border border-gray-200 bg-slate-50">
      {loaded ? (
        <>
          <iframe src={embedUrl} title={title} className="h-full w-full border-0" allowFullScreen referrerPolicy="no-referrer" />
          <button type="button" onClick={() => setLoaded(false)} aria-label={`Hide map: ${title}`} className="absolute left-3 top-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-[#0073bc] shadow-sm">Hide map</button>
        </>
      ) : (
        <div className="max-w-xs space-y-4 px-5 text-center">
          <MapPin aria-hidden="true" className="mx-auto h-10 w-10 text-[#0073bc]" />
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="text-sm leading-relaxed text-gray-600">Loading this map connects to Google and shares connection information, such as your IP address. Google may use cookies under its own policies.</p>
          <button type="button" onClick={() => setLoaded(true)} className="rounded-lg bg-[#0073bc] px-5 py-2.5 font-semibold text-white hover:bg-[#005a94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0073bc]">Load Google Map</button>
        </div>
      )}
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#0073bc] shadow-sm">Open in Google Maps ↗</a>
    </div>
  );
}
