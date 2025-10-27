import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-28">
      {/* Hintergrund-Deko */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-200 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-200 blur-3xl" />
      </div>

      {/* Inhalt */}
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Profilbild */}
        <img
          src="/david.jpg"
          alt="Your portrait"
          className="mx-auto h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 rounded-full mb-6 ring-2 ring-white/70 shadow-lg object-cover"
        />

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Hi, I’m David 👋
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
            AWS • Kubernetes • React
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/aboutme"
            className="inline-flex items-center rounded-2xl px-5 py-3 text-white bg-brand-600 hover:bg-brand-700 shadow-soft transition"
          >
            View about me
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center rounded-xl px-5 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Contact me
          </Link>
        </div>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-5 text-gray-500">
          <a
            href="https://github.com/dbln65"
            aria-label="GitHub"
            className="hover:text-gray-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.57v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.76.08-.75.08-.75 1.22.09 1.86 1.26 1.86 1.26 1.08 1.86 2.83 1.32 3.52 1.01.11-.79.42-1.32.77-1.62-2.66-.31-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.55.12-3.23 0 0 1.01-.32 3.3 1.23a11.47 11.47 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.68.24 2.92.12 3.23.77.84 1.24 1.91 1.24 3.22 0 4.61-2.82 5.61-5.5 5.92.43.37.82 1.1.82 2.22v3.29c0 .31.22.69.83.57A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/"
            aria-label="LinkedIn"
            className="hover:text-gray-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8.98h5v15H0v-15zM8.34 8.98H13v2.05h.07c.65-1.24 2.25-2.55 4.64-2.55 4.96 0 5.87 3.27 5.87 7.52v8.48h-5v-7.52c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.88 1.95-2.88 3.96v7.65h-5v-15z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
