import { useEffect, useState } from "react";
import { getProjects } from "../api";

export default function AboutMe() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch((err) => {
        console.error("Fehler beim Laden vom AboutMe:", err);
        setError("Fehler beim Laden der Daten.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-500 text-center">Lade About Me...</p>
      </section>
    );

  if (error)
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-red-600 text-center">{error}</p>
      </section>
    );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-10 text-center text-gray-800">
          About Me
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.demo || p.github || p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600 group-hover:text-blue-700 transition">
                {p.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{p.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {p.tech?.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="text-sm text-blue-500 font-medium group-hover:underline">
                View on GitHub →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
