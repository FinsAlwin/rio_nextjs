import Properties from "../../pages/Properties/Properties";
import { MainProvider } from "../../context/MainContext";

export default function PropertiesPage() {
  return (
    <MainProvider>
      <Properties />
    </MainProvider>
  );
}
