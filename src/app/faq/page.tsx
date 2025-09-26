import FAQ from "../../pages/FAQ/FAQ";
import { MainProvider } from "../../context/MainContext";

export default function FAQPage() {
  return (
    <MainProvider>
      <FAQ />
    </MainProvider>
  );
}
