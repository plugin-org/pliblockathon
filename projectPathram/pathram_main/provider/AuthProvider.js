import { createContext, useEffect, useState } from "react";
import nookies from "nookies";
import { onIdTokenChanged, auth } from "../firebase-app";

export const AuthContext = createContext({
  user: null,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // handle auth logic here...
  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
        nookies.set(undefined, "role", "", { path: "/" });
        nookies.set(undefined, "message", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
        nookies.set(undefined, "role", user.displayName, { path: "/" });
        nookies.set(undefined, "message", "", { path: "/" });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
