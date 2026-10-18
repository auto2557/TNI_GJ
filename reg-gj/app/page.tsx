import Navbar from "./lib/Navbar";

export default function Home() {
  return (
    <main className="min-vh-100 bg-dark text-white">

      {/* Hero */}
      <section className="container py-5">
        <div className="text-center py-5">

          <h1 className="display-4 fw-bold">
            GLOBAL GAME JAM
          </h1>

          <p className="lead text-info mt-3">
            Create. Collaborate. Play.
          </p>

          <button className="btn btn-outline-info mt-3 px-4">
            GET STARTED
          </button>

        </div>
      </section>

    </main>
  );
}