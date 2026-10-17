
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.01,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ================= HERO ================= */}
      <section id="home" className="hero-section">
        <div className="hero-grid"></div>
        <div className="hero-orb orb-pink"></div>
        <div className="hero-orb orb-cyan"></div>

        <div className="hero-content">
          <p className="badge-text reveal">
            ★ TNI HOSTED GAME JAM // REGISTRATION ★
          </p>

          <p className="system-text reveal delay-1">
            HOSTED BY // THAI-NICHI INSTITUTE OF TECHNOLOGY
          </p>

          <h1 className="reveal delay-1">
            CREATE THE
            <br />
            <span>FUTURE</span> OF <b>PLAY</b>
          </h1>

          <p className="hero-text reveal delay-2">
            Join students, developers, artists, designers, and creators
            for a game development event hosted by Thai-Nichi Institute
            of Technology. Collaborate, experiment, and turn your ideas
            into a playable game.
          </p>

          <div className="hero-buttons reveal delay-3">
            {/* REGISTER -> LOGIN */}
            <Link
              href="/login"
              className="btn-main text-decoration-none"
            >
              SECURE CHIP // REGISTER
            </Link>

            <Link
              href="/#about"
              className="btn-sub text-decoration-none"
            >
              ABOUT TNI GAMEJAM
            </Link>
          </div>

          <div className="event-info reveal delay-4">
            <div>
              <small>HOST INSTITUTION</small>
              <strong>THAI-NICHI INSTITUTE OF TECHNOLOGY</strong>
            </div>

            <div>
              <small>EVENT</small>
              <strong>TNI GAMEJAM 2026</strong>
            </div>

            <div>
              <small>EVENT DETAILS</small>
              <strong className="online-text">
                ● SCHEDULE TO BE ANNOUNCED
              </strong>
            </div>
          </div>

          <div className="scroll-hint reveal delay-4 mt-5">
            SCROLL TO EXPLORE ↓
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="about-section">
        <div className="section-orb cyan-orb"></div>

        <div className="container">
          <div className="row align-items-center">
            {/* CAROUSEL */}
            <div className="col-lg-5 mb-5 mb-lg-0 reveal">
              <div
                id="gameJamCarousel"
                className="carousel slide about-img"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src="/img/tni2.jpg"
                      alt="TNI GameJam event photo 1"
                    />
                  </div>

                  <div className="carousel-item">
                    <img
                      src="/img/tni1.png"
                      alt="TNI GameJam event photo 2"
                    />
                  </div>

                  <div className="carousel-item">
                    <img
                      src="/img/tni3.jpg"
                      alt="TNI GameJam event photo 3"
                    />
                  </div>
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#gameJamCarousel"
                  data-bs-slide="prev"
                  aria-label="Previous image"
                >
                  <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#gameJamCarousel"
                  data-bs-slide="next"
                  aria-label="Next image"
                >
                  <span className="carousel-control-next-icon"></span>
                </button>

                <div className="image-tag">
                  TNI // GAMEJAM
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="col-lg-7">
              <div className="reveal delay-1">
                <p className="section-label">
                  ABOUT TNI GAMEJAM
                </p>

                <h2>
                  LEARN.
                  <br />
                  <span>CREATE.</span>
                  <br />
                  COLLABORATE.
                </h2>

                <p className="description">
                  TNI GameJam is a game development event hosted by Thai-Nichi
                  Institute of Technology. It brings students and creators
                  together to share ideas, develop skills, and build playable
                  games in a collaborative environment.
                </p>
              </div>

              <div className="about-item reveal delay-2">
                <span>01</span>

                <div>
                  <h3>Hosted by TNI</h3>
                  <p>
                    Thai-Nichi Institute of Technology provides a space for
                    participants to explore game development and learn
                    through hands-on creative work.
                  </p>
                </div>
              </div>

              <div className="about-item reveal delay-3">
                <span>02</span>

                <div>
                  <h3>Learn by Creating</h3>
                  <p>
                    Plan, design, and develop a playable game while practicing
                    problem-solving and teamwork.
                  </p>
                </div>
              </div>

              <div className="about-item reveal delay-4">
                <span>03</span>

                <div>
                  <h3>A Community of Creators</h3>
                  <p>
                    Connect with fellow students, artists, programmers, and
                    designers who share an interest in making games.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCHEDULE ================= */}
      <section id="schedule" className="schedule-section">
        <div className="container">
          <div className="section-title reveal">
            <p className="section-label">
              EVENT PROGRAM
            </p>

            <h2>
              EVENT FLOW
              <span> &amp; AWARDS</span>
            </h2>

            <p className="description">
              One event. Fresh ideas. A chance to make something new.
            </p>
          </div>

          <div className="row g-4">
            {/* TIMELINE */}
            <div className="col-lg-6 reveal">
              <div className="info-card timeline-card">
                <span className="card-number">01</span>

                <h3>THE GAMEJAM JOURNEY</h3>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>

                  <div>
                    <p className="pink">
                      PHASE 01 // OPENING
                    </p>

                    <h4>Welcome &amp; Theme Reveal</h4>

                    <p>
                      Meet fellow participants, learn the event theme,
                      and start forming teams.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>

                  <div>
                    <p className="pink">
                      PHASE 02 // DEVELOPMENT
                    </p>

                    <h4>Game Development &amp; Playtesting</h4>

                    <p>
                      Develop your game, collect feedback, and improve
                      the experience with your team.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-dot"></div>

                  <div>
                    <p className="pink">
                      PHASE 03 // FINAL SHOWCASE
                    </p>

                    <h4>Final Submission &amp; Showcase</h4>

                    <p>Submit your completed build and share your work
                      with the TNI GameJam community.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HONORS */}
            <div className="col-lg-6 reveal delay-2">
              <div className="info-card">
                <span className="card-number pink-number">
                  02
                </span>

                <h3>AWARDS &amp; RECOGNITION</h3>

                <p>
                  Recognizing creativity, memorable gameplay,
                  and experimental ideas created by participants.
                </p>

                <div className="award">
                  <span>✦ </span>
                  Grand Jury Champion
                </div>

                <div className="award">
                  <span>✦ </span>
                  Pure Nostalgia Award
                </div>

                <div className="award">
                  <span>✦ </span>
                  Innovator Extraordinaire
                </div>

                <div className="award">
                  <span>✦ </span>
                  Every Single Jammer
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRIZES ================= */}
      <section id="prizes" className="prizes-section">
        <div className="container">
          <div className="section-title reveal">
            <p className="section-label">
              AWARD CATEGORIES
            </p>

            <h2>AWARDS</h2>

            <p className="description">
              Celebrate creativity, innovation, and the games
              created at TNI GameJam.
            </p>
          </div>

          <div className="row g-4">
            {/* PRIZE 1 */}
            <div className="col-lg-4 col-md-6 reveal">
              <div className="prize-card">
                <div className="prize-top">
                  <span>01</span>
                  <span>AWARD CATEGORY</span>
                </div>

                <div className="prize-icon">★</div>

                <h3>GRAND JURY</h3>
                <h4>CHAMPION</h4>

                <p>
                  Awarded to the team that delivers
                  the most complete and memorable
                  game experience.
                </p>

                <div className="prize-line"></div>
              </div>
            </div>

            {/* PRIZE 2 */}
            <div className="col-lg-4 col-md-6 reveal delay-1">
              <div className="prize-card pink-card">
                <div className="prize-top">
                  <span>02</span>
                  <span>AWARD CATEGORY</span>
                </div>

                <div className="prize-icon">◆</div>

                <h3>PURE</h3>
                <h4>NOSTALGIA</h4>

                <p>
                  For games that successfully capture
                  the feeling and charm of classic gaming.
                </p>

                <div className="prize-line"></div>
              </div>
            </div>

            {/* PRIZE 3 */}
            <div className="col-lg-4 col-md-6 reveal delay-2">
              <div className="prize-card">
                <div className="prize-top">
                  <span>03</span>
                  <span>AWARD CATEGORY</span>
                </div>

                <div className="prize-icon">✦</div>

                <h3>INNOVATOR</h3>
                <h4>EXTRAORDINAIRE</h4>

                <p>
                  Celebrating unusual ideas,
                  creative mechanics, and
                  experimental game design.
                </p>

                <div className="prize-line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REGISTER ================= */}
      <section id="register" className="register-section">
        <div className="register-grid"></div>
        <div className="register-orb"></div>

        <div className="register-content reveal">
          <p className="section-label">
            HOSTED BY TNI
          </p>

          <span className="register-small">
            YOUR IDEA STARTS HERE
          </span>

          <h2>
            CREATE
            <br />
            <span>SOMETHING</span>
            <br />
            AMAZING.
          </h2>

          <p>
            Join a game development event hosted by Thai-Nichi
            Institute of Technology. Create, collaborate, and share your idea.
          </p>

          {/* REGISTER -> LOGIN */}
          <Link
            href="/login"
            className="btn-main text-decoration-none"
          >
            REGISTER NOW →
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-grid"></div>

        <div className="container">
          <div className="footer-top">
            <div className="footer-brand reveal">
              <div className="footer-logo">G</div>

              <div>
                <h3>GLOBAL GAME JAM 2026</h3>
                <p>TNI GAMEJAM</p>
              </div>
            </div>

            <div className="footer-links reveal delay-1">
              <Link href="/#home">HOME</Link>
              <Link href="/#about">ABOUT</Link>
              <Link href="/#schedule">SCHEDULE</Link>
              <Link href="/#prizes">AWARDS</Link>
              <Link href="/login">REGISTER</Link>
            </div>

            <div className="footer-status reveal delay-2">
              <span className="status-dot"></span>

              <div>
                <small>SYSTEM STATUS</small>
                <strong>ONLINE</strong>
              </div>
            </div>
          </div>

          <div className="footer-line"></div>

          <div className="footer-bottom">
            <p>TNI GAMEJAM 2026 · EVENT HOST: THAI-NICHI INSTITUTE OF TECHNOLOGY</p>
            <p>HOSTED BY THAI-NICHI INSTITUTE OF TECHNOLOGY // CREATE. PLAY. REPEAT.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
