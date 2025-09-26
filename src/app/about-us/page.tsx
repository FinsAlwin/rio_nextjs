import AboutSection from "../../pages/AboutUs/AboutUs";
import { MainProvider } from "../../context/MainContext";

export default function AboutUs() {
  return (
    <MainProvider>
      <AboutSection />
    </MainProvider>
  );
}
