
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import MemberActions from "../../../components/MemberActions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function TeamMembersPage({
  params,
}: PageProps) {
  const { id } = await params;
  const teamId = Number(id);


  if (!Number.isInteger(teamId) || teamId <= 0) {
    notFound();
  }

  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
    include: {
      teammember: {
        include: {
          applicant: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              nickname: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!team) {
    notFound();
  }

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

            <Link
              href="/admin/registers"
              className="sidebar-link"
            >
              <span>♙</span> Update Info
            </Link>

            <Link
              href="/admin/teams"
              className="sidebar-link active"
            >
              <span>♧</span> Teams
            </Link>

            <Link href="/admin/schedule" className="sidebar-link">
              <span>◷</span> Schedule
            </Link>

            <Link href="/admin/settings" className="sidebar-link">
              <span>⚙</span> Settings
            </Link>
          </nav>

          <div className="diagnostic-card">
            <h6>TEAM MANAGEMENT</h6>
            <p>
              Database Conn.{" "}
              <span className="text-success">OK</span>
            </p>
            <p>
              Team Members.{" "}
              <span className="neon-cyan">ACTIVE</span>
            </p>
          </div>
        </aside>

        <section className="dashboard-main hero-content">

          <div className="dashboard-content hero-content">
            <div className="dashboard-heading hero-content">
              <div>
                <h1>{team.name}</h1>
                <p>
                  Manage team members, contact details, and roles.
                </p>
              </div>

              <Link
                href="/admin/teams"
                className="panel-filter"
              >
                ← Back to Teams
              </Link>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-header">
                    <span>TEAM NAME</span>
                    <span className="stat-icon cyan">♧</span>
                  </div>
                  <h2>{team.name}</h2>
                  <small>Registered team</small>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-header">
                    <span>TEAM MEMBERS</span>
                    <span className="stat-icon green">♙</span>
                  </div>
                  <h2>{team.teammember.length}</h2>
                  <small>Current members</small>
                </div>
              </div>
            </div>

            <div className="dashboard-panel">
              <div className="panel-heading">
                <div>
                  <h5>TEAM MEMBERS</h5>
                  <p>
                    Names, email addresses, and assigned roles.
                  </p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table dashboard-table mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>ROLE</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>
                    {team.teammember.length > 0 ? (
                      team.teammember.map((member, index) => {
                        const fullName = `${member.applicant.firstName} ${member.applicant.lastName}`;
                        return (
                          <tr key={member.id}>
                            <td className="muted-text">
                              {String(index + 1).padStart(2, "0")}
                            </td>
                            <td>
                              <div>
                                <strong>{fullName}</strong>
                                {member.applicant.nickname && (
                                  <div className="muted-text">
                                    @{member.applicant.nickname}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="muted-text">
                              <a
                                href={`mailto:${member.applicant.email}`}
                                className="member-email"
                              >
                                {member.applicant.email}
                              </a>
                            </td>
                            <td>
                              <span className="role-badge">{member.role}</span>
                            </td>
                            <td>
                              <MemberActions
                                memberId={member.id}
                                currentRole={member.role}
                                memberName={fullName}
                              />
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={4}>
                          <div className="empty-team">
                            <span>♧</span>
                            <p>No members in this team yet.</p>
                            <small>
                              Approved applicants can join this team
                              from the Dashboard.
                            </small>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
