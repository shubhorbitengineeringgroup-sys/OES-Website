import HeroSection from '../components/HeroSection';
import { MotionFadeUp, MotionScaleIn } from '../components/Animated';

interface ProductDetailPageProps {
  productName: string;
  productImage: string;
  productDescription?: string[];
  bullets?: string[];
  onBack?: () => void;
}

export default function ProductDetailPage({
  productName,
  productImage,
  productDescription,
  bullets,
  onBack,
}: ProductDetailPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection title={productName} />

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {onBack && (
            <div className="mb-6">
              <button
                onClick={onBack}
                className="px-5 py-2.5 bg-[#0073bc] text-white rounded-full shadow-md hover:bg-[#005a94] transition-transform duration-200 hover:scale-[1.02]"
              >
                Back to Products
              </button>
            </div>
          )}
          <MotionFadeUp className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
            <div className="w-full flex items-center justify-center mb-8">
              <MotionScaleIn>
                <img
                  src={productImage}
                  alt={productName}
                  className="max-h-96 w-auto object-contain rounded-xl shadow-lg"
                />
              </MotionScaleIn>
            </div>

            {productDescription && productDescription.length > 0 && (
              <div className="space-y-4 text-gray-700 leading-relaxed mb-6">
                {productDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {bullets && bullets.length > 0 && (
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            {onBack && (
              <div className="mt-10 text-center">
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-[#0073bc] text-white rounded-full shadow-md hover:bg-[#005a94] transition-transform duration-200 hover:scale-[1.02]"
                >
                  Back to Products
                </button>
              </div>
            )}
          </MotionFadeUp>
        </div>
      </section>
    </div>
  );
}


