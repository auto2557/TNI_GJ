"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);

return ( <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-info border-2"> <div className="container-fluid px-4 px-lg-5">

    
    <Link
      href="/"
      className="navbar-brand d-flex align-items-center gap-3"
    >
     
      <div
        className="d-flex align-items-center justify-content-center border border-info text-info fw-bold"
        style={{
          width: "38px",
          height: "38px",
          fontSize: "18px",
          boxShadow: "0 0 12px rgba(13, 202, 240, 0.35)",
        }}
      >
        G
      </div>

    
      <div className="d-flex flex-column">
        <span
          className="fw-bold text-white"
          style={{
            fontSize: "14px",
            letterSpacing: "1px",
          }}
        >
          GLOBAL GAME JAM 2026
        </span>

        <small
          className="text-info font-monospace"
          style={{
            fontSize: "9px",
            letterSpacing: "1px",
          }}
        >
          TNI GAMEJAM
        </small>
      </div>
    </Link>

    {/* Mobile Button */}
    <button
      type="button"
      className="navbar-toggler border border-info"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle navigation"
      aria-expanded={menuOpen}
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Menu */}
    <div
      className={`${
        menuOpen ? "d-flex" : "d-none"
      } d-lg-flex flex-column flex-lg-row justify-content-lg-end align-items-lg-center w-100`}
    >
      <div className="navbar-nav align-items-lg-center gap-lg-2 gap-xl-4">

        {/* About */}
        <Link
          href="#about"
          className="nav-link text-secondary px-3 py-2"
          onClick={() => setMenuOpen(false)}
        >
          ABOUT
        </Link>

        {/* Schedule */}
        <Link
          href="#schedule"
          className="nav-link text-secondary px-3 py-2"
          onClick={() => setMenuOpen(false)}
        >
          SCHEDULE
        </Link>

        {/* Prizes */}
        <Link
          href="#prizes"
          className="nav-link text-secondary px-3 py-2"
          onClick={() => setMenuOpen(false)}
        >
          PRIZES
        </Link>

        {/* Register */}
        <Link
          href="#register"
          className="btn btn-outline-info px-4 py-2 ms-lg-2"
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
