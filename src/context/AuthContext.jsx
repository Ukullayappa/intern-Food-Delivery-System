import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const USERS_KEY = 'tastygo_users';
const SESSION_KEY = 'tastygo_session';

// Demo-only auth, entirely in LocalStorage — no backend. This matches the
// brief's "Login/Signup UI" bonus feature (a UI demo, not a secured
// system). Passwords are stored in plain text in the browser's storage:
// fine for a portfolio demo where nobody enters a real password, but this
// pattern should never be reused for anything handling real user data.

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}
function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (saved) setUser(saved);
    } catch {
      /* ignore malformed session */
    }
    setLoading(false);
  }, []);

  const persistSession = (u) => {
    setUser(u);
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
  };

  const signUp = async (email, password, fullName) => {
    const users = readUsers();
    if (users.some((u) => u.email === email)) {
      return { error: { message: 'An account with this email already exists.' } };
    }
    writeUsers([...users, { email, password, full_name: fullName }]);
    persistSession({ id: email, email, user_metadata: { full_name: fullName } });
    return { error: null };
  };

  const signIn = async (email, password) => {
    const match = readUsers().find((u) => u.email === email && u.password === password);
    if (!match) return { error: { message: 'Invalid email or password.' } };
    persistSession({ id: match.email, email: match.email, user_metadata: { full_name: match.full_name } });
    return { error: null };
  };

  const signOut = async () => persistSession(null);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
