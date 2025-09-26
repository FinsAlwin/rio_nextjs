import Home from "../pages/Home/Home";
import { MainProvider } from "../context/MainContext";

export default function Page() {
  return (
    <MainProvider>
      <Home />
    </MainProvider>
  );
}
