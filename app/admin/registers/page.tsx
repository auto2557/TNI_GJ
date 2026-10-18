import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { requireUser } from "@/app/lib/auth";
import { updateApplicant } from "../registers/actions";
import UpdateForm from "../../components/UpdateForm";

export default async function RegisterPage() {
  const userId = await requireUser();

  const applicant = await prisma.applicant.findUnique({
    where: { userId },
  });

  return (
    <main className="dashboard">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="sidebar-brand">
            <div className="brand-icon">GG</div>
            <div>
              <h5>GGJ ADMIN</h5>
              <small>SECURE WORKSPACE</small>
            </div>
          </div>

          <nav className="sidebar-menu">
            <Link href="/admin" className="sidebar-link">
              <span>▦</span> Dashboard
            </Link>
            <Link href="/admin/registers" className="sidebar-link active">
              <span>♙</span> Update Info
            </Link>
            <Link href="/admin/teams" className="sidebar-link">
              <span>♧</span> Teams
            </Link>
            <Link href="/admin/schedule" className="sidebar-link">
              <span>◷</span> Schedule
            </Link>
            <Link href="/admin/settings" className="sidebar-link">
              <span>⚙</span> Settings
            </Link>
          </nav>
        </aside>

        <section className="dashboard-main hero-content">
          <div className="dashboard-content hero-content">
            <div className="dashboard-heading hero-content">
              <div>
                <h1>UPDATE APPLICANT INFO</h1>
                <p>Update participant details in the registration system.</p>
              </div>
            </div>

            <div className="dashboard-panel register-panel">
              <div className="panel-heading">
                <h5>APPLICANT INFORMATION</h5>
              </div>

              <UpdateForm applicant={applicant} updateAction={updateApplicant} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}