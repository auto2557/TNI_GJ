import Navbar from "./lib/Navbar";

export default function Home() {
  return (
    <main className="page">

      <Navbar />

      <section className="hero">
        <h1>GLOBAL GAME JAM</h1>
        <p>
          Create. Collaborate. Play.
        </p>
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #05050b;
          color: white;
        }

        .hero {
          min-height: 500px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;
        }

        .hero h1 {
          font-size: 50px;
          margin: 0;
        }

        .hero p {
          color: #00d9ff;
        }
      `}</style>

    </main>
  );
}