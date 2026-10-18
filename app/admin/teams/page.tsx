import Link from "next/link";
import prisma from "../../lib/prisma";

export default async function TeamsPage() {

  const teams = await prisma.team.findMany({
    include: {
      _count: {
        select: { teammember: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
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

            <Link href="/admin/registers" className="sidebar-link">
              <span>♙</span> Update Info
            </Link>

            <Link href="/admin/teams" className="sidebar-link active">
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
              Teams Module. <span className="neon-cyan">ACTIVE</span>
            </p>
          </div>
        </aside>

        {/* Main Content พื้นที่แสดงเนื้อหาหลัก */}
        <section className="dashboard-main hero-content">

          <div className="dashboard-content hero-content">
            <div className="dashboard-heading hero-content">
              <div>
                <h1>All Teams</h1>
                <p>Manage all registered teams and view their members.</p>
              </div>
            </div>

            {/* ตารางแสดงรายชื่อทีม */}
            <div className="dashboard-panel">
              <div className="panel-heading">
                <div>
                  <h5>TEAM LIST</h5>
                  <p>List of teams created in the system.</p>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table dashboard-table mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>TEAM NAME</th>
                      <th>MEMBERS</th>
                      <th>CREATED AT</th>
                      <th className="text-end">ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {teams.length > 0 ? (
                      teams.map((team, index) => (
                        <tr key={team.id}>
                          <td className="muted-text">
                            {String(index + 1).padStart(2, "0")}
                          </td>
                          <td>
                            <strong>{team.name}</strong>
                          </td>
                          <td>
                            <span className="badge bg-dark neon-cyan">
                              <h5>{team._count.teammember} Members</h5>
                            </span>
                          </td>
                          <td className="muted-text">
                            {new Date(team.createdAt).toLocaleDateString()}
                          </td>
                          <td className="text-end">
                            <Link
                              href={`/admin/teams/${team.id}`}
                              className="action-neon-btn join-team-btn"
                            >
                              View →
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          <div className="empty-team">
                            <span>♧</span>
                            <p>No teams found in the system yet.</p>
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