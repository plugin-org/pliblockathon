import { createContext, useEffect, useState } from 'react';
import nookies from 'nookies'
import { onIdTokenChanged,auth } from '../firebase-app';

export const AuthContext = createContext  ({
    user: null,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // handle auth logic here...
    useEffect(() => {
        return onIdTokenChanged(auth,async(user)=>{
            if (!user) {
                setUser(null);
                nookies.set(undefined, 'token', '', { path: '/login' });
                nookies.set(undefined, "role", "", { path: "/login" });
            } else {
                const token = await user.getIdToken();
                setUser(user);
                console.log(user);
                nookies.set(undefined, 'token', token, { path: '/' });
                nookies.set(undefined, "role", user.displayName, { path: "/" });
            }
        })
       
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}