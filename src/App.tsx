import { useState, lazy, Suspense, useMemo, useEffect } from 'react';
import { BrowserRouter, HashRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import LogoLoader from './components/LogoLoader';
import { buildProductsData, flattenProducts, type ProductItem } from './data/products';
import { RAW_SUB_PRODUCTS } from './data/rawProducts';

// Lazy load pages for performance
const HomePage = lazy(() => import('./pages/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductInfoPage = lazy(() => import('./pages/ProductInfoPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ClientsPage = lazy(() => import('./pages/ClientsPage'));

function ProductDetailLoader({ productIndex, onNavigate }: { productIndex: Record<string, ProductItem>, onNavigate: (p: string) => void }) {
  const { slug } = useParams() as { slug: string };
  const p = productIndex[slug];
  if (!p) return <ProductsPage onNavigate={onNavigate} />;
  return (
    <ProductDetailPage
      productName={p.name}
      productImage={p.image}
      productDescription={p.paragraphs}
      bullets={p.bullets}
      onBack={() => onNavigate('products')}
    />
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Build a product index (slug -> product)
  const productIndex = useMemo(() => {
    const groups = buildProductsData(RAW_SUB_PRODUCTS as unknown as Array<{
      category: string;
      items: Array<{ name: string; image: string; paragraphs?: string[]; bullets?: string[] }>;
    }>);
    const flat = flattenProducts(groups);
    return flat.reduce<Record<string, ProductItem>>((acc, p) => {
      acc[p.slug] = p;
      return acc;
    }, {});
  }, []);

  const handleNavigate = (path: string) => {
    if (isTransitioning) return;

    // Normalize internal navigation string targets to actual paths
    let targetPath = path;
    if (path === 'home') targetPath = '/';
    else if (path === 'projects') targetPath = '/projects';
    else if (path === 'about') targetPath = '/about';
    else if (path === 'services') targetPath = '/services';
    else if (path === 'products') targetPath = '/products';
    else if (path === 'clients') targetPath = '/clients';
    else if (path === 'faq') targetPath = '/solutions';
    else if (path === 'team') targetPath = '/team';
    else if (path === 'contact') targetPath = '/contact';
    else if (path.startsWith('product-info:')) targetPath = `/products/${path.split(':')[1]}`;
    else if (path.startsWith('product:')) targetPath = `/product/${path.split(':')[1]}`;

    setIsTransitioning(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      navigate(targetPath);
      setIsTransitioning(false);
    }, 300);
  };

  const getActivePage = () => {
    const p = location.pathname;
    if (p === '/') return 'home';
    if (p === '/projects') return 'projects';
    if (p === '/about') return 'about';
    if (p === '/services') return 'services';
    if (p === '/products') return 'products';
    if (p === '/clients') return 'clients';
    if (p === '/solutions') return 'faq';
    if (p === '/team') return 'team';
    if (p === '/contact') return 'contact';
    if (p.startsWith('/products/')) return `product-info:${p.split('/').pop()}`;
    return 'home';
  };

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled more than 300px
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onNavigate={handleNavigate} currentPage={getActivePage()} />
      <div className="relative flex-grow">
        <LogoLoader isVisible={isTransitioning} />
        <main className={`flex-grow ${isTransitioning ? 'pointer-events-none select-none opacity-50 transition-opacity duration-500' : 'opacity-100 transition-opacity duration-500'}`}>
          <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#0073bc] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
              <Route path="/projects" element={<ProjectsPage initialFilter="all" onNavigate={handleNavigate} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage onNavigate={handleNavigate} />} />
              <Route path="/products" element={<ProductsPage onNavigate={handleNavigate} />} />
              <Route path="/products/:variant" element={<ProductInfoPage onNavigate={handleNavigate} />} />
              <Route path="/product/:slug" element={<ProductDetailLoader productIndex={productIndex} onNavigate={handleNavigate} />} />
              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/solutions" element={<FAQPage onNavigate={handleNavigate} />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <Footer onNavigate={handleNavigate} />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 bg-[#0073bc] text-white rounded-full shadow-lg hover:bg-[#005a94] transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#0073bc] focus:ring-offset-2 ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

export default function App() {
  // Use HashRouter for GitHub Pages to avoid 404s on refresh (since GH Pages doesn't support SPA routing natively),
  // but use BrowserRouter for other environments (like Vercel/Netlify/Localhost) for better SEO and clean URLs.
  const isGitHubPages = window.location.hostname.includes('github.io');
  const Router = isGitHubPages ? HashRouter : BrowserRouter;

  return (
    <Router>
      <AppContent />
    </Router>
  );
}
