import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ScrollIndicator from "./components/ScrollIndicator";
import WhatsAppButton from "./components/WhatsAppButton";
import AboutSection from "./components/WhatsAppButton";
import FeaturesSection from "./components/FeaturesSection";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <ScrollIndicator />
      <WhatsAppButton />
      <AboutSection />
      <FeaturesSection />
    </div >
  );
}
