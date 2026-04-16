import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { getBlogPosts, getPortfolioContent, getStorageMode, isBlobConfigured } from "@/lib/storage";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function AdminPage() {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    redirect("/admin/login");
  }

  const [content, posts] = await Promise.all([
    getPortfolioContent(),
    getBlogPosts({ includeDrafts: true })
  ]);

  return (
    <AdminDashboard
      initialContent={content}
      initialPosts={posts}
      storageMode={getStorageMode()}
      blobEnabled={isBlobConfigured()}
      defaultPublishedAt={new Date().toISOString().slice(0, 10)}
    />
  );
}
