import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
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
      <ScrollIndicator />
      <WhatsAppButton />
      <FeaturesSection />
    </div >
  );
}
