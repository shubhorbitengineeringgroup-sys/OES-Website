import { AnimatedHeading, MotionFadeUp } from './Animated';
import HeroBackgroundSlider from './HeroBackgroundSlider';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function HeroSection({ title, subtitle, backgroundImage }: HeroSectionProps) {
  return (
    <div className="relative h-[50vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Logic: Use Slider by default, or static image if provided */}
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/50 z-0" />
        </>
      ) : (
        <HeroBackgroundSlider />
      )}

      {/* Content */}
      <div className="relative text-center z-10 px-4 max-w-4xl mx-auto">
        <MotionFadeUp>
          <div className="backdrop-blur-[2px] bg-white/5 rounded-2xl p-6 md:p-10 border border-white/10 shadow-2xl">
            <AnimatedHeading level={1} className="text-4xl md:text-5xl font-bold [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]">
              {title}
            </AnimatedHeading>
            {subtitle && (
              <p className="text-lg mt-4 text-white font-medium max-w-2xl mx-auto [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]">{subtitle}</p>
            )}
          </div>
        </MotionFadeUp>
      </div>
    </div>
  );
}
