
import Link from "next/link";
import prisma from "../lib/prisma";
import ApplicantStatusButtons from "../components/ApplicantStatusButtons";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const PAGE_SIZE = 7;

  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, Number(resolvedParams.page) || 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const totalApplicants = await prisma.applicant.count();
  const totalPages = Math.ceil(totalApplicants / PAGE_SIZE);

  const applicants = await prisma.applicant.findMany({
    take: PAGE_SIZE,
    skip: skip,
    include: {
      teammember: {
        include: {
          team: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const teams = await prisma.team.findMany();
  const totalTeams = teams.length;

  const pendingCount = await prisma.applicant.count({
    where: {
      status: "Pending",
    },
  });

  const teamMembers = await prisma.teammember.findMany();
  const totalMembers = teamMembers.length;

  const roleCounts: Record<string, number> = {
    Programming: 0,
    Art: 0,
    Music: 0,
    Design: 0,
    Writing: 0,
  };

  teamMembers.forEach((member) => {
    if (roleCounts[member.role] !== undefined) {
      roleCounts[member.role]++;
    }
  });

  const skillsData = [
    {
      name: "Programming",
      percent:
        totalMembers > 0
          ? Math.round((roleCounts.Programming / totalMembers) * 100)
          : 0,
      color: "#00e5f0",
    },
    {
      name: "Art",
      percent:
        totalMembers > 0
          ? Math.round((roleCounts.Art / totalMembers) * 100)
          : 0,
      color: "#ff008c",
    },
    {
      name: "Music",
      percent:
        totalMembers > 0
          ? Math.round((roleCounts.Music / totalMembers) * 100)
          : 0,
      color: "#ffd000",
    },
    {
      name: "Design",
      percent:
        totalMembers > 0
          ? Math.round((roleCounts.Design / totalMembers) * 100)
          : 0,
      color: "#00ed8a",
    },
    {
      name: "Writing",
      percent:
        totalMembers > 0
          ? Math.round((roleCounts.Writing / totalMembers) * 100)
          : 0,
      color: "#9692b4",
    },
  ];

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
            <Link href="/admin" className="sidebar-link active">
              <span>▦</span> Dashboard
            </Link>

            <Link href="/admin/registers" className="sidebar-link">
              <span>♙</span> Update Info
            </Link>

            <Link href={`/admin/teams`} className="sidebar-link">
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
            <h6>SYSTEM DIAGNOSTICS</h6>
            <p>
              Database Conn. <span className="text-success">OK</span>
            </p>
            <p>
              Applicant Sync. <span className="neon-cyan">ACTIVE</span>
            </p>
          </div>
        </aside>

        <section className="dashboard-main hero-content">
          <div className="dashboard-content hero-content">
            <div className="dashboard-heading hero-content">
              <div>
                <h1>SYSTEM CONSOLE</h1>
                <p>
                  Manage participants, monitor team forming and review skills.
                </p>
              </div>

              <span className="event-badge">● JAM LIVE 2026</span>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-header">
                    <span>TOTAL REGISTRANTS</span>
                    <span className="stat-icon cyan">♙</span>
                  </div>
                  <h2>{totalApplicants}</h2>
                  <small>Registered applicants</small>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-header">
                    <span>TEAMS FORMED</span>
                    <span className="stat-icon pink">♧</span>
                  </div>
                  <h2>{totalTeams}</h2>
                  <small>Teams registered</small>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-header">
                    <span>PENDING APPROVALS</span>
                    <span className="stat-icon yellow">⚠</span>
                  </div>

                  <h2 className="stat-number">{pendingCount}</h2>

                  <small>Awaiting review</small>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-header">
                    <span>DAYS UNTIL EVENT</span>
                    <span className="stat-icon green">◷</span>
                  </div>
                  <h2>12</h2>
                  <small>Event countdown</small>
                </div>
              </div>
            </div>

            <div className="dashboard-panel mb-4">
              <div className="panel-heading">
                <h5>REGISTRATION</h5>
                <Link href="/admin/applicants" className="panel-filter">
                  View all →
                </Link>
              </div>

              <div className="table-responsive">
                <table className="table dashboard-table mb-0">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>NICKNAME</th>
                      <th>EMAIL</th>
                      <th>TEAM ASSIGNMENT</th>
                      <th>PAYMENT</th>
                      <th>STATUS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applicants.map((applicant) => (
                      <tr key={applicant.id}>
                        <td>
                          {applicant.firstName} {applicant.lastName}
                        </td>
                        <td className="muted-text">{applicant.nickname}</td>

                        <td className="muted-text">{applicant.email}</td>

                        <td
                          className={
                            applicant.teammember?.team
                              ? "text-info fw-semibold"
                              : "muted-text"
                          }
                        >
                          {applicant.teammember?.team
                            ? applicant.teammember.team.name
                            : "Unassigned"}
                        </td>
                        <td>
                          {applicant.paymentProof ? (
                            <a
                              href={`/api/payment-proof/${applicant.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="View payment proof"
                            >
                              <img
                                src={`/api/payment-proof/${applicant.id}`}
                                alt={`Payment proof from ${applicant.firstName}`}
                                className="payment-proof-thumbnail"
                              />
                            </a>
                          ) : (
                            <span className="muted-text">No payment proof</span>
                          )}
                        </td>
                        <td>
                          <span
                            className={`status-badge ${applicant.status.toLowerCase()}`}
                          >
                            ● {applicant.status}
                          </span>
                        </td>
                        <td>
                          <ApplicantStatusButtons
                            id={applicant.id}
                            status={applicant.status}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <span className="pagination-info">
                    Showing {skip + 1} to {Math.min(skip + PAGE_SIZE, totalApplicants)} of {totalApplicants} applicants
                  </span>

                  <div className="pagination-group">
                    <Link
                      href={`/admin?page=${currentPage - 1}`}
                      className={`pg-nav ${currentPage <= 1 ? "pg-disabled" : ""}`}
                    >
                      « Prev
                    </Link>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={`/admin?page=${p}`}
                        className={`pg-btn ${p === currentPage ? "active" : ""}`}
                      >
                        {p}
                      </Link>
                    ))}
                    <Link
                      href={`/admin?page=${currentPage + 1}`}
                      className={`pg-nav ${currentPage >= totalPages ? "pg-disabled" : ""}`}
                    >
                      Next »
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="dashboard-panel skills-panel">
              <div className="panel-heading">
                <div>
                  <h5>SKILLS INVENTORY</h5>
                  <p>Current breakdown of participant skills.</p>
                </div>
              </div>

              <div className="row g-3">
                {skillsData.map((skill) => (
                  <div className="col-6 col-lg" key={skill.name}>
                    <div className="skill-card">
                      <div className="skill-header">
                        <strong>{skill.name}</strong>
                        <span style={{ color: skill.color }}>
                          {skill.percent}%
                        </span>
                      </div>

                      <div className="skill-track">
                        <div
                          className="skill-progress"
                          style={{
                            width: `${skill.percent}%`,
                            backgroundColor: skill.color,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}