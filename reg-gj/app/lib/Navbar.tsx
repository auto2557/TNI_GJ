"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-info border-2 py-3">

      <div className="container-fluid px-4 px-lg-5">

        {/* LOGO */}
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center gap-3"
        >

          <div
            className="d-flex align-items-center justify-content-center border border-info text-info fw-bold"
            style={{
              width: "48px",
              height: "48px",
              fontSize: "22px",
              boxShadow: "0 0 15px rgba(13, 202, 240, 0.35)",
            }}
          >
            G
          </div>

          <div className="d-flex flex-column">

            <span
              className="fw-bold text-white"
              style={{
                fontSize: "17px",
                letterSpacing: "1.5px",
              }}
            >
              GLOBAL GAME JAM 2026
            </span>

            <small
              className="text-info font-monospace"
              style={{
                fontSize: "11px",
                letterSpacing: "1.5px",
                marginTop: "3px",
              }}
            >
              TNI GAMEJAM
            </small>

          </div>

        </Link>


        {/* MOBILE BUTTON */}
        <button
          type="button"
          className="navbar-toggler border border-info p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* MENU */}
        <div
          className={`${
            menuOpen ? "d-flex" : "d-none"
          } d-lg-flex flex-column flex-lg-row justify-content-lg-end align-items-lg-center w-100`}
        >

          <div className="navbar-nav align-items-lg-center gap-lg-3 gap-xl-4">

            {/* ABOUT */}
            <Link
              href="#about"
              className="nav-link text-secondary px-3 py-2"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
              onClick={() => setMenuOpen(false)}
            >
              ABOUT
            </Link>


            {/* SCHEDULE */}
            <Link
              href="#schedule"
              className="nav-link text-secondary px-3 py-2"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
              onClick={() => setMenuOpen(false)}
            >
              SCHEDULE
            </Link>


            {/* PRIZES */}
            <Link
              href="#prizes"
              className="nav-link text-secondary px-3 py-2"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                letterSpacing: "1px",
              }}
              onClick={() => setMenuOpen(false)}
            >
              PRIZES
            </Link>


            {/* REGISTER */}
            <Link
              href="#register"
              className="btn btn-outline-info px-4 py-2 ms-lg-2"
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
              onClick={() => setMenuOpen(false)}
            >
              REGISTER NOW
            </Link>

          </div>

        </div>

      </div>

    </nav>
  );
}