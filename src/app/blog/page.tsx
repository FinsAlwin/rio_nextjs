import Blog from "../../pages/Blog/Blog";
import { MainProvider } from "../../context/MainContext";

export default function BlogPage() {
  return (
    <MainProvider>
      <Blog />
    </MainProvider>
  );
}
