"use client";

import Link from "next/link";
import { useState } from "react";

// 1. กำหนดรูปแบบ Props ที่รับเข้ามา
interface NavbarProps {
  isLoggedIn: boolean; // เช็คว่าล็อกอินอยู่ไหม
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-info border-2 py-3">
      <div className="container-fluid px-4 px-lg-5">

        {/* LOGO */}
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center gap-3 me-auto"
          onClick={closeMenu}
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

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="navbar-toggler border border-info rounded-0 p-2"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="mainNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* NAVIGATION MENU */}
        <div
          id="mainNavbar"
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
        >
          <div className="navbar-nav ms-lg-auto align-items-lg-center gap-lg-3 gap-xl-4 pt-3 pt-lg-0">

            {/* ABOUT */}
            <Link
              href="/#about"
              className="nav-link text-secondary px-3 py-2 fw-semibold"
              onClick={closeMenu}
            >
              ABOUT
            </Link>

            {/* SCHEDULE */}
            <Link
              href="/#schedule"
              className="nav-link text-secondary px-3 py-2 fw-semibold"
              onClick={closeMenu}
            >
              SCHEDULE
            </Link>

            {/* PRIZES */}
            <Link
              href="/#prizes"
              className="nav-link text-secondary px-3 py-2 fw-semibold"
              onClick={closeMenu}
            >
              PRIZES
            </Link>

            <Link
              href="/admin"
              className="nav-link text-secondary px-3 py-2 fw-semibold"
              onClick={closeMenu}
            >
              DASHBOARD
            </Link>

            {/* 2. เปลี่ยนปุ่มตามสถานะ isLoggedIn */}
            {isLoggedIn ? (
              <Link
                href="/profile-user"
                className="btn btn-outline-info rounded-0 px-4 py-2 ms-lg-2 fw-bold"
                onClick={closeMenu}
              >
                PROFILE →
              </Link>
            ) : (
              <Link
                href="/login"
                className="btn btn-info text-dark rounded-0 px-4 py-2 ms-lg-2 fw-bold"
                onClick={closeMenu}
              >
                REGISTER NOW →
              </Link>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
}