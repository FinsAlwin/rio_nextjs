import InvestUs from "../../pages/InvestUs/InvestUs";
import { MainProvider } from "../../context/MainContext";

export default function Invest() {
  return (
    <MainProvider>
      <InvestUs />
    </MainProvider>
  );
}
