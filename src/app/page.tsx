import { Navbar } from '@/src/components/layout/MainNavbar';
import { Hero } from '@/src/components/Home/HeroSection/page';
import { TrustedBy } from '@/src/components/Home/TrustedBy/page';
import { HowItWorks } from '@/src/components/Home/HowItWork/page';
import { Services } from '@/src/components/Home/ServicesSection/page';
import { Locations } from '@/src/components/Home/Location/page';
import { Testimonials } from '@/src/components/Home/Testimonials/page';
import { CallToAction } from '@/src/components/Home/CallToAction/page';
import { Footer } from '@/src/components/layout/MainFooter';
// import { LocationPermissionModal } from '@/src/components/landing/location-permission-modal';

export default function Home() {
  return (
    <main className='text-lp-primary relative min-h-screen overflow-x-hidden bg-white antialiased dark:bg-black dark:text-white'>
      {/* <LocationPermissionModal /> */}
      <Navbar />
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <Services />
      <Locations />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}
