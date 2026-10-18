
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import { joinTeam } from "../../../actions/teams";

const roles = [
  {
    value: "Programming",
    description: "Programming & Development",
    icon: "</>",
  },
  {
    value: "Art",
    description: "Visual Art & Assets",
    icon: "✦",
  },
  {
    value: "Music",
    description: "Music & Sound",
    icon: "♫",
  },
  {
    value: "Design",
    description: "Game & UI Design",
    icon: "◇",
  },
  {
    value: "Writing",
    description: "Story & Narrative",
    icon: "✎",
  },
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function JoinTeamPage({
  params,
}: PageProps) {
  const { id } = await params;
  const applicantId = Number(id);

  if (!Number.isInteger(applicantId) || applicantId <= 0) {
    notFound();
  }

  const applicant = await prisma.applicant.findUnique({
    where: { id: applicantId },
    include: {
      teammember: {
        include: {
          team: true,
        },
      },
    },
  });

  if (!applicant) {
    notFound();
  }

  const teams = await prisma.team.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    },
  });

  const alreadyJoined = applicant.teammember !== null;

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
              Applicant Status.{" "}
              <span className="neon-cyan">
                {applicant.status.toUpperCase()}
              </span>
            </p>
          </div>
        </aside>

        <section className="dashboard-main hero-content">

          <div className="dashboard-content hero-content">
            <div className="dashboard-heading hero-content">
              <div>
                <h1>JOIN A TEAM</h1>
                <p>
                  Select your team and define your role.
                </p>
              </div>

              <Link
                href="/admin"
                className="panel-filter"
              >
                ← Back to Dashboard
              </Link>
            </div>

            {applicant.status !== "Approved" ? (
              <div className="dashboard-panel join-team-panel">
                <h5 className="neon-pink">
                  APPLICATION NOT APPROVED
                </h5>
                <p className="muted-text">
                  Only applicants with Approved status can join
                  a team. Current status: {applicant.status}.
                </p>
                <Link href="/admin" className="panel-filter">
                  Return to Dashboard
                </Link>
              </div>
            ) : alreadyJoined ? (
              <div className="dashboard-panel join-team-panel">
                <h5 className="neon-cyan">
                  ALREADY A TEAM MEMBER
                </h5>
                <p>
                  {applicant.firstName} {applicant.lastName} is
                  already a member of{" "}
                  <strong>
                    {applicant.teammember!.team.name}
                  </strong>.
                </p>
                <p className="muted-text">
                  Role: {applicant.teammember!.role}
                </p>
                <Link
                  href={`/admin/teams/${applicant.teammember!.teamId}`}
                  className="action-neon-btn join-team-btn"
                >
                  VIEW MY TEAM
                </Link>
              </div>
            ) : (
              <div className="dashboard-panel join-team-panel">
                <div className="panel-heading">
                  <div>
                    <h5>TEAM APPLICATION FORM</h5>
                    <p>
                      Applicant information and team preferences.
                    </p>
                  </div>
                  <span className="event-badge">
                    ● APPROVED
                  </span>
                </div>

                <div className="applicant-info-card">
                  <div className="applicant-avatar">
                    {applicant.firstName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <strong>
                      {applicant.firstName} {applicant.lastName}
                    </strong>
                    <p>{applicant.email}</p>
                    {applicant.nickname && (
                      <small>@{applicant.nickname}</small>
                    )}
                  </div>
                </div>

                {teams.length === 0 ? (
                  <div className="empty-team">
                    <p>No teams available yet.</p>
                    <small>
                      Ask an administrator to create a team first.
                    </small>
                  </div>
                ) : (
                  <form action={joinTeam} className="join-team-form">
                    <input
                      type="hidden"
                      name="applicantId"
                      value={applicant.id}
                    />

                    <div className="form-section">
                      <label
                        htmlFor="teamId"
                        className="form-label-neon"
                      >
                        SELECT TEAM
                      </label>

                      <select
                        id="teamId"
                        name="teamId"
                        className="form-control neon-input"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Choose a team...
                        </option>

                        {teams.map((team) => (
                          <option
                            key={team.id}
                            value={team.id}
                          >
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-section">
                      <label className="form-label-neon">
                        SELECT YOUR ROLE
                      </label>
                      <p className="muted-text">
                        Choose the role that best represents
                        your contribution.
                      </p>

                      <div className="role-selection-grid">
                        {roles.map((role) => (
                          <label
                            key={role.value}
                            className="role-option"
                          >
                            <input
                              type="radio"
                              name="role"
                              value={role.value}
                              required
                            />

                            <span className="role-option-content">
                              <span className="role-icon">
                                {role.icon}
                              </span>
                              <span>
                                <strong>{role.value}</strong>
                                <small>{role.description}</small>
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="join-team-actions">
                      <Link
                        href="/admin"
                        className="action-neon-btn cancel-btn"
                      >
                        CANCEL
                      </Link>

                      <button
                        type="submit"
                        className="action-neon-btn join-team-btn"
                      >
                        CONFIRM & JOIN TEAM →
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
