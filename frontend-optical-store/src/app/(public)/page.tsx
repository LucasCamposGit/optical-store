import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import SliderSection from "./components/SliderSection";
import BrandsSection from "./components/BrandsSection";
import DiferencialSection from "./components/DiferencialSection";
import StoreSection from "./components/StoreSection";
import ContactSection from "./components/ContactSection";
import ScrollIndicator from "./components/ScrollIndicator";
import WhatsAppButton from "./components/WhatsAppButton";
// import WhatsappSection from "./components/WhatsAppButton";
import FeaturesSection from "./components/FeaturesSection";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SliderSection />
      <BrandsSection />
      <DiferencialSection />
      <StoreSection />
      <ContactSection />
      <ScrollIndicator />
      <WhatsAppButton />
      <FeaturesSection />
    </div >
  );
}
