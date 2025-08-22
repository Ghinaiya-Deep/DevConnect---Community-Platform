import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import HeroSection from './components/HeroSection';
import WhyJoinSection from './components/WhyJoinSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const target = e?.target?.getAttribute('href');
      if (target && target?.startsWith('#')) {
        e?.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add scroll event listeners for smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links?.forEach(link => {
      link?.addEventListener('click', handleSmoothScroll);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observe all sections for animations
    const sections = document.querySelectorAll('section');
    sections?.forEach(section => {
      observer?.observe(section);
    });

    // Cleanup
    return () => {
      links?.forEach(link => {
        link?.removeEventListener('click', handleSmoothScroll);
      });
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>DevConnect - Professional Developer Network | Connect, Share, Grow</title>
        <meta 
          name="description" 
          content="Join DevConnect, the premier professional network for developers worldwide. Connect with peers, share knowledge, showcase your skills, and advance your career in our global developer community." 
        />
        <meta name="keywords" content="developer network, programming community, software development, coding, tech professionals, developer jobs, programming tutorials" />
        <meta property="og:title" content="DevConnect - Professional Developer Network" />
        <meta property="og:description" content="Connect with developers worldwide, share knowledge, and grow your career in the largest professional developer community." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devconnect.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevConnect - Professional Developer Network" />
        <meta name="twitter:description" content="Join 50K+ developers worldwide. Connect, share knowledge, and advance your career." />
        <link rel="canonical" href="https://devconnect.com/landing-page" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Global Header */}
        <GlobalHeader />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Why Join Section */}
          <WhyJoinSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Call to Action Section */}
          <CTASection />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Smooth scroll for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Custom gradient animations */
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>
    </>
  );
};

export default LandingPage;