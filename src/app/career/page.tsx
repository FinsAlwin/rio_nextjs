import Careers from "../../pages/Careers/Careers";
import { MainProvider } from "../../context/MainContext";

export default function Career() {
  return (
    <MainProvider>
      <Careers />
    </MainProvider>
  );
}
