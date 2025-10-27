import { createContext, useState, useEffect } from "react";
import {
  signIn,
  signOut,
  fetchAuthSession,
  getCurrentUser,
} from "aws-amplify/auth";
import "../auth/cognito";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Prüfe beim Laden, ob bereits eine gültige Session existiert
  useEffect(() => {
    const loadUser = async () => {
      try {
        const session = await fetchAuthSession();
        if (session?.tokens?.idToken) {
          const current = await getCurrentUser();
          setUser(current);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Login mit Benutzername + Passwort
  const login = async (username, password) => {
    const { nextStep } = await signIn({ username, password });

    if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD") {
      throw new Error("Benutzer muss Passwort ändern (FORCE_CHANGE_PASSWORD).");
    }

    // Nach Login Session abrufen
    const session = await fetchAuthSession();
    const token = session?.tokens?.idToken?.toString();

    if (!token) throw new Error("Session konnte nicht geladen werden");

    localStorage.setItem("token", token);

    // Benutzerinfo aus Token extrahieren
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({
      username: payload["cognito:username"],
      email: payload.email,
      name: payload.name,
    });
  };

  // Logout
  const logout = async () => {
    await signOut();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
