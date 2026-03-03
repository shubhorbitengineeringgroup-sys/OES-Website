import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, Waves, Activity, Settings, Cpu, Camera, Wrench, Gauge, Droplets, Grid, Zap, Sun, RotateCw, FlaskConical, Anchor } from 'lucide-react';
import logo2 from '../assets/Orbit logo_1.png';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const FlowMeterIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="9" r="6" />
    <path d="M12 9l2.5-2.5" />
    <path d="M12 15v3" />
    <path d="M3 18h18" />
    <path d="M6 15v6" />
    <path d="M18 15v6" />
  </svg>
);

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsDropdownOpen, setMobileProductsDropdownOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Projects', page: 'projects' },
    { label: 'Services', page: 'services' },
    { label: 'Ecosystem', page: 'clients' },
    { label: 'Solution', page: 'faq' },
    { label: 'Team', page: 'team' },
    { label: 'Contact', page: 'contact' },
  ];

  const productCategories = [
    { label: 'Flow', page: 'product-info:flow-meters', icon: FlowMeterIcon },
    {
      label: 'Analyzers',
      page: 'product-info:analyzers',
      icon: Activity,
      subCategories: [
        { label: 'Water / Effluent Quality Analyzers', page: 'product-info:analyzers', icon: Activity },
        { label: 'Air Quality Analyzers', page: 'product-info:air-quality-analyzers', icon: Gauge },
        { label: 'Gas Analyzers', page: 'product-info:gas-analyzers', icon: FlaskConical }
      ]
    },
    {
      label: 'Levels',
      page: 'product-info:levels',
      icon: Waves,
      subCategories: [
        { label: 'Level Transmitter', page: 'product-info:level-transmitter', icon: Waves },
        { label: 'Level Switch', page: 'product-info:level-switch', icon: Waves } // Using Waves for now as no Toggle icon imported
      ]
    },
    { label: 'Valves & Piping', page: 'product-info:valves', icon: Settings },
    {
      label: 'Actuators',
      page: 'product-info:actuators',
      icon: RotateCw,
      subCategories: [
        { label: 'Multi Turn', page: 'product-info:multi-turn-actuators', icon: RotateCw },
        { label: 'Part Turn', page: 'product-info:part-turn-actuators', icon: RotateCw }
      ]
    },
    {
      label: 'Automation (IoT / PLC / RTU / SCADA / Scour Monitoring)',
      page: 'product-info:automation',
      icon: Cpu,
      subCategories: [
        { label: 'IoT / PLC / RTU / SCADA', page: 'product-info:automation', icon: Cpu },
        { label: 'Scour Monitoring System', page: 'product-info:scour-monitoring', icon: Waves },
      ]
    },
    { label: 'Cameras & Vision', page: 'product-info:cameras', icon: Camera },
    { label: 'Jointing Machines', page: 'product-info:jointing', icon: Wrench },
    {
      label: 'Pressure',
      page: 'product-info:pressure',
      icon: Gauge,
      subCategories: [
        { label: 'Pressure Transmitter', page: 'product-info:pressure-transmitter', icon: Gauge },
        { label: 'Pressure Sensor', page: 'product-info:pressure-sensor', icon: Activity } // Using Activity for sensor distinctness
      ]
    },
    { label: 'Transformers', page: 'product-info:transformers', icon: Zap },
    { label: 'Solar Solutions', page: 'product-info:solar', icon: Sun },
    { label: 'Chlorinators', page: 'product-info:chlorinators', icon: Droplets },
    { label: 'Submersible Dredging Vehicle', page: 'product-info:sdv', icon: Anchor },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Group */}
          <div className="flex items-center flex-shrink-0">
            <button
              className="flex items-center cursor-pointer group transition-transform duration-300 hover:scale-105"
              onClick={() => onNavigate('home')}
              aria-label="Go to home"
            >
              <img src={logo2} alt="Orbit Logo" className="h-12 sm:h-16 w-auto animate-fade-in" />
              <div className="flex flex-col ml-3 text-left relative overflow-hidden group/logo-text px-1">
                <motion.div
                  initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="flex flex-col relative"
                >
                  <span className="text-[#0073bc] font-black text-lg sm:text-xl lg:text-2xl leading-tight tracking-tight drop-shadow-[0_4px_10px_rgba(0,115,188,0.2)] group-hover/logo-text:text-[#009FC6] transition-colors duration-500">
                    ORBIT
                  </span>
                  <span className="text-[#009FC6] font-extrabold text-[9.5px] sm:text-[11px] lg:text-[13px] tracking-[0.1em] sm:tracking-[0.18em] uppercase leading-none mt-0.5 group-hover/logo-text:text-[#0073bc] transition-colors duration-500">
                    Engineering Solutions
                  </span>
                </motion.div>

                {/* Glossy sweep effect - matches Greener/Resilient highlight */}
                <motion.div
                  animate={{ left: ['-150%', '150%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 pointer-events-none z-10"
                />
              </div>
            </button>
          </div>


          {/* Modern Pill-Style Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center bg-gray-50/80 backdrop-blur-sm rounded-full px-2 py-2 shadow-sm border border-gray-100/50">
              {navItems.slice(0, 5).map((item) => {
                const isActive = currentPage === item.page;

                return (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                    }}
                    className={`relative px-6 py-3 mx-1 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform ${isActive
                      ? 'bg-[#005B9A] text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:text-[#005B9A] hover:bg-blue-50 hover:scale-105'
                      }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-[#005B9A] rounded-full shadow-lg animate-pulse-slow"></div>
                    )}
                  </button>
                );
              })}

              {/* Products Dropdown with Pill-Style */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    setProductsDropdownOpen(!productsDropdownOpen);
                    if (!productsDropdownOpen) {
                      onNavigate('products');
                    }
                  }}
                  onMouseEnter={() => setProductsDropdownOpen(true)}
                  className={`relative px-6 py-3 mx-1 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform flex items-center space-x-1 ${currentPage === 'products' || currentPage.startsWith('product-info')
                    ? 'bg-[#005B9A] text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:text-[#005B9A] hover:bg-blue-50 hover:scale-105'
                    }`}
                >
                  <span className="relative z-10">Products</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  {(currentPage === 'products' || currentPage.startsWith('product-info')) && (
                    <div className="absolute inset-0 bg-[#005B9A] rounded-full shadow-lg animate-pulse-slow"></div>
                  )}
                </button>

                {productsDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg dropdown-shadow border border-gray-100 animate-slide-up z-50 max-h-[70vh] overflow-hidden flex flex-col"
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100 flex-shrink-0">
                      <button
                        onClick={() => {
                          onNavigate('products');
                          setProductsDropdownOpen(false);
                        }}
                        className="flex items-center text-sm font-semibold text-[#005B9A] hover:text-[#005a94] transition-colors"
                      >
                        <Grid className="w-4 h-4 mr-2" />
                        All Products
                      </button>
                    </div>
                    <div className="py-2 overflow-y-auto flex-1">
                      {productCategories.map((category) => (
                        <div key={category.page}>
                          {category.subCategories ? (
                            <button
                              onClick={() => setExpandedCategory(expandedCategory === category.page ? null : category.page)}
                              className={`group flex items-center justify-between w-full text-left px-4 py-3 text-sm transition-all duration-300 rounded-lg mx-2 my-1 ${expandedCategory === category.page ? 'text-[#005B9A] bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                              <div className="flex items-center">
                                <category.icon className={`w-4 h-4 mr-3 transition-colors ${expandedCategory === category.page ? 'text-[#005B9A]' : 'text-gray-400 group-hover:text-[#005B9A]'}`} />
                                {category.label}
                              </div>
                              <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategory === category.page ? 'rotate-180 text-[#005B9A]' : 'text-gray-400'}`} />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                onNavigate(category.page);
                                setProductsDropdownOpen(false);
                              }}
                              className="group flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-[#005B9A] hover:text-white transition-all duration-300 rounded-lg mx-2 my-1"
                            >
                              <category.icon className="w-4 h-4 mr-3 text-[#005B9A] group-hover:text-white transition-colors" />
                              {category.label}
                            </button>
                          )}

                          {/* Sub-categories */}
                          {category.subCategories && expandedCategory === category.page && (
                            <div className="ml-6 border-l-2 border-gray-100 pl-2 mb-2 animate-slide-up">
                              {/* Removed "All {category.label}" button as per request */}
                              {category.subCategories.map((sub) => (
                                <button
                                  key={sub.page}
                                  onClick={() => {
                                    onNavigate(sub.page);
                                    setProductsDropdownOpen(false);
                                  }}
                                  className="group flex items-center w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-blue-50 hover:text-[#005B9A] transition-all duration-200 rounded-md"
                                >
                                  <sub.icon className="w-3 h-3 mr-2 text-gray-400 group-hover:text-[#005B9A]" />
                                  {sub.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {navItems.slice(5).map((item) => {
                const isActive = currentPage === item.page;

                return (
                  <button
                    key={item.page}
                    onClick={() => {
                      onNavigate(item.page);
                    }}
                    className={`relative px-6 py-3 mx-1 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform ${isActive
                      ? 'bg-[#005B9A] text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:text-[#005B9A] hover:bg-blue-50 hover:scale-105'
                      }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-[#005B9A] rounded-full shadow-lg animate-pulse-slow"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div >
      </div >

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t max-h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar">
          <div className="px-4 py-4 space-y-2">
            {navItems.slice(0, 5).map((item) => {
              const isActive = currentPage === item.page;

              return (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                    ? 'bg-[#005B9A] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-[#005B9A]'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Mobile Products Dropdown */}
            <div className="space-y-2">
              <button
                onClick={() => setMobileProductsDropdownOpen(!mobileProductsDropdownOpen)}
                className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === 'products' || currentPage.startsWith('product-info')
                  ? 'bg-[#005B9A] text-white shadow-lg'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-[#005B9A]'
                  }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProductsDropdownOpen ? 'rotate-180' : ''
                  }`} />
              </button>

              {mobileProductsDropdownOpen && (
                <div className="ml-4 space-y-1 animate-slide-up pb-2">
                  <button
                    onClick={() => {
                      onNavigate('products');
                      setMobileMenuOpen(false);
                      setMobileProductsDropdownOpen(false);
                    }}
                    className={`flex items-center w-full text-left px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === 'products' ? 'bg-[#005B9A] text-white shadow-lg' : 'text-gray-600 hover:bg-blue-50 hover:text-[#005B9A]'
                      }`}
                  >
                    <Grid className="w-4 h-4 mr-3" />
                    All Products
                  </button>
                  {productCategories.map((category) => (
                    <div key={category.page}>
                      <button
                        onClick={() => {
                          onNavigate(category.page);
                          setMobileMenuOpen(false);
                          setMobileProductsDropdownOpen(false);
                        }}
                        className={`flex items-center w-full text-left px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === category.page ? 'bg-[#005B9A] text-white shadow-lg' : 'text-gray-600 hover:bg-blue-50 hover:text-[#005B9A]'
                          }`}
                      >
                        <category.icon className="w-4 h-4 mr-3" />
                        {category.label}
                      </button>

                      {/* Mobile Sub-categories */}
                      {category.subCategories && (
                        <div className="ml-8 border-l-2 border-gray-100 pl-2 mb-2 space-y-1">
                          {category.subCategories.map((sub) => (
                            <button
                              key={sub.page}
                              onClick={() => {
                                onNavigate(sub.page);
                                setMobileMenuOpen(false);
                                setMobileProductsDropdownOpen(false);
                              }}
                              className={`flex items-center w-full text-left px-4 py-2 text-xs font-medium transition-all duration-300 rounded-lg ${currentPage === sub.page ? 'text-[#005B9A] bg-blue-50' : 'text-gray-500 hover:text-[#005B9A]'
                                }`}
                            >
                              <sub.icon className="w-3 h-3 mr-2 opacity-70" />
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(5).map((item) => {
              const isActive = currentPage === item.page;

              return (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                    ? 'bg-[#005B9A] text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-[#005B9A]'
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )
      }
    </header >
  );
}
