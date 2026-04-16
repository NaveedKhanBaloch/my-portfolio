import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function AdminLoginPage() {
  const isAuthed = await isAdminAuthenticated();

  if (isAuthed) {
    redirect("/admin");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Private admin</p>
        <h1>Login to manage your portfolio and blog</h1>
        <p>
          Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in Vercel project settings to secure this dashboard.
        </p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
