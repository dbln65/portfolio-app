import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

/**
 * Zentrale Axios-Instanz
 * - Basis-URL aus VITE_API_URL (Dev/Prod)
 * - JSON-Header + Timeout
 * - Automatische Authentifizierung über Cognito
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

/**
 * Interceptor:
 * Holt das aktuelle ID-Token aus Cognito (falls eingeloggt)
 * und hängt es als Bearer-Token an alle Requests an.
 */
api.interceptors.request.use(async (config) => {
  try {
    const session = await fetchAuthSession();
    const token = session?.tokens?.idToken?.toString();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // kein Token vorhanden → einfach ohne Auth weitermachen
  }
  return config;
});

/**
 * API-Methoden
 */
export const getProjects = () => api.get("/aboutme"); // geschützt
export const sendContact = (payload) => api.post("/contact", payload); // offen
export const getHealth = () => api.get("/health");

export default api;
