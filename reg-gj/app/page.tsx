"use client";

import { useEffect } from "react";

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
            ★ REGISTRATION IS LIVE UNTIL JAN 20 ★
          </p>

          <p className="system-text reveal delay-1">
            SYSTEM // TNI GAMEJAM 2026
          </p>

          <h1 className="reveal delay-1">
            CREATE THE
            <br />
            <span >FUTURE</span> OF <b>PLAY</b>
          </h1>

          <p className="hero-text reveal delay-2">
            Join developers, artists, designers and creators
            for 48 hours of pure game development.
            Build something strange. Build something memorable.
          </p>

          <div className="hero-buttons reveal delay-3">

            <button className="btn-main">
              SECURE CHIP // REGISTER
            </button>

            <button className="btn-sub">
              JOIN DISCORD SERVER
            </button>

          </div>

          <div className="event-info reveal delay-4">

            <div>
              <small>COORDINATES</small>
              <strong>TOKYO HUB & ONLINE</strong>
            </div>

            <div>
              <small>TIMEFRAME</small>
              <strong>JAN 23 — 25, 2026</strong>
            </div>

            <div>
              <small>STATUS</small>
              <strong className="online-text">
                ● KICKOFF FRIDAY
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
                      src="/img/ออตู้ตตตต.png"
                      alt="Game Jam 1"
                    />
                  </div>

                  <div className="carousel-item">
                    <img
                      src="/img/กั้งนอน.jpg"
                      alt="Game Jam 2"
                    />
                  </div>

                  <div className="carousel-item">
                    <img
                      src="/img/Watit, help !.png"
                      alt="Game Jam 3"
                    />
                  </div>

                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#gameJamCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#gameJamCarousel"
                  data-bs-slide="next"
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
                  WHAT IS A GAME JAM?
                </p>

                <h2>
                  BUILD.
                  <br />
                  <span>BREAK.</span>
                  <br />
                  REPEAT.
                </h2>

                <p className="description">
                  A game jam is a hackathon focused on game development.
                  You are challenged to plan, design, and program a video
                  game from scratch within a tight deadline.
                </p>

              </div>


              <div className="about-item reveal delay-2">

                <span>01</span>

                <div>
                  <h3>No Experience Required</h3>

                  <p>
                    Whether you are an industry veteran or writing your
                    very first line of code, game jams are a great place
                    to learn and build fast.
                  </p>
                </div>

              </div>


              <div className="about-item reveal delay-3">

                <span>02</span>

                <div>
                  <h3>Team Up or Go Solo</h3>

                  <p>
                    Bring your pre-made crew or join forces with other
                    local creators.
                  </p>
                </div>

              </div>


              <div className="about-item reveal delay-4">

                <span>03</span>

                <div>
                  <h3>Global Playground</h3>

                  <p>
                    Participate alongside thousands of jammers around
                    the world.
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
              MISSION MANIFEST
            </p>

            <h2>
              SCHEDULE
              <span> & HONORS</span>
            </h2>

            <p className="description">
              48 hours. One theme. Infinite possibilities.
            </p>

          </div>


          <div className="row g-4">

            {/* TIMELINE */}
            <div className="col-lg-6 reveal">

              <div className="info-card timeline-card">

                <span className="card-number">
                  01
                </span>

                <h3>
                  THE 48-HOUR PIPELINE
                </h3>


                <div className="timeline-item">

                  <div className="timeline-dot"></div>

                  <div>
                    <p className="pink">
                      FRIDAY JAN 23 // 18:00
                    </p>

                    <h4>
                      Theme Reveal & Matchmaking
                    </h4>

                    <p>
                      Local site doors open and secret theme
                      is revealed.
                    </p>
                  </div>

                </div>


                <div className="timeline-item">

                  <div className="timeline-dot"></div>

                  <div>
                    <p className="pink">
                      SATURDAY JAN 24 // 14:00
                    </p>

                    <h4>
                      Mid-way Playtest Check
                    </h4>

                    <p>
                      In-progress builds checked with mentors
                      and peers.
                    </p>
                  </div>

                </div>


                <div className="timeline-item">

                  <div className="timeline-dot"></div>

                  <div>
                    <p className="pink">
                      SUNDAY JAN 25 // 15:00
                    </p>

                    <h4>
                      Deadline & Submission
                    </h4>

                    <p>
                      Build compilation freezes.
                    </p>
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

                <h3>
                  HONORS & SWAG
                </h3>

                <p>
                  Community honors for achievements in
                  game development.
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
              CORE DIRECTORY
            </p>

            <h2>
              PRIZES
            </h2>

            <p className="description">
              Build something memorable.
              Leave your mark.
            </p>

          </div>


          <div className="row g-4">

            <div className="col-lg-4 col-md-6 reveal">

              <div className="prize-card">

                <div className="prize-top">
                  <span>01 </span>
                  <span>UNLOCKED</span>
                </div>

                <div className="prize-icon">
                  ★
                </div>

                <h3>
                  GRAND JURY
                </h3>

                <h4>
                  CHAMPION
                </h4>

                <p>
                  Awarded to the team that delivers
                  the most complete and memorable
                  game experience.
                </p>

                <div className="prize-line"></div>

              </div>

            </div>


            <div className="col-lg-4 col-md-6 reveal delay-1">

              <div className="prize-card pink-card">

                <div className="prize-top">
                  <span>02 </span>
                  <span>UNLOCKED</span>
                </div>

                <div className="prize-icon">
                  ◆
                </div>

                <h3>
                  PURE
                </h3>

                <h4>
                  NOSTALGIA
                </h4>

                <p>
                  For games that successfully capture
                  the feeling and charm of classic gaming.
                </p>

                <div className="prize-line"></div>

              </div>

            </div>


            <div className="col-lg-4 col-md-6 reveal delay-2">

              <div className="prize-card">

                <div className="prize-top">
                  <span>03 </span>
                  <span>UNLOCKED</span>
                </div>

                <div className="prize-icon">
                  ✦
                </div>

                <h3>
                  INNOVATOR
                </h3>

                <h4>
                  EXTRAORDINAIRE
                </h4>

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
            READY PLAYER ONE
          </p>

          <span className="register-small">
            YOUR NEXT BUILD STARTS HERE
          </span>

          <h2>
            CREATE
            <br />
            <span>SOMETHING</span>
            <br />
            AMAZING.
          </h2>

          <p>
            Don't wait for the perfect idea.
            Make something first.
          </p>

          <button className="btn-main">
            REGISTER NOW →
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div className="footer-grid"></div>

        <div className="container">

          <div className="footer-top">

            <div className="footer-brand reveal">

              <div className="footer-logo">
                G
              </div>

              <div>
                <h3>
                  GLOBAL GAME JAM 2026
                </h3>

                <p>
                  TNI GAMEJAM
                </p>
              </div>

            </div>


            <div className="footer-links reveal delay-1">

              <a href="#home">HOME</a>
              <a href="#about">ABOUT</a>
              <a href="#schedule">SCHEDULE</a>
              <a href="#prizes">PRIZES</a>
              <a href="#register">REGISTER</a>

            </div>


            <div className="footer-status reveal delay-2">

              <span className="status-dot"></span>

              <div>
                <small>
                  SYSTEM STATUS
                </small>

                <strong>
                  ONLINE
                </strong>
              </div>

            </div>

          </div>


          <div className="footer-line"></div>


          <div className="footer-bottom">

            <p>
              © 2026 GLOBAL GAME JAM INC.
            </p>

            <p>
              TNI GAMEJAM // CREATE. PLAY. REPEAT.
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}