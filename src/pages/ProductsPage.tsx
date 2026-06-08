import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SEO from '../components/SEO';
import BrochureModal from '../components/BrochureModal';
import { useNavigate } from 'react-router-dom';
import orbitBrochure from '../assets/Orbit brocher.pdf_.pdf';

// ── All real product images (no flat icon folder used here) ───
import imgWTP from '../assets/products/wtp plant.jpg';
import imgSTP from '../assets/products/stp plant.jpg';
import imgRO from '../assets/products/ro.jpg';
import imgETP from '../assets/products/etp plant.png';
import imgPLC from '../assets/products/syncsys_plc.png';
import imgScada from '../assets/products/Scada 2.png';
import imgActuatorPT from '../assets/products/electric-part-turn-actuator-sp-1.png';
import imgActuatorMT from '../assets/products/electric-multiturn.jpeg';
import imgEMFlow from '../assets/products/electromagnetic-flow-meter.jpg';
import imgVortex from '../assets/products/Vortex-Flowmeter.jpg';
import imgBulkFlow from '../assets/products/bulk-flow-meter.jpg';
import imgLevelTx from '../assets/products/ultrasonic-level-tx.jpg';
import imgLevelSw from '../assets/products/conductive-level-switch.jpg';
import imgPressureTx from '../assets/products/pressure-transmeter.jpeg';
import imgPressureSm from '../assets/products/smart-type-pressure-transmitter.jpg';
import imgPhAnalyzer from '../assets/products/ph-analyzer.jpeg';
import imgTurbidity from '../assets/products/turbidity-analyzer.jpeg';
import imgSox from '../assets/products/sox analyzer.png';
import imgCO from '../assets/products/co analyzer.jpg';
import imgButterfly from '../assets/products/butter-fly-valves.jpg';
import imgSluice from '../assets/products/sluce-valves.jpg';
import imgSolarPanel from '../assets/products/solar-panel.jpg';
import imgSolarSt from '../assets/products/smart-solar-street-light.jpeg';
import imgDistTx from '../assets/products/distribution-transformer.jpeg';
import imgAutoTx from '../assets/products/auto-transformer.png';
import imgBullet from '../assets/products/bullet-camera.jpg';
import imgDome from '../assets/products/dome-camera.jpg';
import imgJointing from '../assets/products/big-jointing-machines.jpg';
import imgChlorinator from '../assets/products/chlorinator.jpg';
import imgChlorinsitu from '../assets/products/electrolysis-system-chlorinsitu.jpeg';
import imgSdv from '../assets/products/sdv.jpg';
import imgScour from '../assets/products/scour-monitoring.jpeg';
import imgFloatingSolar from '../assets/products/floating-solar.jpeg';

interface ProductsPageProps { onNavigate?: (page: string) => void; }

// ── Data types ────────────────────────────────────────────────
interface SubProduct {
  name: string;
  img: string;
  route?: string;   // optional: if set, clicking this thumbnail navigates directly here
}

interface Category {
  id: string;
  label: string;
  accent: string;        // tailwind color name used for border/badge
  accentHex: string;     // actual hex for inline styles
  route?: string;        // if present, the whole category is clickable
  tagline: string;
  items: SubProduct[];
}

// ── Category data ─────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    id: 'water-treatment',
    label: 'Water Treatment Plants & Systems',
    accent: 'blue',
    accentHex: '#0073bc',
    tagline: 'Complete WTP · STP · RO · ETP solutions for municipal & industrial needs',
    items: [
      { name: 'Water Treatment Plants (WTP)', img: imgWTP },
      { name: 'Sewage Treatment Plants (STP)', img: imgSTP },
      { name: 'Reverse Osmosis Systems (RO)', img: imgRO },
      { name: 'Effluent Treatment Plants (ETP)', img: imgETP },
    ],
  },
  {
    id: 'automation',
    label: 'Automation & Control Systems',
    accent: 'violet',
    accentHex: '#7c3aed',
    route: 'automation',
    tagline: 'PLC panels, SCADA, IoT sensors, RTU & cloud monitoring platforms',
    items: [
      { name: 'PLC Control Panels', img: imgPLC },
      { name: 'SCADA / RTU Systems', img: imgScada },
    ],
  },
  {
    id: 'actuators',
    label: 'Electric Actuators',
    accent: 'orange',
    accentHex: '#d97706',
    route: 'actuators',
    tagline: 'Multi-turn & part-turn electric actuators for precise valve automation',
    items: [
      { name: 'Part-Turn Actuators', img: imgActuatorPT, route: 'part-turn-actuators' },
      { name: 'Multi-Turn Actuators', img: imgActuatorMT, route: 'multi-turn-actuators' },
    ],
  },
  {
    id: 'flow-meters',
    label: 'Flow Meters',
    accent: 'blue',
    accentHex: '#1d4ed8',
    route: 'flow-meters',
    tagline: 'Electromagnetic, Ultrasonic, Vortex, Mass, Turbine & Smart water meters',
    items: [
      { name: 'Electromagnetic Flow Meter', img: imgEMFlow },
      { name: 'Vortex Flow Meter', img: imgVortex },
      { name: 'Bulk / Water Meter', img: imgBulkFlow },
    ],
  },
  {
    id: 'level',
    label: 'Level Measurement',
    accent: 'cyan',
    accentHex: '#0891b2',
    route: 'level-transmitter',
    tagline: 'Ultrasonic, Hydrostatic, Capacitance transmitters & float level switches',
    items: [
      { name: 'Level Transmitters', img: imgLevelTx, route: 'level-transmitter' },
      { name: 'Level Switches', img: imgLevelSw, route: 'level-switch' },
    ],
  },
  {
    id: 'pressure',
    label: 'Pressure Measurement',
    accent: 'red',
    accentHex: '#dc2626',
    route: 'pressure-transmitter',
    tagline: 'Differential, gauge & smart pressure transmitters for process control',
    items: [
      { name: 'Pressure Transmitters', img: imgPressureTx, route: 'pressure-transmitter' },
      { name: 'Smart Pressure Transmitters', img: imgPressureSm, route: 'pressure-transmitter' },
    ],
  },
  {
    id: 'water-analyzers',
    label: 'Water Quality Analyzers',
    accent: 'emerald',
    accentHex: '#059669',
    route: 'analyzers',
    tagline: 'Online pH, DO, Turbidity, Chlorine, BOD & COD analyzers',
    items: [
      { name: 'pH / DO Analyzers', img: imgPhAnalyzer },
      { name: 'Turbidity Analyzers', img: imgTurbidity },
    ],
  },
  {
    id: 'air-gas',
    label: 'Air & Gas Analyzers',
    accent: 'sky',
    accentHex: '#0284c7',
    route: 'air-quality-analyzers',
    tagline: 'Continuous SOx, NOx, PM2.5 monitoring & CO / CO₂ gas analyzers',
    items: [
      { name: 'Air Quality Analyzers (SOx/NOx)', img: imgSox, route: 'air-quality-analyzers' },
      { name: 'Gas Analyzers (CO / CO₂)', img: imgCO, route: 'air-quality-analyzers' },
    ],
  },
  {
    id: 'valves',
    label: 'Valves & Piping',
    accent: 'slate',
    accentHex: '#475569',
    route: 'valves',
    tagline: 'Butterfly, gate, control valves, sluice gates & HDPE piping systems',
    items: [
      { name: 'Butterfly Valves', img: imgButterfly },
      { name: 'Sluice Valves', img: imgSluice },
    ],
  },
  {
    id: 'solar',
    label: 'Solar Energy Solutions',
    accent: 'yellow',
    accentHex: '#d97706',
    route: 'solar',
    tagline: 'Smart solar street lights, Mono/Poly/PERC modules & Floating solar structures',
    items: [
      { name: 'Solar Street Lights', img: imgSolarSt, route: 'solar' },
      { name: 'Solar PV Modules', img: imgSolarPanel, route: 'solar-modules' },
      { name: 'Floating Solar', img: imgFloatingSolar, route: 'solar' },
    ],
  },
  {
    id: 'transformers',
    label: 'Transformers',
    accent: 'purple',
    accentHex: '#7c3aed',
    route: 'transformers',
    tagline: 'Auto, distribution, shunt & traction transformers 11kV – 765kV',
    items: [
      { name: 'Distribution Transformers', img: imgDistTx },
      { name: 'Auto Transformers', img: imgAutoTx },
    ],
  },
  {
    id: 'cameras',
    label: 'Cameras & Surveillance',
    accent: 'gray',
    accentHex: '#374151',
    route: 'cameras',
    tagline: 'Bullet, dome, PTZ and high-speed industrial vision systems',
    items: [
      { name: 'Bullet Cameras', img: imgBullet },
      { name: 'Dome Cameras', img: imgDome },
    ],
  },
  {
    id: 'jointing',
    label: 'Jointing Machines',
    accent: 'teal',
    accentHex: '#0891b2',
    route: 'jointing',
    tagline: 'Butt fusion & electrofusion HDPE pipe jointing machines',
    items: [
      { name: 'Fusion Jointing Machines', img: imgJointing },
    ],
  },
  {
    id: 'chlorinators',
    label: 'Chlorinators',
    accent: 'green',
    accentHex: '#16a34a',
    route: 'chlorinators',
    tagline: 'Automated chlorine dosing systems ensuring safe drinking water',
    items: [
      { name: 'Chlorine Dosing Systems', img: imgChlorinator },
      { name: 'Electrolysis System (CHLORINSITU)', img: imgChlorinsitu },
    ],
  },
  {
    id: 'sdv',
    label: 'Submersible Dredging Vehicle',
    accent: 'blue',
    accentHex: '#1d4ed8',
    route: 'sdv',
    tagline: 'ROV robotic system for sludge & silt removal up to 50m depth',
    items: [
      { name: 'SDV – Robotic Dredging System', img: imgSdv },
    ],
  },
  {
    id: 'scour',
    label: 'Scour Monitoring System',
    accent: 'sky',
    accentHex: '#0ea5e9',
    route: 'scour-monitoring',
    tagline: 'IoT real-time bridge foundation erosion & water level monitoring',
    items: [
      { name: 'Scour Monitoring System', img: imgScour },
    ],
  },
];

// ── Multi-item thumbnail ─────────────────────────────────────────
function ProductThumb({
  sub, delay, accentHex, onSubClick, interactive = true
}: {
  sub: SubProduct;
  delay: number;
  accentHex: string;
  onSubClick?: (route: string, e: React.MouseEvent) => void;
  interactive?: boolean;   // false = display-only, no badge/ring/cursor
}) {
  const hasSubRoute = !!sub.route;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      onClick={interactive && hasSubRoute && onSubClick ? (e) => onSubClick(sub.route!, e) : undefined}
      className={`flex flex-col gap-2 group ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <div
        className={`relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-white border shadow-sm transition-all duration-300 flex items-center justify-center
          ${interactive
            ? 'border-gray-100 group-hover:shadow-lg group-hover:border-gray-300 group-hover:ring-2 group-hover:ring-offset-1'
            : 'border-gray-100'}`}
        style={interactive ? { '--tw-ring-color': accentHex } as React.CSSProperties : {}}
      >
        <img
          src={sub.img}
          alt={sub.name}
          loading="lazy"
          className={`w-full h-full object-contain p-3 transition-transform duration-500 ${interactive ? 'group-hover:scale-105' : ''}`}
        />
        {/* Hover shimmer — only when interactive */}
        {interactive && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300 pointer-events-none"
            style={{ background: `linear-gradient(135deg, ${accentHex}, transparent)` }}
          />
        )}
        {/* "View →" badge — only when interactive */}
        {interactive && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <span
              className="flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full text-white shadow-sm"
              style={{ background: accentHex }}
            >
              View <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>
        )}
      </div>
      <p className="text-[11px] text-gray-700 font-semibold leading-tight px-0.5 line-clamp-2">{sub.name}</p>
    </motion.div>
  );
}

// ── Single-item featured card (horizontal: image left, text right) ──
function FeaturedProductCard({
  sub, cat, onSubClick
}: {
  sub: SubProduct;
  cat: Category;
  onSubClick?: (route: string, e: React.MouseEvent) => void;
}) {
  const hasSubRoute = !!sub.route && !!onSubClick;
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="flex gap-4 items-center"
    >
      {/* Image — with universal hover effect */}
      <div
        onClick={hasSubRoute ? (e) => onSubClick!(sub.route!, e) : undefined}
        className="relative w-36 h-36 sm:w-44 sm:h-44 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer group-hover:shadow-lg group-hover:border-gray-300 group-hover:ring-2 group-hover:ring-offset-1"
        style={{ '--tw-ring-color': cat.accentHex } as React.CSSProperties}
      >
        <img
          src={sub.img}
          alt={sub.name}
          loading="lazy"
          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${cat.accentHex}, transparent)` }}
        />
        {/* "View →" badge — always on hover */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <span
            className="flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full text-white shadow-sm"
            style={{ background: cat.accentHex }}
          >
            View <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>

      {/* Text body */}
      <div className="flex flex-col justify-center gap-2 flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 leading-snug">{sub.name}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{cat.tagline}</p>
        {cat.route && (
          <span
            className="mt-1 inline-flex items-center gap-1 text-xs font-bold transition-all duration-200 group-hover:gap-2"
            style={{ color: cat.accentHex }}
          >
            Explore range <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ── Category card ─────────────────────────────────────────────
function CategoryCard({ cat, onClick, onSubClick }: {
  cat: Category;
  onClick?: () => void;
  onSubClick?: (route: string) => void;
}) {
  const clickable = !!cat.route;
  const isSingle = cat.items.length === 1;
  const colCount = cat.items.length <= 2 ? cat.items.length : cat.items.length === 3 ? 3 : 4;
  const isNew = cat.id === 'sdv' || cat.id === 'scour';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden transition-all duration-300
        ${clickable
          ? 'bg-white border border-gray-100 cursor-pointer group hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:scale-[0.99]'
          : 'bg-[#f8fafd] border border-dashed border-gray-200 shadow-none cursor-default'}`}
    >
      {/* Top accent bar — softer for non-clickable */}
      <div
        className="h-[3px] w-full"
        style={{ background: `linear-gradient(90deg, ${cat.accentHex}${clickable ? '' : '66'}, ${cat.accentHex}22)` }}
      />
      {/* Left accent stripe */}
      <div className="absolute left-0 top-[3px] bottom-0 w-[3px] opacity-10" style={{ background: cat.accentHex }} />

      <div className="pl-5 pr-4 pt-4 pb-5 sm:pl-6 sm:pr-5 sm:pt-5 sm:pb-6">

        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            {/* Colored dot */}
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.accentHex }} />
            {isNew && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                ✦ New
              </span>
            )}
            <h2 className="text-[15px] sm:text-base font-bold text-gray-900 leading-snug">{cat.label}</h2>
          </div>

          {/* Tap-friendly arrow — min 44px touch target */}
          {clickable && (
            <div
              className="flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
              style={{ background: `${cat.accentHex}12`, color: cat.accentHex }}
            >
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          )}
        </div>

        {/* ── Tagline (only for multi-item, single shows it inside FeaturedCard) ── */}
        {!isSingle && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4">{cat.tagline}</p>
        )}

        {/* ── Product visuals ── */}
        {isSingle ? (
          /* Single item → horizontal featured layout */
          <FeaturedProductCard
            sub={cat.items[0]}
            cat={cat}
            onSubClick={onSubClick ? (route, e) => { e.stopPropagation(); onSubClick(route); } : undefined}
          />
        ) : (
          /* Multiple items → fixed-height rectangular grid */
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${Math.min(colCount, 4)}, minmax(0, 1fr))` }}
          >
            {cat.items.map((sub, i) => (
              <ProductThumb
                key={i}
                sub={sub}
                delay={i * 0.08}
                accentHex={cat.accentHex}
                interactive={clickable}   // display-only when card has no route
                onSubClick={onSubClick ? (route, e) => { e.stopPropagation(); onSubClick(route); } : undefined}
              />
            ))}
          </div>
        )}

        {/* ── Footer ── */}
        {clickable ? (
          <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">{cat.items.length} model{cat.items.length > 1 ? 's' : ''}</span>
            <span
              className="flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-2.5"
              style={{ color: cat.accentHex }}
            >
              View full range
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        ) : (
          <p className="mt-4 pt-3.5 border-t border-dashed border-gray-200 text-xs text-gray-400 italic flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300" />
            Contact us for specifications &amp; custom solutions
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function ProductsPage({ onNavigate }: ProductsPageProps) {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const navigate = useNavigate();

  // Use parent's onNavigate if available (triggers LogoLoader transition),
  // otherwise fall back to direct navigate
  const handleClick = (route: string) => {
    if (onNavigate) {
      onNavigate(`product-info:${route}`);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate(`/products/${route}`), 180);
    }
  };

  // Split into two columns for the desktop grid
  const leftCol = CATEGORIES.filter((_, i) => i % 2 === 0);
  const rightCol = CATEGORIES.filter((_, i) => i % 2 === 1);

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <SEO
        title="Water Treatment Products, Instrumentation & Automation Solutions | Orbit Engineering Solutions Bhopal"
        description="Explore Orbit Engineering Solutions' 200+ precision-engineered products: WTP, STP, RO, ETP, electromagnetic flow meters, SCADA systems, PLC panels, level transmitters, pressure sensors, pH analyzers, solar panels, electric actuators, transformers, HDPE jointing machines, surveillance cameras & more. Best prices in India."
        canonicalPath="/products"
        keywords="water treatment products India, flow meter supplier Bhopal, electromagnetic flow meter, SCADA system price, PLC panel manufacturer, level transmitter dealer, pressure sensor India, pH analyzer, turbidity analyzer, electric actuator, solar panel, transformer, butterfly valve, HDPE jointing machine, submersible dredging vehicle, scour monitoring system, instrumentation products, instrumentation equipment, water treatment equipment, WTP products, STP products, RO system price, ETP equipment, solar pump price, orbit engineering solutions products, orbitengineerings products, water treatment products Bhopal, industrial automation products"
      />
      <h1 className="sr-only">Orbit Engineering Solutions Products – Water Treatment, Instrumentation, Automation & Industrial Solutions Bhopal</h1>

      {/* Hero */}
      <HeroSection
        title="Products & Solutions"
        subtitle="Precision-engineered systems across water treatment, automation, measurement, energy & more"
      />

      {/* Stats bar */}
      <div className="bg-[#0073bc]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {[
            { value: '16+', label: 'Product Categories' },
            { value: '200+', label: 'Products & Models' },
            { value: '500+', label: 'Projects Delivered' },
            { value: '25+', label: 'Years of Expertise' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-white">
              <span className="text-lg font-black">{s.value}</span>
              <span className="text-xs text-blue-100 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick category strip */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-nowrap gap-2 items-center overflow-x-auto scrollbar-hide w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mr-1 flex-shrink-0">Browse</span>
          {[
            { label: 'Water Treatment', color: '#0073bc' },
            { label: 'Automation', color: '#7c3aed' },
            { label: 'Flow Meters', color: '#1d4ed8' },
            { label: 'Level & Pressure', color: '#0891b2' },
            { label: 'Analyzers', color: '#059669' },
            { label: 'Valves', color: '#475569' },
            { label: 'Solar', color: '#d97706' },
            { label: 'Transformers', color: '#7c3aed' },
            { label: 'Cameras', color: '#374151' },
            { label: 'Specialty', color: '#0ea5e9' },
          ].map((item) => (
            <span
              key={item.label}
              className="flex-shrink-0 text-[11px] px-3 py-1 rounded-full font-semibold border transition-all duration-200 cursor-default hover:-translate-y-0.5"
              style={{
                color: item.color,
                borderColor: `${item.color}33`,
                background: `${item.color}0d`,
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Desktop: masonry 2-col */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            {leftCol.map((cat) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                onClick={cat.route ? () => handleClick(cat.route!) : undefined}
                onSubClick={(route) => handleClick(route)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {rightCol.map((cat) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                onClick={cat.route ? () => handleClick(cat.route!) : undefined}
                onSubClick={(route) => handleClick(route)}
              />
            ))}
          </div>
        </div>

        {/* Mobile/tablet: single column */}
        <div className="lg:hidden flex flex-col gap-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              onClick={cat.route ? () => handleClick(cat.route!) : undefined}
              onSubClick={(route) => handleClick(route)}
            />
          ))}
        </div>
      </div>

      {/* CTA section */}
      <section className="py-16 bg-gradient-to-br from-[#0073bc] to-[#004a80] mt-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Need a Custom Solution?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Our engineering team designs and integrates end-to-end systems tailored precisely to your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#0073bc] font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Talk to Our Engineers <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsBrochureModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Download className="w-4 h-4" /> Company Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating brochure */}
      <div className="fixed bottom-24 right-4 md:right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
          onClick={() => setIsBrochureModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0073bc] to-[#005a94] text-white font-bold rounded-full shadow-[0_8px_30px_rgba(0,115,188,0.4)] hover:shadow-[0_12px_40px_rgba(0,115,188,0.55)] transition-shadow text-sm"
        >
          <Download className="w-4 h-4" />
          Brochure
        </motion.button>
      </div>

      <BrochureModal open={isBrochureModalOpen} onClose={() => setIsBrochureModalOpen(false)} brochureUrl={orbitBrochure} />
    </div>
  );
}
