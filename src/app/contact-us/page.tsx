import ContactUs from "../../pages/ContactUs/ContactUs";
import { MainProvider } from "../../context/MainContext";

export default function ContactUsPage() {
  return (
    <MainProvider>
      <ContactUs />
    </MainProvider>
  );
}
