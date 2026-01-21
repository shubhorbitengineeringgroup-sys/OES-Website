import { Mail, Briefcase, Target, Award, Users } from 'lucide-react';
import subHeadingImage from '../assets/products/sub-heading.jpg';
import HeroSection from '../components/HeroSection';
import { motion } from 'framer-motion';
import { MotionFadeUp, MotionStagger, AnimatedHeading } from '../components/Animated';
import SEO from '../components/SEO';
// ourTeamIcon removed: using shared HeroSection component instead
import manojImg from '../assets/team/manoj-tiwari.jpeg';
import vijayImg from '../assets/team/vijay-tiwari-2.jpg';
import office2 from '../assets/Office-2.png';
import reception from '../assets/reception.png';

function OfficeImages() {
  const imageReveal = {
    hidden: { y: "100%" },
    visible: {
      y: "0%",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1.0] as const
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-stretch relative">
      <div className="overflow-hidden rounded-2xl border-2 border-transparent bg-white shadow-lg cursor-pointer transform-gpu w-full z-10">
        <div className="w-full aspect-[3/2] overflow-hidden relative">
          <motion.img
            src={office2}
            alt="Orbit Engineering Group Office"
            loading="lazy"
            className="w-full h-full object-cover"
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border-2 border-transparent bg-white shadow-lg cursor-pointer transform-gpu w-full z-10">
        <div className="w-full aspect-[3/2] overflow-hidden relative">
          <motion.img
            src={reception}
            alt="Orbit Engineering Reception"
            loading="lazy"
            className="w-full h-full object-cover"
            variants={imageReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const team = [
    {
      name: 'Manoj Tiwari',
      role: 'Managing Director',
      experience: '40+ Years Experience',
      email: 'mktiwari@orbitengineering.com',
      description: 'Visionary leader with expertise in water infrastructure and sustainable technology solutions',
      photo: manojImg
    },
    {
      name: 'Vijay Tiwari',
      role: 'Co-Founder & CTO',
      experience: '18+ Years Experience',
      email: 'vijay@orbitengineerings.com',
      description: 'Technical expert specializing in automation, IoT, and advanced water treatment systems',
      photo: vijayImg
    }
  ];

  const teamStats = [
    {
      icon: <Award className="h-6 w-6 text-[#0073bc]" />,
      title: "40-Year Legacy",
      description: "Built on decades of steel staging and chlorination expertise"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-[#0073bc]" />,
      title: "27-Year Automation Experience",
      description: "Orbit Engineering's strength in automation and SCADA systems"
    },
    {
      icon: <Users className="h-6 w-6 text-[#0073bc]" />,
      title: "Multi-Disciplinary Team",
      description: "Engineers, project leads, marketing strategists, and finance experts"
    }
  ];

  const statVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      rotate: -180
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 60,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Our Team | Leaders in Water Infrastructure - Orbit Engineering Group"
        description="Meet the visionaries at Orbit Engineering Group Bhopal. Led by Manoj Tiwari and Vijay Tiwari, our team brings decades of expertise in water technology and SCADA automation."
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Orbit Engineering Group Team | Manoj Tiwari, Vijay Tiwari, Rohit Arora & Amit Tiwari - Experts in Water Infrastructure & Automation</h1>

      <HeroSection title="Our Team" subtitle="Meet the visionaries driving water innovation" />

      <section className="py-24 bg-gray-50 border-y border-gray-100">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <AnimatedHeading level={2} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Meet the Visionaries
            </AnimatedHeading>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our leadership team brings decades of combined experience in water technology and infrastructure
            </p>
          </div>

          <MotionStagger className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto" stagger={0.06}>
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >


                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={`${member.name} - ${member.role} at Orbit Engineering Group Bhopal`}
                    className="w-36 h-36 rounded-full object-cover mx-auto mb-6 ring-4 ring-[#0073bc]/10 shadow-sm"
                    loading="lazy"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-[#0073bc] to-[#005a94] rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-[#0073bc] font-bold text-center mb-3 uppercase tracking-wider text-sm">
                  {member.role}
                </p>
                <div className="flex justify-center mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold shadow-sm bg-gray-50/50">
                    {member.experience}
                  </span>
                </div>
                <p className="text-gray-600 text-center mb-8 leading-relaxed">
                  {member.description}
                </p>

                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4 text-[#0073bc]" />
                  <a
                    href={`mailto:${member.email}`}
                    className="text-sm hover:text-[#0073bc] transition-colors font-semibold text-gray-700"
                  >

                    {member.email}
                  </a>
                </div>
              </motion.div>

            ))}
          </MotionStagger>

          {/* Team Stats Section */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 border border-[#0073bc] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="bg-blue-50 rounded-full p-4 mb-6">
                    {stat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {stat.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-[#0073bc]" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Be part of a team that's making a real difference in water infrastructure and sustainability
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Join Orbit?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-lg p-2">
                    <Target className="h-5 w-5 text-[#0073bc]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Meaningful Work</h4>
                    <p className="text-sm text-gray-600">
                      Work on projects that impact millions of lives
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-lg p-2">
                    <Target className="h-5 w-5 text-[#0073bc]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Innovation Culture</h4>
                    <p className="text-sm text-gray-600">
                      Work with cutting-edge technology
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-lg p-2">
                    <Target className="h-5 w-5 text-[#0073bc]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Growth Opportunities</h4>
                    <p className="text-sm text-gray-600">
                      Continuous learning and career development
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-lg p-2">
                    <Target className="h-5 w-5 text-[#0073bc]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Collaborative Team</h4>
                    <p className="text-sm text-gray-600">
                      Work with passionate, talented professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Our Office section inserted below Join Our Team */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <AnimatedHeading level={2} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Our Office
            </AnimatedHeading>
            <MotionFadeUp>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Modern, inspiring, and built for excellence.
              </p>
            </MotionFadeUp>
          </div>

          <OfficeImages />
        </div>
      </section>


      <section className="relative text-white py-16">
        <img src={subHeadingImage} alt="Careers background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't See the Right Role?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a
            href="mailto:careers@orbitengineerings.com"
            className="inline-block px-8 py-3 bg-white text-[#0073bc] rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Email Your Resume
          </a>
        </div>
      </section>
    </div>
  );
}
