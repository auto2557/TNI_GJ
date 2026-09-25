"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <div className="logo-box">G</div>

          <div className="logo-text">
            <div className="logo-title">
              GLOBAL GAME JAM
            </div>

            <div className="logo-subtitle">
              TOKYO HUB // 2026. 1
            </div>
          </div>
        </Link>

        {/* Menu */}
        <div className="navbar-menu">
          <Link href="#about">About</Link>
          <Link href="#schedule">Schedule</Link>
          <Link href="#prizes">Prizes</Link>
          <Link href="#faq">FAQ</Link>

          <Link href="#register" className="register-button">
            REGISTER NOW
          </Link>
        </div>

      </div>

      <style jsx>{`
        .navbar {
          width: 100%;
          height: 68px;
          background: #05050b;
          border: 2px solid #009cff;
          box-sizing: border-box;
          position: relative;
          z-index: 100;
        }

        .navbar-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          box-sizing: border-box;
        }

        /* =========================
           LOGO
        ========================= */

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-box {
          width: 22px;
          height: 22px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #ff00ff;
          color: white;

          font-family: Arial, sans-serif;
          font-size: 13px;
          font-weight: bold;

          box-shadow:
            0 0 6px rgba(255, 0, 255, 0.5);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .logo-title {
          color: white;
          font-family: Arial, sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .logo-subtitle {
          margin-top: 3px;
          color: #00d9ff;
          font-family: monospace;
          font-size: 7px;
          letter-spacing: 0.5px;
        }

        /* =========================
           MENU
        ========================= */

        .navbar-menu {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .navbar-menu a {
          color: #aaa;
          text-decoration: none;

          font-family: monospace;
          font-size: 11px;

          transition: 0.2s ease;
        }

        .navbar-menu a:hover {
          color: #00eaff;
          text-shadow:
            0 0 5px rgba(0, 234, 255, 0.7);
        }

        /* =========================
           REGISTER BUTTON
        ========================= */

        .register-button {
          min-width: 120px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-left: 0px;

          border: 1px solid #00eaff;
          color: #00eaff !important;

          font-family: Arial, sans-serif !important;
          font-size: 10px !important;
          font-weight: bold;

          box-shadow:
            0 0 8px rgba(0, 234, 255, 0.15);

          transition: 0.2s ease !important;
        }

        .register-button:hover {
          background: rgba(0, 234, 255, 0.08);
          box-shadow:
            0 0 12px rgba(0, 234, 255, 0.4);
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 768px) {

          .navbar {
            height: auto;
            min-height: 68px;
          }

          .navbar-inner {
            padding: 12px 18px;
            flex-direction: column;
            gap: 15px;
          }

          .navbar-menu {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
          }

          .register-button {
            min-width: 110px;
          }
        }
      `}</style>
    </nav>
  );
}