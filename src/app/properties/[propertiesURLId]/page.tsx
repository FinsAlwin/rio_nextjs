import PropertiesContent from "../../../pages/PropertiesContent/PropertiesContent";
import { MainProvider } from "../../../context/MainContext";

export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ propertiesURLId: string }>;
}) {
  const { propertiesURLId } = await params;
  return (
    <MainProvider>
      <PropertiesContent propertiesURLId={propertiesURLId} />
    </MainProvider>
  );
}
