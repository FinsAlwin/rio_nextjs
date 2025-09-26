import Privacy from "../../pages/Privacy/Privacy";
import { MainProvider } from "../../context/MainContext";

export default function PrivacyPolicy() {
  return (
    <MainProvider>
      <Privacy />
    </MainProvider>
  );
}
