import BlogCore from "../../../components/BlogCore/BlogCore";
import { MainProvider } from "../../../context/MainContext";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ postURLId: string }>;
}) {
  const { postURLId } = await params;
  return (
    <MainProvider>
      <BlogCore postURLId={postURLId} />
    </MainProvider>
  );
}
